(function () {
  'use strict';
  const c = {
      trackClicks: !0,
      trackForms: !0,
      trackScrollDepth: !0,
      trackTimeOnPage: !0,
      trackRageClicks: !0,
      trackDeadClicks: !0,
      trackErrors: !0,
      trackFileDownloads: !0,
      trackExternalLinks: !0,
      trackMediaInteractions: !0,
      trackVisibility: !0,
      trackPerformance: !0,
      trackClipboard: !0,
      trackInputChanges: !0,
      trackResizeOrient: !0,
      trackPrint: !0,
      trackBeforeUnload: !0,
      scrollDepthThresholds: [25, 50, 75, 100],
      rageClickThreshold: 3,
      rageClickTimeWindow: 1e3,
      deadClickDelay: 2e3,
      timeOnPageInterval: 15e3,
      maxUrlLength: 200,
      debounceDelay: 150,
    },
    s = {
      scrollDepthTracked: new Set(),
      timeOnPageStart: Date.now(),
      lastActivityTime: Date.now(),
      clickHistory: [],
      isVisible: !document.hidden,
      sessionProps: {},
      totalClicks: 0,
      totalScrolls: 0,
      maxScrollDepth: 0,
    };
  function getId(e) {
    if (!e) return null;
    return (
      e.getAttribute('data-track-name') ||
      e.getAttribute('data-s-event') ||
      e.getAttribute('aria-label') ||
      e.textContent?.trim().substring(0, 50) ||
      e.value?.substring(0, 50) ||
      e.alt ||
      e.title ||
      e.id ||
      e.name ||
      e.className?.split(' ')[0] ||
      e.tagName.toLowerCase()
    );
  }
  function getSel(e) {
    if (!e) return null;
    const p = [];
    let cur = e;
    while (cur && cur !== document.body && p.length < 4) {
      let sel = cur.tagName.toLowerCase();
      if (cur.id) {
        sel += `#${cur.id}`;
        p.unshift(sel);
        break;
      }
      if (cur.className) {
        const cls = cur.className
          .split(' ')
          .filter(c => c)
          .slice(0, 2)
          .join('.');
        if (cls) sel += `.${cls}`;
      }
      p.unshift(sel);
      cur = cur.parentElement;
    }
    return p.join(' > ');
  }
  function getPath(e) {
    return (
      e?.getAttribute('data-s-event-path') ||
      e?.closest('[data-s-event-path]')?.getAttribute('data-s-event-path')
    );
  }
  function parseProps(str) {
    if (!str) return {};
    const props = {};
    str.split(';').forEach(pair => {
      const [k, v] = pair.split('=').map(s => s.trim());
      if (k && v) props[k] = v;
    });
    return props;
  }
  function getProps(e) {
    const attr = e?.getAttribute('data-s-event-props');
    return attr ? parseProps(attr) : {};
  }
  function send(name, pathOrProps, props) {
    if (!window.stonks?.event) return;
    let fp, fpr;
    if (typeof pathOrProps === 'string') {
      fp = pathOrProps;
      fpr = props || {};
    } else {
      fpr = pathOrProps || {};
    }
    const args = [name];
    if (fp) args.push(fp);
    args.push({ ...s.sessionProps, ...fpr });
    window.stonks.event(...args);
  }
  function trunc(url) {
    return url.length > c.maxUrlLength
      ? url.substring(0, c.maxUrlLength) + '...'
      : url;
  }
  function debounce(fn, delay) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), delay);
    };
  }
  function initClicks() {
    if (!c.trackClicks) return;
    document.addEventListener(
      'click',
      function (e) {
        s.totalClicks++;
        const el = e.target.closest(
          'button, a, input[type="submit"], input[type="button"], [role="button"], [onclick], [data-s-event], label, select, [tabindex], details, summary'
        );
        if (!el) return;
        const custEvt = el.getAttribute('data-s-event');
        const name = custEvt || getId(el);
        const custPath = getPath(el);
        const elProps = getProps(el);
        const props = {
          element_type: el.tagName.toLowerCase(),
          element_selector: getSel(el),
          click_x: e.clientX,
          click_y: e.clientY,
          total_clicks: s.totalClicks,
          ...elProps,
        };
        if (el.tagName === 'A') {
          const href = el.href;
          if (href) {
            const isExt =
              href.startsWith('http') &&
              !href.includes(window.location.hostname);
            props.link_type = isExt ? 'external' : 'internal';
            props.link_url = trunc(href);
            props.link_target = el.target || undefined;
            if (isExt && c.trackExternalLinks) {
              send('External Link', custPath, props);
              return;
            }
          }
        }
        if (el.tagName === 'BUTTON' || el.getAttribute('role') === 'button') {
          props.button_type = el.type || undefined;
          props.disabled = el.disabled || undefined;
        }
        send(`Click: ${name}`, custPath, props);
        if (c.trackRageClicks) trackRage(e.clientX, e.clientY, el);
        if (c.trackDeadClicks) trackDead(el);
      },
      !0
    );
    document.addEventListener(
      'dblclick',
      function (e) {
        const el = e.target;
        send('Double Click', {
          element_type: el.tagName.toLowerCase(),
          element_selector: getSel(el),
        });
      },
      !0
    );
    document.addEventListener(
      'contextmenu',
      function (e) {
        const el = e.target;
        send('Right Click', {
          element_type: el.tagName.toLowerCase(),
          element_selector: getSel(el),
        });
      },
      !0
    );
  }
  function trackRage(x, y, el) {
    const now = Date.now();
    s.clickHistory.push({ x, y, time: now, element: el });
    s.clickHistory = s.clickHistory.filter(
      click => now - click.time < c.rageClickTimeWindow
    );
    const recent = s.clickHistory.filter(click => {
      const dist = Math.sqrt(
        Math.pow(click.x - x, 2) + Math.pow(click.y - y, 2)
      );
      return dist < 50;
    });
    if (recent.length >= c.rageClickThreshold) {
      send('Rage Click', {
        element_selector: getSel(el),
        click_count: recent.length,
        coords: `${x},${y}`,
      });
      s.clickHistory = [];
    }
  }
  function trackDead(el) {
    const url = window.location.href;
    const sel = getSel(el);
    setTimeout(() => {
      if (window.location.href === url) {
        send('Dead Click', {
          element_selector: sel,
          element_type: el.tagName.toLowerCase(),
        });
      }
    }, c.deadClickDelay);
  }
  function initForms() {
    if (!c.trackForms) return;
    document.addEventListener('submit', function (e) {
      const form = e.target;
      const name =
        form.getAttribute('data-s-event') || form.id || form.name || 'Form';
      const custPath = getPath(form);
      const fields = form.querySelectorAll('input, select, textarea').length;
      send(`Form Submit: ${name}`, custPath, {
        form_id: form.id || undefined,
        form_name: form.name || undefined,
        form_action: form.action || undefined,
        form_method: form.method || undefined,
        field_count: fields,
      });
    });
    let focused = null;
    document.addEventListener(
      'focus',
      function (e) {
        const f = e.target;
        if (
          f.tagName === 'INPUT' ||
          f.tagName === 'TEXTAREA' ||
          f.tagName === 'SELECT'
        ) {
          focused = f;
        }
      },
      !0
    );
    document.addEventListener(
      'blur',
      function (e) {
        const f = e.target;
        if (f === focused) {
          const fname = f.name || f.id || f.placeholder;
          if (fname && f.value) {
            send('Field Interaction', {
              field_type: f.type || f.tagName.toLowerCase(),
              field_name: fname,
              has_value: !!f.value,
              value_length: (f.value || '').length,
            });
          }
          focused = null;
        }
      },
      !0
    );
    if (c.trackInputChanges) {
      const tracked = new WeakMap();
      document.addEventListener(
        'input',
        debounce(function (e) {
          const f = e.target;
          if (
            f.tagName === 'INPUT' ||
            f.tagName === 'TEXTAREA' ||
            f.tagName === 'SELECT'
          ) {
            const fname = f.name || f.id || f.placeholder || 'unnamed';
            if (!tracked.has(f)) {
              tracked.set(f, !0);
              send('Field Changed', {
                field_type: f.type || f.tagName.toLowerCase(),
                field_name: fname,
              });
            }
          }
        }, c.debounceDelay),
        !0
      );
    }
  }
  function initScroll() {
    if (!c.trackScrollDepth) return;
    const check = () => {
      const pct =
        ((window.scrollY + window.innerHeight) /
          document.documentElement.scrollHeight) *
        100;
      s.maxScrollDepth = Math.max(s.maxScrollDepth, pct);
      s.totalScrolls++;
      c.scrollDepthThresholds.forEach(t => {
        if (pct >= t && !s.scrollDepthTracked.has(t)) {
          s.scrollDepthTracked.add(t);
          send('Scroll Depth', {
            depth_percentage: t,
            max_scroll: Math.round(s.maxScrollDepth),
            total_scrolls: s.totalScrolls,
          });
        }
      });
    };
    window.addEventListener('scroll', debounce(check, c.debounceDelay));
  }
  function initTime() {
    if (!c.trackTimeOnPage) return;
    setInterval(() => {
      if (s.isVisible) {
        const spent = Math.floor((Date.now() - s.timeOnPageStart) / 1e3);
        const active = Math.floor((Date.now() - s.lastActivityTime) / 1e3);
        send('Time on Page', {
          duration_seconds: spent,
          time_since_activity: active,
        });
      }
    }, c.timeOnPageInterval);
  }
  function initDownloads() {
    if (!c.trackFileDownloads) return;
    const dlExt =
      /\.(pdf|zip|rar|7z|tar|gz|exe|dmg|pkg|deb|rpm|apk|ipa|csv|xlsx?|docx?|pptx?|txt|rtf|odt|mp3|mp4|avi|mov|wmv|flv|mkv|wav|flac|aac|jpg|jpeg|png|gif|svg|webp|ico|psd|ai|sketch|fig)$/i;
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a');
      if (!link || !link.href) return;
      try {
        const url = new URL(link.href, window.location.href);
        if (dlExt.test(url.pathname)) {
          const fname = url.pathname.split('/').pop();
          const ext = fname.split('.').pop();
          send('Download', {
            file_name: fname,
            file_url: trunc(link.href),
            file_extension: ext,
            file_size: link.getAttribute('data-size') || undefined,
          });
        }
      } catch (err) {}
    });
  }
  function initMedia() {
    if (!c.trackMediaInteractions) return;
    ['play', 'pause', 'ended', 'seeked', 'volumechange'].forEach(evt => {
      document.addEventListener(
        evt,
        function (e) {
          const m = e.target;
          if (m.tagName === 'VIDEO' || m.tagName === 'AUDIO') {
            const props = {
              media_type: m.tagName.toLowerCase(),
              media_src: trunc(m.currentSrc || m.src),
              duration: Math.floor(m.duration) || 0,
              current_time: Math.floor(m.currentTime) || 0,
            };
            if (evt === 'volumechange') props.volume = m.volume;
            send(`Media ${evt}`, props);
          }
        },
        !0
      );
    });
  }
  function initVisibility() {
    if (!c.trackVisibility) return;
    document.addEventListener('visibilitychange', () => {
      s.isVisible = !document.hidden;
      const spent = Math.floor((Date.now() - s.lastActivityTime) / 1e3);
      send(document.hidden ? 'Page Hidden' : 'Page Visible', {
        time_spent: spent,
        timestamp: Date.now(),
      });
      s.lastActivityTime = Date.now();
    });
  }
  function initErrors() {
    if (!c.trackErrors) return;
    window.addEventListener('error', e => {
      send('JS Error', {
        message: e.message,
        filename: e.filename,
        line: e.lineno,
        column: e.colno,
        error_type: 'error',
      });
    });
    window.addEventListener('unhandledrejection', e => {
      send('Promise Rejection', {
        reason: String(e.reason).substring(0, 200),
        error_type: 'unhandled_rejection',
      });
    });
  }
  function initPerformance() {
    if (!c.trackPerformance) return;
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perf = performance.getEntriesByType('navigation')[0];
        if (perf) {
          const paint = performance.getEntriesByType('paint');
          const fcp = paint.find(p => p.name === 'first-contentful-paint');
          send('Performance', {
            load_time: Math.round(perf.loadEventEnd),
            dom_loaded: Math.round(perf.domContentLoadedEventEnd),
            first_paint: Math.round(paint[0]?.startTime || 0),
            first_contentful_paint: Math.round(fcp?.startTime || 0),
            dom_interactive: Math.round(perf.domInteractive),
            transfer_size: perf.transferSize || 0,
          });
        }
        if ('connection' in navigator) {
          const conn = navigator.connection;
          send('Connection Info', {
            effective_type: conn.effectiveType,
            downlink: conn.downlink,
            rtt: conn.rtt,
            save_data: conn.saveData,
          });
        }
      }, 0);
    });
  }
  function initClipboard() {
    if (!c.trackClipboard) return;
    ['copy', 'paste', 'cut'].forEach(evt => {
      document.addEventListener(evt, e => {
        const txt = window.getSelection()?.toString();
        send(`Clipboard ${evt}`, {
          has_selection: !!txt,
          selection_length: txt?.length || 0,
          target_type: e.target.tagName,
        });
      });
    });
  }
  function initResize() {
    if (!c.trackResizeOrient) return;
    let lastW = window.innerWidth,
      lastH = window.innerHeight;
    window.addEventListener(
      'resize',
      debounce(() => {
        const newW = window.innerWidth,
          newH = window.innerHeight;
        if (newW !== lastW || newH !== lastH) {
          send('Viewport Changed', {
            old_width: lastW,
            old_height: lastH,
            new_width: newW,
            new_height: newH,
            orientation: window.screen.orientation?.type || 'unknown',
          });
          lastW = newW;
          lastH = newH;
        }
      }, 500)
    );
    if (window.screen.orientation) {
      window.screen.orientation.addEventListener('change', () => {
        send('Orientation Changed', {
          orientation: window.screen.orientation.type,
          angle: window.screen.orientation.angle,
        });
      });
    }
  }
  function initPrint() {
    if (!c.trackPrint) return;
    window.addEventListener('beforeprint', () => send('Print Started', {}));
    window.addEventListener('afterprint', () => send('Print Completed', {}));
  }
  function initUnload() {
    if (!c.trackBeforeUnload) return;
    window.addEventListener('beforeunload', () => {
      const spent = Math.floor((Date.now() - s.timeOnPageStart) / 1e3);
      send('Page Exit', {
        total_time: spent,
        total_clicks: s.totalClicks,
        total_scrolls: s.totalScrolls,
        max_scroll_depth: Math.round(s.maxScrollDepth),
      });
    });
  }
  function initHover() {
    const tracked = new WeakSet();
    document.addEventListener(
      'mouseover',
      debounce(function (e) {
        const el = e.target.closest('[data-track-hover], [data-s-hover]');
        if (el && !tracked.has(el)) {
          tracked.add(el);
          const name =
            el.getAttribute('data-track-hover') ||
            el.getAttribute('data-s-hover') ||
            getId(el);
          send(`Hover: ${name}`, { element_selector: getSel(el) });
        }
      }, 300),
      !0
    );
  }
  function initSelection() {
    let lastSel = '';
    document.addEventListener(
      'selectionchange',
      debounce(() => {
        const sel = window.getSelection()?.toString();
        if (sel && sel.length > 10 && sel !== lastSel) {
          lastSel = sel;
          send('Text Selected', {
            length: sel.length,
            preview: sel.substring(0, 50),
          });
        }
      }, 500)
    );
  }
  function initActivity() {
    ['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
      document.addEventListener(
        evt,
        () => {
          s.lastActivityTime = Date.now();
        },
        { passive: !0 }
      );
    });
  }
  function initTracking() {
    if (!window.stonks) {
      setTimeout(initTracking, 100);
      return;
    }
    s.sessionProps = {
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      pixel_ratio: window.devicePixelRatio || 1,
      platform: navigator.platform,
      user_agent: navigator.userAgent.substring(0, 100),
      language: navigator.language,
      languages: navigator.languages?.join(','),
      referrer: document.referrer || undefined,
      cookie_enabled: navigator.cookieEnabled,
      do_not_track: navigator.doNotTrack || undefined,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      online: navigator.onLine,
    };
    initClicks();
    initForms();
    initScroll();
    initTime();
    initDownloads();
    initMedia();
    initVisibility();
    initErrors();
    initPerformance();
    initClipboard();
    initResize();
    initPrint();
    initUnload();
    initHover();
    initSelection();
    initActivity();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTracking);
  } else {
    initTracking();
  }
  window.stonksTracking = {
    config: c,
    updateConfig: cfg => Object.assign(c, cfg),
  };
})();
