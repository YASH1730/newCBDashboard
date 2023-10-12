import axios from "axios";

// const localBaseUrl = "http://localhost:8000/api";
const official = "https://www.classbazaar.com/api";

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
  return await axios.post(`${official}/listTrackRecords`, data);
};
