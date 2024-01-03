import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';

import { server } from '../mocks/node';

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
    server.resetHandlers();
});

beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    window.HTMLElement.prototype.hasPointerCapture = vi.fn();
    window.HTMLElement.prototype.releasePointerCapture = vi.fn();
    server.listen();
});
afterAll(() => server.close());
