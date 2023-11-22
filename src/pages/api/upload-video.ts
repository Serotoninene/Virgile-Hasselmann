import S3 from "aws-sdk/clients/s3";
import axios from "axios";

const s3 = new S3({
  region: "eu-west-3",
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCOUNT_ACCESS_KEY!,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_ACCOUNT_SECRET_KEY!,
  signatureVersion: "v4",
});

export async function uploadVideo(file: File) {
  // if no file, return
  if (!file) {
    return { message: "No file" };
  }

  try {
    // Setting parameters - ACL will allow us to see a file
    const fileParams = {
      Bucket: "virgile-portfollio/videos",
      Key: file.name,
      Expires: 600,
      ContentType: file.type,
    };

    // Generating a signed URL which we'll use to upload the file
    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    await axios.put(url, file, {
      headers: {
        "Content-type": String(file.type),
        "Access-Control-Allow-Origin": "*",
      },
    });

    return { message: "VIDEO UPLOADED WITH SUCCESS" };
  } catch (err) {
    console.log("error", err);

    return { message: err };
  }
}
