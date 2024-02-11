import UserSchema from "@/lib/schemas/user";

export async function getUserByUsername(username: string) {
  const user = await UserSchema.findOne({ username: username });

  return user;
}
