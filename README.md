### InMusic - Mobile App Supported Music Recommender System

#### Project Overview
InMusic is a mobile application integrated with Spotify accounts to provide personalized music recommendations. 
The application offers personalized suggestions based on the users' most listened-to songs using Python-based machine learning models and a user-friendly React Native interface.

#### Technologies Used

**1. Python:**
Python was used for data analysis and the development of machine learning models. 
The project utilized the Scikit-learn library to implement the K-Means algorithm, clustering songs to recommend music that aligns with users' tastes. 
Python was also employed for API development using the Flask framework.

**2. Flask:**
Flask is a lightweight and flexible web framework based on Python. In this project, Flask handles user requests, processes the data, and executes the machine learning models.

**3. React Native:**
React Native, an open-source framework developed by Facebook, was used to create a cross-platform mobile application. 
This allowed for the development of both iOS and Android applications using a single codebase, providing a seamless and consistent user experience across platforms.

**4. Firebase:**
Firebase was used for authentication and database management. Firebase Authentication provides secure sign-in methods, while Firebase Realtime Database stores user data and music preferences, ensuring real-time data synchronization.

**5. Spotify API:**
The Spotify Web API was utilized to access Spotify's extensive music library, retrieve user data, and analyze their music preferences. This integration allows InMusic to recommend new songs based on users' listening habits.

#### Project Structure

**1. Data Collection:**
User data, including their most listened-to songs and artists, is collected through the Spotify API. This data is securely fetched using OAuth 2.0 authentication.

**2. Data Processing:**
The collected data is processed using Python. Key features of the songs, such as valence, danceability, energy, and tempo, are extracted and used to create a user profile.

**3. Machine Learning Model:**
A K-Means clustering algorithm is employed to group similar songs based on their features. This model is trained using the processed data to provide accurate and personalized music recommendations.

**4. Backend Development:**
The backend, built with Flask, handles API requests from the mobile application. It processes the user input, runs the recommendation algorithm, and sends the results back to the app.

**5. Frontend Development:**
The frontend, developed using React Native, offers a user-friendly interface. Users can log in with their Spotify accounts, view their favorite songs, and receive new song recommendations based on their listening history.

**6. Authentication and Security:**
Firebase Authentication ensures secure user login and account management. OAuth 2.0 is used for secure integration with Spotify, ensuring that user data is protected.

#### Key Features

- **Personalized Recommendations:**
  Users receive song suggestions based on their listening habits and preferences.

- **Spotify Integration:**
  Seamless integration with Spotify allows users to log in with their Spotify accounts and retrieve their music data.

- **User-Friendly Interface:**
  A React Native-based mobile application provides a smooth and intuitive user experience across both iOS and Android platforms.

- **Real-Time Data Synchronization:**
  Firebase ensures that user data is updated in real-time, providing accurate and timely recommendations.

- **Secure Authentication:**
  Firebase Authentication and OAuth 2.0 ensure secure handling of user credentials and data.

#### Conclusion

InMusic enhances the music discovery experience by analyzing users' listening habits and providing personalized recommendations. 
The combination of Python, Flask, React Native, Firebase, and Spotify API creates a powerful and user-centric music recommender system. 
The project not only showcases technical proficiency in modern web and mobile development technologies but also provides valuable insights into real-world applications of machine learning and data analysis.
