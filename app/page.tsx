import Link from "next/link";
import {
  TagIcon,
  SearchIcon,
  FolderIcon,
  FolderSyncIcon,
} from "@/components/icon";
import NavbarSection from "@/components/container/homepage/navbar";

export default async function Home() {
  return (
    <main className={`bg-[#F5F5F5]`}>
      <div className="flex flex-col">
        <section className="bg-white">
          <NavbarSection />
          <section className="w-full pt-12 md:pt-24 lg:pt-32 border-t mb-36">
            <div className="container space-y-10 px-4 md:px-6 xl:space-y-16">
              <div className="grid max-w-7xl mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-[#131313] px-3 py-1 text-sm dark:bg-gray-800 text-white">
                      Introducing
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      Hooknhold
                    </h2>
                    <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      The modern visual bookmark manager for the web. Save,
                      organize, and share your favorite links with ease.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link
                      className="inline-flex h-10 items-center justify-center rounded-xl bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                      href="/mind"
                    >
                      Get Started
                    </Link>
                    <Link
                      className="inline-flex h-10 items-center justify-center rounded-xl border bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                      href="#"
                    >
                      Contact Sales
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    alt="Image"
                    className="aspect-video overflow-hidden rounded-xl object-cover object-center border"
                    height="310"
                    src="/placeholder.svg"
                    width="550"
                  />
                </div>
              </div>
            </div>
          </section>
        </section>
        <main className="max-w-7xl mx-auto">
          <section
            className="w-full py-12 md:py-24 lg:py-32 bg-[#1F1F1F] rounded-3xl mt-36"
            id="feature"
          >
            <div className="container px-4 md:px-6">
              <div className="grid max-w-3xl mx-auto items-center gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12">
                <div className="space-y-4">
                  <div className="inline-block rounded-lg bg-[#262626] ring-1 ring-[#D8D8D8] px-3 py-1 text-sm dark:bg-gray-800 text-[#D8D8D8]">
                    Features
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl text-white">
                    Your bookmarks. Your way.
                  </h2>
                  <p className="text-[#DEDEDE] dark:text-gray-400">
                    Hooknhold is designed to be the perfect companion for your
                    web journey.
                  </p>
                </div>
                <div className="grid gap-4 border-t pt-4">
                  <div className="grid gap-1">
                    <span className="flex items-center gap-2">
                      <FolderIcon className="h-10 w-10 rounded-lg p-2 bg-gray-100 dark:bg-gray-800" />
                      <h3 className="text-xl font-bold text-white">
                        Organize Folders
                      </h3>
                    </span>
                    <p className="text-[#DEDEDE] dark:text-gray-400">
                      Organize bookmarks into folders that make sense to you.
                    </p>
                  </div>
                  <div className="grid gap-1">
                    <span className="flex items-center gap-2">
                      <TagIcon className="h-10 w-10 rounded-lg p-2 bg-gray-100 dark:bg-gray-800" />
                      <h3 className="text-xl font-bold text-white">Tags</h3>
                    </span>
                    <p className="text-[#DEDEDE] dark:text-gray-400">
                      Add tags to for easy categorization and quick access.
                    </p>
                  </div>
                  <div className="grid gap-1">
                    <span className="flex items-center gap-2">
                      <SearchIcon className="h-10 w-10 rounded-lg p-2 bg-gray-100 dark:bg-gray-800" />
                      <h3 className="text-xl font-bold text-white">Search</h3>
                    </span>
                    <p className="text-[#DEDEDE] dark:text-gray-400">
                      Easily find the page you&apos;re looking for.
                    </p>
                  </div>
                  <div className="grid gap-1">
                    <span className="flex items-center gap-2">
                      <FolderSyncIcon className="h-10 w-10 rounded-lg p-2 bg-gray-100 dark:bg-gray-800" />
                      <h3 className="text-xl font-bold text-white">
                        Cross-Device Sync
                      </h3>
                    </span>
                    <p className="text-[#DEDEDE] dark:text-gray-400">
                      Access your bookmarks anywhere, anytime.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-36">
            <div>
              <h2 className="text-5xl font-medium">
                Designed for your web journey.
              </h2>
            </div>
            <div className="flex gap-6 py-8">
              <div className="gap-2 bg-white py-8 rounded-3xl px-8 shadow-md pr-64">
                <h3 className="font-medium">Easy to use.</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Designed to be intuitive and easy to use. Save your favorite
                  links in seconds.
                </p>
              </div>
              <div className="gap-2 bg-white py-8 rounded-3xl px-8">
                <h3 className="font-medium">Never lose a link again.</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Of course, you can always rely on this to keep your bookmarks
                  safe and secure.
                </p>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 border-t">
            <div className="container px-4 md:px-6">
              <div className="grid max-w-5xl mx-auto items-center gap-6 lg:grid-cols-[2fr_1fr] lg:gap-12">
                <div className="space-y-4 align-top">
                  <div className="inline-block rounded-lg bg-[#131313] px-3 py-1 text-sm dark:bg-gray-800 text-white">
                    Testimonials
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl">
                    Loved by users
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    But don&apos;t just take our word for it. Here&apos;s what
                    our users have to say about Hooknhold.
                  </p>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-2 bg-white py-8 rounded-3xl px-8">
                    <div className=" py-1 text-sm dark:bg-gray-800">
                      @username
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Hooknhold has completely changed the way I save and
                      organize my links. It&apos;s so intuitive and easy to use.
                      Highly recommended!
                    </p>
                  </div>
                  <div className="grid gap-2 bg-white py-8 rounded-3xl px-8">
                    <div className="py-1 text-sm dark:bg-gray-800">
                      @webfanatic
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      I&apos;ve tried a lot of bookmark managers, but Hooknhold
                      is the best. I love the clean interface and the ability to
                      access my bookmarks from any device.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-[#1E1E1E] text-white">
          <div className="container grid gap-4 px-4 md:px-6 bg-[#262626] max-w-7xl mx-auto rounded-3xl py-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight ">
                Have a Brilliant Idea for a Feature?
              </h2>
              <p className="max-w-[600px] text-[#DEDEDE] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Your input fuels our innovation. Share your feature request or
                suggestion with us, and let&apos;s shape the future together.
              </p>
            </div>
          </div>
        </section>

        <footer className="gap-2 py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
          <span className="max-w-7xl mx-auto flex flex-row">
            <p className="text-xs text-gray-500 dark:text-gray-400 ">
              © 2024 Hooknhold. All rights reserved.
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                Privacy
              </Link>
            </nav>
          </span>
        </footer>
      </div>
    </main>
  );
}
