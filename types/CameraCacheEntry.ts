import { CameraEntry } from "./CameraEntry";
import { MovementStatus } from "./MovementStatus";
import { ProcessInfo } from "./ProcessInfo";

export interface CameraCacheEntry {
  ce: CameraEntry;
  ffmpeg_process?: ProcessInfo;
  movementStatus?: MovementStatus;
}
