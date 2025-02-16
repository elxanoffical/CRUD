import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db";
import { Blog } from "../../lib/models/Blogs";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { title, subtitle } = await req.json();

    if (!title || !subtitle) {
      return NextResponse.json(
        { error: "Title and Subtitle are required" },
        { status: 400 }
      );
    }

    const newBlog = new Blog({ title, subtitle });
    await newBlog.save();

    return NextResponse.json(
      { message: "Blog created successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 }); // Son əlavə olunan birinci gəlsin
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
