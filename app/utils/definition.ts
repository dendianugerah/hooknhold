export interface User {
  username: string;
  email: string;
  profile_image: string;
}

export interface Bookmark {
  title: string;
  url: string;
  description: string | null;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Tag {
  id: string;
  name: string;
  created_at: string;
}

export interface BookmarkTag {
  bookmark_id: string;
  tag_id: string;
}

export interface BookmarkData {
  id: string;
  user_id: string;
  folder_id: string | null;
  data: Bookmark;
  tags: Omit<Tag, "id" | "user_id">[];
}

export interface FolderData {
  id: string;
  name: string;
}
