'use strict';

var React = require('react-native');
var getStyleFromRating = require('../utils/getStyleFromRating');

var {
  AppRegistry,
  Image,
  ListView,
  NavigatorIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var colors;

module.exports = React.createClass({
  render: function() {
    var poster = 'http://image.tmdb.org/t/p/w500' + this.props.poster;
    var color = getStyleFromRating(this.props.rating).color;

    var ratingWrapper = {
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 25,
      borderWidth: 3,
      borderColor: color,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      height: 50,
      width: 50,
      position: 'absolute',
      bottom: 30,
      right: 30,
    };

    return (
      <TouchableHighlight
        onPress={this.props.onSelect}
        activeOpacity={0.6} >
        <View>
          <View style={styles.movie}>
            <Image
              source={{uri: poster}}
              style={styles.thumbnail} />
            <View style={ratingWrapper}>
              <Text style={styles.rating}>{this.props.rating}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movie: {
    marginTop: 15,
    position: 'relative'
  },
  title: {
    fontSize: 22,
    fontWeight: '200',
    width: 250
  },
  button: {
    backgroundColor: '#F7AF63',
    borderRadius: 5,
    color: '#633D2E',
    padding: 15,
  },
  ratingWrapper: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 50,
    width: 50,
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  rating: {
    color: '#ffffff',
    fontSize: 24
  },
  buttonText: {
    fontWeight: '900',
    textAlign: 'center',
  },
  thumbnail: {
    borderRadius: 5,
    shadowColor: '#000000a',
    shadowOpacity: 1,
    shadowOffset: {
      h: 5,
      w: 5
    },
    shadowRadius: 5,
    width: 290,
    height: 435,
  },
});
