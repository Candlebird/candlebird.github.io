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
    : Array.prototype.slice.call(document.querySelectorAll(".recipe"));
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
    secs.forEach(function (s) {
      s.hidden = !s.querySelector(".recipe:not([hidden])");
      if (terms.length || fv) s.open = true;
    });
    count.textContent = shown + (page === "items" ? " items" : " recipes");
    none.hidden = shown !== 0;
  }
  var all = Array.prototype.slice.call(document.querySelectorAll("details"));
  document.getElementById("ex").addEventListener("click", function () { all.forEach(function (d) { d.open = true; }); });
  document.getElementById("co").addEventListener("click", function () {
    all.forEach(function (d) { if (!d.classList.contains("rsec")) d.open = false; });
  });
  function openHash() {
    if (!location.hash) return;
    var el = document.getElementById(location.hash.slice(1));
    if (!el) return;
    for (var p = el; p; p = p.parentElement) if (p.tagName === "DETAILS") p.open = true;
    if (el.scrollIntoView) el.scrollIntoView();
  }
  window.addEventListener("hashchange", openHash);
  q.addEventListener("input", run);
  f.addEventListener("change", run);
  run();
  openHash();
});
