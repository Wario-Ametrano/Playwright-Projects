import { expect } from '@playwright/test';

export async function createUser(apiClient, userData) {

  const response = await apiClient.post(   // ✅ usa apiClient
    'https://dummyjson.com/users/add',
    {
      headers: { 'Content-Type': 'application/json' }, // ✅ specifica header per JSON
      data: userData // ✅ passa userData direttamente come data
    }
  );

  expect(response.status()).toBe(201); // ✅ asserisce che lo status code sia 201 (Created)

  const body = await response.json();

  expect(body.id).toBeDefined();

  return body;
}