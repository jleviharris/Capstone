import axios from "axios";

async function getAllSpots() {
  try {
    let response = await axios.get("http://localhost:3007/api/spots/");
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error getting spots: " + error);
  }
}



async function getASpot(spotId) {
  try {
    let response = await axios.get("http://localhost:3007/api/spots/" + spotId);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error getting spot: " + error);
  }
}


async function updateSpots(obj) {
  try {
    let response = await axios.post("http://localhost:3007/api/spots/", obj);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error adding spot: " + error);
  }
}
async function updateSpotsLikes(spotId, obj) {
  try {
    let response = await axios.put(
      "http://localhost:3007/api/spots/like/" + spotId,
      obj
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error adding like: " + error);
  }
}
async function updateSpotsLikesRemove(spotId, obj) {
  try {
    let response = await axios.put(
      "http://localhost:3007/api/spots/like/remove/" + spotId,
      obj
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error adding like: " + error);
  }
}
async function updateSpotsDislikes(spotId, obj) {
  try {
    let response = await axios.put(
      "http://localhost:3007/api/spots/dislike/" + spotId,
      obj
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error adding dislike: " + error);
  }
}
async function updateSpotsDislikesRemove(spotId, obj) {
  try {
    let response = await axios.put(
      "http://localhost:3007/api/spots/dislike/remove/" + spotId,
      obj
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error adding dislike: " + error);
  }
}
async function updateASpot(spotId, obj) {
  try {
    let response = await axios.put(
      "http://localhost:3007/api/spots/" + spotId,
      obj
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error adding post: " + error);
  }
}

async function deleteSpot(spotId) {
  try {
    let response = await axios.delete(
      "http://localhost:3007/api/spots/" + spotId
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error deleting spot: " + error);
  }
}

const AxiosSpots = {
  getAllSpots,
  deleteSpot,
  updateSpots,
  getASpot,
  updateASpot,
  updateSpotsLikes,
  updateSpotsDislikes,
  updateSpotsLikesRemove,
  updateSpotsDislikesRemove,
 
};
export default AxiosSpots;