import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const startTime = performance.now();
    const { db } = await connectToDatabase();
    
    // Test database connection with a ping
    await db.command({ ping: 1 });
    
    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);

    return NextResponse.json({ 
      status: 'connected',
      latency,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Database connection failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}