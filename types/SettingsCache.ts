import { Settings } from "./Settings";
import { SettingsStatus } from "./SettingsStatus";

export interface SettingsCache {
  settings: Settings;
  status: SettingsStatus;
}