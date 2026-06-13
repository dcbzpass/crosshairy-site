// Shared environment flags, evaluated once at load.
export const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const POINTER_FINE = window.matchMedia('(pointer:fine)').matches;
