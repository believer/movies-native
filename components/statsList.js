/** @jsx React.DOM */

var React  = require('react-native');
var addons = require('react-addons');
var List   = require('./list.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      open: false
    };
  },
  toggle: function () {
    this.setState({ open: !this.state.open });
  },
  render: function () {
    var self = this;
    var cx = addons.classSet;
    var classes = cx({
      'list__show-more': true,
      'open': this.state.open
    });

    var items = this.props.items.map(function (item, i) {
      if (!self.state.open && i >= 5) { return; }

      return (
        <List key={i} item={item} type={self.props.type}></List>
      );
    });

    return (
      <div className="list list--stats">
        <h3>{this.props.title}</h3>
        <ul>
          {items}
        </ul>
        <div className={classes} onClick={this.toggle}>
          {this.state.open ? 'Show less' : 'Show more'}
        </div>
      </div>
    );
  }
});