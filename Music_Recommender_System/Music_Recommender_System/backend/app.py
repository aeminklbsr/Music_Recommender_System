from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics.pairwise import euclidean_distances
import logging

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)

try:
    dataset = pd.read_csv('data.csv')
    logging.debug("CSV dosyası başarıyla yüklendi")
except Exception as e:
    logging.error(f"CSV dosyası yüklenirken hata oluştu: {e}")
    dataset = pd.DataFrame() 

features = ['valence', 'year', 'acousticness',
            'danceability', 'duration_ms', 'energy',
            'explicit','instrumentalness', 'key', 
            'liveness', 'loudness', 'mode',
            'popularity','speechiness', 'tempo']

metadata_cols = ['name', 'artists']

try:
    song_cluster_pipeline = Pipeline([('scaler', StandardScaler()), 
                                      ('kmeans', KMeans(n_clusters=8, 
                                       verbose=2))],verbose=True)
    X = dataset[features]
    song_cluster_pipeline.fit(X)
    logging.debug("Pipeline başarıyla tamamlandı")
except Exception as e:
    logging.error(f"Pipeline işleminde hata var:{e}")

def input_preprocessor(song_list, dataset):
    song_vectors = []
    missing_songs = []
    
    for song in song_list:
        try:
            song_data = dataset[(dataset['name'] == song['name']) & (dataset['artists'].str.contains(song['artist']))].iloc[0]
        except IndexError:
            song_data = None
            
        if song_data is None:
            missing_songs.append(f'{song["name"]} by {song["artist"]}')
            continue
            
        song_vectors.append(song_data[features].values)  

    if not song_vectors:
        return None, missing_songs

    return np.mean(np.array(song_vectors), axis=0), missing_songs

def Music_Recommender(song_list, dataset, n_songs=10):
    try:
        song_center, missing_songs = input_preprocessor(song_list, dataset)

        if song_center is None:
            return None, missing_songs
        
        scaler = song_cluster_pipeline.steps[0][1]
        scaled_data = scaler.transform(dataset[features])
        scaled_song_center = scaler.transform(song_center.reshape(1, -1))
        
        ed_dist = euclidean_distances(scaled_song_center, scaled_data)
        index = list(np.argsort(ed_dist)[:,:n_songs][0])
        rec_output = dataset.iloc[index]

        unique_recs = rec_output.drop_duplicates(subset=['name', 'artists'])
        
        print("Önerilen şarkılar ve özellik değerleri:")
        print(unique_recs[features])

        dist_matrix = euclidean_distances(unique_recs[features])
        print("Öklid Uzaklık Matrisi:")
        print(dist_matrix)

        std_devs = unique_recs[features].std()
        means = unique_recs[features].mean()

        print("Özelliklerin Standart Sapmaları:")
        print(std_devs)
        print("\nÖzelliklerin Ortalamaları:")
        print(means)

        return unique_recs[metadata_cols], missing_songs
    except Exception as e:
        logging.error(f"Music_Recommender işlevinde hata: {e}")
        return None, song_list  

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        songs = request.json['songs']
        logging.debug(f"Alınan şarkılar: {songs}")  
        recommendations, missing_songs = Music_Recommender(songs, dataset)
        if recommendations is not None:
            logging.debug(f"Öneriler gönderiliyor: {recommendations.to_dict(orient='records')}") 
            return jsonify({
                'recommendations': recommendations.to_dict(orient='records'),
                'missing_songs': missing_songs
            })
        else:
            logging.error("Hiçbir öneri bulunamadı")
            return jsonify({
                'error': 'Hiçbir öneri bulunamadı',
                'missing_songs': missing_songs
            }), 400
    except Exception as e:
        logging.error(f"/recommend endpoint'de hata var: {e}")
        return jsonify({'error': 'Sunucu hatası'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')


