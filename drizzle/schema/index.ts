import {
  pgTable,
  uuid,
  varchar,
  time,
  jsonb,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").primaryKey(),
  username: varchar("username", { length: 255 }),
  email: varchar("email", { length: 255 }),
  profile_image: varchar("profile_image", { length: 255 }),
  password: varchar("password", { length: 255 }),
  created_at: time("created_at", { withTimezone: true }).defaultNow(),
});

export const bookmark = pgTable("bookmark", {
  id: uuid("id").primaryKey(),
  user_id: uuid("user_id").references(() => user.id),
  folder_id: uuid("folder_id").references(() => folder.id),
  title: varchar("title", { length: 255 }),
  url: varchar("url", { length: 255 }),
  description: varchar("description", { length: 255 }),
  image: varchar("image", { length: 255 }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: time("updated_at", { withTimezone: true }).defaultNow(),
  deleted_at: time("deleted_at", {}),
});

export const folder = pgTable("folder", {
  id: uuid("id").primaryKey(),
  user_id: uuid("user_id").references(() => user.id),
  name: varchar("name", { length: 255 }),
  is_public: boolean("is_public").default(false),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  deleted_at: timestamp("deleted_at", { withTimezone: true }),
});

export const folder_share = pgTable("folder_share", {
  id: uuid("id").primaryKey(),
  folder_id: uuid("folder_id").references(() => folder.id),
  shared_with_user_id: uuid("shared_with_user_id").references(() => user.id),
  permission: varchar("permission", { length: 20 }).default("view"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const tag = pgTable("tag", {
  id: uuid("id").primaryKey(),
  user_id: uuid("user_id").references(() => user.id),
  name: varchar("name", { length: 255 }),
  created_at: time("created_at", { withTimezone: true }).defaultNow(),
});

export const bookmark_tag = pgTable("bookmark_tag", {
  bookmark_id: uuid("bookmark_id").references(() => bookmark.id),
  tag_id: uuid("tag_id").references(() => tag.id),
});
