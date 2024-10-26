import $ from "jquery";
import { columns, addKanbanItem, createItemGeneral } from "./components";

const saveIndicator = $("#saving-indicator");

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
};

export let templateCheckbox = {
  name: "",
  checked: false,
};

// SAVING

function getBoardData(board) {
  let boardData = {
    title: board.find("input[id*='heading']").attr("data-title-val"),
    boardItems: [],
  };

  board
    .find(".kanban-item-container")
    .children(".kanban-item")
    .each((i, e) => {
      const el = $(e);

      let checkboxesData = [];

      el.find(".container")
        .children(".checkbox")
        .each((ci, ce) => {
          checkboxesData.push({
            name: $(ce).find("input[type='text']").val() || "",
            checked:
              $(ce).find("input[type='checkbox']").is(":checked") || false,
          });
        });

      let data = {
        title: el.find("h3 > input.heading").val() || "",
        url: el.find("input.url-input").val() || "",
        description: el.find("textarea.textbox.note").val() || "",
        descStyle: el.find("textarea.textbox.note").attr("style") || "",
        checkboxes: checkboxesData,
        visibility: {
          heading: !el.find(".container > h3").hasClass("hidden"),
          desc: !el
            .find(".container > textarea.textbox.note")
            .hasClass("hidden"),
        },
      };

      boardData.boardItems.push(data);
    });

  return boardData;
}

function saveBoards() {
  saveIndicator.text("saving...");
  saveIndicator.removeClass("loading-fade-out");
  saveIndicator.height();

  let data = [];
  for (const col in columns) {
    const colObj = columns[col];
    data.push(getBoardData(colObj.element));
  }

  localStorage.setItem("boardData", JSON.stringify(data));
  saveIndicator.addClass("loading-fade-out");
}

$("#button-save").on("click", () => {
  saveBoards();
});

window.addEventListener("beforeunload", () => {
  saveBoards();
});

window.setInterval(() => {
  saveBoards();
}, 60000);

// LOADING

window.addEventListener("load", () => {
  if (localStorage.getItem("boardData") != null) {
    const data = JSON.parse(localStorage.getItem("boardData"));
    data.forEach((e, id) => {
      const colObj = columns["col" + (id + 1)];
      const colEl = colObj.element;

      colObj.titleEl.val(e.title);
      colObj.titleEl.attr("data-title-val", e.title);
      // console.log(e);

      // initializeBoard(colObj.element);
      const moveMenu = $(`#move-to-col${id + 1}`);
      moveMenu.text(`Move to ${e.title}`);
      console.log(moveMenu, `Move to ${e.title}`);

      e.boardItems.forEach((itm) => {
        addKanbanItem(createItemGeneral(itm, colEl), colEl);
      });
    });
  } else {
    for (const col in columns) {
      const colObj = columns[col];
      colObj.titleEl.val(colObj.nameDefault);
      colObj.attr("data-title-val", colObj.val(colObj.nameDefault));
    }
  }
});
