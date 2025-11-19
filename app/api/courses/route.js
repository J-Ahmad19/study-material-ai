// import { NextResponse } from "next/server";
// import { db } from "../../../configs/db";
// import { STUDY_MATERIAL } from "../../../configs/schema";
// import { desc, eq } from "drizzle-orm";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { createdBy } = body;

//     if (!createdBy) {
//       return NextResponse.json({ error: "Missing createdBy" }, { status: 400 });
//     }

//     const courses = await db
//       .select()
//       .from(STUDY_MATERIAL)
//       .where(eq(STUDY_MATERIAL.createdBy, createdBy))
//       .orderBy(desc(STUDY_MATERIAL.id))

//     return NextResponse.json({ result: courses });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { db } from "../../../configs/db";
import { STUDY_MATERIAL } from "../../../configs/schema";
import { desc, eq } from "drizzle-orm";

// 📌 POST: Get all courses by createdBy
export async function POST(req) {
  try {
    const body = await req.json();
    const { createdBy } = body;

    if (!createdBy) {
      return NextResponse.json({ error: "Missing createdBy" }, { status: 400 });
    }
  const existingCourses = await db
      .select()
      .from(STUDY_MATERIAL)
      .where(eq(STUDY_MATERIAL.createdBy, createdBy)) // ✅ FIXED
      .orderBy(desc(STUDY_MATERIAL.id));

    if (existingCourses.length > 0) {
      return NextResponse.json({ result: existingCourses });
    }

    
    const courses = await db
      .select()
      .from(STUDY_MATERIAL)
      .where(eq(STUDY_MATERIAL.createdBy, createdBy))
      .orderBy(desc(STUDY_MATERIAL.id));

    return NextResponse.json({ result: courses });
  } catch (error) {
    console.error("API Error (POST):", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 📌 GET: Get single course detail by courseId
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    const course = await db
      .select()
      .from(STUDY_MATERIAL)
      .where(eq(STUDY_MATERIAL.courseId, courseId));

    if (course.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ result: course[0] });
  } catch (error) {
    console.error("API Error (GET):", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
