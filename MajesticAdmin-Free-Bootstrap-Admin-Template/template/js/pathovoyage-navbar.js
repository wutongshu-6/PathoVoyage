(function () {
  'use strict';

  var STORAGE_TEAM = 'yinghang_nav_team_read';
  var STORAGE_REVIEW = 'yinghang_nav_review_read';

  function clearBadge(span, storageKey) {
    if (!span) return;
    span.textContent = '';
    span.classList.add('d-none');
    var wrap = span.closest('.count');
    if (wrap) wrap.classList.add('d-none');
    try {
      localStorage.setItem(storageKey, '1');
    } catch (e) {}
  }

  function init() {
    var team = document.getElementById('pvTeamCount');
    var review = document.getElementById('pvReviewCount');

    try {
      if (team && localStorage.getItem(STORAGE_TEAM) === '1') {
        team.textContent = '';
        team.classList.add('d-none');
        var w1 = team.closest('.count');
        if (w1) w1.classList.add('d-none');
      }
      if (review && localStorage.getItem(STORAGE_REVIEW) === '1') {
        review.textContent = '';
        review.classList.add('d-none');
        var w2 = review.closest('.count');
        if (w2) w2.classList.add('d-none');
      }
    } catch (e) {}

    document.querySelectorAll('.pv-nav-count-hit').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var key = el.getAttribute('data-pv-store');
        if (key === 'team') clearBadge(el, STORAGE_TEAM);
        else if (key === 'review') clearBadge(el, STORAGE_REVIEW);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
