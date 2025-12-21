(function () {
  'use strict';

  function initTracking() {
    if (!window.stonks) {
      setTimeout(initTracking, 100);
      return;
    }

    document.addEventListener('click', function (e) {
      const element = e.target.closest(
        'button, a, input[type="submit"], [role="button"]'
      );

      if (element) {
        const eventName =
          element.getAttribute('data-track-name') ||
          element.textContent.trim() ||
          element.value ||
          element.getAttribute('aria-label') ||
          element.id ||
          'Click';

        window.stonks.event(eventName, {
          type: element.tagName.toLowerCase(),
          page: window.location.pathname,
        });
      }
    });

    document.addEventListener('submit', function (e) {
      const form = e.target;
      const formName = form.id || form.name || 'Form Submit';

      window.stonks.event(formName, {
        type: 'form',
        page: window.location.pathname,
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTracking);
  } else {
    initTracking();
  }
})();
