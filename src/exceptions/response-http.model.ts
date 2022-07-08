export interface ResponseHttpModel {
  message: string | string[];
  error: string;
  statusCode: number;
}

export interface ErrorResponseHttpModel {
  data: null;
  error: string;
  message: string | string[];
  statusCode: number;
}
