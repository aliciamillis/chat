# chat

This is a portfolio project I build for the Full-Stack Web Development course through CareerFoundry. 
It is to showcase my skills using React-Native for mobile devices.

See Full Case Study here:

https://www.canva.com/design/DAEY9PLwQ9A/A9bTFfMCcYzFQyOZe-0VMw/view?utm_content=DAEY9PLwQ9A&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink

The development process: 

Set up a development environment using React Native and Expo. First by installing  expo globally through   npm install expo-cli --global 

Then proceeded to download the Expo App on my mobile device. 

Created new project using   expo init [project-name]    in terminal 

Using StyleSheets I was able to create styling. 

Used React Native components ex: Buttons, ScrollView.

For navigation between screens I installed  npm install --save react-navigation    and necessary dependencies.

Using the project briefs design criteria I styled the start screen of the app. 

To start the chat screen I installed   npm install react-native-gifted-chat --save   

Used KeyboardAvoidingView component for the android keyboard error.

I went to Google Firebase and set up an account to create a database and to store data. 

I ran    npm install --save firebase@7.9.0   in order to display data that I am storing in Firebase. 

Added the Firebase configuration code from the registered database. 

I listened for updates using Firestore’s   onSnapshot() function.

Set up anonymous authentication through firebase.

I can save and  get messages from Firestore. 

To use client side storage for the chap app, I installed    
 expo install @react-native-community/async-storage 

To determine if user was online or offline I installed   expo install @react-native-community/netinfo 

To select a photo from the users library or take photo I asked fore permissions using 
expo install expo-permissions   and   expo install expo-image-picker 

For Geolocation I installed     expo install expo-location and  expo install react-native-maps 

To store and send images I used Cloud Storage for Firebase, I converted all files into blobs with XMLHttpRequest method.

