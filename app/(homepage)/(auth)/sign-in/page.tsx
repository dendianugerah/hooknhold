"use client";
import Link from "next/link";
import Image from "next/image";
import { Button, Input } from "@/components/ui";
import { Package2Icon } from "@/components/icon";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/mind");
  }
  return (
    <div className="bg-[#1E1E1E] min-h-screen text-white py-8">
      <div className="max-w-7xl mx-auto">
        <section className="text-center flex justify-center">
          <Link
            href="/"
            className="flex items-center hover:text-[#D8D8D8] transition-colors duration-200"
          >
            <Package2Icon className="h-6 w-6 mx-2" />
            <h1 className="text-xl font-extrabold">Hooknhold.</h1>
          </Link>
        </section>
        <section className="ring-[0.3px] ring-[#D8D8D8] rounded-3xl mx-6 my-12">
          <div className="w-full lg:grid lg:grid-cols-2 py-12">
            <div className="flex items-center justify-center py-12">
              <div className="mx-auto w-[350px] space-y-6">
                <div className="space-y-2 text-center pb-4">
                  <Button
                    className="ring-[0.2px] w-full bg-[#1E1E1E] ring-[#D8D8D8] rounded-lg"
                    onClick={() => {
                      signIn("github");
                    }}
                  >
                    <Image
                      src="/image/icon/github.png"
                      width={20}
                      height={20}
                      alt="google logo"
                      className="mr-4"
                    />
                    Sign in with Github
                  </Button>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-full border-t border-[#D8D8D8]"></div>
                    <div className="text-sm text-[#D8D8D8]">or</div>
                    <div className="w-full border-t border-[#D8D8D8]"></div>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="space-y-2 pb-2">
                    <Input
                      id="email"
                      placeholder="Enter your email address"
                      required
                      type="email"
                      className="ring-[0.2px] w-full bg-[#1E1E1E] ring-[#D8D8D8] rounded-lg h-[35px] border-none"
                    />
                    <Input
                      id="password"
                      required
                      type="password"
                      placeholder="Enter your passsword"
                      className="ring-[0.2px] w-full bg-[#1E1E1E] ring-[#D8D8D8] rounded-lg h-[35px] border-none"
                    />
                  </div>
                  <Button
                    className="ring-[0.2px] w-full bg-[#1E1E1E] ring-[#D8D8D8] rounded-lg"
                    type="submit"
                  >
                    Sign in
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?
                  <Link className="underline" href="#">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex my-12">
              <div className="mx-auto max-w-md space-y-4">
                <h1 className="text-2xl font-bold tracking-tight">
                  Welcome to Hooknhold
                </h1>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sit amet purus in odio varius tincidunt. In hac habitasse
                  platea dictumst. Cras nec libero in nisl aliquet vehicula.
                </p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                  atque illum, neque quisquam voluptates voluptatibus aperiam
                  aliquid necessitatibus assumenda maiores amet eligendi eius
                  provident explicabo optio ratione similique placeat vel.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
