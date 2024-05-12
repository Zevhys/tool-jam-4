import $ from "jquery";
$("#toggle-theme").bind("click", () => {
  $("body").toggleClass("light-mode");
});
