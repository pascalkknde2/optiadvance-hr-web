"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import GithubIcon from "@/public/assets/images/icons/github-icon.png";
import GoogleIcon from "@/public/assets/images/icons/google-icon.png";

const SocialLogin = () => {
  const [loadingProvider, setLoadingProvider] = useState<null | "google" | "github">(null);

  // TODO(WEB-03): wire up real OAuth once the session/cookie strategy is decided.
  const handleClick = (provider: "google" | "github") => {
    setLoadingProvider(provider);

    setTimeout(() => {
      toast.error("Social sign-in isn't available yet.");
      setLoadingProvider(null);
    }, 600);
  };

  return (
    <div className="mt-8 flex items-center gap-3">
      <Button
        className="font-semibold text-neutral-600 hover:text-neutral-600 dark:text-neutral-200 py-6 px-2 w-1/2 border border-neutral-600/50 rounded-xl text-sm flex items-center justify-center gap-3 line-height-1 hover:border-blue-400 hover:bg-primary/10 disabled:opacity-80"
        variant="outline"
        type="button"
        onClick={() => handleClick("google")}
        disabled={loadingProvider !== null}
      >
        {loadingProvider === "google" ? (
          <>
            <Loader2 className="animate-spin h-4.5 w-4.5" />
            Loading...
          </>
        ) : (
          <>
            <Image src={GoogleIcon} alt="google" width={18} height={18} />
            Google
          </>
        )}
      </Button>

      <Button
        className="font-semibold text-neutral-600 hover:text-neutral-600 dark:text-neutral-200 py-6 px-2 w-1/2 border border-neutral-600/50 rounded-xl text-sm flex items-center justify-center gap-3 line-height-1 hover:border-slate-400 hover:bg-slate-600/10 disabled:opacity-80"
        variant="outline"
        type="button"
        onClick={() => handleClick("github")}
        disabled={loadingProvider !== null}
      >
        {loadingProvider === "github" ? (
          <>
            <Loader2 className="animate-spin h-4.5 w-4.5" />
            Loading...
          </>
        ) : (
          <>
            <Image src={GithubIcon} alt="github" width={18} height={18} />
            Github
          </>
        )}
      </Button>
    </div>
  );
};

export default SocialLogin;
