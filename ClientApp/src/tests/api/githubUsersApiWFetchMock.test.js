import { getUsers, getUser } from "../../api/githubUsersApi";
import fetchMock from 'fetch-mock';


describe("githubUsersApi", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("Returns users if status is ok", async () => {
    // Arrange
    fetchMock.mock("*", {
      body: [
        {id: 24, login: 'mn24', url: 'http://github.com/users/mn24'},
        {id: 33, login: 'xs33', url: 'http://github.com/users/xs33'}
      ],
      headers: { "content-type": "application/json" }
    });
    const expected = {id: 24, login: 'mn24', url: 'http://github.com/users/mn24'};

    const data = await getUsers();
    expect(data[0]).toEqual(expected);
  });

  it('Returns a single user based on the id', async () => {
    fetchMock.mock("*", {
      body:
        {id: 24, login: 'mn24', url: 'http://github.com/users/mn24'},
      headers: { "content-type": "application/json" }
    });
    const expected = {id: 24, login: 'mn24', url: 'http://github.com/users/mn24'};

    const data = await getUser(24);
    expect(data).toEqual(expected);
  });

  it('Returns error when user not found', async () => {
    fetchMock.mock("*", {
      body:
      {
        "message": "Not Found",
        "documentation_url": "https://developer.github.com/v3/users/#get-a-single-user"
      },
      headers: { "content-type": "application/json" }
    });
    const expected = {
      "message": "Not Found",
      "documentation_url": "https://developer.github.com/v3/users/#get-a-single-user"
    };

    const data = await getUser(-10);
    expect(data).toEqual(expected);
  });

});
