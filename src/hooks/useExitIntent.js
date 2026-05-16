import { useEffect, useRef, useCallback, useState } from 'react';

export function useExitIntent() {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(false);
  const enabled = useRef(true);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    // Empujar un estado extra para detectar el botón "Atrás"
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

    const handleClick = (e) => {
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
          window.history.pushState({ exitIntent: true }, '', window.location.href);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    enabled.current = false; // al cerrar con la X se desactiva el exit-intent
  }, []);

  return { isOpen, closeModal };
}
