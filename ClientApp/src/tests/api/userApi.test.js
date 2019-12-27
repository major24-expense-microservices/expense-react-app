import { getUser } from "../../api/userApi";
import fetchMock from 'fetch-mock';

describe('userApi', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('Returns user if matching user is found and the status is ok', async () => {
    // Arrange
    fetchMock.mock('*', {
      status: 200,
      body: {
        'userId': 'user1',
        'firstName': 'Major',
        'lastName': 'Nalliah'
      },
      headers: { 'content-type': 'application/json' }
    });
    const expected = { 'userId': 'user1', 'firstName': 'Major', 'lastName': 'Nalliah'};

    // Act
    const result = await getUser('user1');

    // Assert
    expect(result).toEqual(expected);
  });

  it('Returns error when user not found', async () => {
    fetchMock.mock("*", {
      body:
      {
        "error": "Not Found"
      },
      headers: { "content-type": "application/json" }
    });
    const expected = {
      "error": "Not Found"
    };

    const data = await getUser('user999');
    expect(data).toEqual(expected);
  });

  // it('Returns error on staus not ok', async () => {
  //   fetchMock.mock("*", {
  //     status: 404,
  //     body:
  //     {
  //       "error": "Not Found"
  //     },
  //     headers: { "content-type": "application/json" }
  //   });
  //   const expected = {Error: "Network response was not ok"};

  //   try {
  //     const data = await getUser('user999');
  //   }catch (error) {
  //     console.log('>>>>>');
  //     console.log(error);
  //     expect(error).toEqual(expected);
  //   }
  // });

});
