'use strict';

var React              = require('react-native');
var Loader             = require('./components/Loader');
var Movie              = require('./components/Movie');
var Notification       = require('./components/Notification');
var NewMovie           = require('./components/NewMovie');
var SearchBar          = require('./components/SearchBar');
var NewMovie            = require('./components/NewMovie');
var Carousel           = require('react-native-looped-carousel');
var Dimensions         = require('Dimensions');
var {width, height}    = Dimensions.get('window');
var getStyleFromRating = require('./utils/getStyleFromRating');
var NestedStyles       = require('react-native-nested-styles');
var TimerMixin         = require('react-timer-mixin');

var {
  Animation,
  AppRegistry,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

var REQUEST_URL = 'http://rickardlaurin.se:3000/movies?limit=10';

var resultsCache = {
  dataForQuery: {},
  nextPageNumberForQuery: {},
  totalForQuery: {},
};

var LOADING = {};
var searchDisplayed = false;

var moviesNative = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function () {
    return {
      message: 'test',
      icon: 'test',
      style: 'notification',
      movies: [],
      loading: true,
      showSearchIcon: true,
      mainViewOpen: false
    }
  },

  componentDidMount: function() {
    this.getMovies('', 0);
  },

  _urlForQueryAndPage: function(query: string, pageNumber: ?number): string {
    return query ? REQUEST_URL + '?title=' + query + '&skip=' + pageNumber : REQUEST_URL + '&skip=' + pageNumber
  },

  animate: function (message: string, type: string) {
    var icon = type === 'success' ? '✓' : '×';

    this.setState({
      message: message,
      icon: icon,
      style: type
    });

    Animation.startAnimation(this.refs.notification, 250, 0, 'easeInOutQuad', {opacity: 1 });

    setTimeout(() => {
      Animation.startAnimation(this.refs.notification, 150, 0, 'easeInOutQuad', { opacity: 0 });
    }, 1000);
  },

  addNew: function () {
    var position = [160, 480];

    if (this.state.mainViewOpen) {
      position = [160, 284];
    }

    this.setState({
      mainViewOpen: !this.state.mainViewOpen
    });


    Animation.startAnimation(this.refs.mainView, 250, 0, 'easeInOutQuad', {position: position });
  },

  getMovies(query: String, skip: Number) {
    this.timeoutID = null;
    this.setState({filter: query});

    var cachedResultsForQuery = resultsCache.dataForQuery[query];

    if (!skip && cachedResultsForQuery) {
      if (!LOADING[query]) {
        this.setState({
          dataSource: cachedResultsForQuery,
          loading: true
        });
      } else {
        this.setState({ loading: true });
      }
      return;
    }

    LOADING[query] = true;
    resultsCache.dataForQuery[query] = null;

    this.setState({
      loading: !skip ? true : false,
      queryNumber: this.state.queryNumber + 1,
    });

    if (this.state.skipped === skip) {
      return;
    }

    fetch(this._urlForQueryAndPage(query, skip))
      .then((response) => response.json())
      .catch((error) => {
        LOADING[query] = false;
        resultsCache.dataForQuery[query] = undefined;

        this.setState({
          movies: [],
          loading: false,
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
          loading: false,
          skipped: skip ? skip : 0,
          movies: skip ? this.state.movies.concat(responseData.results) : responseData.results
        });
      })
      .done();
  },

  displaySearch() {
    if (!searchDisplayed) {
      searchDisplayed = true;
      Animation.startAnimation(this.refs.search, 250, 0, 'easeInOutQuad', { position: [160,35] });
    } else {
      searchDisplayed = false;
      Animation.startAnimation(this.refs.search, 250, 0, 'easeInOutQuad', { position: [160,-50] });
    }

    this.setState({ showSearchIcon: !this.state.showSearchIcon });
  },

  onSearchChange: function(event: Object) {
    var filter = event.nativeEvent.text.toLowerCase();

    if (!filter) { return; }
    
    searchDisplayed = false;

    this.clearTimeout(this.timeoutID);
    this.timeoutID = this.setTimeout(() => this.getMovies(filter), 500);
  },

  hideSearchIcon(opacity: Number) {
    Animation.startAnimation(this.refs.searchIcon, 250, 0, 'easeInOutQuad', { opacity: opacity });
  },

  render: function() {
    if (this.state.loading) {
      return <Loader />
    }

    var movies = this.state.movies.map((movie, i) => {
      return (
        <Movie key={i} {...movie} getMovies={this.getMovies} hideSearchIcon={this.hideSearchIcon} />
      );
    });

    var notification = {
      icon: this.state.icon,
      message: this.state.message,
      style: this.state.notification
    };

    var image = this.state.showSearchIcon ? <Image source={require('image!search')} style={styles.searchButton}/> : <Image source={require('image!close')} style={styles.searchButton}/>;

    return (
      <View style={styles.container}>
        <NewMovie addNew={this.addNew} />

        <View ref="mainView" style={styles.mainView}>
          <Carousel getMovies={this.getMovies} skipped={this.state.skipped} delay={999999999999999999999}>
            {movies}
          </Carousel>

          <TouchableOpacity onPress={this.addNew}>
            <Image source={require('image!plus')} style={styles.menuBtn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.displaySearch} ref="searchIcon">
            {image}
          </TouchableOpacity>
        </View>

        <View ref="search" style={styles.search}>
          <SearchBar onSearchChange={this.onSearchChange}/>
        </View>
      </View>
    );
  }
});

var styles = NestedStyles.create({
  container: {
    width: width,
    height: height,
    position: 'relative',
    mainView: {}
  },
  sidebar: {
    backgroundColor: '#444f5a',
    position: 'absolute',
    top: 0,
    left: 0,
    height: height,
    width: 290,
    borderRightColor: '#2d353e',
    borderRightWidth: 2,
    paddingTop: 64
  },
  search: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    opacity: 1,
    flex: 1,
    padding: 0,
    paddingTop: 40,
    left: 0,
    top: -height,
    position: 'absolute',
    width: width
  },
  menuBtn: {
    position: 'absolute',
    top: 25,
    left: 15,
    width: 30,
    height: 30
  },
  searchText: {
    backgroundColor: 'transparent',
    color: '#ffffff'
  },
  searchButton: {
    position: 'absolute',
    top: 35,
    right: 15,
    width: 20,
    height: 20
  },
});

AppRegistry.registerComponent('moviesNative', () => moviesNative);

