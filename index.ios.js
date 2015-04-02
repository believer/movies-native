/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Loader = require('./components/Loader');
var MovieList = require('./components/MovieList');
var Notification = require('./components/Notification');
var NewMovie = require('./components/NewMovie');

var {
  Animation,
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View,
} = React;

var moviesNative = React.createClass({
  getInitialState: function () {
    return {
      message: '',
      icon: '',
      style: 'notification',
      showAdd: true
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

  addNewMovie: function () {
    this.refs.nav.push({
      title: 'Add new movie',
      component: NewMovie,
      passProps: {
        animate: this.props.animate
      }
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <NavigatorIOS
          ref="nav"
          style={styles.container}
          initialRoute={{
            title: 'Movies',
            component: MovieList,
            rightButtonTitle: 'New',
            onRightButtonPress: this.addNewMovie,
            passProps: {
              animate: this.animate,
            }
          }} />
        <Notification ref="notification" {...this.state} />
      </View>
    );
  }
});

  //       <View style={styles.searchAdd}>
  //         <Button clickFunction={this.addNewMovie} text="+ Add new"/>
  //         <SearchBar
  //           onSearchChange={this.onSearchChange}
  //           isLoaded={this.state.isLoaded}
  // r         onFocus={() => this.refs.listview.getScrollResponder().scrollTo(0, 0)}/>
  //         {text}
  //       </View>

var styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  addNew: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: 'transparent',
    fontSize: 32,
    fontWeight: '300',
    color: '#5CACC4'
  }
});

AppRegistry.registerComponent('moviesNative', () => moviesNative);
