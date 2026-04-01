import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./css/AppointmentForm.css";

const AppointmentForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [illness, setIllness] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      fetchSlots(selectedDoctor);
    } else {
      setAvailableSlots([]);
      setSelectedSlot(null);
    }
  }, [selectedDoctor]);

  const fetchDoctors = async () => {
    const { data, error } = await supabase.from("doctors").select("*");
    if (!error) setDoctors(data || []);
  };

  const fetchSlots = async (doctorId) => {
    const { data, error } = await supabase
      .from("doctor_slots")
      .select("*")
      .eq("doctor_id", doctorId)
      .eq("is_booked", false)
      .order("slot_date", { ascending: true })
      .order("slot_time", { ascending: true });

    if (!error) setAvailableSlots(data || []);
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

  const bookAppointment = async (e) => {
    e.preventDefault();
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please login first.");
      return;
    }

    if (!selectedDoctor) {
      setMessage("Please select a doctor.");
      return;
    }

    if (!selectedSlot) {
      setMessage("Please select a slot.");
      return;
    }

    const { error: appointmentError } = await supabase.from("appointments").insert({
      patient_id: user.id,
      doctor_id: selectedDoctor,
      slot_id: selectedSlot.id,
      patients_name: patientName,
      patient_age: Number(patientAge),
      illness: illness,
      appointment_date: selectedSlot.slot_date,
      appointment_time: selectedSlot.slot_time,
      status: "booked",
    });

    if (appointmentError) {
      setMessage(appointmentError.message);
      return;
    }

    const { error: slotUpdateError } = await supabase
      .from("doctor_slots")
      .update({ is_booked: true })
      .eq("id", selectedSlot.id);

    if (slotUpdateError) {
      setMessage(slotUpdateError.message);
      return;
    }

    setMessage("Appointment booked successfully.");
    setPatientName("");
    setPatientAge("");
    setIllness("");
    setSelectedSlot(null);
    fetchSlots(selectedDoctor);
  };

  return (
    <div className="appointment-page">
      <div className="appointment-wrapper">
        <div className="appointment-left">
          <div className="appointment-header">
            <span className="badge">Health Bridge Clinic</span>
            <h1>Schedule Your Appointment</h1>
            <p>
              Choose your doctor, fill in the patient details, and reserve a slot
              in a few simple steps.
            </p>
          </div>

          <form className="appointment-form" onSubmit={bookAppointment}>
            <div className="form-group">
              <label>Select Doctor</label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                required
              >
                <option value="">Choose a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.full_name} -{" "}
                    {doctor.specialization || doctor.specialty || "Doctor"}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Patient Full Name</label>
                <input
                  type="text"
                  placeholder="Enter patient's full name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Patient Age</label>
                <input
                  type="number"
                  placeholder="Enter patient's age"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description About Illness</label>
              <textarea
                placeholder="Describe the illness"
                value={illness}
                onChange={(e) => setIllness(e.target.value)}
                required
              />
            </div>

            <div className="slots-section">
              <div className="section-title-row">
                <h2>Available Slots</h2>
                <span className="slot-note">Pick one slot to continue</span>
              </div>

              {availableSlots.length === 0 ? (
                <p className="no-slots">No slots available for this doctor.</p>
              ) : (
                <div className="slot-grid">
                  {availableSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot.id}
                      className={`slot-card ${
                        selectedSlot?.id === slot.id ? "selected-slot" : ""
                      }`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      <span className="slot-date">{formatDate(slot.slot_date)}</span>
                      <span className="slot-time">{formatTime(slot.slot_time)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="book-btn">
              Book Slot
            </button>

            {message && (
              <p
                className={`form-message ${
                  message.toLowerCase().includes("success") ? "success" : "error"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>

        <div className="appointment-right">
          <div className="info-card tips-card">
            <h2>Quick Tips</h2>
            <ul>
              <li>Select the doctor first to view live slots.</li>
              <li>Choose a suitable date and time before booking.</li>
              <li>Enter patient details carefully for correct records.</li>
              <li>Booked slots disappear automatically.</li>
            </ul>
          </div>

          <div className="info-card highlight-card">
            <h2>Why book with us?</h2>
            <p>
              Fast doctor selection, real-time slot availability, smooth booking,
              and better appointment management in one place.
            </p>
          </div>

          <div className="info-card support-card">
            <h2>Need help?</h2>
            <p>
              Select a doctor, choose your slot, and complete the form. Your
              appointment gets saved instantly after booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;