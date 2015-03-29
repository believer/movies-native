var React  = require('react-native');
var text = require('./en.json');

module.exports = React.createClass({
  pluralize: function (number, type) {
    return number === 1 ? text.time[type] : text.time[type + 's'];
  },
  render: function () {
    var base = this.props.data.adjustedMinutes / (60 * 24);
    var days = parseInt(base, 10);
    var hours = parseInt(base % 1 * 24, 10);
    var minutes = parseInt((base % 1 * 24) % 1 * 60, 10);

    return (
      <div className="time">
        <div className="time__box">
          <ul className="time__list">
            <li>{days} {this.pluralize(days, 'day')}</li>
            <li>{hours} {this.pluralize(hours, 'hour')}</li>
            <li>{minutes} {this.pluralize(minutes, 'minute')}</li>
          </ul>
          <div className="time__subtime">
            {text.or} {this.props.data.adjustedMinutes} {text.minutes}
          </div>
        </div>
      </div>
    );
  }
});