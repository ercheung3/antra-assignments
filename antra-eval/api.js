/* ~~~~~~~~~~~~~~~~ Api ~~~~~~~~~~~~~~~~ */
export const Api = (() => {
  // const baseUrl = 'https://jsonplaceholder.typicode.com';
  const baseUrl = "http://localhost:4232";
  const coursePath = "courseList";

  const getCourses = () =>
    fetch([baseUrl, coursePath].join("/")).then((response) => response.json());

  const deleteCourse = (id) =>
    fetch([baseUrl, coursePath, id].join("/"), {
      method: "DELETE",
    });

  const addCourse = (course) =>
    fetch([baseUrl, coursePath].join("/"), {
      method: "POST",
      body: JSON.stringify(course),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());

  return {
    getCourses,
    deleteCourse,
    addCourse,
  };
})();
