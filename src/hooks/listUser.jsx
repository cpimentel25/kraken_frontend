// import useSWR from 'swr';

// const fetcher = (...args) => fetch(...args).then((res) => res.json());
// const API = 'http://localhost:3004';

// export function ListValues() {
//   const { data, error } = useSWR(`${API}/values`, fetcher, {
//     refreshInterval: 1000,
//     refreshWhenOffline: true,
//   });

//   return {
//     values: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// }
