var React  = require('react-native');
var Button = require('./button');

module.exports = React.createClass({
  createText: function () {
    return {__html: this.props.text};
  },
  render: function () {
    return (
      <div className="box box--white box--product">
        <h3>{this.props.name}</h3>
        <p dangerouslySetInnerHTML={this.createText()}></p>
        <ul className="products__list">
          {this.props.usps.map(function (usp, i) {
            return (
              <li key={i}>{usp}</li>
            )
          })}
        </ul>
        <Button placeholder="Beställ" />
      </div>
    );
  }
});