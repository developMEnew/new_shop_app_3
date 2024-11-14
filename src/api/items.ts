import { connectToDatabase } from '../lib/mongodb';

export async function getItems() {
  try {
    const { db } = await connectToDatabase();
    const items = await db.collection('items').find({}).toArray();
    return items;
  } catch (error) {
    throw new Error('Failed to fetch items');
  }
}

export async function createItem(item: any) {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('items').insertOne(item);
    return { _id: result.insertedId, ...item };
  } catch (error) {
    throw new Error('Failed to add item');
  }
}

export async function updateItem(id: string, item: any) {
  try {
    const { db } = await connectToDatabase();
    await db.collection('items').updateOne(
      { _id: id },
      { $set: item }
    );
    return { success: true };
  } catch (error) {
    throw new Error('Failed to update item');
  }
}

export async function deleteItem(id: string) {
  try {
    const { db } = await connectToDatabase();
    await db.collection('items').deleteOne({ _id: id });
    return { success: true };
  } catch (error) {
    throw new Error('Failed to delete item');
  }
}