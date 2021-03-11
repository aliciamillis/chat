import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

// import the background image for start screen
const image = require('../assets/background-image.png');

export default class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: ''
    };
  }

  render() {
    return (

      <ImageBackground source={image} style={styles.image}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <Text style={styles.title}>Chat App</Text>
          <View style={styles.mainContainer}>
            <Text style={styles.text}>Your Name Here</Text>

            <TextInput
              style={{
                height: 40,
                color: 'white',
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 10,
                width: 250,
                padding: 10,
                margin: 15,
              }}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder='Your Name'
              placeholderTextColor='lightgray'
            />

            <Text style={styles.backgroundText}> Choose Background Color: </Text>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.box1}
                onPress={() => { this.setState({ color: '#090C08' }) }}
              >
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.box2}
                onPress={() => { this.setState({ color: '#474056' }) }}
              >
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.box3}
                onPress={() => { this.setState({ color: '#8A95A5' }) }}
              >
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.box4}
                onPress={() => { this.setState({ color: '#B9C6AE' }) }}
              >
              </TouchableOpacity>
            </View>


            <Button
              color='white'
              title="Start Chatting"
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}
            />
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 200,
    margin: 10
  },
  mainContainer: {
    flexDirection: 'column',
    position: 'relative',
    marginTop: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '88%',
    borderRadius: 30,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1
  },
  title: {
    fontSize: 45,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 3,
    marginBottom: 10,
    marginTop: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5,
  },
  backgroundText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
  },
  box1: {
    flex: 1,
    backgroundColor: '#cfcd90',
    height: 50,
    borderRadius: 25,
    right: 25
  },
  box2: {
    flex: 1,
    backgroundColor: '#cfab90',
    borderRadius: 25,
    right: 10
  },
  box3: {
    flex: 1,
    backgroundColor: '#a59d97',
    borderRadius: 25,
    left: 5
  },
  box4: {
    flex: 1,
    backgroundColor: '#95a6c1',
    borderRadius: 25,
    left: 20
  }
});
