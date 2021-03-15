import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Stylesheet, View, Text, Button, Platform, KeyboardAvoidingView } from 'react-native';

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
      loggedInText: 'Please wait, you are getting logged in.'
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

    this.referenceChatMessages = firebase.firestore().collection('messages');
    firebase.firestore().collection('messages').doc('messages');
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
        }
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
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        this.addMessage();
      });
  }

  // Renders sender's chat bubble with custom color
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "yellow",
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


  componentDidMount() {
    // Authenticates user via Firebase
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      // Add user to state
      this.setState({
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
  }

  componentWillUnmount() {
    // Stops listening for authentication
    this.unsubscribe();
    // Stops listening for changes
    this.authUnsubscribe();
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
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    )
  }
}

const styles = Stylesheet.create({
  loggedInText: {
    textAlign: 'center',
    color: 'white',
    opacity: 50
  }
})
