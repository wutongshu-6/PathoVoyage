/**
 * 侧栏收起状态：尽早恢复 + 点击持久化（localStorage + cookie 备份）。
 * 在 vendor.bundle 之后、与 template.js 同区域加载。
 */
(function () {
  'use strict';

  var KEY = 'pv_sidebar_icon_only';
  var COOKIE_MAX_AGE = 31536000;

  function readPref() {
    try {
      var v = localStorage.getItem(KEY);
      if (v === '1' || v === '0') return v;
    } catch (e) {}
    var m = document.cookie.match(new RegExp('(?:^|; )' + KEY + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function writePref(v) {
    try {
      localStorage.setItem(KEY, v);
    } catch (e) {}
    document.cookie = KEY + '=' + encodeURIComponent(v) + ';path=/;max-age=' + COOKIE_MAX_AGE + ';SameSite=Lax';
  }

  function applyFromStorage() {
    if (!document.body) return;
    if (readPref() === '1') {
      document.body.classList.add('sidebar-icon-only');
    }
  }

  function onClickMinimizeCapture(ev) {
    var t = ev.target;
    if (!t || !t.closest) return;
    var btn = t.closest('[data-toggle="minimize"]');
    if (!btn) return;
    ev.preventDefault();
    ev.stopPropagation();
    document.body.classList.toggle('sidebar-icon-only');
    writePref(document.body.classList.contains('sidebar-icon-only') ? '1' : '0');
  }

  /** 侧栏内页面跳转前：把当前 body 的收起状态写回存储，避免整页跳转前未同步。 */
  function onSidebarNavClickCapture(ev) {
    var t = ev.target;
    if (!t || !t.closest) return;
    var a = t.closest('.sidebar a.nav-link[href]');
    if (!a) return;
    var href = (a.getAttribute('href') || '').trim();
    if (!href || href.charAt(0) === '#' || href.indexOf('javascript:') === 0) return;
    writePref(document.body.classList.contains('sidebar-icon-only') ? '1' : '0');
  }

  function scheduleReapply() {
    applyFromStorage();
    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(function () {
        applyFromStorage();
      });
    }
    window.setTimeout(applyFromStorage, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      applyFromStorage();
      scheduleReapply();
    });
  } else {
    applyFromStorage();
    scheduleReapply();
  }

  window.addEventListener('load', applyFromStorage);
  window.addEventListener('pageshow', function (ev) {
    if (readPref() === '1') {
      applyFromStorage();
    }
  });

  document.addEventListener('click', onClickMinimizeCapture, true);
  document.addEventListener('click', onSidebarNavClickCapture, true);
})();
