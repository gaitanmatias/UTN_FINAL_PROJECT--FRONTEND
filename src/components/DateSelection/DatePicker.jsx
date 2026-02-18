// react
import { useState, useRef, useEffect } from "react";

// dependencias externas
import Calendar from "react-calendar";

// constantes
import { ICONS } from "../../constants/icons";

// estilos
import "./DateSelection.css";

function DatePicker({ value, onDateChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const today = new Date();
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth() + 6,
    today.getDate()
  );

  // convierte string YYYY-MM-DD a obj Date
  const parseDateString = (dateString) => {
    if (!dateString) return new Date();

    const [year, month, day] = dateString.split("-");
    return new Date(year, month - 1, day);
  };

  const handleSelect = (selectedDate) => {
    setIsOpen(false);

    if (onDateChange) {
      onDateChange(selectedDate);
    }
  };

  // cerrar al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // formatea YYYY-MM-DD a DD-MM-YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("-").reverse().join("-");
  };

  return (
    <div ref={wrapperRef} className="date-picker">
      <button
        className="date-picker__button"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {formatDate(value)}
        <span className="date-picker__icon">{ICONS.arrowDown}</span>
      </button>

      {isOpen && (
        <div className="date-picker__calendar">
          <Calendar
            value={parseDateString(value)}
            onChange={handleSelect}
            minDate={today}
            maxDate={maxDate}
            prev2Label={null}
            next2Label={null}
            minDetail="month"
          />
        </div>
      )}
    </div>
  );
}

export default DatePicker;
