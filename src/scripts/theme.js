import $ from "jquery";
$("#toggle-theme").bind("click", () => {
  document.body.classList.toggle("light-mode");
});
