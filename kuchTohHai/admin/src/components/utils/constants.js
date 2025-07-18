// export const BASE_URL = "http://localhost:8000/api";
// export const BASE_URL = "https://tourtravels-kp7z.onrender.com/api";
export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AUTH_API = `${BASE_URL}/admin`;
export const CAR_API = `${BASE_URL}/cars`;
export const ENQUIRY_API = `${BASE_URL}/enquiry`;
