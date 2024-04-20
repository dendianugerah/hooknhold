import React from "react";

export default function BookmarkSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-white dark:bg-gray-800 rounded-md p-4 h-[230px] w-[410px]">
        <div className="grid gap-1 text-sm">
          <div className="font-semibold line-clamp-2 h-6 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="text-xs text-gray-500 dark:text-gray-400 h-6 bg-gray-200 dark:bg-gray-700 rounded-md mb-2"></div>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 h-6 bg-gray-200 dark:bg-gray-700 rounded-md mr-2"></span>
            <span className="text-xs text-gray-500 dark:text-gray-400 h-6 bg-gray-200 dark:bg-gray-700 rounded-md"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
