import { JobData } from "./JobData";
import { JobStatus } from "./JobStatus";

export interface JobReturn {
  seq: number;
  status: JobStatus;
  newJob?: JobData;
}
