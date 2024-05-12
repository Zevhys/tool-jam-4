import $ from "jquery";
import {
  columns,
  addKanbanItem,
  createItemGeneral,
} from "./components";

export let templateItemGeneral = {
  title: "Title",
  url: "",
  description: "",
  // prob should use height, but am too lazy
  descStyle: "",
  checkboxes: [],

  visibility: {
    heading: true,
    desc: true,
  },
}

export let templateCheckbox = {
  name : "",
  checked : false,
}

function getBoardData(board) {
  let boardData = {
    title: board.find("h2 > input[type='text']").val() || "",
    boardItems: [],
  }

  board.find(".kanban-item-container").children(".kanban-item").each((i, e) => {
    const el = $(e);

    let checkboxesData = [];

    el.find(".container").children(".checkbox").each((ci, ce) => {
      checkboxesData.push({
        name: $(ce).find("input[type='text']").val() || "",
        checked: $(ce).find("input[type='checkbox']").is(":checked") || false,
      });
    });

    let data = {
      title: el.find("h3 > input.heading").val() || "",
      url: el.find("input.url-input").val() || "",
      description: el.find("textarea.textbox.note").val() || "",
      descHeight: el.find("textarea.textbox.note").attr("style") || "",
      checkboxes: checkboxesData,
      visibility: {
        heading: !el.find(".container > h3").hasClass("hidden"),
        desc: !el.find(".container > textarea.textbox.note").hasClass("hidden"),
      },
    };

    boardData.boardItems.push(data);
  });

  return boardData;
}

function saveBoards() {
  let data = [];
  for (const col in columns) {
    const colObj = columns[col];
    data.push(getBoardData(colObj.element))
  }
  
  console.log(data);

  localStorage.setItem("boardData", JSON.stringify(data));
}

// Prototype for loading items
// addKanbanItem(
//   createItemGeneral(templateItemGeneral, colObj.element),
// colObj.element);

$("#button-save").on("click", () => {
  saveBoards();
});

window.addEventListener("beforeunload", () => {
  saveBoards();
});

window.setInterval(() => {
  saveBoards();
}, 60000);

window.addEventListener("load", () => {
  // if (localStorage.getItem("boardData") != null) {
  //   console.log(JSON.parse(localStorage.getItem("boardData")))
  // }
});