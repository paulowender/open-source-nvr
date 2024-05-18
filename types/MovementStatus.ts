import { MovementEntry } from "./MovementEntry";

export interface MovementStatus {
  in_progress: boolean;
  fail: boolean;
  check_after?: number;
  status?: string;
  current_movement?: MovementEntry | null;
}
