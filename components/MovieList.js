'use strict';

var React = require('react-native');
var MovieCell = require('./MovieCell');
var SearchBar = require('./SearchBar');
var NewMovie = require('./NewMovie');
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

var resultsCache = {
  dataForQuery: {},
  nextPageNumberForQuery: {},
  totalForQuery: {},
};

var LOADING = {};

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
      queryNumber: 0,
      container: {
        flex: 1,
        padding: 15,
        marginTop: -120,
      }
    };
  },

  componentDidMount: function() {
    this.searchMovies('');
  },

  _urlForQueryAndPage: function(query: string, pageNumber: ?number): string {
    return query ? REQUEST_URL + '?title=' + query + '&skip=' + pageNumber : REQUEST_URL
  },

  searchMovies: function(query: string) {
    this.timeoutID = null;
    this.setState({filter: query});
    var cachedResultsForQuery = resultsCache.dataForQuery[query];

    if (cachedResultsForQuery) {
      if (!LOADING[query]) {
        this.setState({
          dataSource: this.getDataSource(cachedResultsForQuery),
          isLoaded: true
        });
      } else {
        this.setState({ isLoaded: true });
      }
      return;
    }

    LOADING[query] = true;
    resultsCache.dataForQuery[query] = null;

    this.setState({
      isLoaded: true,
      queryNumber: this.state.queryNumber + 1,
      isLoadedTail: false,
    });

    fetch(this._urlForQueryAndPage(query))
      .then((response) => response.json())
      .catch((error) => {
        LOADING[query] = false;
        resultsCache.dataForQuery[query] = undefined;

        this.setState({
          dataSource: this.getDataSource([]),
          isLoaded: false,
        });
      })
      .then((responseData) => {
        LOADING[query] = false;
        resultsCache.totalForQuery[query] = responseData.resultCount;
        resultsCache.dataForQuery[query] = responseData.results;
        resultsCache.nextPageNumberForQuery[query] = 2;

        if (this.state.filter !== query) {
          // do not update state if the query is stale
          return;
        }

        this.setState({
          isLoaded: true,
          dataSource: this.getDataSource(responseData.results),
        });
      })
      .done();
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

  addNewMovie: function () {
    this.props.navigator.push({
      title: 'Add new movie',
      component: NewMovie,
      passProps: {
        animate: this.props.animate
      }
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

  handleTouchStart: function (event: Object) {
    this.startX = event.nativeEvent.pageX;
    this.startY = event.nativeEvent.pageY;
  },

  handleTouchEnd: function (event: Object) {
    var deltaX = event.nativeEvent.pageX - this.startX;
    var deltaY = event.nativeEvent.pageY - this.startY;

    var direction = -1;
    if (Math.abs(deltaX) > 3 * Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      direction = deltaX > 0 ? 2 : 0;
    } else if (Math.abs(deltaY) > 3 * Math.abs(deltaX) && Math.abs(deltaY) > 30) {
      direction = deltaY > 0 ? 3 : 1;
    }

    if (direction === 3) {
      this.setState({
        container: {
          flex: 1,
          padding: 15,
          marginTop: 0,
        }
      });
    }
  },

  animate: function () {
    
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
      <ScrollView style={this.state.container}>
        <View style={styles.searchAdd}>
          <Button clickFunction={this.addNewMovie} text="+ Add new"/>
          <SearchBar
            onSearchChange={this.onSearchChange}
            isLoaded={this.state.isLoaded}
  r         onFocus={() => this.refs.listview.getScrollResponder().scrollTo(0, 0)}/>
          {text}
        </View>
        <ListView
          ref="listview"
          onTouchStart={(event) => this.handleTouchStart(event)}
          onTouchEnd={(event) => this.handleTouchEnd(event)}
          dataSource={this.state.dataSource}
          renderFooter={this.renderFooter}
          renderRow={this.renderRow}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="onDrag"
          keyboardShouldPersistTaps={true}
          showsVerticalScrollIndicator={false} />
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
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