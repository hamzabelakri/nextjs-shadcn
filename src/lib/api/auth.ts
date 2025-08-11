import axiosApi from "../axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export const LOGIN_ENDPOINT = `/login`;

export const login = async (login:LoginPayload): Promise<LoginResponse | undefined> => {
  //console.log("login:", login); 

  try {
    const response = await axiosApi.post(LOGIN_ENDPOINT, login);
    return response.data;
  } catch (error: any) {
    console.error("Login Failed:", error);

  }
};

