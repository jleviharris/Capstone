
import axios from "axios";

const baseUrl = "http://localhost:3007/api/users";

async function updateUser(userId, body) {
  let updateProperty = body.update.property
  let updateValue = body.update.value
  console.log(updateProperty)
    try {
      let response = await axios.put(`${baseUrl}/update`, {id: userId, body: {[updateProperty]: updateValue}});
      console.log(body)
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log("Error updating user: " + error);
    }
  }
  async function getUser(userId){
    try {
      let response = await axios.get(`${baseUrl}/${userId}`)
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log("Error getting user: " + error);
    }
  }

  const AxiosUsers = {getUser, updateUser}
  export default AxiosUsers;