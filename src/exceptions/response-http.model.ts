export interface ResponseHttpModel {
  data: any;
  message: string | string[];
  title: string;
}

export interface ErrorResponseHttpModel {
  data: null;
  error: string;
  message: string | string[];
  statusCode: number;
}
