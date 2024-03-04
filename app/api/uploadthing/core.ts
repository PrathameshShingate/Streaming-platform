import { createUploadthing, type FileRouter } from "uploadthing/next";

import { getSelf } from "@/lib/auth-service";
import stream from "@/lib/schemas/stream";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const self = await getSelf();

      return { user: self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const streamData = await stream.findOneAndUpdate(
        { userId: metadata.user._id },
        { thumbnailUrl: file.url },
        { new: true }
      );

      console.log("stream", streamData);

      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
