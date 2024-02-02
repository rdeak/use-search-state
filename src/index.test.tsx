import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import useSearchState from "./index";

describe("useSearchState", () => {
  it("should init state successfully", () => {
    const { result } = renderHook(() => useSearchState(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    });

    expect(result.current[0]).toEqual({});
  });

  it("should set value to search param successfully", () => {
    const { result } = renderHook(() => useSearchState(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    });

    act(() => result.current[1]({ x: 1 }));
    expect(result.current[0]).toEqual({ x: "1" });
  });

  it("should add array value to search param successfully", () => {
    const { result } = renderHook(() => useSearchState(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    });

    act(() => result.current[1]({ x: ["1", 2, null] }));

    expect(result.current[0]).toEqual({ x: ["1", "2"] });
  });

  it("should init with search param successfully", () => {
    const { result } = renderHook(() => useSearchState({ x: [1, 2] }), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    });

    expect(result.current[0]).toEqual({ x: ["1", "2"] });
  });

  it("should remove value from search param successfully", () => {
    const { result } = renderHook(() => useSearchState({ x: [1, 2] }), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    });

    act(() => result.current[1]({ x: null, y: [1] }));

    expect(result.current[0]).toEqual({ y: "1" });
  });

  it("should clear state successfully", () => {
    const { result } = renderHook(() => useSearchState(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    });

    act(() => result.current[1]({ x: [1, 2] }));
    act(() => result.current[1](null));

    expect(result.current[0]).toEqual({});
  });
});
