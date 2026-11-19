function ph(img) {
  var s = document.createElement("span");
  s.className = "ph " + img.getAttribute("data-c") + (img.getAttribute("data-s") ? " " + img.getAttribute("data-s") : "");
  s.setAttribute("aria-hidden", "true");
  s.textContent = img.getAttribute("data-n");
  if (img.parentNode) img.parentNode.replaceChild(s, img);
}
document.addEventListener("DOMContentLoaded", function () {
  var page = document.body.getAttribute("data-page");
  if (page !== "items" && page !== "recipes") return;
  var q = document.getElementById("q"), f = document.getElementById("f"),
      count = document.getElementById("count"), none = document.getElementById("none");
  var rows = page === "items"
    ? Array.prototype.slice.call(document.querySelectorAll(".item"))
    : Array.prototype.slice.call(document.querySelectorAll("tbody tr"));
  var secs = Array.prototype.slice.call(document.querySelectorAll(".rsec"));
  function run() {
    var terms = q.value.toLowerCase().split(/\s+/).filter(Boolean), fv = f.value, shown = 0;
    rows.forEach(function (r) {
      var key = page === "items" ? r.getAttribute("data-type") : r.closest(".rsec").getAttribute("data-table");
      var hay = r.getAttribute("data-q") || "";
      var ok = (!fv || key === fv) && terms.every(function (t) { return hay.indexOf(t) !== -1; });
      r.hidden = !ok;
      if (ok) shown++;
    });
    secs.forEach(function (s) { s.hidden = !s.querySelector("tbody tr:not([hidden])"); });
    count.textContent = shown + (page === "items" ? " items" : " recipes");
    none.hidden = shown !== 0;
  }
  q.addEventListener("input", run);
  f.addEventListener("change", run);
  run();
  if (location.hash) {
    var el = document.getElementById(location.hash.slice(1));
    if (el && el.scrollIntoView) el.scrollIntoView();
  }
});
