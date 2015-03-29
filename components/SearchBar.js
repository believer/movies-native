var React = require('react-native');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

module.exports = React.createClass({
  clearInput: function () {

  },
  render: function() {
    return (
      <View style={styles.searchBar}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#666666"
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
    backgroundColor: '#ffffff',
    borderColor: '#5CACC4',
    borderWidth: 1,
    borderRadius: 3,
    color: '#666666',
    marginBottom: 10,
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarInput: {
    fontSize: 15,
    flex: 1,
    height: 30,
  }
});
