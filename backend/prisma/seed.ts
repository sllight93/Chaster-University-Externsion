import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type CourseRow = {
  courseName: string;
  classes: (string | null)[];
};

const coursesData: CourseRow[] = [
  {
    courseName: 'Milking Technologies',
    classes: ['Anal Basics', 'Prostate Play', 'Prostate Milking', 'Prostate Orgasms'],
  },
  {
    courseName: 'Anal Technologies',
    classes: ['Anal Basics', 'Anal', 'Ass Play', 'Deep Anal'],
  },
  {
    courseName: 'Oral Technologies',
    classes: ['Blowjob Basics', 'Blowjob', 'Deepthroats', 'Facefucking'],
  },
  {
    courseName: 'Enema Technologies',
    classes: ['Enema Basics', 'Enema Play', 'Advanced Enemas', 'Big Enemas'],
  },
  {
    courseName: 'Penetration Technologies',
    classes: ['Blowjob Basics', 'Double Penetration Basics', 'Double Penetration', 'Full Penetration'],
  },
  {
    courseName: 'Penetration Technologies',
    classes: ['Anal Basics', 'Double Penetration Basics', 'Spitroasting', null],
  },
  {
    courseName: 'Pleasure Services',
    classes: ['Service Basics', 'Pleasure Service', 'Pleasure Giving', 'Full Service'],
  },
  {
    courseName: 'Gagreflex Research',
    classes: ['Facefucking', 'Gagreflex Training', 'Facefuck Endurance Statistics', 'Facefucking Advanced Techniques'],
  },
  {
    courseName: 'Anal Destruction',
    classes: ['Anal stretching', 'Fisting Basics', 'Fisting intermediate', 'Fisting large insertations'],
  },
  {
    courseName: 'Anal Destruction',
    classes: ['Anal stretching', 'Longterm Buttplug Basics', 'Extended Plugwearing', 'Plug Philosophy'],
  },
  {
    courseName: 'Chastity Psychology',
    classes: ['Chastity Basics', 'Chastity', 'Longterm Chastity', 'Permanent Chastity'],
  },
  {
    courseName: 'Orgasm Denial Psychology',
    classes: ['Teasing', 'Denial', 'Tease and Denial', 'Frustration'],
  },
  {
    courseName: 'Stimulation Science',
    classes: ['Sensitivity Basics', 'Sensitivity Training', 'Forced Orgasms', 'Orgasm Torture'],
  },
  {
    courseName: 'Goon Science',
    classes: ['Gooning Basics', 'Gooning', 'Gooning Addict', 'Gooning Enlightment'],
  },
  {
    courseName: 'Religious Research',
    classes: ['Porn Addict', 'Porn Collection', 'Compilations', null],
  },
  {
    courseName: 'Hypno Therapy',
    classes: ['Hypno Basics', 'Subliminal Messages', 'Hypnosis', 'Brainwash'],
  },
  {
    courseName: 'Crossdressing Studies',
    classes: ['Girly Underwear', 'Girly Dressup', 'Girly Outfits', 'Crossdressing'],
  },
  {
    courseName: 'Feminization Studies',
    classes: ['Femininity Basics', 'Femininity', 'Feminization', 'Feminine Transformation'],
  },
  {
    courseName: 'Cum Cuisine',
    classes: ['Cum-play Basics', 'Cum Play', 'Cum Apreciation', 'Cum Addiction'],
  },
  {
    courseName: 'Cumslut Customs',
    classes: ['Cum-play Basics', 'Cum Play', 'Cum Apreciation', 'Cum Addiction'],
  },
  {
    courseName: 'Cumslut Customs',
    classes: ['Cum Collecting', 'Dailie Cum Dose', 'Cum Worshipping', 'Cumdump'],
  },
  {
    courseName: 'Fashion Research',
    classes: ['Fashion Basics', 'Shopping for Underwear & Lingerine', 'Extended underwear', 'In Person Lingerine Shopping'],
  },
  {
    courseName: 'Fashion Research',
    classes: ['Fashion Basics', 'Shopping for Tops', 'Extended Outfits', 'In Person Outfit Shopping'],
  },
  {
    courseName: 'Fashion Research',
    classes: ['Fashion Basics', 'Shopping for Skirts and Leggins', null, null],
  },
  {
    courseName: 'Fashion Research',
    classes: ['Fashion Basics', 'Shopping for Dresses', 'Occasional Dresses', 'In Person Outfit Shopping'],
  },
  {
    courseName: 'Fashion Research',
    classes: ['Fashion Basics', 'Shopping for Shoes and Accesiors', 'To collect Shoes', 'In Person Outfit Shopping'],
  },
  {
    courseName: 'Fashion Research',
    classes: ['Fashion Basics', 'Shopping for Costumes', 'Basic Costumes', 'Extended Costumes'],
  },
  {
    courseName: 'Fashion Research',
    classes: ['Fashion Basics', 'Shopping for Toys', 'Extraordinary Toys', 'Big Guns'],
  },
  {
    courseName: 'Dating Discourse',
    classes: ['OK Cupid Obligations', 'Dating Women', 'Dating Men', 'Rent-a-Slut'],
  },
  {
    courseName: 'Hookup Hotshots',
    classes: ['OK Cupid Obligations', 'Dating Women', 'Dating Men', 'Rent-a-Slut'],
  },
  {
    courseName: 'Hookup Hotshots',
    classes: ['OK Cupid Obligations', 'Slutty Afirmations', 'Dating Men', 'Whore Mindset'],
  },
  {
    courseName: 'Mistress Masterclass',
    classes: ['Mistress Research', 'Introduction to Femdom', 'Extended Femdom Expiriences', null],
  },
  {
    courseName: 'Mistress Masterclass',
    classes: ['Agreeableness', 'Obedience', 'Submission', 'Slavery'],
  },
  {
    courseName: 'Submission Training',
    classes: ['Agreeableness', 'Obedience', 'Submission', 'Slavery'],
  },
  {
    courseName: 'Kitten Training',
    classes: ['Kitten play Basics', 'Kitten Play', 'Kitten Training', 'Bitch Training'],
  },
  {
    courseName: 'Fulltime Service',
    classes: ['Mistress Research', 'Introduction to Femdom', 'Extended Femdom Expiriences', null],
  },
  {
    courseName: 'Fulltime Service',
    classes: ['Mistress Research', 'Introduction to Femdom', 'Short-term Submission', 'Long-term Submission'],
  },
  {
    courseName: 'Public Relations',
    classes: ['Exposure Basics', 'Hidden Exposure', 'Public Exposure', 'Exhibitionism'],
  },
  {
    courseName: 'Media & Advertising',
    classes: ['Media Basics', 'Media Sharing', 'Media Management', 'Media Influencing'],
  },
  {
    courseName: 'Pain Management',
    classes: ['Spanking', 'Pain', 'Pain Enjoyment', 'Painful Pleasure'],
  },
  {
    courseName: 'Nipple Therapy',
    classes: ['Nipple play Basics', 'Nipple play', 'Nipple Stimulation', 'Nipple Pleasure'],
  },
  {
    courseName: 'Bondage Arts',
    classes: ['Gags and Cuffs', 'Basic Bondage', 'Self Bondage', 'Heavy Bondage'],
  },
  {
    courseName: 'Leather Crafts',
    classes: ['Leather Basics', 'Leather Wear', 'Leather Outfits', 'Leather Fashion'],
  },
  {
    courseName: 'Sounding Mechanics',
    classes: ['Sounding Basics', 'Sounding', 'Urethra Sounding', 'Urethra Stretching'],
  },
  {
    courseName: 'Estim Engineering',
    classes: ['Estim Basics', 'Estim', 'Estim Advanced', 'Estim Endurance'],
  },
];

