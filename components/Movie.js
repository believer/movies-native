'use strict';

var React = require('react-native');
var getStyleFromRating = require('../utils/getStyleFromRating');
var Dimensions = require('Dimensions');
var Animation = require('AnimationExperimental');
var {width, height} = Dimensions.get('window');

var {
  ActivityIndicatorIOS,
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

var PULLDOWN_DISTANCE = 100;
var hasHeight = false;

module.exports = React.createClass({
  closeMenu: function () {
    this.props.onPress();
  },

  render: function () {
    var poster = 'http://image.tmdb.org/t/p/w500' + this.props.poster;
    var cast = this.props.cast.map((actor, i) => {
      return <Text key={i} style={styles.actor}>{actor}</Text>
    });

    return (
      <View style={{flex:1, backgroundColor: '#ffffff'}}>
        <ScrollView
          style={styles.container}
          scrollEventThrottle={200}
          onScroll={(e) => {
            var offsetY = e.nativeEvent.contentOffset.y;

            if (offsetY < -PULLDOWN_DISTANCE) {
              this.props.getMovies()
            } else {
              if (offsetY > height && !hasHeight) {
                hasHeight = true;

                Animation.startAnimation({
                  node: this.refs.scrollTitle,
                  duration: 500,
                  easing: 'easeInOutQuad',
                  property: 'opacity',
                  toValue: 1
                });

                this.props.hideSearchIcon(0);
              } else if (offsetY < height && hasHeight) {
                hasHeight = false;

                Animation.startAnimation({
                  node: this.refs.scrollTitle,
                  duration: 500,
                  easing: 'easeInOutQuad',
                  property: 'opacity',
                  toValue: 0
                });

                this.props.hideSearchIcon(1);
              }
            }
          }}>
          <View style={styles.movie}>
            <TouchableHighlight onPress={this.closeMenu} activeOpacity="1">
              <Image
                source={{uri: poster}}
                style={styles.thumbnail} />
            </TouchableHighlight>
              <View ref="info" style={styles.preinfo}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.year}>{this.props.year}</Text>
                <Text style={getStyleFromRating(this.props.rating)}>{this.props.rating}</Text>
              </View>
          </View>
          <View style={[styles.content, styles.transparent]}>
            <Text style={styles.director}>
              <Text style={styles.bold}>Directed by: </Text>
              {this.props.director ? this.props.director : '-'}
            </Text>
            <Text style={styles.desc}>{this.props.desc}</Text>
            <View style={styles.cast}>
              <Text style={styles.h2}>Cast</Text>
              {cast}
            </View>
          </View>
        </ScrollView>
        <View ref="scrollTitle" style={[styles.preinfo, styles.scrollTitle]}>
          <Text style={styles.white}>{this.props.title}</Text>
          <Text style={[getStyleFromRating(this.props.rating, 'scroll')]}>{this.props.rating}</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  movie: {
    position: 'relative'
  },
  bold: {
    fontWeight: '700'
  },
  white: {
    color: '#ffffff',
    fontWeight: '700',
    width: 300,
    flex: 4
  },
  transparent: {
    backgroundColor: 'transparent'
  },
  preinfo: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    paddingTop: 10,
    bottom: 0,
    position: 'absolute',
    left: 0,
    width: width
  },
  content: {
    padding: 40,
    position: 'relative'
  },
  scrollTitle: {
    backgroundColor: 'rgba(0,0,0,1)',
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 20,
    paddingLeft: 40,
    paddingTop: 30,
    opacity: 0,
    width: width,
    height: 80,
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    flexWrap: 'nowrap',
    flexDirection: 'row'
  },
  desc: {
    lineHeight: 22,
  },
  director: {
    marginBottom: 10
  },
  actor: {
    marginBottom: 5
  },
  title: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '300',
    width: 250
  },
  h2: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 10
  },
  thumbnail: {
    width: width,
    height: height,
  },
  year: {
    backgroundColor: 'transparent',
    color: '#666666',
    fontSize: 12,
    fontWeight: '700'
  },
  wrapper: {
    height: 60,
    marginTop: 10,
  },
  reloader: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10
  },
  loading: {
    height: 60,
  },
});
