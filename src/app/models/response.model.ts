export interface Response<T> {
  message: string;
  isSuccess: boolean;
  data: T;
  status: number;
}
