import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/users"; // API URL"https://localhost:44303/api/users"; //process.env.API_URL + "/courses/";

export function getUser(userId) {
  const url = `${baseUrl}/${userId}`;
  return fetch(url)
    .then(handleResponse)
    .catch(handleError);
}

export function saveUser(user) {
  return fetch(baseUrl, {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user)
  })
  .then(handleResponse)
  .catch(handleError);
}
