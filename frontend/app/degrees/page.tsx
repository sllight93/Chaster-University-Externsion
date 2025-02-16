"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DynamicImage from "../../components/DynamicImage";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!backendUrl) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
}

interface Course {
  id: string;
  name: string;
}

interface Degree {
  id: string;
  name: string;
  description: string;
  type: string;
  courses: Course[]; // falls dein Backend auch Courses liefert
}

async function getDegrees(): Promise<Degree[]> {
  const res = await fetch(`${backendUrl}/api/degrees`);
  if (!res.ok) {
    throw new Error("Fehler beim Abrufen der Degrees");
  }
  return res.json();
}

export default function DegreesPage() {
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchDegrees() {
      try {
        const data = await getDegrees();
        setDegrees(data);
        // Setze initial alle Gruppen als geöffnet
        const types = Array.from(new Set(data.map((d) => d.type)));
        const openState: Record<string, boolean> = {};
        types.forEach((type) => (openState[type] = true));
        setOpenGroups(openState);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDegrees();
  }, []);

  if (loading) return <div>Lade Degrees...</div>;
  if (error) return <div>Error: {error}</div>;

  // Gruppiere Degrees nach Typ (z. B. Bachelor, Master)
  const groupedDegrees = degrees.reduce<Record<string, Degree[]>>((acc, degree) => {
    const type = degree.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(degree);
    return acc;
  }, {});

  const toggleGroup = (type: string) => {
    setOpenGroups((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Degrees</h1>
      <div className="space-y-6">
        {Object.keys(groupedDegrees)
          .sort() // Alphabetisch, z. B. "Bachelor" vor "Master"
          .map((type) => (
            <div key={type} className="mb-6 border rounded">
              <button
                onClick={() => toggleGroup(type)}
                className="w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none"
              >
                <span className="text-2xl font-semibold">{type}</span>
              </button>
              {openGroups[type] && (
                <div className="p-2">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {groupedDegrees[type].map((degree) => (
                      <Link
                        key={degree.id}
                        href={`/degrees/${degree.id}`}
                        className="group relative block border rounded overflow-hidden hover:shadow-lg"
                      >
                        <DynamicImage
                          name={degree.name}
                          alt={degree.name}
                          width={300}
                          height={192}
                          className="object-cover w-full h-80 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        {/* Overlay: Degree-Name zentriert */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{degree.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
