import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RenderSteps from "../AddCourse/RenderSteps";
import  {getFullDetailsOfCourse}  from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";


function EditCourse() {
   console.log("hit the")
    const dispatch = useDispatch();
    const { courseId } = useParams();
    console.log("EDIT PAGE COURSE ID =", courseId);
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);



    const { token } = useSelector((state) => state.auth)

useEffect(() => {
  const populateCourseDetail = async () => {
    setLoading(true)

    const result = await getFullDetailsOfCourse(courseId, token)

    console.log("RESULT =", result)

    if (result) {
      dispatch(setEditCourse(true))
      dispatch(setCourse(result))
    }

    setLoading(false)
  }

  populateCourseDetail()
}, [courseId, token, dispatch])


    if (loading) {
        return (
            <div>
                Loading....
            </div>
        )
    }

    return (
        <div className="text-richblack-5 w-[70%] mx-auto">
            <h1>Edit Course</h1>

            <div> 
              
                {
                    course ? (<RenderSteps />) : (<p>Course Not Found</p>)
                }
            </div>

        </div>
    )
}


export default EditCourse;
