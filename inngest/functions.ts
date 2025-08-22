import { inngest } from "./client";
import ImageKit from "imagekit";
import OpenAI from 'openai';
import Replicate from 'replicate'

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

export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  
});

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY
})

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
    const generateThumbnailPrompt = await step.run('generateThumbnailPrompt' , async()=> {
      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: [
              {
                "type": "text",
                "text": uploadImageUrls? `Refering to this thumbnail url write a text prompt to generate Youtube Thumbnail
                similar to the attached referance image with following user input:` + userInput + 'Only give me text prompt, No other comment text' :
                `Depends on user input write a text prompt to generate high quality professional Youtube video
                Add relevant icons, illustrations or images as per title userinput` + userInput + 'Only give me text prompt, No other comment text'
                
              },
              {
                "type": "image_url",
                "image_url": {
                  "url": uploadImageUrls?? ''
              }
            }
            ]
          },
        ],
        max_tokens: 300,
      }); 
      console.log(completion.choices[0].message.content)

      return completion.choices[0].message.content
    })

    //Generate AI Image
    const generateImage = await step.run('Generate Image' , async()=> {
      const input = {
        prompt: generateThumbnailPrompt,
        resolution: "None",
        style_type: "None",
        aspect_ratio: "16:9",
        magic_prompt_option: "Auto"
      };

      const output = await replicate.run("ideogram-ai/ideogram-v3-turbo", { input });

      // To access the file URL:
      //@ts-ignore
      return output.url()

    })    

    //Save Image to cloud


    //Save Record to Database

    return generateImage;

    //Run the server and check it
  }
);
