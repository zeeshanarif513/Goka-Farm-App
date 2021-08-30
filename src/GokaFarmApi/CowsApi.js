import axios from "axios";
import QueryString from "qs";
import { COWS_API_BASE_URL } from './Constants';

export async function postCow(cow) {
    try {
        const response = await axios.post(COWS_API_BASE_URL, QueryString.stringify(cow),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        console.log("API response using axios");
        return response.data;
    } catch (err) {
        return false;
    }
}

export async function getAllCows() {
    try{
        const response = await axios.get(COWS_API_BASE_URL);

        if(response.data) {
            console.log("API response using axios");
            return response.data;
        }
        else {
            return "no data found."
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}