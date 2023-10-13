import axios from "axios";

// const URL = "http://localhost:8000/api";
const URL = "https://www.classbazaar.com/api";

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
