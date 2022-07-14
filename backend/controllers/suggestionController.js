const User = require("../models/User");

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
const getSuggestions = async (req, res) => {
  const users = await User.find({});
  const suggestions = shuffle(users).splice(0, 3);
  res.status(200).json(suggestions);
};

module.exports = { getSuggestions };
