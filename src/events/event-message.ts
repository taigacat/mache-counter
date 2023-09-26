import { AppMetadata } from '../models/app-metadata';

export interface EventMessage {
  metadata: AppMetadata;
  event: string;
  data: any;
}
