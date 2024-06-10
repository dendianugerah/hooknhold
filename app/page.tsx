import Link from "next/link";
import Image from "next/image";
import {
  TagIcon,
  SearchIcon,
  FolderIcon,
  FolderSyncIcon,
} from "@/components/icon";
import NavbarSection from "@/components/container/homepage/navbar";
import {
  LinearGradient,
  BorderBeam,
  BentoCard,
  BentoGrid,
  Marquee,
} from "@/components/ui/magic";
import {
  Command,
  CommandList,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { FileTextIcon, InputIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const files = [
  {
    name: "Google",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "Spreadsheet",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "Image",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "Google Drive",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "Seed Phrase",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Never lose a link again.",
    description:
      "Of course, you can always rely on this to keep your bookmarks safe and secure.",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: InputIcon,
    name: "Easy to use.",
    description:
      "Designed to be intuitive and easy to use. Search your favorite links in seconds.",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Command className="absolute right-10 top-10 w-[70%] origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Hardvard Business Review</CommandItem>
            <CommandItem>Quora</CommandItem>
            <CommandItem>Medium</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    ),
  },
];

export default function Home() {
  return (
    <main className={`bg-[#F5F5F5]`}>
      <div className="flex flex-col">
        <section className="bg-white">
          <NavbarSection />
          <section className="w-full pt-12 md:pt-24 lg:pt-32 border-t pb-36 bg-[#1E1E1E]">
            <div className="container space-y-10 px-4 md:px-6 xl:space-y-16">
              <div className="max-w-7xl mx-auto gap-4 px-4 sm:px-6 md:px-10 md:gap-16">
                <div className="flex flex-col justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-[#131313] px-3 py-1 text-sm dark:bg-gray-800 text-white">
                      Introducing
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                      Hooknhold
                    </h2>
                    <p className="text-[#DEDEDE] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      The modern visual bookmark manager for the web. Save,
                      organize, and share your favorite links with ease.
                    </p>
                  </div>
                </div>
                <div className="relative mt-16">
                  <div className="relative overflow-hidden rounded-lg shadow-md">
                    <Image
                      alt="Image"
                      className="object-cover object-center"
                      height={500}
                      src="/image/hero.png"
                      width={1200}
                      quality={100}
                      unoptimized
                    />
                    <BorderBeam />

                    <LinearGradient from="transparent" to="#1E1E1E" />
                    <LinearGradient from="transparent" to="#1E1E1E" />

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        <main className="max-w-7xl mx-auto">
          <section className="mt-36">
            <div>
              <h2 className="text-5xl font-medium">
                Designed for your web journey.
              </h2>
            </div>
            <div className="flex gap-6 py-8">
              <BentoGrid>
                {features.map((feature, idx) => (
                  <BentoCard key={idx} {...feature} />
                ))}
              </BentoGrid>
            </div>
          </section>

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
                <div className="relative grid gap-4 border-t pt-4">
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
              <h2 className="text-3xl font-bold md:text-4xl">
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
