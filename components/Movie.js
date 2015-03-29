'use strict';

var React = require('react-native');
var getStyleFromRating = require('../utils/getStyleFromRating');

var {
  AppRegistry,
  Image,
  ListView,
  NavigatorIOS,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

module.exports = React.createClass({
  render: function() {
    var poster = 'http://image.tmdb.org/t/p/w500' + this.props.movie.poster;
    return (
      <ScrollView style={styles.movie}>
        <Image
          source={{uri: poster}}
          style={styles.thumbnail} />
          <View style={styles.content}>
            <Text style={styles.title}>{this.props.movie.title}</Text>
            <Text style={styles.year}>{this.props.movie.year}</Text>
            <Text style={styles.desc}>{this.props.movie.desc}</Text>
            <Text style={getStyleFromRating(this.props.movie.rating)}>{this.props.movie.rating}</Text>
          </View>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  content: {
    padding: 20,
    position: 'relative'
  },
  desc: {
    lineHeight: 22,
    width: 280
  },
  rating: {
    color: '#1abc9c',
    fontSize: 20,
    position: 'absolute',
    top: 20,
    right: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '200',
    width: 250
  },
  thumbnail: {
    width: 320,
    height: 300,
  },
  year: {
    color: '#666666',
    fontSize: 12,
    marginBottom: 10,
  },
});
