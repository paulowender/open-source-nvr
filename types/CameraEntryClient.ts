import { CameraEntry } from "./CameraEntry";
import { MovementStatus } from "./MovementStatus";
import { ProcessInfo } from "./ProcessInfo";

export interface CameraEntryClient extends CameraEntry {
    key: string;
    ffmpeg_process?: ProcessInfo;
    movementStatus?: MovementStatus;
  }