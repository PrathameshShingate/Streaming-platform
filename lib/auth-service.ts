import { currentUser } from "@clerk/nextjs";
import { connectToDatabase } from "./database";
import UserSchema from "@/lib/schemas/user";

export async function getSelf() {
  const db = connectToDatabase();

  if (!db) {
    throw new Error("DATABASE_CONNECTION_ERR");
  }

  const clerkCurrentUser = await currentUser();

  if (!clerkCurrentUser || !clerkCurrentUser.username) {
    throw new Error("Unauthorized");
  }

  const dbUser = await UserSchema.findOne({
    clerkId: clerkCurrentUser.id,
  });

  if (!dbUser) {
    throw new Error("Clerk user not found in gamehub db");
  }

  return dbUser;
}

export async function getSelfByUsername(username: string) {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await UserSchema.findOne({ username: username });

  if (!user) {
    throw new Error("User not found");
  }

  if (self.username !== user.username) {
    throw new Error("Unauthorized");
  }

  return user;
}
