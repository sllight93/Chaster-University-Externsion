// app/pinboard/page.jsx
export default function PinboardPage() {
    const schedule = [
      { time: "09:00", subject: "Mathematik 101" },
      { time: "11:00", subject: "Programmieren 101" },
    ];
  
    const clubs = [
      { id: "1", name: "Coding Club", modifiers: ["Extra Time", "Double Points"] },
      { id: "2", name: "Math Club", modifiers: ["Bonus Task", "Half Duration"] },
    ];
  
    const classProgress = [
      { id: "1", name: "Mathematik 101", progress: 80, grade: "B" },
      { id: "2", name: "Programmieren 101", progress: 60, grade: "C" },
    ];
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Pinboard</h1>
        <section className="mb-4">
          <h2 className="text-xl font-semibold">Stundenplan</h2>
          <ul>
            {schedule.map((item, index) => (
              <li key={index}>
                {item.time} - {item.subject}
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-4">
          <h2 className="text-xl font-semibold">Clubs</h2>
          <ul>
            {clubs.map((club) => (
              <li key={club.id}>
                {club.name} – Modifier: {club.modifiers.join(", ")}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Klassen Fortschritt</h2>
          <ul>
            {classProgress.map((cls) => (
              <li key={cls.id}>
                {cls.name} – Fortschritt: {cls.progress}% – Note: {cls.grade}
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
  