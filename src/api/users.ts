import axiosApi from "@/lib/axios";
import { User } from "@/models/users-model";
import { toast } from "sonner";




const USER_ENDPOINT = `/admin/users`;


export const getUsers = async (): Promise<User[]> => {
  const response = await axiosApi.get(USER_ENDPOINT);
  console.log("fetching users response: ", response?.data)
  return response.data;
};