// import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

const useErrorHandling = () => {
  // const toast = useToast();

  /**
   * @todo 상태코드에 따라 리다이렉트 등 예외처리 추가
   * @todo 서비스 공통 모달 적용
   */
  const handleError = useCallback(
    (error: AxiosError, customError: { title?: string; message?: string }) => {
      console.error(
        'API 호출 에러:',
        error.response?.data,
        error.message,
        new Date().toISOString(),
      );
      alert(
        `${customError.title || '에러가 발생했습니다.'}\n${customError.message || ''}${error.response?.data}\n${error.message}`,
      );
      // toast({
      //   title: '오류 발생',
      //   description: error.message,
      //   status: 'error',
      //   duration: 3000,
      //   isClosable: true,
      // });
    },
    [],
  );

  return { handleError };
};

export default useErrorHandling;
