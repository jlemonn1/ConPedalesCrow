import { useEffect, useRef, useCallback, useState } from 'react';

export function useExitIntent() {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(false);
  const enabled = useRef(true);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

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
        e.stopPropagation();
        e.stopImmediatePropagation(); // Evita que React Router procese el Link
        if (!isOpenRef.current) {
          setIsOpen(true);
        }
      }
    };

    // También interceptar botones/elementos que usen onClick para navegar
    const handleButtonClickCapture = (e) => {
      if (!enabled.current) return;

      const target = e.target.closest('[data-navigate]');
      if (!target) return;

      const href = target.getAttribute('data-navigate');
      if (!href) return;

      const isLeavingDonar = !href.startsWith('/donar');
      if (isLeavingDonar) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (!isOpenRef.current) {
          setIsOpen(true);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleClickCapture, true); // fase de captura
    document.addEventListener('click', handleButtonClickCapture, true);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClickCapture, true);
      document.removeEventListener('click', handleButtonClickCapture, true);
    };
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    enabled.current = false; // al cerrar con la X se desactiva permanentemente
  }, []);

  return { isOpen, closeModal };
}
