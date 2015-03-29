/** @jsx React.DOM */

var React     = require('react-native');
var addons    = require('react-addons');
var StatsList = require('./statsList');
var Time      = require('./time/time');
var Rewatches = require('./rewatches/rewatches');
var Totals    = require('./totals');
var Loader    = require('./loader');
var Products = require('./products');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      data: {
        actors: [],
        directors: [],
        composers: [],
        genres: [],
        production_companies: [],
        languages: [],
        time: {
          adjustedMinutes: 0
        },
        numbers: {}
      },
      isLoaded: false
    };
  },
  componentWillMount: function() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', this.props.url, true);
    xhr.onload = function() {
      var result = JSON.parse(xhr.responseText);
      this.setState({
        data: result,
        isLoaded: true
      });
    }.bind(this);
    xhr.send();
  },
  cleanAndCapitalize: function (name) {
    name = name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function(str){ return str.toUpperCase(); })
    return name;
  },
  render: function () {
    var self = this;
    var cx = addons.classSet;
    var classes = cx({
      'wrapper': true,
      'wrapper--fadein': this.state.isLoaded
    });
    var lists = [
      'actors',
      'directors',
      'composers',
      'languages',
      'productionCompanies',
      'genres'
    ];

    var statsLists = lists.map(function (name, i) {
      return (
        <StatsList
          key={i}
          title={self.cleanAndCapitalize(name)}
          items={self.state.data[name]}
          type="movies"></StatsList>
      );
    })

    return (
        <div className={classes}>
          {this.state.isLoaded ?
            <div className="stats">
              <Products />
              <Time data={this.state.data.time} />
              <Rewatches movies={this.state.data.rewatches.slice(0,10)}/>
              <Totals cleanAndCapitalize={this.cleanAndCapitalize} numbers={this.state.data.numbers} total={this.state.data.total} />
              <div className="stats__lists">
                {statsLists}
              </div>
            </div>
            : <Loader />
          }
        </div>
    );
  }
});