import axiosApi from "@/lib/axios";

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
export const LOGOUT_ENDPOINT = `/logout`;



export const login = async (loginData: LoginPayload): Promise<LoginResponse> => {
  const response = await axiosApi.post(LOGIN_ENDPOINT, loginData);
  return response.data;
};



export const logout = async (): Promise<void> => {
  await axiosApi.post(LOGOUT_ENDPOINT);
};
