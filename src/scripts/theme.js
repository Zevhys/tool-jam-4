import $ from "jquery";

$(window).on("load", () => {
  if (localStorage.getItem("setTheme") != null) {
    $("body").toggleClass("light-mode", localStorage.getItem("setTheme") === "light" ? true : false);
  }
});

$("#toggle-theme").bind("click", () => {
  $("body").toggleClass("light-mode");
  localStorage.setItem("setTheme", $("body").hasClass("light-mode") ? "light" : "dark");
});