type DegreeRow = {
  degreeName: string;
  courses: (string | null)[];
};

const degreesData: DegreeRow[] = [
  { degreeName: 'Insertion Mechanics', courses: ['Anal Technologies', 'Oral Technologies', 'Penetration Technologies', null, null] },
  { degreeName: 'Pleasure Economics', courses: ['Anal Technologies', 'Oral Technologies', 'Pleasure Services', null, null] },
  { degreeName: 'Oral Sciences', courses: ['Oral Technologies', 'Cum Cuisine', null, null, null] },
  { degreeName: 'Anal Sciences', courses: ['Anal Technologies', 'Enema Technologies', null, null, null] },
  { degreeName: 'Sissy Studies', courses: ['Chastity Psychology', 'Crossdressing Studies', null, null, null] },
  { degreeName: 'Feminization Arts', courses: ['Crossdressing Studies', 'Feminization Studies', 'Hypno Therapy', null, null] },
  { degreeName: 'Gender Studies', courses: ['Chastity Psychology', 'Milking Technologies', 'Crossdressing Studies', 'Feminization Studies', 'Hypno Therapy'] },
  { degreeName: 'Frustration Psychology', courses: ['Chastity Psychology', 'Orgasm Denial Psychology', null, null, null] },
  { degreeName: 'Orgasm Science', courses: ['Stimulation Science', null, null, null, null] },
  { degreeName: 'Pleasure Science', courses: ['Chastity Psychology', 'Orgasm Denial Psychology', 'Nipple Therapy', 'Milking Technologies', null] },
  { degreeName: 'BDSM Services', courses: ['Bondage Arts', 'Pain Management', 'Submission Training', null, null] },
  { degreeName: 'Experiment Sciences', courses: ['Estim Engineering', 'Sounding Mechanics', null, null, null] },
  { degreeName: 'Slave Services', courses: ['Pleasure Services', 'Submission Training', null, null, null] },
  { degreeName: 'Pet Science', courses: ['Kitten Training', null, null, null, null] },
  { degreeName: 'Media & Publicity', courses: ['Public Relations', 'Media & Advertising', null, null, null] },
];

