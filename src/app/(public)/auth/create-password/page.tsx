import type { Metadata } from "next";
import Image from "next/image";

import CreatePasswordComponent from "@/components/auth/create-password-component";
import ThemeLogo from "@/components/shared/theme-logo";
import { ModeToggle } from "@/components/shared/mode-toggle";
import AuthImage from "@/public/assets/images/auth/forgot-pass-img.png";

export const metadata: Metadata = {
  title: "Create Password | OptiAdvance HR",
  description: "Set a new password for your OptiAdvance HR account.",
};

export default function CreatePasswordPage() {
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

            <h4 className="font-semibold mb-3">Create New Password</h4>
            <p className="mb-8 text-neutral-500 dark:text-neutral-300 text-lg">
              Enter your password to unlock the screen!
            </p>
          </div>

          <CreatePasswordComponent />
        </div>
      </div>
    </section>
  );
}
