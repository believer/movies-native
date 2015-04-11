/** @jsx React.DOM */

var React = require('react-native');
var NestedStyles = require('react-native-nested-styles');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} = React;


module.exports = React.createClass({
  render: function () {
    return (
      <View style={styles.sidebar}>
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

var styles = NestedStyles.create({
  sidebar: {
    backgroundColor: '#444f5a',
    position: 'absolute',
    top: 0,
    left: 0,
    height: height,
    width: width,
    borderRightColor: '#2d353e',
    borderRightWidth: 2,
    paddingTop: 64
  },
  white: {
    color: '#ffffff'
  },
  menuOption: {
    backgroundColor: '#2d353e',
    width: 290,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20
  },
});