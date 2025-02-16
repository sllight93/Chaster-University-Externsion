"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DynamicImage from "../../components/DynamicImage";

interface Course {
  id: string;
  name: string;
}

interface Class {
  id: string;
  name: string;
  difficulty: number;
  course?: Course;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

// Funktion zum Abrufen der Klassen vom Backend
async function getClasses(): Promise<Class[]> {
  const res = await fetch(`${backendUrl}/api/classes`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch classes");
  }
  return res.json();
}

// Mapping der Difficulty-Werte zu Bezeichnungen
const difficultyLabels: Record<number, string> = {
  1: "Freshmen",
  2: "Sophomore",
  3: "Junior",
  4: "Senior",
};

export default function ClassesOverviewPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [openGroups, setOpenGroups] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  useEffect(() => {
    getClasses()
      .then((data) => setClasses(data))
      .catch((error) => console.error(error));
  }, []);

  // Entferne Duplikate basierend auf der Klassen-ID (falls vorhanden)
  const uniqueClassesMap = new Map<string, Class>();
  for (const cls of classes) {
    uniqueClassesMap.set(cls.id, cls);
  }
  const uniqueClasses = Array.from(uniqueClassesMap.values());

  // Gruppiere die Klassen nach ihrem Difficulty-Wert
  const groupedByDifficulty: Record<number, Class[]> = uniqueClasses.reduce((acc, curr) => {
    const diff = curr.difficulty;
    if (!acc[diff]) {
      acc[diff] = [];
    }
    acc[diff].push(curr);
    return acc;
  }, {} as Record<number, Class[]>);

  const toggleGroup = (difficulty: number) => {
    setOpenGroups((prev) => ({ ...prev, [difficulty]: !prev[difficulty] }));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Classes Overview</h1>
      {Object.entries(difficultyLabels).map(([diffKey, label]) => {
        const diffNum = Number(diffKey);
        const classesForDiff = groupedByDifficulty[diffNum] || [];
        return (
          <div key={diffNum} className="mb-6 border rounded">
            <button
              onClick={() => toggleGroup(diffNum)}
              className="w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none"
            >
              <span className="text-2xl font-semibold">{label}</span>
            </button>
            {openGroups[diffNum] && (
              <div className="p-2">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {classesForDiff.map((cls) => (
                    <Link
                      key={cls.id}
                      href={`/classes/${cls.id}`}
                      className="group relative block overflow-hidden border rounded hover:shadow-lg"
                    >
                      <DynamicImage
                        name={cls.name}
                        alt={cls.name}
                        width={300}
                        height={192}
                        className="object-cover object-top w-full h-80 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      {/* Overlay: Text bleibt immer 100% opak */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <span className="text-white font-bold text-lg">{cls.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div className="mt-4">
        <Link href="/" className="text-blue-500">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
