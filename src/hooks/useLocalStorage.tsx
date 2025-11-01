"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Serializer<T> = (value: T) => string;
type Parser<T> = (raw: string) => T;

const defaultSerializer = <T>(v: T) => JSON.stringify(v);
const defaultParser = <T>(raw: string) => JSON.parse(raw) as T;

/**
 * useLocalStorage
 * React state persisted to localStorage with cross-tab sync.
 *
 * @param key localStorage key
 * @param initial Initial value (used on SSR and first mount if no stored value)
 * @param opts.serializer Custom serializer (default: JSON)
 * @param opts.parser     Custom parser (default: JSON)
 */
export function useLocalStorage<T>(
  key: string,
  initial: T,
  opts?: { serializer?: Serializer<T>; parser?: Parser<T> }
) {
  const serializer = opts?.serializer ?? defaultSerializer<T>;
  const parser = opts?.parser ?? defaultParser<T>;
  const isMounted = useRef(false);

  // SSR-safe initial state (no window access)
  const [value, setValue] = useState<T>(initial);

  // On mount, read from localStorage
  useEffect(() => {
    isMounted.current = true;
    try {
      const raw =
        typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      if (raw != null) {
        setValue(parser(raw));
      } else {
        // persist initial if nothing there
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, serializer(initial));
        }
      }
    } catch {
      // swallow parsing/storage errors and keep initial
    }

    // cross-tab sync
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue != null) {
        try {
          setValue(parser(e.newValue));
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      isMounted.current = false;
      window.removeEventListener("storage", onStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const computed =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, serializer(computed));
          }
        } catch {}
        return computed;
      });
    },
    [key, serializer]
  );

  const remove = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch {}
    setValue(initial);
  }, [initial, key]);

  return { value, set, remove };
}
