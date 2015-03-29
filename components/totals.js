/** @jsx React.DOM */

var React  = require('react-native');
var List = require('./list.jsx')
var textGlobal = require('./en.global.json');

module.exports = React.createClass({
  render: function () {
    var self = this;

    var numbers = Object.keys(this.props.numbers).map(function (number, i) {
      return (
        <List item={self.props.numbers} key={i}>
          {self.props.numbers[number]}
          <div className="list__subtitle">{self.props.cleanAndCapitalize(number)}</div>
        </List>
      );
    });

    return (
      <div className="totals">
        <div className="inner">
          <div className="left text--center">
            <div className="totals__huge">{this.props.total}</div>
            <div className="totals__big">{textGlobal.movies}</div>
          </div>
          <div className="right">
            <ul className="totals__list">
              {numbers}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});