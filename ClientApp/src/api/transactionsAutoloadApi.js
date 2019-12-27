import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/transactions/autoload";

export function transactionsAutoload(userId, numberOfTransactions) {
  const loadData = { userId: userId, numberOfTransactions: numberOfTransactions};
  return fetch(baseUrl, {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(loadData)
  })
  .then(handleResponse)
  .catch(handleError);
}
