import { handleResponse, handleError } from "./apiUtils";
const publicUrl = "https://api.github.com";

export function getUsers() {
  const url = `${publicUrl}/users`;
  return fetch(url)
    .then(handleResponse)
    .catch(handleError);
}

export function getUser(userId) {
  const url = `${publicUrl}/users/${userId}`;
  return fetch(url)
    .then(handleResponse)
    .catch(handleError);
}
