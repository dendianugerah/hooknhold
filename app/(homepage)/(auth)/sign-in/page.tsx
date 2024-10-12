"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";
import { signIn } from "next-auth/react";
import { Package2 } from "lucide-react";

export default function SignIn() {
  return (
    <div className="bg-white min-h-screen text-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <section className="text-center flex justify-center">
          <Link
            href="/"
            className="flex items-center hover:text-gray-600 transition-colors duration-200"
          >
            <Package2 className="h-6 w-6 mx-2" />
            <h1 className="text-xl font-extrabold">Hooknhold.</h1>
          </Link>
        </section>
        <section className="border border-gray-200 rounded-3xl mx-auto my-12 max-w-5xl">
          <div className="w-full lg:grid lg:grid-cols-2 py-12">
            <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
              <div className="w-full max-w-[350px] space-y-6">
                <div className="space-y-2 text-center pb-4">
                  <h2 className="text-2xl font-bold mb-6">Sign in to Hooknhold</h2>
                  <Button
                    className="w-full bg-white text-black border border-gray-300 rounded-lg py-3 transition-colors duration-200 hover:bg-gray-50"
                    onClick={() => signIn("github")}
                  >
                    <Image
                      src="/image/icon/github.png"
                      width={24}
                      height={24}
                      alt="GitHub logo"
                      className="mr-4"
                    />
                    Sign in with GitHub
                  </Button>
                </div>
                {/* <p className="text-sm text-center text-gray-600 mt-6">
                  By signing in, you agree to our{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p> */}
              </div>
            </div>
            <div className="flex items-center py-8 px-4 sm:px-6 lg:px-8">
              <div className="w-full max-w-md space-y-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Welcome to Hooknhold
                </h1>
                <p className="text-sm text-gray-700">
                  Hooknhold is your ultimate bookmark management tool. Organize, 
                  discover, and share your favorite web content effortlessly.
                </p>
                <p className="text-sm text-gray-700">
                  With Hooknhold, you can easily save and categorize your bookmarks, 
                  access them from any device, and collaborate with others. 
                  Start streamlining your online experience today!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
