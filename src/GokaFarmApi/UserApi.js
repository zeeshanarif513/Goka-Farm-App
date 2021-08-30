import axios from "axios";
import QueryString from "qs";
import { USER_API_BASE_URL } from "./Constants";

export async function login(user) {
    try {
        const response = await axios.post(USER_API_BASE_URL + "user", QueryString.stringify(user),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        console.log("API response using axios");
        return response.data;
    } catch (err) {
        console.log(err);
        return false;
    }
}