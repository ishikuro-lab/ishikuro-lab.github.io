/* Runs synchronously in <head> before first paint: picks the stored language
   (localStorage "lang", default "ja") and stamps <html data-lang lang> so the
   [data-l] CSS rules show only the active language with no flash.
   Also keeps data-i18n-* attribute translations in sync (title/aria-label on
   static elements). Kept as an external file to satisfy `script-src 'self'`. */
(function () {
  var LANGS = ['ja', 'en', 'de'];
  var html = document.documentElement;

  function read() {
    var l = null;
    try { l = localStorage.getItem('lang'); } catch (e) { /* storage blocked */ }
    return LANGS.indexOf(l) === -1 ? 'ja' : l;
  }

  function applyAttrs(lang) {
    var nodes = document.querySelectorAll('[data-i18n-attr]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var attr = el.getAttribute('data-i18n-attr');
      var val = el.getAttribute('data-i18n-' + lang) || el.getAttribute('data-i18n-en') || el.getAttribute('data-i18n-ja');
      if (attr && val) el.setAttribute(attr, val);
    }
  }

  function apply(lang) {
    html.setAttribute('data-lang', lang);
    html.lang = lang;
  }

  apply(read());
  document.addEventListener('DOMContentLoaded', function () { applyAttrs(read()); });
  document.addEventListener('langchange', function (e) { applyAttrs(e.detail || read()); });
})();
