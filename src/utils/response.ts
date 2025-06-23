import { ResponseService } from '../interface/responseDTO';

export function generateResponse(data: any, code: number, message: string) {
  const response: ResponseService = {
    data: !data,
    code: code,
    message: message,
  };
  return response;
}
