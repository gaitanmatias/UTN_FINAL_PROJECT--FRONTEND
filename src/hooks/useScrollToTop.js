import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook que hace scroll al top cuando cambia la ruta
 * Útil para que los usuarios siempre vean el inicio de la página al navegar
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};
