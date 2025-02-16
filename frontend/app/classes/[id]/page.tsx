// app/classes/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import DynamicImage from "../../../components/DynamicImage";

interface Course {
  id: string;
  name: string;
}

interface Task {
  id: string;
  description: string;
  // Weitere Felder nach Bedarf
}

interface ExamTask {
  id: string;
  description: string;
  // Weitere Felder nach Bedarf
}

interface ClassDetail {
  id: string;
  name: string;
  course?: Course;
  tasks: Task[];
  examTasks: ExamTask[];
  difficulty: number;
  daysOfWeek: any;
  pointsRequired: number;
  createdAt: string;
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

export default async function ClassDetailPage({ params }: PageProps) {
  const res = await fetch(`${backendUrl}/api/classes/${params.id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    notFound();
  }

  const cls: ClassDetail = await res.json();

  return (
    <div className="p-4">
      {/* Zurück-Button */}
      <Link href="/classes" className="mb-4 inline-block text-blue-500">
        ← Zurück
      </Link>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Linke Spalte: Großes Bild der Klasse */}
        <div className="md:w-1/2">
          <DynamicImage
            name={cls.name}
            alt={cls.name}
            width={600}
            height={400}
            className="object-cover rounded"
          />
        </div>
        {/* Rechte Spalte: Informationen zur Klasse */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{cls.name}</h1>
          {cls.course && (
            <p className="text-md mb-2">Course: {cls.course.name}</p>
          )}
          <p className="mb-2">Difficulty: {cls.difficulty}</p>
          <p className="mb-2">Points Required: {cls.pointsRequired}</p>
          <p className="mb-4">
            Created At: {new Date(cls.createdAt).toLocaleString()}
          </p>

          {cls.tasks && cls.tasks.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Tasks</h2>
              <ul className="list-disc list-inside">
                {cls.tasks.map((task) => (
                  <li key={task.id}>{task.description}</li>
                ))}
              </ul>
            </div>
          )}

          {cls.examTasks && cls.examTasks.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Exam Tasks</h2>
              <ul className="list-disc list-inside">
                {cls.examTasks.map((exam) => (
                  <li key={exam.id}>{exam.description}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
