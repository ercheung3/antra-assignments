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
            <li class="course" id=${course.courseId}>
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
  //Used to calculate credits and selected courses
  const createTmpCredits = (args) => {
    let tmp = "";
    tmp += `<p> Total Credits: ${args}</p>`;
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
      const courseslist = document.querySelector(view.domstr.courselist);
      const tmp = view.createTmp(this.#courseList);
      view.render(courseslist, tmp);

      //Listener
    }

    get credits() {
      return this.#credits;
    }

    set credits(newCredits) {
      this.#credits = newCredits;
      const creditContainer = document.querySelector(view.domstr.credits);
      const tmpCredits = view.createTmpCredits(this.#credits);
      view.render(creditContainer, tmpCredits);
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
    const MAXIMUM_CREDITS = 18;

    const courseContainer = document.querySelector(view.domstr.courselist);
    courseContainer.addEventListener("click", (event) => {
      let eventParent = event.target.parentElement;
      //console.log(eventParent.id);
      //id starts at 1; index starts at 0
      //console.log(state.courseList[eventParent.id - 1]);
      if (eventParent.className === "course") {
        //Check if over 18 credits
        let courseCredits = state.courseList[eventParent.id - 1].credit;
        let newCredits = state.credits + courseCredits;
        if (newCredits > MAXIMUM_CREDITS) {
          alert("You can only choose up to 18 credits in one semester!");
          return;
        }

        eventParent.className = "course add";

        state.credits = newCredits;
        //state.credits += state.courselist[eventParent.id - 1];
      } else if (eventParent.className === "course add") {
        let courseCredits = state.courseList[eventParent.id - 1].credit;
        let newCredits = state.credits - courseCredits;

        eventParent.className = "course";
        //Subtract Credit

        state.credits = newCredits;

        //state.credits -= state.courseList[eventParent.id - 1];
      }
    });
  };

  const init = () => {
    model.getCourses().then((courses) => {
      state.courseList = courses;
      state.credits = 0;
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
