import React, { useState, useEffect } from 'react';

const ListContext = React.createContext({
  updateList: () => {},
  handleError: () => {},
  teachers: [],
  courses: [],
  error: null,
});

export const ListContextProvider = (props) => {

  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const updateList = ({data, type}) => {
      
      if(type === 'teachers'){
        setTeachers(data)
      }
      if(type === 'courses') {
        setCourses(data)
      }
    }
    
  const handleError = (error => setError(error))
  
  return (
    <ListContext.Provider
      value={{
        updateList,
        teachers,
        courses,
        handleError,
        error,
      }}
    >
      {props.children}
    </ListContext.Provider>
  )
};

export default ListContext;
