var React = require('react-native');
var Styleguide = require('react-styleguide');

// Require the components that you want to include
var Products = require('./products');

module.exports = React.createClass({
  render: function() {
    return (
      <Styleguide title="Vimla">
        <div 
          title="Products" 
          description="Here is a description describing a simple Blockquote component and how to use it." 
          example='<Products />'
        >
          <Products text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec imperdiet ligula." speaker="Mauris porta ac lectus" />
        </div>
      </Styleguide>
    );
  }
});

