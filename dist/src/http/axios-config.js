import axios from "axios";
const { BASE_URL, CLIENT_ID, GRANT_TYPE, CLIENT_SECRET } = process.env;
const API = () => {
    const token = "sample";
    const api = axios.create({
        baseURL: BASE_URL,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization: `Bearer ${token}`,
        },
        transformRequest: [
            (data) => {
                return JSON.stringify(data);
            },
        ],
        transformResponse: [
            (data) => {
                return JSON.parse(data);
            },
        ],
    });
    return api;
};
export default API;
