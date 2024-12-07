import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Course {
  ID: string;
  MS: string;
  Name: string;
  Credit?: number;
  Desc?: string;
  HS?: number[];
  CreatedBy?: string;
  UpdatedBy?: string;
}

interface Class {
  ID: string;
  Semester: string;
  Name: string;
  CourseId: string;
}

const CourseManager: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClassesVisible, setIsClassesVisible] = useState(false); // Track visibility of class list
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("BearerToken");

        if (id === "all") {
          // Fetch all courses
          const courseResponse = await axios.get(
            "https://dacnpm.thaily.id.vn/admin/api/course/all",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (courseResponse.data.code === "success") {
            setCourses(courseResponse.data.allCourse || []);
          } else {
            throw new Error(courseResponse.data.msg || "Failed to fetch courses");
          }
        } else {
          // Fetch a specific course
          const courseResponse = await axios.get(
            `https://dacnpm.thaily.id.vn/admin/api/course/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (courseResponse.data.status === "success") {
            setCurrentCourse(courseResponse.data.course);
          } else {
            throw new Error(courseResponse.data.message || "Failed to fetch course");
          }

          // Fetch classes for the course
          const classResponse = await axios.get(
            `https://dacnpm.thaily.id.vn/admin/api/class/course/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (classResponse.data.status === "success") {
            setClasses(classResponse.data.classes || []);
          } else {
            throw new Error(classResponse.data.message || "Failed to fetch classes");
          }
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const handleDeleteCourse = async () => {
    if (!currentCourse) return;
    const confirmDelete = window.confirm(`Are you sure you want to delete the course "${currentCourse.Name}"?`);
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("BearerToken");

      const deleteResponse = await axios.delete(
        `https://dacnpm.thaily.id.vn/admin/api/course/delete/${currentCourse.ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (deleteResponse.data.code === "success") {
        alert("Course deleted successfully!");
        navigate("/course/all"); // Redirect to the course list
      } else {
        throw new Error(deleteResponse.data.message || "Failed to delete the course");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the course");
    } finally {
      setLoading(false);
    }
  };

  // Toggle class visibility
  const handleToggleClasses = () => {
    setIsClassesVisible(prevState => !prevState);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-40 flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full flex flex-col items-center max-w-4xl mt-5 mb-5 rounded-lg border border-black p-4 bg-white">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl font-bold mb-4">
            {id === "all" ? "All Courses" : `Course Details: ${currentCourse?.Name}`}
          </h1>
          {id !== "all" && currentCourse && (
            <button
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
              onClick={handleDeleteCourse}
            >
              Delete Course
            </button>
          )}
        </div>

        {id === "all" && (
          <ul className="w-full">
            {courses.map((course) => (
              <li
                key={course.ID}
                className="p-4 border-b hover:bg-gray-200 cursor-pointer"
                onClick={() => handleCourseClick(course.ID)}
              >
                <p className="font-bold">{course.MS}</p>
                <p>{course.Name}</p>
              </li>
            ))}
          </ul>
        )}

        {id !== "all" && currentCourse && (
          <div>
            <p><strong>Course MS:</strong> {currentCourse.MS}</p>
            <p><strong>Credits:</strong> {currentCourse.Credit}</p>
            <p><strong>Description:</strong> {currentCourse.Desc}</p>

            <div className="flex justify-between mt-4">
              <h2 className="text-xl font-semibold">Classes</h2>
              <button
                className="text-blue-500"
                onClick={handleToggleClasses}
              >
                {isClassesVisible ? "Collapse" : "Expand"}
              </button>
            </div>

            {isClassesVisible && (
              <ul className="w-full mt-4">
                {classes.length > 0 ? (
                  classes.map((classItem) => (
                    <li
                      key={classItem.ID}
                      className="p-4 border-b hover:bg-gray-200 cursor-pointer"
                      onClick={() => navigate(`/class/${classItem.ID}`)}
                    >
                      <p><strong>Class Name:</strong> {classItem.Name}</p>
                      <p><strong>Semester:</strong> {classItem.Semester}</p>
                    </li>
                  ))
                ) : (
                  <p>No classes available for this course.</p>
                )}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManager;
