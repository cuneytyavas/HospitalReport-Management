import { TechnicianType } from "./technicianTypes";

export type RecordType = {
  _id: string;
  fileNumber: string;
  patientName: string;
  patientSurname: string;
  patientTcId: string;
  diagnosticTitle: string;
  diagnosticDetails: string;
  date: string;
  recordImg: string;
  technician: TechnicianType;
};
export type CreateRecordType = {
  fileNumber: string;
  patientName: string;
  patientSurname: string;
  patientTcId: string;
  diagnosticTitle: string;
  diagnosticDetails: string;
  recordImg: string;
  technician: string | TechnicianType | null | undefined;
};
export type UpdateRecordType = {
  fileNumber?: string;
  patientName?: string;
  patientSurname?: string;
  patientTcId?: string;
  diagnosticTitle?: string;
  diagnosticDetails?: string;
  date?: string;
  recordImg?: string;
  technician?: TechnicianType;
};
