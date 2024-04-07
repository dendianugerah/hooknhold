export interface User {
  id: string;
  username: string;
  email: string;
  profile_image: string;
  password: string;
  created_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  folder_id: string;
  title: string;
  url: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Folder {
  id: string;
  user_id: string;
  name: string;
  is_public: string;
  readonly: string;
  shared_with: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Tag {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
}

export interface BookmarkTag {
  bookmark_id: string;
  tag_id: string;
}
