import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from "./types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  // Get token from localStorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .get("/api/auth/user", config)
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const login = ({ username, password }) => () => {
  return (dispatch) => {
    console.log(username);
    // headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ username, password });
    // const body = JSON.stringify({
    //   email: "buildconnectcontact@gmail.com",
    //   password: "BuildConnect@2021",
    //   username: "buildconnectAdmin",
    // });

    if ({ username, password }) {
      axios
        .post("http://localhost:5000/api/auth/login", body, config)
        .then((res) =>
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
          })
        )
        .catch((err) => {
          dispatch(
            returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
          );
          // dispatch({
          //   type: LOGIN_FAIL,
          // });
        });
    }
  };
};
