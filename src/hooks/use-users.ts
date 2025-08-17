import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/users";
import { User } from "@/models/users-model";

export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes - prevents unnecessary refetches
    retry: 1, // retry once if it fails
    
  });
}
