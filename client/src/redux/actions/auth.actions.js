import { SERVER_URL } from "../../config";
export const FETCH_USER_INFORMATION_BEGIN = "FETCH_USER_INFORMATION_BEGIN";
export const FETCH_USER_INFORMATION_SUCCESS = "FETCH_USER_INFORMATION_SUCCESS";
export const FETCH_USER_INFORMATION_FAILURE = "FETCH_USER_INFORMATION_FAILURE";
export const END_USER_SESSION = "END_USER_SESSION";

const fetchUserInfoBegin = () => ({
  type: FETCH_USER_INFORMATION_BEGIN,
});

const fetchUserInfoSuccess = (userInfo) => ({
  type: FETCH_USER_INFORMATION_SUCCESS,
  payload: { userInfo },
});

const fetchUserInfoFailure = (err) => ({
  type: FETCH_USER_INFORMATION_FAILURE,
  payload: { error: err.message },
});

const endUserSession = () => ({
  type: END_USER_SESSION,
});

export const auth = (credentials, signInOrUp) => {
  return async (dispatch) => {
    dispatch(fetchUserInfoBegin());
    try {
      const result = await fetch(`${SERVER_URL}/api/auth/${signInOrUp}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...credentials,
        }),
      });
      const userInfo = await result.json();
      console.log(userInfo);
      dispatch(fetchUserInfoSuccess(userInfo));

      localStorage.token = userInfo.accessToken;
      localStorage.userId = userInfo.id;
    } catch (err) {
      dispatch(fetchUserInfoFailure(err));
    }
  };

  // return (dispatch) => {
  //   dispatch(fetchUserInfoBegin());
  //   return fetch(`${SERVER_URL}/api/auth/${signInOrUp}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       ...credentials,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((userInfo) => {
  //       console.log(userInfo);
  //       dispatch(fetchUserInfoSuccess(userInfo));
  //       localStorage.token = userInfo.accessToken;
  //       localStorage.userId = userInfo.id;
  //       return userInfo;
  //     })
  //     .catch((err) => {
  //       dispatch(fetchUserInfoFailure(err));
  //     });
  // };
};

export const loginWithToken = (token) => {
  return (dispatch) => {
    dispatch(fetchUserInfoBegin());
    return fetch(`${SERVER_URL}/api/auth/loginWithToken`, {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((userInfo) => {
        dispatch(fetchUserInfoSuccess(userInfo));
        localStorage.token = userInfo.accessToken;
        localStorage.userId = userInfo.id;
        return userInfo;
      })
      .catch((err) => {
        dispatch(fetchUserInfoFailure(err));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(endUserSession());
    localStorage.clear();
  };
};
