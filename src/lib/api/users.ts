import axiosApi from "../axios";

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Record<string, string>; // Changed to string for granular format
  is_active: boolean;
  user_count: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone_number?: string;
  status: string;
  role_id: number;
  role: Role;
  created_at: string;
  updated_at: string;
}

const USER_ENDPOINT = `/users`;

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosApi.get(USER_ENDPOINT);
  return response.data;
};