import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./css/DoctorSchedule.css";

const DoctorSchedule = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    const { data, error } = await supabase
      .from("doctor_slots")
      .select("*")
      .order("slot_date", { ascending: true })
      .order("slot_time", { ascending: true });

    if (!error) {
      setSlots(data || []);
    }

    setLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const availableCount = slots.filter((slot) => !slot.is_booked).length;
  const bookedCount = slots.filter((slot) => slot.is_booked).length;

  return (
    <div className="schedule-page">
      <div className="schedule-header">
        <div>
          <h1>Doctor Schedule</h1>
          <p>View all available and booked slots in one place.</p>
        </div>

        <div className="schedule-summary">
          <div className="summary-card available-summary">
            <h3>{availableCount}</h3>
            <span>Available Slots</span>
          </div>

          <div className="summary-card booked-summary">
            <h3>{bookedCount}</h3>
            <span>Booked Slots</span>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="no-slots">Loading schedule...</p>
      ) : slots.length === 0 ? (
        <p className="no-slots">No schedule available yet.</p>
      ) : (
        <div className="schedule-grid">
          {slots.map((slot) => (
            <div key={slot.id} className="schedule-card">
              <div className="card-top">
                <span className="date-chip">{formatDate(slot.slot_date)}</span>

                <span className={`status ${slot.is_booked ? "booked" : "available"}`}>
                  {slot.is_booked ? "Booked" : "Available"}
                </span>
              </div>

              <h2>{formatTime(slot.slot_time)}</h2>

              <p>
                {slot.is_booked
                  ? "This slot has already been reserved."
                  : "This slot is open for patients to book."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorSchedule;