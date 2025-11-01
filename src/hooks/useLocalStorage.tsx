"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

type Serializer<T> = (value: T) => string;
type Parser<T> = (raw: string) => T;

const defaultSerializer = <T,>(v: T) => JSON.stringify(v);
const defaultParser = <T,>(raw: string) => JSON.parse(raw) as T;

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
  const isBrowser = useMemo(() => typeof window !== "undefined", []);

  // SSR-safe initial state (no window access)
  const [value, setValue] = useState<T>(initial);

  // On mount & when key/serializer/parser change, read from localStorage
  useEffect(() => {
    if (!isBrowser) return;

    try {
      const raw = window.localStorage.getItem(key);
      if (raw != null) {
        setValue(parser(raw));
      } else {
        // persist initial if nothing there
        window.localStorage.setItem(key, serializer(initial));
      }
    } catch {
      // swallow parsing/storage errors and keep `initial`
    }

    // cross-tab sync (set and remove)
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      try {
        if (e.newValue == null) {
          // key removed elsewhere
          setValue(initial);
        } else {
          setValue(parser(e.newValue));
        }
      } catch {
        // ignore parse errors from other tabs
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [isBrowser, key, parser, serializer, initial]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const computed =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        if (isBrowser) {
          try {
            window.localStorage.setItem(key, serializer(computed));
          } catch {
            // ignore quota/security errors
          }
        }
        return computed;
      });
    },
    [isBrowser, key, serializer]
  );

  const remove = useCallback(() => {
    if (isBrowser) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // ignore
      }
    }
    setValue(initial);
  }, [isBrowser, key, initial]);

  return { value, set, remove };
}
