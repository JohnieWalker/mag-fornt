export interface ObjectWithVersions {
  s3ObjectSummary: {
    bucketName: string;
    key: string;
    versionId: string;
    lastModified: number;
    owner: {
      displayName: string;
      id: string;
    };
    size: number;
    storageClass: string;
    latest: boolean;
    deleteMarker: boolean;
    etag: string;
  },
  downloadLink: string;
}
