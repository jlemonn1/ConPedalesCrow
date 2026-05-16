import { useEffect, useRef, useCallback, useState } from 'react';

export function useExitIntent() {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(false);
  const enabled = useRef(true);
  const touchStartX = useRef(0);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    // ===== iOS Safari fix =====
    // Reemplazamos el estado actual y empujamos DOS estados dummy.
    // En iOS Safari el back/swipe-back navega por el history stack de forma
    // diferente; tener 2 entradas dummy hace que el popstate se dispare
    // de forma fiable tanto en el botón Atrás como en el swipe-back.
    const currentHref = window.location.href;
    window.history.replaceState(
      { exitIntent: true, dummy: true },
      '',
      currentHref
    );
    window.history.pushState(
      { exitIntent: true, dummy: true },
      '',
      currentHref
    );
    window.history.pushState(
      { exitIntent: true, dummy: true },
      '',
      currentHref
    );

    const handlePopState = (event) => {
      if (!enabled.current) return;

      if (isOpenRef.current) {
        // Modal abierto + back -> cierra modal y vuelve a /donar
        setIsOpen(false);
        // Reconstruir la trampa del history para futuros backs
        window.history.pushState(
          { exitIntent: true, dummy: true },
          '',
          window.location.href
        );
        window.history.pushState(
          { exitIntent: true, dummy: true },
          '',
          window.location.href
        );
      } else {
        // /donar + back -> abre modal
        setIsOpen(true);
        // Reconstruir la trampa
        window.history.pushState(
          { exitIntent: true, dummy: true },
          '',
          window.location.href
        );
        window.history.pushState(
          { exitIntent: true, dummy: true },
          '',
          window.location.href
        );
      }
    };

    // ===== Detectar swipe-back en iOS Safari =====
    // El swipe-back en iOS empieza en el borde izquierdo (x < ~30px)
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      if (!enabled.current) return;
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - touchStartX.current;
      // Swipe desde el borde izquierdo hacia la derecha = intento de ir atrás
      // En iOS el swipe-back empieza en x < 30 aproximadamente
      if (touchStartX.current < 40 && diff > 50) {
        // Si el modal NO está abierto, lo abrimos.
        // Si está abierto, dejamos que popstate lo maneje (o lo cerramos aquí)
        if (!isOpenRef.current) {
          e.preventDefault?.();
          setIsOpen(true);
        }
      }
    };

    // ===== Interceptar clicks en fase de CAPTURA =====
    const handleClickCapture = (e) => {
      if (!enabled.current) return;

      const target = e.target.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;

      const isInternal = href.startsWith('/') && !href.startsWith('http');
      const isLeavingDonar = !href.startsWith('/donar');
      const isPlainNavigation =
        !target.getAttribute('target') && !e.ctrlKey && !e.metaKey && !e.shiftKey;

      if (isInternal && isLeavingDonar && isPlainNavigation) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (!isOpenRef.current) {
          setIsOpen(true);
        }
      }
    };

    // ===== Interceptar botones/elementos con data-navigate =====
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
    document.addEventListener('click', handleClickCapture, true);
    document.addEventListener('click', handleButtonClickCapture, true);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClickCapture, true);
      document.removeEventListener('click', handleButtonClickCapture, true);
      document.removeEventListener('touchstart', handleTouchStart, { passive: true });
      document.removeEventListener('touchend', handleTouchEnd, { passive: true });
    };
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    enabled.current = false; // al cerrar con la X se desactiva permanentemente
  }, []);

  return { isOpen, closeModal };
}
