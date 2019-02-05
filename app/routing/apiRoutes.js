// LOAD DATA
// Links routes to data source

const friends = require("../data/friends");

// ROUTING

module.exports = function (app) {
  // API GET Requests
  // Handle user visit to page

  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  
  // API POST Requests
  // Capture form data and submit to the server.

  // Add new friend entry
	app.post('/api/friends', function(req, res) {
		// Capture the newFriend object
		var newFriend = req.body;
		console.log('newFriend = ' + JSON.stringify(newFriend));

		var newFriendResponses = newFriend.scores;
		console.log('newFriendResponses = ' + newFriendResponses);

		// Compute best match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000; // Make the initial value large for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
			console.log('friend = ' + JSON.stringify(friends[i]));

			// Compute differences for each question
			var diff = 0;
			for (var j = 0; j < newFriendResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - newFriendResponses[j]);
			}
			console.log('diff = ' + diff);

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
			console.log('Closest match found = ' + diff);
			console.log('Friend name = ' + friends[i].name);
			console.log('Friend image = ' + friends[i].photo);

				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		// Add new user
		friends.push(newFriend);

		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
  });
  

  



  // ---------------------------------------------------------------------------
  // Below code is to clear table, for functionality testing

  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    friends = [];

    res.json({ ok: true });
  });
};
