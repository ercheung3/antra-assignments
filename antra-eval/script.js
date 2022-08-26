import { Api } from "./api.js";

/* ~~~~~~~~~~~~~~~~ View ~~~~~~~~~~~~~~~~ */
export const View = (() => {
  const domstr = {
    courseContainer: "#courselist_container",
    courselist: ".courselist",
    course: ".course",
    credits: "#credits_container",
    submitbtn: "#submitbtn",
    courseSelectedContainer: "#courselist_container.selected",
    courseSelectedList: ".courselist.selected",
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
    #selectedList = [];

    get courseList() {
      return this.#courseList;
    }
    set courseList(newCourseList) {
      this.#courseList = [...newCourseList];
      const courseslist = document.querySelector(view.domstr.courselist);
      const tmp = view.createTmp(this.#courseList);
      view.render(courseslist, tmp);
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

    get selectedList() {
      return this.#selectedList;
    }

    set selectedList(newSelectedList) {
      this.#selectedList = newSelectedList;
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

  const selectCourse = () => {
    const MAXIMUM_CREDITS = 18;

    const courseContainer = document.querySelector(view.domstr.courselist);
    courseContainer.addEventListener("click", (event) => {
      let eventParent = event.target.parentElement;
      //id starts at 1; index starts at 0

      //Add Credit and Course
      if (eventParent.className === "course") {
        //Check if over 18 credits
        let courseCredits = state.courseList[eventParent.id - 1].credit;
        let newCredits = state.credits + courseCredits;
        if (newCredits > MAXIMUM_CREDITS) {
          alert("You can only choose up to 18 credits in one semester!");
          return;
        }
        state.selectedList = [
          state.courseList[eventParent.id - 1],
          ...state.selectedList,
        ];
        eventParent.className = "course add";

        state.credits = newCredits;

        //Subtract Credit and Course
      } else if (eventParent.className === "course add") {
        let courseCredits = state.courseList[eventParent.id - 1].credit;
        let newCredits = state.credits - courseCredits;

        state.selectedList = state.selectedList.filter((course) => {
          return course.courseId !== parseInt(eventParent.id);
        });
        eventParent.className = "course";

        state.credits = newCredits;
      }
    });
  };

  const submitCourse = () => {
    const submitButton = document.querySelector(view.domstr.submitbtn);
    submitButton.addEventListener("click", (event) => {
      let message =
        "You have chosen " +
        state.credits +
        " credits for this semester. You cannot change once you submit. Do you want to confirm?";

      if (confirm(message)) {
        const courseSelectedList = document.querySelector(
          view.domstr.courseSelectedList
        );
        const tmp = view.createTmp(state.selectedList);
        view.render(courseSelectedList, tmp);
        submitButton.disabled = true;

        let newCourseList = state.courseList.filter(
          (course) => !state.selectedList.includes(course)
        );
        state.courseList = newCourseList;
      } else {
        console.log("NOT SUBMITTED");
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
    submitCourse();
    //deleteCourse();
    //addCourse();
  };

  return {
    bootstrap,
  };
})(Model, View);

Controller.bootstrap();
