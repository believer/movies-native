var React = require('react-native');
var {
  Image,
  ListView,
  NavigatorIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

module.exports = React.createClass({
  getInitialProps: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  },

  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },
  _handleNextButtonPress: function() {
    this.props.navigator.push(nextRoute);
  },

  renderMovie: function(movie) {
    var poster = 'http://image.tmdb.org/t/p/w500' + movie.poster;
    return (
      <TouchableHighlight activeOpacity="0.95">
        <View style={styles.container}>
          <Image
            source={{uri: poster}}
            style={styles.thumbnail} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  render: function () {
    return (
    <NavigatorIOS
      ref="nav"
    />
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
  rightContainer: {
    flex: 1,
    marginBottom: 8
  },
  title: {
    fontSize: 14,
  },
  thumbnail: {
    width: 53,
    height: 81,
    marginRight: 20
  },
  year: {
    color: '#666666',
    fontSize: 12
  },
  listView: {
    backgroundColor: '#444f5a',
    paddingTop: 40
  }
});