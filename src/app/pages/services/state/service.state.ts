import { IService } from "src/app/models/IService";

export interface ServiceState {
  services: IService[];
};

export const initialState: ServiceState = {
  services: [],
};