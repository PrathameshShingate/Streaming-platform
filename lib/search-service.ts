import { getSelf } from "./auth-service";
import stream from "./schemas/stream";
import user from "./schemas/user";

export async function getSearch(term?: string) {
  let userId;

  try {
    const self = await getSelf();
    userId = self._id;
  } catch (error) {
    userId = null;
  }

  let streams = stream.find().select("_id name userId");

  // Populate the userId field with data from the user model
  streams = streams.populate({ path: "userId", model: user });

  // Define your search string
  const searchString = term || " ";

  // Create an array to hold regex patterns for each field
  const regexPatterns = [
    { name: new RegExp(searchString, "i") },
    { "userId.username": new RegExp(searchString, "i") },
  ];

  streams = streams.or(regexPatterns);

  // Execute the query
  const results = await streams.exec();

  return results;
}
