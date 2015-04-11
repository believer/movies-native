var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <View style={styles.searchBar}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChange={this.props.onSearchChange}
          placeholder="Search a movie..."
          onFocus={this.props.onFocus}
          style={styles.searchBarInput} />
      </View>
    );
  }
});

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
