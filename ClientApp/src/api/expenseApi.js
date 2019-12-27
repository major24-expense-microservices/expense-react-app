import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/expenses"; // Call BackendForFrontEnd

export function saveExpense(expense) {
  return fetch(baseUrl, {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(expense)
  })
  .then(handleResponse)
  .catch(handleError);
}
