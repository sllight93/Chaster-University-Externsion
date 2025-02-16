// app/courses/page.tsx
import Link from "next/link";
import DynamicImage from "../../components/DynamicImage"; // Passe den Pfad ggf. an

interface Course {
  id: string;
  name: string;
}

async function getCourses(): Promise<Course[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  const res = await fetch(`${backendUrl}/api/courses`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }
  return res.json();
}

export default async function CoursesPage() {
  const courses: Course[] = await getCourses();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Courses Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className="relative block border rounded overflow-hidden hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white text-lg font-bold">{course.name}</span>
            </div>
            <DynamicImage
              name={course.name}
              alt={course.name}
              width={300}
              height={400} // Hochformat, passe ggf. an
              className="object-cover"
            />
          </Link>
        ))}
      </div>
      <div className="mt-4">
        <Link href="/" className="text-blue-500">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
