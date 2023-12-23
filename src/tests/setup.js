import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "../mocks/node";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

beforeAll(() => server.listen());
afterAll(() => server.close());
