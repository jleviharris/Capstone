import axios from "axios";

const baseUrl = "http://localhost:3007/api/users";

async function updateUser(userId, body) {
  let updateProperty = body.update.property;
  let updateValue = body.update.value;
  console.log(updateProperty);
  try {
    let response = await axios.put(`${baseUrl}/update`, {
      id: userId,
      body: { [updateProperty]: updateValue },
    });
    console.log(body);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error updating user: " + error);
  }
}
async function getUser(userId) {
  try {
    let response = await axios.get(`${baseUrl}/${userId}`);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error getting user: " + error);
  }
}
async function getAllUsers() {
  try {
    let response = await axios.get(`${baseUrl}/`);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error getting user: " + error);
  }
}
async function getAllFriends(userId) {
  try {
    let response = await axios.get(`${baseUrl}/currentFriends/${userId}`);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error getting user: " + error);
  }
}
async function getAllFriendRequests(userId) {
  try {
    let response = await axios.get(`${baseUrl}/friendRequests/${userId}`);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error getting user: " + error);
  }
}
async function getAllSentFriendRequests(userId) {
  try {
    let response = await axios.get(`${baseUrl}/sentFriendRequests/${userId}`);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error getting user: " + error);
  }
}
async function updateUsersFriendRequests(userId, obj) {
  try {
    let response = await axios.put(
      "http://localhost:3007/api/users/friendRequests/" + userId,
      obj
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error adding friend: " + error);
  }
}
async function addToPendingFriends(userId, obj) {
  try {
    let response = await axios.put(
      "http://localhost:3007/api/users/addToPendingFriends/" + userId,
      obj
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error adding friend: " + error);
  }
}
async function removeFromFriendRequests(userId, obj) {
  try {
    let response = await axios.put(
      "http://localhost:3007/api/users/removeFromFriendRequests/" + userId,
      obj
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error removing friend: " + error);
  }
}
async function removeFromPendingFriends(userId, obj) {
  try {
    let response = await axios.put(
      "http://localhost:3007/api/users/removeFromPendingFriends/" + userId,
      obj
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error removing friend: " + error);
  }
}
async function removeFriend(userId, obj) {
  try {
    let response = await axios.put(
      "http://localhost:3007/api/users/removeFriend/" + userId,
      obj
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error removing friend: " + error);
  }
}
async function acceptFriendRequests(userId, obj) {
  try {
    let response = await axios.put(
      "http://localhost:3007/api/users/acceptFriendRequests/" + userId,
      obj
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error adding friend: " + error);
  }
}

const AxiosUsers = {
  getUser,
  updateUser,
  getAllUsers,
  getAllFriends,
  getAllFriendRequests,
  getAllSentFriendRequests,
  updateUsersFriendRequests,
  acceptFriendRequests,
  addToPendingFriends,
  removeFromFriendRequests,
  removeFromPendingFriends,
  removeFriend,
};
export default AxiosUsers;
