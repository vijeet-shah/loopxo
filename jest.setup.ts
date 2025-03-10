// jest.setup.ts
import '@testing-library/jest-dom';

// Import the mock directly
import mockRouter from 'next-router-mock';

// Mock next/router
jest.mock('next/router', () => ({
  __esModule: true,
  ...mockRouter,
}));