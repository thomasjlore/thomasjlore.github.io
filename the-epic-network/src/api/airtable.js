// src/api/airtable.js
import axios from 'axios';

const BASE_ID = 'appLeIwOqjOgWfv1m';
const API_KEY = 'patd4be9mcFIwTRFZ.c5fc8501b9efc4d7c87852dcef050e76000e9a11e6932629b82ff05c45473801';
const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/`;

const axiosInstance = axios.create({
    baseURL: AIRTABLE_URL,
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
    },
});

export const fetchEntrepreneurs = async () => {
    const response = await axiosInstance.get('Entrepreneurs');
    return response.data.records;
};

export const sendMessage = async (messageData) => {
    const response = await axiosInstance.post('Messages', { fields: messageData });
    return response.data;
};
