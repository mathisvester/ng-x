import { Client, Account } from 'appwrite';

export const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65ce50b4e68545c2f9b1');

export const account = new Account(client);
export { ID } from 'appwrite';
