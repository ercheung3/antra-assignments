import { Api } from "./api.js";

/* ~~~~~~~~~~~~~~~~ View ~~~~~~~~~~~~~~~~ */
export const View = (() => {
  const domstr = {
    courseContainer: "#courselist_container",
    courselist: ".courselist",
    course: ".course",
    credits: "#credits_container",
    //deletebtn: ".deletebtn",
    //inputbox: ".courselist__input",
  };

  const render = (ele, tmp) => {
    ele.innerHTML = tmp;
  };

  const createTmp = (arr) => {
    let tmp = "";
    arr.forEach((course) => {
      tmp += `
            <li class="course">
              <span>${course.courseName}</span>
              <span>Course Type: ${
                course.required ? "Compulsory" : "Elective"
              } </span>
              <span>Course Credit: ${course.credit} </span>
            </li>
          `;
    });
    return tmp;
  };

  const createTmpCredits = (val) => {
    let tmp = "";
    console.log(val);
    return tmp;
  };
  return {
    domstr,
    render,
    createTmp,
    createTmpCredits,
  };
})();

export const Model = ((api, view) => {
  class Course {
    constructor(courseId, courseName, required, credit) {
      this.courseId = courseId;
      this.courseName = courseName;
      this.required = required;
      this.credit = credit;
    }
  }
  class State {
    #courseList = [];
    #credits = 0;

    get courseList() {
      return this.#courseList;
    }
    set courseList(newCourseList) {
      this.#courseList = [...newCourseList];
      console.log(newCourseList);
      console.log(this.#courseList);
      const courseContainer = document.querySelector(
        view.domstr.courseContainer
      );
      const tmp = view.createTmp(this.#courseList);
      view.render(courseContainer, tmp);

      //Listener
    }

    get credits() {
      return this.#credits;
    }

    set credits(newCredits) {
      this.#credits = newCredits;
    }
  }
  const { getCourses, deleteCourse, addCourse } = api;

  return {
    getCourses,
    deleteCourse,
    addCourse,
    Course,
    State,
  };
})(Api, View);

const Controller = ((model, view) => {
  const state = new model.State();
  /*

  const deleteCourse = () => {
    const courseContainer = document.querySelector(view.domstr.courseContainer);
    courseContainer.addEventListener("click", (event) => {
      if (event.target.className === "deletebtn") {
        state.todolist = state.todolist.filter(
          (course) => +course.id !== +event.target.id
        );
      }
      model.deleteCourse(+event.target.id);
    });
  };

  const addCourse = () => {
    const inputbox = document.querySelector(view.domstr.inputbox);
    inputbox.addEventListener("keyup", (event) => {
      if (event.key === "Enter" && event.target.value.trim()) {
        const newCourse = new model.Course(event.target.value);
        model.addCourse(newCourse).then((course) => {
          state.courselist = [course, ...state.courselist];
        });
        event.target.value = "";
      }
    });
  };
*/
  const selectCourse = () => {
    const courseContainer = document.querySelector(view.domstr.courselist);
    courseContainer.addEventListener("click", (event) => {
      let eventParent = event.target.parentElement;
      if (eventParent.className === "course") {
        eventParent.className = "course add";
        //Add Credit
      } else if (eventParent.className === "course add") {
        eventParent.className = "course";
        //Subtract Credit
      }
    });
  };

  const init = () => {
    model.getCourses().then((courses) => {
      const courseslist = document.querySelector(view.domstr.courselist);
      const tmp = view.createTmp(courses);
      view.render(courseslist, tmp);

      state.courselist = courses;
      console.log(state.courselist);
      console.log(state.credits);
    });
  };

  const bootstrap = () => {
    init();
    selectCourse();
    //deleteCourse();
    //addCourse();
  };

  return {
    bootstrap,
  };
})(Model, View);

Controller.bootstrap();
