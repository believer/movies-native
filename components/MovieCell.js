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
  TouchableOpacity,
  View,
} = React;

var colors;

module.exports = React.createClass({
  render: function() {
    var poster = 'http://image.tmdb.org/t/p/w500' + this.props.poster;
    var color = getStyleFromRating(this.props.rating).color;

    var ratingWrapper = {
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderColor: color,
      borderRadius: 25,
      borderWidth: 3,
      bottom: 30,
      flex: 1,
      height: 50,
      justifyContent: 'center',
      position: 'absolute',
      right: 30,
      width: 50,
    };

    return (
      <TouchableOpacity
        onPress={this.props.onSelect}
        activeOpacity={0.8} >
        <View style={styles.movie}>
          <Image
            source={{uri: poster}}
            style={styles.thumbnail} />
          <View style={ratingWrapper}>
            <Text style={styles.rating}>{this.props.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  movie: {
    marginTop: 15
  },
  rating: {
    color: '#ffffff',
    fontSize: 24
  },
  thumbnail: {
    borderRadius: 5,
    width: 290,
    height: 435,
  },
});
