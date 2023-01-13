import { useState, useEffect } from 'react';
const useFetchData = (url) => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(url);

        if (response.status === 200) {
          setData(await response.json());
        }
      } catch (error) {
        setError(error);
      }
    };

    loadData();
  }, [url]);
return { data, error };
};

// const useFetchData = (config) => {
//   const [data, setData] = useState(undefined);
//   const [error, setError] = useState('');




//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const response = await fetch(config.url, {
//           method: config.method ? config.method : 'GET',
//           headers: config.headers ? config.headers : {},
//           body: config.body ? JSON.stringify(config.body) : null,
//         });

//         if (response.status === 200) {
//           setData(await response.json());
//         }
//       } catch (error) {
//         setError(error);
//       }
//     };

//     loadData();
//   }, []);

//   return { data, error };
// };

export default useFetchData;
