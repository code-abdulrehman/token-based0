import axios from "axios";
import { base_url } from "../constant";

export const apiWithoutToken = axios.create({
    baseURL: base_url,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    },
    withCredentials: true, // Ensure credentials are sent if needed
});