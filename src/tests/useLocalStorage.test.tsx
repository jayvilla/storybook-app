import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

describe("useLocalStorage", () => {
  const KEY = "test:key";

  beforeEach(() => {
    localStorage.clear();
  });

  it("returns initial value on first render (SSR-safe)", () => {
    const { result } = renderHook(() => useLocalStorage<string>(KEY, "init"));
    expect(result.current.value).toBe("init");
  });

  it("persists to localStorage on set", () => {
    const { result } = renderHook(() => useLocalStorage<string>(KEY, "init"));
    act(() => result.current.set("hello"));
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify("hello"));
    expect(result.current.value).toBe("hello");
  });

  it("supports functional updates", () => {
    const { result } = renderHook(() => useLocalStorage<number>(KEY, 1));
    act(() => result.current.set((prev) => prev + 1));
    expect(result.current.value).toBe(2);
  });

  it("remove deletes the key and resets to initial", () => {
    const { result } = renderHook(() => useLocalStorage<string>(KEY, "init"));
    act(() => result.current.set("x"));
    act(() => result.current.remove());
    expect(localStorage.getItem(KEY)).toBeNull();
    expect(result.current.value).toBe("init");
  });
});
