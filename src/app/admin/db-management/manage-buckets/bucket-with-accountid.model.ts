export interface BucketWithAccountId {
  name: string;
  accountId: string;
}

export interface AccountIdWithBucketsList {
  accountId: string;
  buckets: string[];
}
