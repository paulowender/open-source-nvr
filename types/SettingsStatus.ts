export interface SettingsStatus {
  nextCheckInMinutes: number;
  lastChecked?: Date;
  fail: boolean;
  error?: string;
}
