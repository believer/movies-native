/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Loader = require('./components/Loader');
var MovieList = require('./components/MovieList');

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  View,
} = React;

var moviesNative = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Movies',
          component: MovieList,
        }} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

AppRegistry.registerComponent('moviesNative', () => moviesNative);
