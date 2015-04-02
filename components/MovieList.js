'use strict';

var React = require('react-native');
var MovieCell = require('./MovieCell');
var SearchBar = require('./SearchBar');
var Notification = require('./Notification');
var Button = require('./Button');
var Loader = require('./Loader');
var Movie = require('./Movie');
var TimerMixin = require('react-timer-mixin');

var {
  ActivityIndicatorIOS,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var REQUEST_URL = 'http://rickardlaurin.se:3000/movies';
var PULLDOWN_DISTANCE = 40;

module.exports = React.createClass({
  mixins: [TimerMixin],

  timeoutID: (null: any),

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      isLoaded: false,
      isLoadingTail: false,
      filter: '',
      reloading: false,
      queryNumber: 0,
    };
  },

  componentDidMount: function() {
    this.searchMovies('');
  },

  _urlForQueryAndPage: function(query: string, pageNumber: ?number): string {
    return query ? REQUEST_URL + '?title=' + query + '&skip=' + pageNumber : REQUEST_URL
  },

  searchMovies: function(query: string) {
    if (this.willReload || this.state.reloading) return

    this.setState({
      reloading: true,
      filter: query,
      queryNumber: this.state.queryNumber + 1,
    });

    this.willReload = true

    var self = this;

    setTimeout(function () {
      fetch(self._urlForQueryAndPage(query))
        .then((response) => response.json())
        .catch((error) => {
          self.setState({
            dataSource: self.getDataSource([]),
            reloading: false,
          });
        })
        .then((responseData) => {
          self.willReload = false
          self.setState({
            isLoaded: true,
            reloading: false,
            dataSource: self.getDataSource(responseData.results),
          });
        })
        .done();
    }, 300);
  },

  getDataSource: function (movies: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(movies);
  },

  selectMovie: function (movie: Object) {
    this.props.navigator.push({
      title: movie.title,
      component: Movie,
      passProps: {movie}
    });
  },

  renderRow: function(movie: Object) {   
    return (
      <MovieCell
        onSelect={() => this.selectMovie(movie)}
        {...movie} />
    );
  },

  onSearchChange: function(event: Object) {
    var filter = event.nativeEvent.text.toLowerCase();

    this.clearTimeout(this.timeoutID);
    this.timeoutID = this.setTimeout(() => this.searchMovies(filter), 100);
  },

  handleScroll(e: Object) {
    console.log(e.nativeEvent.contentOffset.y);
    if (e.nativeEvent.contentOffset.y < -PULLDOWN_DISTANCE) {
      this.searchMovies()
    }
    this.props.onScroll && this.props.onScroll(e)
  },

  renderHeader() {
    if (this.state.reloading) {
      return (
      <View style={[styles.reloader, styles.wrapper]}>
        <View style={[styles.reloader, styles.loading]}>
          <Text>{this.props.refreshDescription}</Text>
          <ActivityIndicatorIOS />
        </View>
      </View>
      )
    } else {
      return null
    }
  },

  render: function() {    
    var text;

    if (!this.state.isLoaded) {
      return <Loader style={styles.loader} />;
    }

    if (this.state.filter) {
      text = <Text ref="query" style={styles.results}>Showing <Text style={styles.bold}>{resultsCache.totalForQuery[this.state.filter]}</Text> movies for query <Text style={styles.bold}>{this.state.filter}</Text></Text>
    } else {
      text = <Text ref="query"></Text>;
    }

    return (
      <ListView
        style={styles.container}
        ref="listview"
        onScroll={this.handleScroll}
        dataSource={this.state.dataSource}
        renderHeader={this.renderHeader}
        renderRow={this.renderRow}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="onDrag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 50,
  },
  wrapper: {
    height: 60,
    marginTop: 10,
  },
  reloader: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loading: {
    height: 60,
  },
  addNew: {
    height: 20,
    color: '#ffffff',
    backgroundColor: '#5CACC4',
    width: 280,
    padding: 20
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  results: {
    color: '#999999',
    marginBottom: 10,
    textAlign: 'center'
  },
  loader: {
    flex: 1
  },
  bold: {
    fontWeight: '700'
  }
});