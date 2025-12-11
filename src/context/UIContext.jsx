import { createContext, useContext, useState, useCallback, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  // ========== Toast ==========
  const showToast = ({
    type = "info",
    message = "",
    position = "top-center",
    autoClose = 3000,
  }) => {
    toast[type](message, {
      position,
      autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  // ========== Confirm Dialog ==========
  const [confirmState, setConfirmState] = useState({
    open: false,
    message: "",
    title: "Confirmar acción",
    acceptLabel: "Aceptar",
    rejectLabel: "Cancelar",
    resolve: null,
  });

  const confirm = useCallback(({ message, title, acceptLabel, rejectLabel }) => {
    return new Promise((resolve) => {
      setConfirmState({
        open: true,
        message,
        title: title || "Confirmar acción",
        acceptLabel: acceptLabel || "Aceptar",
        rejectLabel: rejectLabel || "Cancelar",
        resolve,
      });
    });
  }, []);

  const handleAccept = () => {
    confirmState.resolve(true);
    setConfirmState((prev) => ({ ...prev, open: false }));
  };

  const handleReject = () => {
    confirmState.resolve(false);
    setConfirmState((prev) => ({ ...prev, open: false }));
  };

  // Bloquear scroll cuando está abierto
  useEffect(() => {
    document.body.style.overflow = confirmState.open ? "hidden" : "auto";
  }, [confirmState.open]);

  return (
    <UIContext.Provider value={{ showToast, confirm }}>
      <ToastContainer />
      <ConfirmDialog
        open={confirmState.open}
        title={confirmState.title}
        message={confirmState.message}
        acceptLabel={confirmState.acceptLabel}
        rejectLabel={confirmState.rejectLabel}
        onAccept={handleAccept}
        onReject={handleReject}
      />
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);

import ConfirmDialog from "../components/ConfirmDialog/ConfirmDialog";