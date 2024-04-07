import NavbarSection from "@/components/container/homepage/navbar";
import { ChevronDownIcon } from "@/components/icon";

export default function About() {
  return (
    <section>
      <NavbarSection />
      <section className="w-full pt-12 border-t mb-36 ">
        <div className="container grid gap-10 px-4 md:px-6 lg:gap-16 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
                Hooknhold.
              </h1>
              <p className="max-w-[900px] text-gray-500 text-4xl tracking-tighter sm:text-5xl md:text-6xl dark:text-gray-400">
                Never lose track of your digital discoveries again.
              </p>
            </div>
          </div>
          <div className="w-full">
            <ChevronDownIcon className="h-12 w-12 text-black text-extrabold rounded-lg animate-bounce dark:text-gray-700" />
          </div>
          <div className="grid gap-10 md:gap-16 lg:grid-cols-2 xl:gap-20">
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  About Us <s>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</s>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Our Vision: Helping people curate their digital lives
                </h2>
                <p className="max-w-prose text-gray-500 md:text-base/relaxed lg:text-base/relaxed xl:text-base/relaxed dark:text-gray-400">
                  Providing them with a seamless experience to store, organize,
                  and access their bookmarks anytime, anywhere. Our ultimate
                  goal is to simplify the digital clutter and enhance
                  productivity, creativity, and learning for others.
                </p>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">What</h2>
                <p className="max-w-prose text-gray-500 md:text-base/relaxed lg:text-base/relaxed xl:text-base/relaxed dark:text-gray-400">
                  Hooknhold is solution for effortlessly organizing and
                  visualizing digital bookmarks. It&apos;s a user-friendly,
                  lightweight tool designed to make bookmark management a
                  breeze.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Why</h2>
                <p className="max-w-prose text-gray-500 md:text-base/relaxed lg:text-base/relaxed xl:text-base/relaxed dark:text-gray-400">
                  <b>To address a common struggle I faced as a learner</b>- the
                  need for an intuitive tool to organize and visualize my
                  digital bookmarks. I needed a solution that was user-friendly,
                  lightweight, and easily accessible.
                </p>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                You might notice the use of &ldquo;we/us&ldquo; throughout the site. While
                this is a personal project, I use &ldquo;we&ldquo; to give it a professional
                feel hahaha. Thanks for understanding!
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
