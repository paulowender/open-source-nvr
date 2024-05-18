import { MLData } from "./MLData";
import { SpawnData } from "./SpawnData";

export interface MovementEntry {
  cameraKey: string;
  startDate: number;
  startSegment: number;
  lhs_seg_duration_seq?: number;
  seconds: number;
  consecutivesecondswithout: number;
  ml?: MLData;
  ml_movejpg?: SpawnData;
  ffmpeg?: SpawnData;
}