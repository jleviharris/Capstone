import axios from "axios";
const baseUrl = "http://localhost:3007/api/friends";
// ADD METHODS
// POST a Friend Current
async function addFriend(friendId) {
  try {
    let response = await axios.post(`${baseUrl}/add/current`, friendId);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error adding friend: " + error);
  }
}
// POST a Friend Pending
async function addPendingFriend(friendId) {
  try {
    let response = await axios.post(`${baseUrl}/add/pending`, friendId);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error adding friend to pending list: " + error);
  }
}
// POST a Friend Request
async function addFriendRequest(friendId) {
  try {
    let response = await axios.post(`${baseUrl}/add/requests`, friendId);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error adding friend request: " + error);
  }
}

// GET Methods
// Get all current friends
async function getAllFriends(userId) {
  try {
    let response = await axios.get(`${baseUrl}/current`, {'_id': userId});
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error finding friends: " + error);
  }
}

// Get all pending friends
async function getAllPendingFriends(userId) {
  try {
    let response = await axios.get(`${baseUrl}/pending`, {'_id': userId});
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error finding pending friends: " + error);
  }
}

// Get all friend requests
async function getAllFriendRequests(userId) {
  try {
    let response = await axios.get(`${baseUrl}/requests`, {'_id': userId});
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error finding friend requests: " + error);
  }
}

// REMOVE methods
// Remove a friend
async function removeFriend(friendId) {
  try {
    let response = await axios.put(`${baseUrl}/remove/current`, friendId);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error removing friend: " + error);
  }
}
// Remove a pending friend
async function removePendingFriend(friendId) {
  try {
    let response = await axios.put(`${baseUrl}/remove/pending`, friendId);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error removing pending friend: " + error);
  }
}
// Remove a friend request
async function removeFriendRequest(friendId) {
  try {
    let response = await axios.put(`${baseUrl}/remove/requests`, friendId);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error removing friend request: " + error);
  }
}
const AxiosFriends = {
  addFriend,
  addFriendRequest,
  addPendingFriend,
  getAllFriends,
  getAllFriendRequests,
  getAllPendingFriends,
  removeFriend,
  removeFriendRequest,
  removePendingFriend,
};

export default AxiosFriends;