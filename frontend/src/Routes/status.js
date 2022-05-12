import axios from "axios";
const baseUrl = "http://localhost:3007/api";

// Change status to online
async function online(userId) {
    try {
      let response = await axios.put(`${baseUrl}/status/online/626eeac409e264359b2611f4`, {userId: userId});
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log("Error changing to online status: " + error);
    }
  }

// Change status to offline
async function offline(userId) {
    try {
      let response = await axios.put(`${baseUrl}/status/offline/626eeac409e264359b2611f4`, {userId: userId});
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log("Error changing to offline status: " + error);
    }
  }

async function onlineUser(){
  try {
    let response = await axios.get(`${baseUrl}/status`)
    if (response){
      console.log(response.data[0].online)
      return response.data[0].online
    }
  } catch (error) {
    console.log("Error getting list of online users: " + error);
  }
}  

const AxiosOnlineStatus = {offline, online, onlineUser}
export default AxiosOnlineStatus;