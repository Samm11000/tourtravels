// export const BASE_URL = "http://localhost:8000/api";
const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("CURRENT API =", BASE_URL);
console.log("NEW EC2 TEST");
export const CAR_API = `${BASE_URL}/cars`;
export const ENQUIRY_API = `${BASE_URL}/enquiry`;
