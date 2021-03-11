import React from 'react';
import { View, Text } from 'react-native';


export default class Chat extends React.Component {
  render() {
    let name = this.props.route.params.name;

    this.props.navigation.setOptions({ title: name });

    return (
      <View>
        {/* Rest of the UI */}
      </View>
    );
  };
}