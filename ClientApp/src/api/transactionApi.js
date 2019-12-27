import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL; // + "/transactions";

export function getTransations(userId) {
  const url = `${baseUrl}/users/${userId}/transactions`;
  return fetch(url)
    .then(handleResponse)
    .catch(handleError);
}
