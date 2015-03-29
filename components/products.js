var React = require('react-native');
var Product = require('./product');

module.exports = React.createClass({
  render: function () {
    var products = [
      {
        name: 'Vimla',
        text: '<em>Blabalal</em>',
        usps: [
          '60 samtal',
          '60 SMS/MMS',
          '1 GB data'
        ]
      },
      {
        name: 'Student',
        text: '<em>Blabalal</em>',
        usps: [
          'Fria samtal',
          'Fria SMS/MMS',
          '3 GB data'
        ]
      }
    ];

    return (
      <div className="products">
        <div className="content">
          {products.map(function (product, i) {
            return (
              <Product key={i} {...product} />
            );
          })}
        </div>
      </div>
    );
  }
});