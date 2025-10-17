import React from "react";
import "./css/DoctorSchedule.css";

const DoctorSchedule = () => {
  const schedule = {
    1: ["10:00 AM", "2:00 PM"],
    2: ["11:00 AM"],
    4: ["9:30 AM", "1:30 PM"],
    5: ["3:00 PM"],
    7: ["10:30 AM"],
    10: ["12:00 PM", "4:00 PM"],
    12: ["9:00 AM"],
    15: ["11:30 AM", "2:30 PM"],
    18: ["10:00 AM"],
    20: ["1:00 PM", "3:30 PM"],
    22: ["9:30 AM"],
    25: ["2:00 PM"],
  };

  const totalDays = 30;
  const startDay = 1; // 1 = Monday (you can shift it)

  return (
    <div className="doctor-schedule">
      <header className="schedule-header">
        Doctor Availability - <span>Dr. John Doe</span> (September 2025)
      </header>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-day-name">
            {day}
          </div>
        ))}

        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} className="calendar-empty"></div>
        ))}

        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const times = schedule[day];

          return (
            <div key={day} className="calendar-cell">
              <h4 className="day-number">{day}</h4>
              {times ? (
                times.map((t) => (
                  <div key={t} className="time-slot">
                    {t}
                  </div>
                ))
              ) : (
                <div className="not-available">Not Available</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorSchedule;
