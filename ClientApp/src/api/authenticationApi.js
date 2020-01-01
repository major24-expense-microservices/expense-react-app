import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authentication";
// DIRECT REST API URL"https://localhost:44303/api/users";

export function authenticateUser(userCred) {
  //---------------------------------------------------------------------------------------------------
  // for ClientSide development, return fake promise. hard to simulate POST and return authentication response
  if (baseUrl.includes('http://localhost:3001')) {
    if (userCred.userId === 'user99') {
      return getMockAuthenticationResponse(false);
    }
    return getMockAuthenticationResponse(true);
  }
  //---------------------------------------------------------------------------------------------------
  
  // REAL Request
  return fetch(baseUrl, {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userCred)
  })
  .then(handleResponse)
  .catch(handleError);
}


// MOCK authentication to simulate in clientside development
function getMockAuthenticationResponse(flag){
  const mockResponse = {
    "entity": flag,
    "isSuccess": true,
    "error": null,
    "errors": []
  };
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(mockResponse);
    }, 1000);
  });
}
