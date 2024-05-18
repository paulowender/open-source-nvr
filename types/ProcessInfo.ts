import { ChildProcessWithoutNullStreams } from "child_process";

export interface ProcessInfo {
  taskid: ChildProcessWithoutNullStreams | null;
  check_after?: number;
  in_progress: boolean;
  error: boolean;
  running: boolean;
  status: string;
}
