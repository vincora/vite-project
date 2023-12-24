import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../mocks/node';

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
    server.resetHandlers();
});

beforeAll(() => server.listen());
afterAll(() => server.close());
