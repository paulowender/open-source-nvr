export interface CameraEntry {
  delete: boolean;
  name: string;
  folder: string;
  disk: string;
  ip?: string;
  passwd?: string;
  enable_streaming: boolean;
  enable_movement: boolean;
  secWithoutMovement: number;
  secMaxSingleMovement: number;
  mSPollFrequency: number;
  segments_prior_to_movement: number;
  segments_post_movement: number;
  ignore_tags: string[];
}
