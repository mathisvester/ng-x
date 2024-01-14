import { Client, Account } from 'appwrite';

export const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65a259553ebaac57544f');

export const account = new Account(client);
export { ID } from 'appwrite';
