import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AppointmentsPage() {
  const [fecha, setFecha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fecha) {
      alert("Por favor, seleccioná una fecha");
      return;
    }
    navigate(`/appointments/available/${fecha}`);
  };

  return (
    <div>
      <h2>Seleccionar fecha para sacar turno</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <button type="submit">Ver turnos disponibles</button>
      </form>
    </div>
  );
}

export default AppointmentsPage;
