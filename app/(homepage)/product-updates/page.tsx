import NavbarSection from "@/components/container/homepage/navbar";
import { CalendarIcon, BugIcon, FilePlusIcon } from "@/components/icon";

export default function ProductUpdates() {
  return (
    <section>
      <NavbarSection />
      <section className="w-full pt-12 border-t mb-36">
        <div className="grid items-center gap-6 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="space-y-2 lg:col-span-2">
            <div className="inline-block rounded-lg bg-[#131313] px-3 py-1 text-sm dark:bg-gray-800 text-white">
              What&apos;s Next
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Upcoming Features & Improvements
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Here&apos;s a sneak peek at what we&apos;re working on. Your
              feedback helps us prioritize features. Let us know what
              you&apos;re excited about!
            </p>
          </div>
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800 text-black font-medium">
              Q1 2024
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 w-10 h-10  dark:border-gray-800 dark:bg-gray-950">
                <CalendarIcon className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold tracking-tighter">
                  Build MVP
                </h3>
                <p className="text-sm text-gray-500">
                  Hard at work building our Minimum Viable Product.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 w-10 h-10 dark:border-gray-800 dark:bg-gray-950">
                <BugIcon className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold tracking-tighter">
                  Bug Fixes & Performance Improvements
                </h3>
                <p className="text-sm text-gray-500">
                  Our team is squashing bugs and optimizing performance.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 w-10 h-10 dark:border-gray-800 dark:bg-gray-950">
                <FilePlusIcon className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold tracking-tighter">
                  New Feature: Bookmark Folder Sharing
                </h3>
                <p className="text-sm text-gray-500">
                  Users will be able to share folder with others.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
