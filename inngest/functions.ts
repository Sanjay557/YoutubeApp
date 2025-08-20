import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const GenerateThumbnail = inngest.createFunction(
  {id: 'ai/generate-thumbnail'},
  {event : 'ai/generate-thumbnail'},
  async({event, step}) => {
    const {userEmail, refImage, faceImage, userInput} = await event.data
    //Upload Image to cloud /ImageKit

    
    //Generate AI promopt from AI model

    
    //Generate AI Image


    //Save Image to cloud


    //Save Record to Database

  }
)