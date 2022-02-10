import FetchConfig from "./service";
export const GetTokenQuery = () => {
  return FetchConfig({
    anonymous: true,
    query: `mutation authenticateWithRealm {
        authenticateWithRealm(
            input: {username: "test-oliver.william@express-scripts.com", passwords: "oliver123", realm:"Express_Scripts"}
          ) {
            clientMutationId
            string
          }
        }`,
  })
    .then((response) => {
      const getTokenResponse = JSON.parse(
        response.data.authenticateWithRealm.string
      );

      localStorage.setItem("access_token", getTokenResponse.access_token);
      localStorage.setItem("refresh_token", getTokenResponse.refresh_token);
      return getTokenResponse;
    })
    .catch((err) => err);
};

export const GetUserInfoQuery = () => {
  return FetchConfig({
    anonymous: false,
    query: `query MyQuery {
        getUserDetails(condition: {userName: "test-oliver.william@express-scripts.com"}) {
            nodes {
              openprojectUserId
              userName
              displayName
            }
          
        }
      }
      `,
  })
    .then((response) => {
      console.log("response", response);
      localStorage.setItem(
        "userInfo",
        response.data.getUserDetails.nodes[0].displayName
      );
      localStorage.setItem(
        "openprojectUserId",
        response.data.getUserDetails.nodes[0].openprojectUserId
      );
      const getUserInfo = response.data.getUserDetails.nodes[0];

      return getUserInfo;
    })
    .catch((err) => console.group("err", err));
};
