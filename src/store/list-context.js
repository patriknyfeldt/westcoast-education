import React, { useState, useEffect } from 'react';

const ListContext = React.createContext({
  updateList: () => {},
  teachers: [],
  courses: []
});

export const ListContextProvider = (props) => {

  let [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  const updateList = ({data, type}) => {
    if(type === 'teachers'){
      setTeachers(data)
    }
    if(type === 'courses') {
      setCourses(data)
    }
  }
  
  return (
    <ListContext.Provider
      value={{
        updateList,
        teachers,
        courses,
      }}
    >
      {props.children}
    </ListContext.Provider>
  )
};

export default ListContext;
