import React from "react";
import DoctorsList from "./components/DoctorsList";
import BookAppointment from "./components/BookAppointment";

function App() {
  return (
    <div className="App">
      <h1>🏥 Hospital Appointment System</h1>
      <DoctorsList />
      <BookAppointment />
    </div>
  );
}

export default App;


