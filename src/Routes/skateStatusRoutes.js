import axios from "axios";

async function updateSkateStatus(userId, obj) {
  try {
    let response = await axios.put(
      "http://localhost:3007/api/users/skateStatus/" + userId,
      obj
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error getting status: " + error);
  }
}
async function updateCurrentPark(userId, obj) {
  try {
    let response = await axios.put(
      "http://localhost:3007/api/users/currentPark/" + userId,
      obj
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error adding friend: " + error);
  }
}

const AxiosSkateStatus = {
  updateSkateStatus,
  updateCurrentPark,
};
export default AxiosSkateStatus;
