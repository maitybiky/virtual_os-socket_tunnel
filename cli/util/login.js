import axios from "axios";

export const logIn = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${process.env.API_SERVER_HOST}/api/auth/log-in`,
      {
        email,
        password,
      },
      {
        headers: {
          "User-Agent": "cli",
          "X-Requested-By": "cli",
        },
      }
    );

    return response.data.socketToken;
  } catch (error) {
    console.log(
      "Log in failed :",
      error?.response?.data?.error ?? error.message
    );
  }
};
