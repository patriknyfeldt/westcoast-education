import React, { useState } from 'react';

const ListContext = React.createContext({
  getData: () => {},
  teachers: [],
  courses: [],
  error: null,
});

export const ListContextProvider = (props) => {

  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const baseUrl = 'http://localhost:3010/';

  const getData  = async (type) => {
    try {
      const response = await fetch(`${baseUrl}${type}`);
      const data = await response.json();

      if (response.status === 200) {
        if(type === 'teachers'){
          setTeachers(data);
        }
        if(type === 'courses') {
          setCourses(data);
        }  
      }
    } catch (error) {
      setError(error);
    }
  };
  
  return (
    <ListContext.Provider
      value={{
        getData,
        teachers,
        courses,
        error,
      }}
    >
      {props.children}
    </ListContext.Provider>
  )
};

export default ListContext;
