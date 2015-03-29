var MAX_VALUE = 200;

function getStyleFromRating (rating: number): { color: string } {
  if (!rating) { return; }

  if (rating < 0) {
    return {
      color: '#333',
      fontSize: 20,
      position: 'absolute',
      top: 20,
      right: 30,
    }
  }

  var normalizedScore = Math.round((rating / 10) * MAX_VALUE);

  if (isNaN(normalizedScore)) { return; } 

  return {
    color: 'rgb(' +
      (MAX_VALUE - normalizedScore) + ', ' +
      normalizedScore + ', ' +
      0 +
    ')',
    fontSize: 20,
    position: 'absolute',
    top: 20,
    right: 30,
  };
}

module.exports = getStyleFromRating;