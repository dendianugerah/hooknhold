"use server";
import db, { user } from "@/lib/database";
import { sql } from "drizzle-orm";
import { User } from "@/app/utils/definition";
import { v4 as uuid } from "uuid";
import { BookmarkData } from "@/app/utils/definition";

const API_BASE_URL = process.env.API_BASE_URL;

export async function checkIfuserExist(email: string): Promise<boolean> {
  try {
    const userExists = await db.execute(sql`
        SELECT * FROM public.user WHERE email = ${email};
      `);

    return userExists.length > 0;
  } catch (error) {
    return false;
  }
}

export async function getUserId(email: string): Promise<string> {
  try {
    const user = await db.execute(sql`
        SELECT id FROM public.user WHERE email = ${email};
      `);

    return user[0].id as string;
  } catch (error) {
    throw new Error("Error while fetching user");
  }
}

export async function createNewUser(newUser: User): Promise<void> {
  try {
    const userId = uuid();

    await db.insert(user).values({
      id: userId,
      username: newUser.username,
      email: newUser.email,
      profile_image: newUser.profile_image,
    });
  } catch (error) {
    throw new Error("Error while creating user");
  }
}

export async function getBookmark(
  userId: string,
  folderId?: string,
  query?: string
): Promise<BookmarkData[]> {
  try {
    let url = `${API_BASE_URL}/${userId}/bookmark`;

    if (folderId) {
      url += `?folderId=${folderId}`;
    }

    if (query) {
      url += `?query=${query}`;
    }

    const response = await fetch(url, {
      method: "GET",
    });

    const item = await response.json();

    return item.data as BookmarkData[];
  } catch (error) {
    throw error;
  }
}

export async function addBookmark(
  userId: string,
  url: string,
  tags?: string[],
  folderId?: string
): Promise<any> {
  try {
    const body: any = {
      url: url,
    };

    if (tags && tags.length > 0) {
      body.tags = tags;
    }

    if (folderId) {
      body.folder_id = folderId;
    }

    const response = await fetch(`${API_BASE_URL}/${userId}/bookmark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function addFolder(userId: string, name: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/folder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error("An error occurred while creating folder");
    }

    return response.json();
  } catch (error) {
    console.error(`Error creating folder: ${(error as Error).message}`);
    throw error;
  }
}

export async function createTagInBookmark(
  userId: string,
  bookmarkId: string,
  tagIds: string | string[]
) {
  try {
    const body = {
      tag_id: Array.isArray(tagIds) ? tagIds : [tagIds],
    };

    const response = await fetch(
      `${API_BASE_URL}/${userId}/bookmark/${bookmarkId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error("An error occurred while creating tag");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function getFolder(userId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/folder`, {
      method: "GET",
    });

    const item = await response.json();

    return item.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteFolder(userId: string, id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/folder?id=${id}`, {
      method: "DELETE",
    });

    const item = await response.json();

    return item.data;
  } catch (error) {
    throw error;
  }
}

export async function editFolder(userId: string, id: string, name: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/folder?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const item = await response.json();

    return item.data;
  } catch (error) {
    throw error;
  }
}

export async function editTag(userId: string, id: string, name: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/tag/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const item = await response.json();

    return item.data;
  } catch (error) {
    throw error;
  }
}

export async function getTag(userId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/tag`, {
      method: "GET",
    });

    const item = await response.json();

    return item.data;
  } catch (error) {
    throw error;
  }
}

export async function getTagNotInBookmark(userId: string, bookmarkId: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${userId}/bookmark/${bookmarkId}`,
      {
        method: "GET",
      }
    );

    const item = await response.json();

    return item.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteBookmark(userId: string, id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/bookmark/${id}`, {
      method: "DELETE",
    });

    const item = await response.json();

    return item.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteTagInBookmark(
  userId: string,
  bookmarkId: string,
  tagId: string
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${userId}/bookmark/${bookmarkId}/tag/${tagId}`,
      {
        method: "DELETE",
      }
    );

    const item = await response.json();

    return item.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteTag(userId: string, id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/tag/${id}`, {
      method: "DELETE",
    });

    const item = await response.json();

    console.log("");
    return item.data;
  } catch (error) {
    throw error;
  }
}

export async function updateBookmarkFolder(
  userId: string,
  bookmarkId: string,
  folderId: string
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/bookmark/${bookmarkId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folder_id: folderId }),
    });

    if (!response.ok) {
      throw new Error("Failed to update bookmark folder");
    }

    await response.json();
  } catch (error) {
    console.error("Error updating bookmark folder:", error);
    throw error;
  }
}
