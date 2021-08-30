import axios from "axios";
import QueryString from "qs";
import { MILK_API_BASE_URL } from "./Constants";

export async function addMilkQuantity(milkQuantity) {
    try {
        console.log(milkQuantity);
        const response = await axios.post(MILK_API_BASE_URL, QueryString.stringify(milkQuantity),
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

export async function getAllMilkAmounts() {
    try{
        const response = await axios.get(MILK_API_BASE_URL);

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

export async function getFilteredProduction(filters) {
    try {
        const response = await axios.post(MILK_API_BASE_URL + "find", QueryString.stringify(filters),
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