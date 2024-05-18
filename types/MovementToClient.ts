import { MovementEntry } from "./MovementEntry";

export interface MovementToClient {
  key: number;
  movement: MovementEntry;
  startDate_en_GB: string;
}
