import { useState, useEffect, useContext } from 'react';
// import ListContext from '../store/list-context';

const useFetchData = (config) => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState('');
  // const context = useContext(ListContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(config.url, {
          method: config.method ? config.method : 'GET',
          headers: config.headers ? config.headers : {},
          body: config.body ? JSON.stringify(config.body) : null,
        });

        if (response.status === 200) {
          setData(await response.json());
          // context.updateList({data: await response.json(), type: config.type})
        }
      } catch (error) {
        setError(error);
      }
    };

    loadData();
  }, []);

  return { data, error };
};

export default useFetchData;
