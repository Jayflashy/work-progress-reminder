
export interface TelexResponse {
  status: string;
  status_code: number;
  message: string;
  task_id: string;
  [key: string]: any;
}
