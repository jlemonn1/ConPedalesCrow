import { useEffect, useRef, useCallback, useState } from 'react';
import { useBlocker } from 'react-router-dom';

export function useExitIntent() {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(false);
  const enabled = useRef(true);
  const blockerRef = useRef(null);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // React Router blocker — intercepta Links, useNavigate, history.push, etc.
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (!enabled.current) return false;
    // Bloquear si estamos en /donar y queremos ir a otra ruta interna
    return (
      currentLocation.pathname === '/donar' &&
      nextLocation.pathname !== '/donar'
    );
  });

  useEffect(() => {
    blockerRef.current = blocker;
  }, [blocker]);

  useEffect(() => {
    if (blocker.state === 'blocked') {
      setIsOpen(true);
    }
  }, [blocker.state, blocker.location]);

  useEffect(() => {
    // Empujar un estado extra para detectar el botón "Atrás" del navegador/móvil
    window.history.pushState({ exitIntent: true }, '', window.location.href);

    const handlePopState = () => {
      if (!enabled.current) return;

      if (isOpenRef.current) {
        // Modal abierto + back -> cierra modal y vuelve a /donar
        setIsOpen(false);
        window.history.pushState({ exitIntent: true }, '', window.location.href);
      } else {
        // /donar + back -> abre modal
        setIsOpen(true);
        window.history.pushState({ exitIntent: true }, '', window.location.href);
      }
    };

    // Interceptar clicks en fase de CAPTURA para pillar <a> antes que React Router
    const handleClickCapture = (e) => {
      if (!enabled.current) return;

      const target = e.target.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;

      // Interceptar links internos que salgan de /donar
      const isInternal = href.startsWith('/') && !href.startsWith('http');
      const isLeavingDonar = !href.startsWith('/donar');
      const isPlainNavigation = !target.getAttribute('target') && !e.ctrlKey && !e.metaKey && !e.shiftKey;

      if (isInternal && isLeavingDonar && isPlainNavigation) {
        e.preventDefault();
        if (!isOpenRef.current) {
          setIsOpen(true);
          // Volvemos a empujar estado para que el back siga funcionando
          window.history.pushState({ exitIntent: true }, '', window.location.href);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleClickCapture, true); // fase de captura

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClickCapture, true);
    };
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    enabled.current = false; // al cerrar con la X se desactiva permanentemente
    if (blockerRef.current && blockerRef.current.state === 'blocked') {
      blockerRef.current.reset();
    }
  }, []);

  return { isOpen, closeModal, blocker };
}
