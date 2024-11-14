import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Item from '@/models/Item';

export async function GET() {
  try {
    await connectDB();
    const items = await Item.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const item = await Item.create(data);
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    );
  }
}