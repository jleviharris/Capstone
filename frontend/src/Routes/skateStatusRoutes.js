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

const AxiosSkateStatus = {
  updateSkateStatus,
};
export default AxiosSkateStatus;
