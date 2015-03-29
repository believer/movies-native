var React = require('react-native');
var Button = require('./Button');

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
      addedNew: false,
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
      self.setState({
        addedNew: true
      })
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
    if (this.state.addedNew) {
      return <Text style={styles.searchBar}>Added new movie!</Text>
    }

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
        <Text>{this.state.error}</Text>
        <Button clickFunction={this.addNewMovie} text="Add new movie" />
      </View>
    );
  }
})

var styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#ffffff',
    color: '#666666',
    marginTop: 64,
    marginBottom: 10,
    padding: 15,
    alignItems: 'center',
  },
  searchBarInput: {
    borderColor: '#5CACC4',
    borderRadius: 3,
    borderWidth: 1,
    fontSize: 15,
    flex: 1,
    marginTop: 10,
    height: 30,
    padding: 20,
    paddingLeft: 8,
  },
  button: {
    flex: 1
  }
});
