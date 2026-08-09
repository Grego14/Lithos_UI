/// <reference types="vite/client" />

import 'vitest';

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface Assertion<T> {
    toHaveNoViolations(): void;
  }
  export interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}
