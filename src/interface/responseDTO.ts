export interface ResponseService {
  data: any; // Almacenará el resultado de la operacion
  code: number; // Almacena "1" si ocurrio algun problema y "0" si el proceso esta OK
  message: string; // Almacena un mensaje personalizado en la respuesta
}
