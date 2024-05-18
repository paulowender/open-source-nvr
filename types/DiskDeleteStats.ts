export interface DiskDeleteStats {
  removedMB: number;
  removedFiles: number;
  lastRemovedctimeMs?: number;
  lastRemovedIdx?: number;
}
