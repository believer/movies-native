var List = require('../list.jsx');

module.exports = React.createClass({
  createList: function (movies) {
    var list = movies.map(function (movie, i) {
      return (
        <List
          key={i}
          title="Rewatches"
          item={movie}
          type="rewatches" />
        );
    });

    return list;
  },
  render: function () {
    var firstList = this.props.movies.slice(0,5);
    var secondList = this.props.movies.slice(5,10);

    return (
      <div className="rewatches text--center">
        <div className="inner">
          <div className="left">
            <ul className="list">
              {this.createList(firstList)}
            </ul>
          </div>
          <div className="right">
            <ul className="list">
              {this.createList(secondList)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});