import { useCallback } from 'react';
import { toast } from 'react-toastify';
type HttpStatus = number;
interface ServerResponse {
  message?: string;
}

const defaultHandler = (httpMessage: string = '에러가 발생했습니다.') => {
  toast.error(httpMessage);
};

const handlers: Record<HttpStatus | string, (str?: string) => void> = {
  default: defaultHandler,
};

const useApiError = () => {
  const handleError = useCallback((error: Error) => {
    const httpMessage: string | undefined = error.message;

    handlers.default(httpMessage);
  }, []);

  return { handleError };
};
export default useApiError;
