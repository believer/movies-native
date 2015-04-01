/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Loader = require('./components/Loader');
var MovieList = require('./components/MovieList');
var Notification = require('./components/Notification');

var {
  Animation,
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  View,
} = React;

var moviesNative = React.createClass({
  getInitialState: function () {
    return {
      message: '',
      icon: '',
      style: 'notification'
    }
  },

  animate: function (message: string, type: string) {
    var icon = type === 'success' ? '✓' : '×';

    this.setState({
      message: message,
      icon: icon,
      style: type
    });

    Animation.startAnimation(this.refs.notification, 250, 0, 'easeInOutQuad', {opacity: 1 });

    setTimeout(() => {
      Animation.startAnimation(this.refs.notification, 150, 0, 'easeInOutQuad', { opacity: 0 });
    }, 1000);
  },

  render: function() {
    return (
      <View style={styles.container}>
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'Movies',
            component: MovieList,
            passProps: {
              animate: this.animate
            }
          }} />
        <Notification ref="notification" {...this.state} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
});

AppRegistry.registerComponent('moviesNative', () => moviesNative);
