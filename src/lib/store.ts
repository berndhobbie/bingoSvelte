import { writable } from "svelte/store";

export const drawnNumbers = writable(new Set<number>());
