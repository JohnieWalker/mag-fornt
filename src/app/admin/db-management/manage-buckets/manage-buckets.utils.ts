import { AccountIdWithBucketsList, BucketWithAccountId } from './bucket-with-accountid.model';

export class ManageBucketsUtils {

  static transformToAccountIdWithBucketsList(bucketsWithAccountId: BucketWithAccountId[]): AccountIdWithBucketsList[] {
    const results = [];

    bucketsWithAccountId.forEach((bucketWithAccountId) => {
      const index = results.findIndex((result: AccountIdWithBucketsList) => result.accountId === bucketWithAccountId.accountId);

      if (index === -1) {
        results.push({accountId: bucketWithAccountId.accountId, buckets: [bucketWithAccountId.name]});
      } else {
        results[index].buckets.push(bucketWithAccountId.name);
      }
    });

    return results;
  }

  static deleteBucketFromAccount(accountIdsWithBuckets: AccountIdWithBucketsList[], bucketWithAccountId: BucketWithAccountId) {

    const accountIdIndex = accountIdsWithBuckets
      .findIndex((accountIdWithBuckets: AccountIdWithBucketsList) => accountIdWithBuckets.accountId === bucketWithAccountId.accountId);

    accountIdsWithBuckets[accountIdIndex].buckets
      .splice(accountIdsWithBuckets[accountIdIndex].buckets.indexOf(bucketWithAccountId.name), 1);

    return accountIdsWithBuckets;
  }

  static addBucketToList(accountIdsWithBucketsList: AccountIdWithBucketsList[], bucketWithAccountId: BucketWithAccountId) {

    const accountIdIndex = accountIdsWithBucketsList
      .findIndex((accountIdWithBuckets: AccountIdWithBucketsList) => accountIdWithBuckets.accountId === bucketWithAccountId.accountId);

    if (accountIdIndex !== -1) {
      accountIdsWithBucketsList[accountIdIndex].buckets.push(bucketWithAccountId.name);
    } else {
      accountIdsWithBucketsList.push({accountId: bucketWithAccountId.accountId, buckets: [bucketWithAccountId.name]});
    }

    return accountIdsWithBucketsList;
  }
}
