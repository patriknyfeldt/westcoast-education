import { useState, useEffect, useContext } from 'react';
import ListContext from '../store/list-context';

const useFetchData = (config) => {
  const context = useContext(ListContext);

  useEffect(() => {
    const loadData = async () => {

      try {
        const response = await fetch(config.url, {
          method: config.method ? config.method : 'GET',
          headers: config.headers ? config.headers : {},
          body: config.body ? JSON.stringify(config.body) : null,
        });

        if (response.status === 200) {
          context.updateList({data: await response.json(), type: config.type})
        }
      } catch (error) {
        context.handleError(error);
      }
    };
    if(
      (config.type === 'teachers' && !context.teachers.length) || 
      (config.type === 'courses' && !context.courses.length)){
      loadData();
    }
  }, []);

};

export default useFetchData;
