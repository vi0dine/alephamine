import axios from "axios";
import { store } from "../store/store";
import { apiURL } from "./server";
import { loginSuccess } from "../store/User/User.actions";
import useAlert from "../shared/hooks/useAlert";

export const setupAxios = () => {
  axios.defaults.baseURL = apiURL();
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.interceptors.request.use(
    (config) => {
      // @ts-ignore
      const token = store.getState().UserState.accessToken;
      if (token != null) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error?.response?.status === 500) {
        useAlert("Wystąpił błąd serwera. Spróbuj później.");
      }

      if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const res = await axios.post("/oauth/token", {
          // @ts-ignore
          refresh_token: store.getState().UserState.refreshToken,
          grant_type: "refresh_token",
        });
        if (res.status === 201 || res.status === 200) {
          store.dispatch(loginSuccess(res.data));

          // @ts-ignore
          const token = store.getState().UserState.accessToken;
          if (token != null) {
            axios.defaults.headers.authorization = `Bearer ${token}`;
          }
          return axios(originalRequest);
        }
      }

      return Promise.reject(error);
    }
  );
};
