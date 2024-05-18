export interface Settings {
  disk_base_dir: string;
  enable_cleanup: boolean;
  cleanup_interval: number;
  cleanup_capacity: number;
  enable_ml: boolean;
  mlDir: string;
  mlCmd: string;
}
