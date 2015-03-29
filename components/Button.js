var React  = require('react-native');

var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

module.exports = React.createClass({
  render: function () {
    return (
      <TouchableHighlight onPress={this.props.clickFunction}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {this.props.text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    height: 20,
    color: '#ffffff',
    backgroundColor: '#5CACC4',
    width: 290,
    marginBottom: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '900',
    color: '#ffffff'
  }
});
