var React = require('react-native');
var {
  ActivityIndicatorIOS,
  StyleSheet,
  Text,
  View,
} = React;

module.exports = React.createClass({
  render: function () {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS style={styles.scrollSpinner} />
        <Text style={styles.loader}>
          Loading movies
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    fontWeight: '700',
    color: '#5CACC4',
    textAlign: 'center'
  },
  scrollSpinner: {
    height: 50,
    width: 50
  }
});