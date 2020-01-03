import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/users"; // API URL"https://localhost:44303/api/users";

export function getUser(userId) {
  const url = `${baseUrl}/${userId}`;
  return fetch(url)
    .then(handleResponse)
    .catch(handleError);
}

export function saveUser(user) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user)
  })
  .then(handleResponse)
  .catch(handleError);
}
