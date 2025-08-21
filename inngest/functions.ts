import { inngest } from "./client";
import ImageKit from "imagekit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

const imageKit = new ImageKit({
  //@ts-ignore
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  //@ts-ignore
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  //@ts-ignore
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINT,
});

export const GenerateAiThumbnail = inngest.createFunction(
  { id: "ai/generate-thumbnail" },
  { event: "ai/generate-thumbnail" },
  async ({ event, step }) => {
    const { userEmail, refImage, faceImage, userInput } = await event.data;
    //Upload Image to cloud /ImageKit

    const uploadImageUrls = await step.run("UploadImage", async () => {
      if (refImage != null) {
        const refImageUrl = await imageKit.upload({
          file: refImage?.buffer ?? "",
          fileName: refImage.name,
          isPublished: true,
          useUniqueFileName: false,
        });

        // const faceImageUrl = await imageKit.upload({
        //   file: faceImage?.buffer??'',
        //   fileName: faceImage.name,
        //   isPublished: true,
        //   useUniqueFileName: false
        // })

        return refImageUrl.url;
      }
      else{
        return null
      }
    });

    //Generate AI promopt from AI model

    //Generate AI Image

    //Save Image to cloud

    //Save Record to Database

    return uploadImageUrls;
  }
);
