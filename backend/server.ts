// server.ts
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// asyncHandler um asynchrone Routen sauber zu handhaben
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) => {
  return fn(req, res, next).catch(next);
};

/* --------------------------
   Endpoints für Degrees
--------------------------- */

// Alle Degrees abrufen (inklusive zugehöriger Courses)
app.get(
  '/api/degrees',
  asyncHandler(async (req: Request, res: Response) => {
    const degrees = await prisma.degree.findMany({
      include: {
        degreeCourses: {
          include: {
            course: {
              include: {
                classes: true,
              },
            },
          },
        },
      },
    });
    res.json(degrees);
  })
);

// Einzelnen Degree anhand der ID abrufen (inklusive Courses)
app.get(
  '/api/degrees/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const degree = await prisma.degree.findUnique({
      where: { id },
      include: {
        degreeCourses: {
          include: {
            course: {
              include: {
                classes: true,
              },
            },
          },
        },
      },
    });
    if (!degree) {
      return res.status(404).json({ error: 'Degree not found' });
    }
    res.json(degree);
  })
);

/* --------------------------
   Endpoints für Courses
--------------------------- */

// Alle Courses abrufen (inklusive zugehöriger Klassen)
app.get(
  '/api/courses',
  asyncHandler(async (req: Request, res: Response) => {
    const courses = await prisma.course.findMany({
      include: {
        classes: true,
      },
    });
    res.json(courses);
  })
);

// Einzelnen Course anhand der ID abrufen (inklusive zugehöriger Klassen)
app.get(
  '/api/courses/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        // Statt "classes: true" holen wir jetzt die Join-Objekte, inkl. dem tatsächlichen Class-Datensatz:
        classes: {
          include: {
            class: true,
          },
        },
      },
    });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  })
);


/* --------------------------
   Endpoints für Classes
--------------------------- */

// Alle Classes abrufen (inklusive Tasks, ExamTasks und Voraussetzungen)
app.get(
  '/api/classes',
  asyncHandler(async (req: Request, res: Response) => {
    const classes = await prisma.class.findMany({
      include: {
        tasks: true,
        examTasks: true,
        prerequisites: { include: { prerequisite: true } },
        prerequisiteOf: { include: { class: true } },
      },
    });
    res.json(classes);
  })
);

// Einzelne Class anhand der ID abrufen (inklusive Tasks, ExamTasks und Voraussetzungen)
app.get(
  '/api/classes/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const cls = await prisma.class.findUnique({
      where: { id },
      include: {
        tasks: true,
        examTasks: true,
        prerequisites: { include: { prerequisite: true } },
        prerequisiteOf: { include: { class: true } },
      },
    });
    if (!cls) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json(cls);
  })
);

// Globales Error Handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
