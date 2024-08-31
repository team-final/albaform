// React Query 훅
// API 호출을 React Query와 통합합니다.

// import { useQuery, useMutation } from '@tanstack/react-queries';
// import { fetchData, postData } from './api';
// import useErrorHandling from './useErrorHandling';
//
// export const useFetchData = (url: string) => {
//   const { handleError } = useErrorHandling();
//
//   return useQuery(['fetchData', url], () => fetchData(url), {
//     onError: (error) => handleError(error),
//   });
// };
//
// export const usePostData = (url: string) => {
//   const { handleError } = useErrorHandling();
//
//   return useMutation((data: any) => postData(url, data), {
//     onError: (error) => handleError(error),
//   });
// }
