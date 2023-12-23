import { renderHook, waitFor } from "@testing-library/react";
import { useCurrencies } from "./useCurrencies";
import { it, expect } from "vitest";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

it("intercept fetch for testing", async () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  const { result } = renderHook(() => useCurrencies(), { wrapper });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
