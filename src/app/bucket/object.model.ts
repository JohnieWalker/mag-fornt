interface S3Object {
  bucketName: string;
  key: string;
  size: number;
  lastModified: number;
  storageClass: string;
  owner: {
    displayName: string;
    id: string;
  };
  etag: string;
}

export interface Object {
  s3ObjectSummary: S3Object;
  downloadLink: string;
}
