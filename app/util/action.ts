import db, { user } from "@/lib/database";
import { sql } from "drizzle-orm";
import { User } from "@/app/util/definition";
import { v4 as uuid } from "uuid";

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
