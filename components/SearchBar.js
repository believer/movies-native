var React = require('react-native');

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
    backgroundColor: 'rgba(240,240,240,0.8)',
    borderColor: '#aaaaaa',
    borderWidth: 1,
    borderRadius: 3,
    color: '#CCCCCC',
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: 250
  },
  searchBarInput: {
    fontSize: 15,
    flex: 1,
    height: 30,
    width: 200
  }
});
