'use strict';

var React = require('react-native');

var {
  Animation,
  StyleSheet,
  Text,
  View,
} = React;

module.exports = React.createClass({
  render: function () {
    return (
      <View style={styles[this.props.style]}>
        <Text style={styles.notificationText}>{this.props.icon} {this.props.message}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  notification: {
    backgroundColor: '#333333',
    width: 320,
    position: 'absolute',
    padding: 10,
    paddingTop: 40,
    paddingBottom: 30,
    height: 50,
    left: 0,
    top: 0,
    flex: 1,
    opacity: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  success: {
    backgroundColor: '#8CD19D',
    width: 320,
    position: 'absolute',
    padding: 10,
    paddingTop: 40,
    paddingBottom: 30,
    height: 50,
    left: 0,
    top: 0,
    flex: 1,
    opacity: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#ffffff',
  }
});