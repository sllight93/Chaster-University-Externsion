// components/TopBar.jsx

export default function TopBar() {
    return (
      <div className="bg-pink-200 text-pink-900 flex items-center justify-between px-4 py-2">
        <div className="font-bold text-lg">
          SU <span className="font-normal">0/100</span>
        </div>
        {/* Uhrzeit / Countdown / Username kannst du hier ergänzen */}
        <div className="text-sm">
          Hey User X, today is Friday. You have 07:13:26 left.
        </div>
      </div>
    )
  }
  