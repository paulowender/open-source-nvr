import { DiskDeleteStats } from "./DiskDeleteStats";

export interface DiskCheckReturn {
  revmovedMBTotal: number;
  folderStats: {
    [folder: string]: DiskDeleteStats;
  };
}
