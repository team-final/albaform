// 에러 처리를 위한 커스텀 훅을 작성합니다.

// import { useToast } from '@chakra-ui/react'; // 예시로 Chakra UI의 Toast 사용
// import { useCallback } from 'react';
//
// const useErrorHandling = () => {
//   const toast = useToast();
//
//   const handleError = useCallback((error: any) => {
//     console.error('API 호출 에러:', error.message);
//     toast({
//       title: "오류 발생",
//       description: error.message,
//       status: "error",
//       duration: 3000,
//       isClosable: true,
//     });
//   }, [toast]);
//
//   return { handleError };
// };
//
// export default useErrorHandling;
