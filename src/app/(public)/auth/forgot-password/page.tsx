import type { Metadata } from "next";
import Image from "next/image";

import ForgotPasswordComponent from "@/components/auth/forgot-password";
import ThemeLogo from "@/components/shared/theme-logo";
import { ModeToggle } from "@/components/shared/mode-toggle";
import AuthImage from "@/public/assets/images/auth/forgot-pass-img.png";

export const metadata: Metadata = {
  title: "Forgot Password | OptiAdvance HR",
  description: "Recover your OptiAdvance HR account.",
};

export default function ForgotPasswordPage() {
  return (
    <section className="relative bg-white dark:bg-slate-900 flex flex-wrap min-h-screen">
      <div className="absolute top-6 right-6 z-10">
        <ModeToggle />
      </div>

      {/* Left Image */}
      <div className="lg:w-1/2 hidden lg:block">
        <div className="flex items-center justify-center h-screen flex-col">
          <Image
            src={AuthImage}
            alt="Auth Illustration"
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>

      {/* Right Form */}
      <div className="lg:w-1/2 w-full py-8 px-6 flex flex-col justify-center">
        <div className="lg:max-w-[464px] w-full mx-auto">
          <div>
            <div className="mb-2.5 inline-block max-w-[290px]">
              <ThemeLogo />
            </div>

            <h4 className="font-semibold mb-3">Forgot Password</h4>
            <p className="mb-8 text-neutral-500 dark:text-neutral-300 text-lg">
              Enter the email address associated with your account and we
              will send you a link to reset your password.
            </p>
          </div>

          <ForgotPasswordComponent />
        </div>
      </div>
    </section>
  );
}
