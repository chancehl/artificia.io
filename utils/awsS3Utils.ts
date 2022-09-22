type GetS3ObjectUrlOptions = {
  region: "us-east-1" | "us-west-2";
  bucket: string;
  key: string;
};

export function getS3ObjectUrl({ region, bucket, key }: GetS3ObjectUrlOptions) {
  return `https://s3.${region}.amazonaws.com/${bucket}/${key}`;
}
