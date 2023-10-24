import axios from "axios";
import config from "../config.json"

const URL = config.Official_URL;
// const URL = config.Local_URL;

// export const getSearchRecords = async(data)=>{
//    return await axios.get(`${localBaseUrl}/login`,data)
//   }
// export const getSPathRecords = async(data)=>{
//    return await axios.get(`${localBaseUrl}/login`,data)
//   }
// export const getEnrollRecords = async(data)=>{
//    return await axios.get(`${localBaseUrl}/login`,data)
//   }
// export const getCardClickRecords = async(data)=>{
//    return await axios.get(`${localBaseUrl}/login`,data)
//   }
export const listTrackRecords = async (data) => {
  return await axios.post(`${URL}/listTrackRecords`, data);
};
export const metaCount = async (data) => {
  return await axios.get(`${URL}/metaCount`, data);
};
