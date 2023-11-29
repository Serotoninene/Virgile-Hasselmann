import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: "eu-west-3",
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCOUNT_ACCESS_KEY!,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_ACCOUNT_SECRET_KEY!,
  signatureVersion: "v4",
});

export async function deleteImage(fileName: string) {
  try {
    const fileParams = {
      Bucket: "virgile-portfollio/photos",
      Key: fileName,
    };
    await s3.deleteObject(fileParams).promise();
    return { message: "PHOTO DELETED WITH SUCCESS" };
  } catch (err) {
    console.log(err);
    return { message: err };
  }
}
