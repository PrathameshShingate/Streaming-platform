import UserSchema from "@/lib/schemas/user";

export async function getUserByUsername(username: string) {
  const user = await UserSchema.findOne({ username: username });

  return user;
}

export async function getUserById(id: string) {
  const user = await UserSchema.findOne({ _id: id });

  return user;
}
