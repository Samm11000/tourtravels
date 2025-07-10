// export const BASE_URL = "http://localhost:8000/api";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const CAR_API = `${BASE_URL}/cars`;
export const ENQUIRY_API = `${BASE_URL}/enquiry`;
