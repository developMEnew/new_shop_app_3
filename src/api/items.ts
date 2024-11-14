import { Item } from '../types';

const API_URL = '/api';

export async function getItems(): Promise<Item[]> {
  const response = await fetch(`${API_URL}/items`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
}

export async function createItem(item: Omit<Item, '_id'>): Promise<Item> {
  const response = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create item');
  }
  return response.json();
}

export async function updateItem(id: string, item: Partial<Item>): Promise<Item> {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update item');
  }
  return response.json();
}

export async function deleteItem(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete item');
  }
}