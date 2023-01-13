import './Course.scss';

import { useParams, useLocation } from "react-router-dom";

const Course = () => {
    const { courseId } = useParams()
    const {state} = useLocation()
    console.log(state)
    return ( <div> kurs id: {courseId}</div> );
}
 
export default Course;