async function main() {
  console.log("Starte Datenlöschung...");
  await prisma.$executeRaw`TRUNCATE TABLE "course_class" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "degree_course" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "degrees" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "class_prerequisite" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "classes" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "courses" CASCADE`;
  console.log("Datenlöschung abgeschlossen.");

  // Map zur Speicherung der Course-IDs (key: courseName)
  const courseIdMap = new Map<string, string>();

  console.log("Erstelle Kurse...");
  // Gruppiere coursesData nach Kursname
  const groupedCourses = new Map<
    string,
    { courseName: string; classes: { name: string; difficulty: number }[] }
  >();

  for (const row of coursesData) {
    const courseName = row.courseName.trim();
    if (!groupedCourses.has(courseName)) {
      groupedCourses.set(courseName, { courseName, classes: [] });
    }
    const group = groupedCourses.get(courseName)!;
    row.classes.forEach((cls, idx) => {
      if (cls && cls.trim() !== "") {
        const clsName = cls.trim();
        // Falls bereits vorhanden, setze den minimalen Schwierigkeitsgrad
        const existing = group.classes.find((c) => c.name === clsName);
        if (existing) {
          existing.difficulty = Math.min(existing.difficulty, idx + 1);
        } else {
          group.classes.push({ name: clsName, difficulty: idx + 1 });
        }
      }
    });
  }

  for (const [courseName, group] of groupedCourses.entries()) {
    const course = await prisma.course.upsert({
      where: { name: courseName } as any,
      update: {},
      create: { name: courseName },
    });
    courseIdMap.set(courseName, course.id);
    console.log(`Kurs "${courseName}" erstellt mit ID ${course.id}`);
  }
  console.log("Kurse erstellt.");

  // Map zur Speicherung der Klassen-IDs (key: `${courseId}::${className}`)
  const classIdMap = new Map<string, { id: string; difficulty: number; courseId: string }>();

  console.log("Erstelle Klassen und verbinde sie zu Kursen...");
  // Für jeden Kurs: Für jede Klasse in der Gruppe
  for (const [courseName, group] of groupedCourses.entries()) {
    const courseId = courseIdMap.get(courseName);
    if (!courseId) continue;
    // Sortiere die Klassen nach Schwierigkeitsgrad
    const uniqueClasses = group.classes.sort((a, b) => a.difficulty - b.difficulty);
    for (const cls of uniqueClasses) {
      // Verwende den zusammengesetzten Schlüssel: Kurs-ID + Klassenname
      const key = `${courseId}::${cls.name}`;
      if (classIdMap.has(key)) {
        console.log(`Überspringe doppelte Klasse "${cls.name}" im Kurs "${courseName}"`);
        continue;
      }
      // Versuche, die Klasse zu erstellen – falls sie schon global existiert, gibt es einen Fehler.
      let createdClass;
      try {
        createdClass = await prisma.class.create({
          data: {
            name: cls.name,
            difficulty: cls.difficulty,
            daysOfWeek: {},
            pointsRequired: 0,
            //: { create: [] } // Leeres Array für die Many-to-Many-Beziehung
          },
        });
        console.log(`Klasse "${cls.name}" erstellt.`);
      } catch (error) {
        // Falls Unique Constraint verletzt wird, suche die existierende Klasse
        console.log(`Klasse "${cls.name}" existiert bereits, suche existierende Einträge...`);
        createdClass = await prisma.class.findUnique({
          where: { name: cls.name } as any,
        });
      }
      if (!createdClass) continue;
      classIdMap.set(key, { id: createdClass.id, difficulty: cls.difficulty, courseId });
      // Verbinde den Kurs mit der Klasse über die Join-Tabelle CourseClass
      try {
        await prisma.courseClass.create({
          data: {
            courseId: courseId,
            classId: createdClass.id,
          },
        });
        console.log(`Klasse "${cls.name}" mit Kurs "${courseName}" verbunden.`);
      } catch (error) {
        console.log(`Fehler beim Verbinden von "${cls.name}" mit "${courseName}":`, error);
      }
    }
  }
  console.log("Klassen verbunden.");

  // Voraussetzungen erstellen: Für jeden Kurs separat
  console.log("Erstelle Klassen-Voraussetzungen...");
  for (const [courseName, group] of groupedCourses.entries()) {
    const courseId = courseIdMap.get(courseName);
    if (!courseId) continue;
    // Filtere aus der globalen Map nur die Klassen, die diesem Kurs zugeordnet sind.
    const localClasses = Array.from(classIdMap.entries())
      .filter(([key, value]) => value.courseId === courseId)
      .map(([key, value]) => ({ name: key.split("::")[1], id: value.id, difficulty: value.difficulty }))
      .sort((a, b) => a.difficulty - b.difficulty);
    
    for (let i = 1; i < localClasses.length; i++) {
      for (let j = 0; j < i; j++) {
        try {
          await prisma.classPrerequisite.create({
            data: {
              classId: localClasses[i].id,
              prerequisiteId: localClasses[j].id,
            },
          });
          console.log(`Voraussetzung erstellt: ${localClasses[j].name} -> ${localClasses[i].name}`);
        } catch (error) {
          console.log(`Voraussetzung existiert bereits: ${localClasses[j].name} -> ${localClasses[i].name}`);
        }
      }
    }
  }
  console.log("Voraussetzungen erstellt.");

  // Erstelle Degrees und verknüpfe sie mit den zugehörigen Kursen
  console.log("Erstelle Degrees...");
  for (const row of degreesData) {
    await prisma.degree.create({
      data: {
        name: row.degreeName.trim(),
        description: '',
        type: 'Bachelor',
        degreeCourses: {
          create: row.courses
            .filter((course) => course && course.trim() !== '')
            .map((course) => {
              const id = courseIdMap.get(course!.trim());
              if (!id) {
                throw new Error(`Course id for "${course}" not found.`);
              }
              return { course: { connect: { id } } };
            }),
        },
      },
    });
    console.log(`Degree "${row.degreeName.trim()}" erstellt.`);
  }
  console.log("Degrees erstellt.");
  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("Fehler im Seed-Script:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Prisma-Client disconnected.");
  });
