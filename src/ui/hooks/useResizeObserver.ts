import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for observing element resize events
 */
export const useResizeObserver = <T extends HTMLElement>(
  callback: (entry: ResizeObserverEntry) => void,
  dependencies: React.DependencyList = []
) => {
  const elementRef = useRef<T>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const updateCallback = useCallback(callback, dependencies);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create ResizeObserver
    observerRef.current = new ResizeObserver((entries) => {
      if (entries.length > 0) {
        updateCallback(entries[0]);
      }
    });

    // Start observing
    observerRef.current.observe(element);

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [updateCallback]);

  return elementRef;
};
