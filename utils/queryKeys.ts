export const queryKeys = {
  tags: (userId: string) => ['tags', userId],
  folders: (userId: string) => ['folders', userId],
  bookmarks: (userId: string) => ['bookmarks', userId],
};