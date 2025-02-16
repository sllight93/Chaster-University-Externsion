// app/degrees/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import DynamicImage from "../../../components/DynamicImage";

interface Course {
  id: string;
  name: string;
}

interface DegreeCourse {
  course: Course;
}

interface Degree {
  id: string;
  name: string;
  description: string;
  degreeCourses: DegreeCourse[];
}

interface PageProps {
  params: {
    id: string;
  };
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!backendUrl) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
}

export default async function DegreeDetailPage({ params }: PageProps) {
  const res = await fetch(`${backendUrl}/api/degrees/${params.id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    notFound();
  }

  const degree: Degree = await res.json();

  return (
    <div className="p-4">
      {/* Zurück-Button */}
      <Link href="/degrees" className="mb-4 inline-block text-blue-500">
        ← Zurück
      </Link>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Linke Spalte: Großes Degree-Bild */}
        <div className="md:w-1/2">
          <DynamicImage
            name={degree.name}
            alt={degree.name}
            width={600}
            height={400}
            className="object-cover rounded"
          />
        </div>
        {/* Rechte Spalte: Informationen und Courses */}
        <div className="md:w-1/2 flex flex-col">
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-2">{degree.name}</h1>
            <p className="text-md">{degree.description}</p>
          </div>
          {degree.degreeCourses && degree.degreeCourses.length > 0 && (
            <div className="border p-4 rounded">
              <h2 className="text-2xl font-semibold mb-4">Courses</h2>
              <div className="flex flex-wrap gap-4">
                {degree.degreeCourses.map(({ course }) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="w-24 h-36 relative flex items-center justify-center overflow-hidden"
                  >
                    <DynamicImage
                      name={course.name}
                      alt={course.name}
                      width={96}
                      height={144}
                      className="object-contain rounded"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
