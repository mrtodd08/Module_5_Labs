const express = require("express");
const router = express.Router();
const friends = require("../models/friends");
const movies = require("../models/movies"); // We'll create this new file shortly

// ========================== FRIEND ROUTES ==========================

// default endpoint, gets all friends
router.get("/", (req, res) => {
  res.json(friends);
});

// filter endpoint, gets friends matching the gender from 'gender' query parameter ie. /friends/filter?gender=male
router.get("/filter", (req, res) => {
  console.log(req.query);
  let filterGender = req.query.gender;
  let filterLetter = req.query.letter; // New filter for letter
  let matchingFriends = [...friends];

  if (filterGender) {
    matchingFriends = matchingFriends.filter(
      (friend) => friend.gender === filterGender
    );
  }

  if (filterLetter) {
    matchingFriends = matchingFriends.filter(
      (friend) => friend.name[0].toLowerCase() === filterLetter.toLowerCase()
    );
  }

  if (matchingFriends.length > 0) {
    res.status(200).json(matchingFriends);
  } else {
    res.status(404).json({ error: "No friends found matching the criteria." });
  }
});

// 2. Get information about this request from the headers
router.get("/info", (req, res) => {
  const headers = {
    "User-Agent": req.headers["user-agent"],
    "Content-Type": req.headers["content-type"],
    Accept: req.headers["accept"],
  };

  res.json(headers);
});

// 3. Dynamic request param endpoint - get the friend matching the specific ID ie. /friends/3
router.get("/:id", (req, res) => {
  let friendId = parseInt(req.params.id); // Ensure the ID is treated as a number
  let friend = friends.find((f) => f.id === friendId);

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({ error: "Friend not found" });
  }
});

// a POST request with data sent in the body of the request, representing a new friend to add to our list
router.post("/", (req, res) => {
  let newFriend = req.body;
  console.log(newFriend);

  if (!newFriend.name || !newFriend.gender) {
    res
      .status(500)
      .json({ error: "Friend object must contain a name and gender" });
    return;
  } else if (!newFriend.id) {
    newFriend.id = friends.length + 1; // generate an ID if one is not present
  }

  friends.push(newFriend);
  res.status(200).json(newFriend);
});

// 4. PUT route for updating an existing friend's data
router.put("/:id", (req, res) => {
  let friendId = parseInt(req.params.id);
  let updatedFriend = req.body;

  let friendIndex = friends.findIndex((f) => f.id === friendId);

  if (friendIndex === -1) {
    res.status(404).json({ error: "Friend not found" });
    return;
  }

  friends[friendIndex] = { ...friends[friendIndex], ...updatedFriend };

  res.status(200).json({
    result: "Updated friend with ID " + friendId,
    data: friends[friendIndex],
  });
});

// 5. DELETE route to remove a friend by ID
router.delete("/:id", (req, res) => {
  let friendId = parseInt(req.params.id);

  const friendIndex = friends.findIndex((f) => f.id === friendId);

  if (friendIndex === -1) {
    res.status(404).json({ error: "Friend not found" });
    return;
  }

  friends.splice(friendIndex, 1); // Remove the friend from the array

  res
    .status(200)
    .json({ result: `Friend with ID ${friendId} has been deleted` });
});

// ========================== MOVIE ROUTES ==========================

// 1. Get all movies
router.get("/movies", (req, res) => {
  res.json(movies);
});

// 2. Get a movie by ID
router.get("/movies/:id", (req, res) => {
  let movieId = parseInt(req.params.id);
  let movie = movies.find((m) => m.id === movieId);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

// 3. POST route to create a new movie
router.post("/movies", (req, res) => {
  let newMovie = req.body;
  console.log(newMovie);

  if (!newMovie.title || !newMovie.director || !newMovie.releaseYear) {
    res
      .status(500)
      .json({
        error: "Movie object must contain title, director, and release year",
      });
    return;
  } else if (!newMovie.id) {
    newMovie.id = movies.length + 1; // generate an ID if one is not present
  }

  movies.push(newMovie);
  res.status(200).json(newMovie);
});

// 4. PUT route to update a movie by ID
router.put("/movies/:id", (req, res) => {
  let movieId = parseInt(req.params.id);
  let updatedMovie = req.body;

  let movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex === -1) {
    res.status(404).json({ error: "Movie not found" });
    return;
  }

  movies[movieIndex] = { ...movies[movieIndex], ...updatedMovie };

  res.status(200).json({
    result: "Updated movie with ID " + movieId,
    data: movies[movieIndex],
  });
});

// 5. DELETE route to remove a movie by ID
router.delete("/movies/:id", (req, res) => {
  let movieId = parseInt(req.params.id);

  const movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex === -1) {
    res.status(404).json({ error: "Movie not found" });
    return;
  }

  movies.splice(movieIndex, 1); // Remove the movie from the array

  res.status(200).json({ result: `Movie with ID ${movieId} has been deleted` });
});

module.exports = router;
