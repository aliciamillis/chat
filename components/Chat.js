import React from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { StyleSheet, View, Text, Button, Platform, KeyboardAvoidingView, LogBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';


const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      loggedInText: 'Please wait, you are getting logged in.',
      isConnected: false,
      image: null,
      location: null
    }
    //connecting to database
    const firebaseConfig = {
      apiKey: "AIzaSyDwp7MP6422-fsFIx7gBTeuv-zIg3WbZqQ",
      authDomain: "chat-app-794c5.firebaseapp.com",
      projectId: "chat-app-794c5",
      storageBucket: "chat-app-794c5.appspot.com",
      messagingSenderId: "130877607231",
      appId: "1:130877607231:web:5dd521c4a74fe36d54178a",
      measurementId: "G-QDG0HWE0FF"
    }
    //connect to firebase 
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceChatUser = null;

    this.referenceChatMessages = firebase.firestore().collection('messages');
    firebase.firestore().collection('messages').doc('messages');

    // to ignore warnings
    LogBox.ignoreLogs([
      'Setting a timer',
      'Animated.event now requires a second argument for options',
      'Cannot update a component from inside'
    ])
  }

  // Updates messages state
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      let data = doc.data(); // Grabs QueryDocumentSnapshot's data
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({ messages })
  }

  // Adds messages to cloud storage
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text || null,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        this.addMessage();
        this.saveMessages();
      });
  }

  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');

        // Authenticates user via Firebase
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
          // Add user to state
          this.setState({
            isConnected: true,
            user: {
              _id: user.uid,
              name: this.props.route.params.name,
              avatar: 'https://placeimg.com/140/140/any'
            },
            messages: [],
            loggedInText: `Hi ${this.props.route.params.name}, welcome to the chat app`,
          });
          this.referenceChatMessages = firebase.firestore().collection('messages');
          // Listener for collection changes for current user
          this.unsubscribe = this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
        });
      } else {
        console.log('offline');
        this.setState({
          isConnected: false
        });
        this.getMessages();
      }
    })
      .catch((e) => {
        console.log(e);
      });
  }

  componentWillUnmount() {
    // Stops listening for authentication
    this.unsubscribe();
    // Stops listening for changes
    this.authUnsubscribe();
  }

  // Renders sender's chat bubble with custom color
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#F1F2F2',
          }
        }}
        textStyle={{
          right: {
            color: 'black',
          }
        }}
      />
    );
  }


  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  }

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {
    //startscreen.js props passed with onPress
    const { name, color } = this.props.route.params;

    //users name in title
    this.props.navigation.setOptions({ title: name });
    return (
      <View style={{ flex: 1, backgroundColor: color }}>
        <Text style={styles.loggedInText}>{this.state.loggedInText}</Text>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
          image={this.state.image}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loggedInText: {
    textAlign: 'center',
    color: 'white',
    opacity: 50
  }
})
