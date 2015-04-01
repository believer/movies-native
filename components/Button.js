var React  = require('react-native');

var {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

module.exports = React.createClass({
  render: function () {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this.props.clickFunction}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {this.props.text}
          </Text>
        </View>
      </TouchableOpacity>
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
