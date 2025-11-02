import axios from "axios";

const BaseUrl = "https://flybackend-misty-feather-6458.fly.dev/";

export const getHeader = async (token: string | null) => {
  const authToken = token || localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`
  };
};

export const getResponse = async (
  url: string,
  params: object,
  token = null
) => {
  const URL = BaseUrl + url;
  return new Promise(async (resolve, reject) => {
    axios(URL, {
      method: "GET",
      params: { ...params },
      headers: await getHeader(token)
    })
      .then((response) => {
        if (response.data.status === 403 && !response.data.success) {
          // window.location.href = "/logout";
          resolve(response);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message === "invalidToken") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
        if (error?.response?.status === 403 && !error.response.success) {
          // logout()
          // window.location.href = "/logout";
        }
        reject(error);
      });
  });
};

export const postResponse = async (
  url: string,
  payload: object,
  token = null
) => {
  const URL = BaseUrl + url;
  return new Promise(async (resolve, reject) => {
    axios(URL, {
      method: "POST",
      data: { ...payload },
      headers: await getHeader(token)
    })
      .then((response) => {
        if (response.data.status === 403 && !response.data.success) {
          // window.location.href = "/logout";
          resolve(response);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message === "invalidToken") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
        if (error?.response?.status === 403 && !error.response.success) {
          // logout()
          // window.location.href = "/logout";
        }
        reject(error);
      });
  });
};
