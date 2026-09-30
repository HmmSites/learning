/* curriculum.js – baut window.CURRICULUM aus schools.js + subjects-*.js. */
(function () {
  var S = window.SCHOOLS || {}, SU = window.SUBJECTS || {}, out = {};
  Object.keys(S).forEach(function (k) {
    out[k] = {
      name: S[k].name, short: S[k].short, deco: S[k].deco, color: S[k].color,
      info: S[k].info, klassen: S[k].klassen, subjects: SU[k] || {}
    };
  });
  window.CURRICULUM = out;
})();