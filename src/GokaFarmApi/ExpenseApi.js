import axios from "axios";
import QueryString from "qs";
import { EXPENSE_API_BASE_URL } from './Constants';

export async function postExpense(expense) {
    try {
        const response = await axios.post(EXPENSE_API_BASE_URL, QueryString.stringify(expense),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        console.log("API response using axios");
        return response.data;
    } catch (err) {
        console.log(err.message);
        return false;
    }
}

export async function getAllExpenses() {
    try{
        const response = await axios.get(EXPENSE_API_BASE_URL);

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

export async function getFilteredExpenses(filters) {
    try {
        const response = await axios.post(EXPENSE_API_BASE_URL + "find", QueryString.stringify(filters),
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