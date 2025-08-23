import { useUI } from "@/contexts/useUI";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

interface LogoutResponse {
  ok: boolean;
  message: string;
}

async function logout(): Promise<LogoutResponse> {
  return {
    ok: true,
    message: "Logout Successful!",
  };
}

export const useLogoutMutation = () => {
  const { unauthorize } = useUI(); // Ensure this function is defined in useUI
  const router = useRouter();

  return useMutation<LogoutResponse, Error>({
    mutationFn: logout,
    onSuccess: () => {
      Cookies.remove("auth_token");
      unauthorize();
      router.push(`/`);
    },
    onError: (error) => {
      console.error("Logout error response:", error.message);
    },
  });
};
