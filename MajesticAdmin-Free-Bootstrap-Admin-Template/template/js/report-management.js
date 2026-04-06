(function () {
  'use strict';

  function parseRowDate(tr) {
    var s = tr.getAttribute('data-upload');
    if (!s) return null;
    var d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
  }

  function startOfDay(d) {
    var x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  function endOfDay(d) {
    var x = new Date(d);
    x.setHours(23, 59, 59, 999);
    return x;
  }

  function applyFilters() {
    var slideEl = document.getElementById('report_filter_slide_id');
    var timeEl = document.getElementById('report_filter_time');
    var resultEl = document.getElementById('report_filter_result');
    var tbody = document.getElementById('report_table_body');
    var summary = document.getElementById('report_list_summary');
    if (!tbody) return;

    var slideQ = (slideEl && slideEl.value || '').trim().toLowerCase();
    var timeMode = timeEl ? timeEl.value : '全部';
    var resultQ = resultEl ? resultEl.value : '全部';
    var fromEl = document.getElementById('report_date_from');
    var toEl = document.getElementById('report_date_to');

    var now = new Date();
    var day7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    var day30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    var customFrom = fromEl && fromEl.value ? startOfDay(new Date(fromEl.value + 'T00:00:00')) : null;
    var customTo = toEl && toEl.value ? endOfDay(new Date(toEl.value + 'T00:00:00')) : null;

    var rows = tbody.querySelectorAll('tr');
    var visible = 0;

    rows.forEach(function (tr) {
      var ok = true;
      var slide = (tr.getAttribute('data-slide') || '').toLowerCase();
      if (slideQ && slide.indexOf(slideQ) === -1) ok = false;

      if (ok && resultQ !== '全部') {
        var r = tr.getAttribute('data-result') || '';
        if (resultQ === '阳性' && r !== 'positive') ok = false;
        if (resultQ === '阴性' && r !== 'negative') ok = false;
        if (resultQ === '待复核' && r !== 'pending') ok = false;
      }

      if (ok && timeMode !== '全部') {
        var dt = parseRowDate(tr);
        if (!dt) ok = false;
        else if (timeMode === '近7天') {
          if (dt < day7) ok = false;
        } else if (timeMode === '近30天') {
          if (dt < day30) ok = false;
        } else if (timeMode === '自定义') {
          if (customFrom && dt < customFrom) ok = false;
          if (customTo && dt > customTo) ok = false;
        }
      }

      tr.style.display = ok ? '' : 'none';
      if (ok) visible++;
    });

    if (summary) {
      summary.textContent = '共' + visible + '条记录（已按条件筛选），当前第1页';
    }
  }

  function resetFilters() {
    var slideEl = document.getElementById('report_filter_slide_id');
    var timeEl = document.getElementById('report_filter_time');
    var resultEl = document.getElementById('report_filter_result');
    var fromEl = document.getElementById('report_date_from');
    var toEl = document.getElementById('report_date_to');
    var customRow = document.getElementById('report_custom_dates_row');

    if (slideEl) slideEl.value = '';
    if (timeEl) timeEl.selectedIndex = 0;
    if (resultEl) resultEl.selectedIndex = 0;
    if (fromEl) fromEl.value = '';
    if (toEl) toEl.value = '';
    if (customRow) customRow.style.display = 'none';

    var tbody = document.getElementById('report_table_body');
    var summary = document.getElementById('report_list_summary');
    if (tbody) {
      tbody.querySelectorAll('tr').forEach(function (tr) {
        tr.style.display = '';
      });
    }
    if (summary && tbody) {
      var total = tbody.querySelectorAll('tr').length;
      summary.textContent = '共' + total + '条记录，当前第1页';
    }
  }

  function toggleCustomDates() {
    var timeEl = document.getElementById('report_filter_time');
    var customRow = document.getElementById('report_custom_dates_row');
    if (!timeEl || !customRow) return;
    customRow.style.display = timeEl.value === '自定义' ? '' : 'none';
  }

  function init() {
    var q = document.getElementById('report_query_btn');
    var r = document.getElementById('report_reset_btn');
    var timeEl = document.getElementById('report_filter_time');
    if (q) q.addEventListener('click', applyFilters);
    if (r) r.addEventListener('click', function (e) {
      e.preventDefault();
      resetFilters();
    });
    if (timeEl) timeEl.addEventListener('change', toggleCustomDates);
    toggleCustomDates();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
