"use client";

import { useState } from "react";
import Input from "@/components/shared/form/input";
import PasswordInput from "@/components/shared/form/password-input";
import Button from "@/components/shared/button";
import { useForm } from "react-hook-form";
import { useLoginMutation, LoginInputType } from "@/services/auth/use-login";

import { useModalAction } from "@/components/common/modal/modalContext";
import Switch from "@/components/shared/switch";
import { FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import cn from "classnames";
import { ROUTES } from "@/utils/routes";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
import Link from "@/components/shared/link";

interface LoginFormProps {
  isPopup?: boolean;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const { openModal } = useModalAction();
  const { mutate: login } = useLoginMutation();
  const [remember, setRemember] = useState(false);
  const { selectedColor } = usePanel();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  function onSubmit({ email, password, remember_me }: LoginInputType) {
    login({
      email,
      password,
      remember_me,
    });
  }
  function handelSocialLogin() {
    login({
      email: "demo@demo.com",
      password: "demo",
      remember_me: true,
    });
  }

  function handleForgetPassword() {
    return openModal("FORGET_PASSWORD");
  }
  return (
    <div className={cn("w-full md:w-[560px]  relative", className)}>
      <div className="flex mx-auto overflow-hidden rounded-lg bg-white">
        <div className="w-full py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-16 rounded-md flex flex-col justify-center">
          <div className="text-center mb-10 pt-2.5">
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pb-3 ">
              Log Into Your Account
            </h4>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              <Input
                label={"Email Address"}
                type="email"
                variant="solid"
                {...register("email", {
                  required: `${"Email Address (required)"}`,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please provide valid email address",
                  },
                })}
                error={errors.email?.message}
              />

              <PasswordInput
                label={"Password"}
                error={errors.password?.message}
                {...register("password", {
                  required: `You must need to provide your password`,
                })}
              />

              <div className="flex items-center justify-center py-2">
                <div className="flex items-center shrink-0">
                  <label className="relative inline-block cursor-pointer switch">
                    <Switch checked={remember} onChange={setRemember} />
                  </label>
                  <label
                    onClick={() => setRemember(!remember)}
                    className="mt-1 text-sm cursor-pointer shrink-0 text-heading ltr:pl-2.5 rtl:pr-2.5"
                  >
                    {"Remember me"}
                  </label>
                </div>
                <div className="flex ltr:ml-auto rtl:mr-auto mt-[3px]">
                  <button
                    type="button"
                    onClick={handleForgetPassword}
                    className={cn(
                      "text-sm ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3 hover:underline focus:outline-none focus:text-brand-dark",
                      colorMap[selectedColor].link,
                    )}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              <div className="relative">
                <Button
                  type="submit"
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  Log In
                </Button>
              </div>
            </div>
          </form>

          <div className="flex justify-center mt-10 space-x-2.5">
            <button
              className={cn(
                "flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one focus:outline-none",
                colorMap[selectedColor].hoverBorder,
              )}
              onClick={handelSocialLogin}
            >
              <FaFacebook
                className={cn(
                  "w-4 h-4 transition-all text-gray-500  ",
                  colorMap[selectedColor].groupHoverLink,
                )}
              />
            </button>
            <button
              className={cn(
                "flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one focus:outline-none",
                colorMap[selectedColor].hoverBorder,
              )}
              onClick={handelSocialLogin}
            >
              <FaTiktok
                className={cn(
                  "w-4 h-4 transition-all text-gray-500  ",
                  colorMap[selectedColor].groupHoverLink,
                )}
              />
            </button>
            <button
              className={cn(
                "flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one focus:outline-none",
                colorMap[selectedColor].hoverBorder,
              )}
              onClick={handelSocialLogin}
            >
              <FaXTwitter
                className={cn(
                  "w-4 h-4 transition-all text-gray-500  ",
                  colorMap[selectedColor].groupHoverLink,
                )}
              />
            </button>
            <button
              className={cn(
                "flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one focus:outline-none",
                colorMap[selectedColor].hoverBorder,
              )}
              onClick={handelSocialLogin}
            >
              <FaInstagram
                className={cn(
                  "w-4 h-4 transition-all text-gray-500  ",
                  colorMap[selectedColor].groupHoverLink,
                )}
              />
            </button>
          </div>

          <div className="mt-5 mb-3 text-sm text-center sm:text-15px text-body">
            Don’t have an account?
            <Link
              href={`${ROUTES.REGISTER}`}
              className={cn(
                " ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3   hover:underline",
                colorMap[selectedColor].link,
              )}
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
