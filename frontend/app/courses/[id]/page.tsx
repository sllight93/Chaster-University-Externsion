// app/courses/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import DynamicImage from "../../../components/DynamicImage";

interface Class {
  id: string;
  name: string;
  difficulty: number;
}

interface CourseClassJoin {
  class: Class;
}

interface CourseDetail {
  id: string;
  name: string;
  description: string;
  // Hier erhalten wir ein Array von Join-Objekten, aus denen wir die tatsächlichen Class-Daten extrahieren
  classes: CourseClassJoin[];
}

interface PageProps {
  params: {
    id: string;
  };
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default async function CourseDetailPage({ params }: PageProps) {
  const res = await fetch(`${backendUrl}/api/courses/${params.id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    notFound();
  }
  const course: CourseDetail = await res.json();

  return (
    <div className="p-4">
      {/* Zurück-Button */}
      <Link href="/courses" className="mb-4 inline-block text-blue-500">
        ← Zurück zu Courses
      </Link>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Linke Spalte: Großes Course-Bild */}
        <div className="md:w-1/2">
          <DynamicImage
            name={course.name}
            alt={course.name}
            width={600}
            height={400}
            className="object-cover rounded"
          />
        </div>
        {/* Rechte Spalte: Kursinformationen und Classes */}
        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
          <p className="text-md mb-4">{course.description}</p>
          {course.classes && course.classes.length > 0 && (
            <div className="border p-4 rounded">
              <h2 className="text-2xl font-semibold mb-4">Classes</h2>
              <div className="flex flex-wrap gap-4">
                {course.classes.map(({ class: cls }) => (
                  <Link
                    key={cls.id}
                    href={`/classes/${cls.id}`}
                    className="relative block border rounded overflow-hidden"
                  >
                    <DynamicImage
                      name={cls.name}
                      alt={cls.name}
                      width={96}
                      height={144}
                      className="object-contain"
                    />
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-1 text-white font-bold text-sm">
                      {cls.name}
                    </div>
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
