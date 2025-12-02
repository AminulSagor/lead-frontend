import { connectDB } from '@/db/mongodb';
import BusinessProfile from '@/models/BusinessProfile';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    const newProfile = await BusinessProfile.create(data);
    return NextResponse.json(newProfile, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
