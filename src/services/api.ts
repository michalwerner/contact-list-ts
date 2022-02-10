import type { Contact } from "../types/Contact";
import mockData from "./mockData.json";

let cursor = -1;
const size = 10;

const delay = (time: number): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), time));

export const apiData = async (): Promise<Contact[]> => {
  await delay(1000);
  if (Math.random() > 0.7) {
    throw new Error("Something went wrong");
  }
  cursor += 1;
  const start = cursor * size;
  const end = cursor * size + size;
  return mockData.slice(start, end);
};
