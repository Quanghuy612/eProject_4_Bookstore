import { useUI } from "@/contexts/useUI";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}

interface LoginResponse {
  token: string;
}

async function login(input: LoginInputType): Promise<LoginResponse> {
  return {
    token: `${input.email}.${input.remember_me}`.split("").reverse().join(""),
  };
}

export const useLoginMutation = () => {
  const { authorize } = useUI(); // Ensure useUI() returns an object with an authorize function

  return useMutation<LoginResponse, Error, LoginInputType>({
    mutationFn: login,
    onSuccess: (data) => {
      Cookies.set("auth_token", data.token);
      authorize();
    },
    onError: (error) => {
      console.error("Login error response:", error.message);
    },
  });
};
