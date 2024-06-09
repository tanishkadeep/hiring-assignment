import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCourses,
  getCoursesStatus,
  selectAllCourses,
} from "../features/courses/coursesSlice";
import { useEffect } from "react";
import { AppDispatch } from "../app/store";

export const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const courses = useSelector(selectAllCourses);
  const courseStatus = useSelector(getCoursesStatus);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (courseStatus === "idle") {
      dispatch(fetchCourses());
    }
  }, [courseStatus, dispatch]);

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="mt-40 font-extrabold text-2xl text-center text-red-500">
        Course not found
      </div>
    );
  }

  return (
    <div className="my-16 mx-16 sm:mx-24 md:mx-40 flex flex-col justify-center items-center">
      <div>
        <img
          src={course.thumbnail}
          alt={course.name}
          className="rounded-md mb-10 md:max-w-lg"
        />
      </div>
      <div className="text-lg">
        <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8">
          {course.name}
        </div>
        <div>
          <b>Instructor:</b> {course.instructor}
        </div>
        <div>
          <b>Description:</b> {course.description}
        </div>
        <div>
          <b>Enrollment Status:</b> {course.enrollmentStatus}
        </div>
        <div>
          <b>Duration:</b> {course.duration}
        </div>
        <div>
          <b>Schedule:</b> {course.schedule}
        </div>
        <div>
          <b>Location:</b> {course.location}
        </div>
        <div>
          <b>Prerequisites:</b> {course.prerequisites.join(", ")}
        </div>
        <h3 className="text-2xl font-bold mt-8">Syllabus</h3>
        <div className="mt-2">
          {course.syllabus.map((item, index) => (
            <div key={index} className="mb-2">
              <h4 className="font-bold">Week {item.week}</h4>
              <div>
                <b>Topic:</b> {item.topic}
              </div>
              <div>{item.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};