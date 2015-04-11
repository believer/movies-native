var React = require('react-native');
var Button = require('./Button');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

var REQUEST_URL = 'http://rickardlaurin.se:3000/tmdb';

module.exports = React.createClass({
  getInitialState: function () {
    return {
      error: ''
    }
  },

  addNewMovie: function () {
    if (!this.state.id) {
      this.setState({
        error: 'No IMDb ID'
      });

      return;
    }

    if (!this.state.rating) {
       this.setState({
        error: 'No rating'
      });

      return;     
    }

    var self = this;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', REQUEST_URL, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
      self.props.addNew();
    };

    xhr.send('imdbid=' + this.state.id + '&rating=' + this.state.rating);
  },

  setIMDbID: function (event: Object) {
    this.setState({ id: event.nativeEvent.text });
  },

  setRating: function (event: Object) {
    this.setState({ rating: event.nativeEvent.text });
  },

  render: function () {
    return (
      <View style={styles.searchBar}>
        <TextInput
          ref="imdbid"
          placeholder="IMDb ID"
          onChange={this.setIMDbID}
          style={styles.searchBarInput}/>
        <TextInput
          ref="rating"
          placeholder="Rating"
          onChange={this.setRating}
          style={styles.searchBarInput}
          keyboardType="numeric"/>
        <Text style={styles.error}>{this.state.error}</Text>
        <Button clickFunction={this.addNewMovie} text="Add new movie" />
      </View>
    );
  }
})

var styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#444f5a',
    padding: 15,
    paddingTop: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    height: 200,
    width: width,
  },
  error: {
    textAlign: 'center',
    padding: 5,
    color: '#ffffff'
  },
  searchBarInput: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderRadius: 3,
    borderWidth: 1,
    fontSize: 15,
    flex: 1,
    marginTop: 10,
    height: 40,
    padding: 3,
    paddingLeft: 8,
  },
});
