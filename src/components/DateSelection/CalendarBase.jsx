import { useState } from "react";

import Calendar from "react-calendar";

import "./DateSelection.css"

function CalendarBase({ onDateChange }) {
  const [fecha, setFecha] = useState(null);

  const todayDate = new Date();

  const maxDate = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth() + 6,
    todayDate.getDate(),
  );

  const handleFechaChange = (date) => {
    setFecha(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  return (
    <Calendar
      value={fecha}
      onChange={handleFechaChange}
      prev2Label={null}
      next2Label={null}
      minDetail="month"
      minDate={new Date()}
      maxDate={maxDate}
    />
  );
}

export default CalendarBase;