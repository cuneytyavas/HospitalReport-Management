import { RecordType } from "./recordTypes";

export type CreateTechnicianType = {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  hospitalId: string;
};
export type UpdateTechnicianType = {
  username?: string;
  email?: string;
  password?: string;
};
export type TechnicianType = {
  _id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  hospitalId: string;
  records: RecordType[];
};
