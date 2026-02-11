const Config = {
  api: {
    baseUrl: 'https://api.communitrics.com',
    videos: {
      all: 'https://api.communitrics.com/videos/all',
      byChannel: channel =>
        `https://api.communitrics.com/videos/${channel}/all`,
    },
    videoStats: {
      base: 'https://api.communitrics.com/videoStats/',
      byChannel: (channel, videoId) =>
        `https://api.communitrics.com/videoStats/${channel}/${videoId}`,
    },
    rankings: 'https://api.communitrics.com/videos/top10',
    gains: 'https://api.communitrics.com/videos/gains',
    gainsBatch: 'https://api.communitrics.com/videos/gains/batch',
    listing: 'https://api.communitrics.com/videos/listing',
    hourly: (videoId, channel, startDate, endDate) => {
      let url = `https://api.communitrics.com/videos/hourly/${videoId}?channel=${channel}`;
      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;
      return url;
    },
    combinedHistory: {
      mrbeast: 'https://api.communitrics.com/combined-history',
      byChannel: channel =>
        `https://api.communitrics.com/combined-history-${channel}`,
    },
    allVideos: 'https://api.communitrics.com/allvideos',
  },
  channels: [
    {
      id: 'mrbeast',
      name: 'MrBeast',
      avatar: 'https://www.banner.yt/UCX6OQ3DkcsbYNE6H8uQQuVA/avatar',
    },
    {
      id: 'mb2',
      name: 'MrBeast 2',
      avatar: 'https://www.banner.yt/UC4-79UOlP48-QNGgCko5p2g/avatar',
    },
    {
      id: 'mbgaming',
      name: 'MrBeast Gaming',
      avatar: 'https://www.banner.yt/UCIPPMRA040LQr5QPyJEbmXA/avatar',
    },
    {
      id: 'mbreacts',
      name: 'Beast Reacts',
      avatar: 'https://www.banner.yt/UCUaT_39o1x6qWjz7K2pWcgw/avatar',
    },
    {
      id: 'mbphilanthropy',
      name: 'Beast Philanthropy',
      avatar: 'https://www.banner.yt/UCAiLfjNXkNv24uhpzUgPa6A/avatar',
    },
    {
      id: 'mbanimations',
      name: 'Beast Animations',
      avatar: 'https://www.banner.yt/UCZzvDDvaYti8Dd8bLEiSoyQ/avatar',
    },
    {
      id: 'mmbg',
      name: 'More MrBeast Gaming',
      avatar: 'https://www.banner.yt/UCzfPgw5WN9bvMiBz-JJYVyw/avatar',
    },
    {
      id: 'viewstats',
      name: 'Viewstats',
      avatar: 'https://www.banner.yt/UCkop5qDbuFV_kBZC0Z_vakQ/avatar',
    },
    {
      id: 'taylor',
      name: 'Taylor Swift',
      avatar: 'https://www.banner.yt/UCqECaJ8Gagnn7YCbPEzWH6g/avatar',
    },
    {
      id: 'taylornation',
      name: 'Taylor Nation',
      avatar: 'https://www.banner.yt/UC5Nh0Elc5d1sQ8NvirFBKOQ/avatar',
    },
    {
      id: 'sabrina',
      name: 'Sabrina Carpenter',
      avatar: 'https://www.banner.yt/UCPKWE1H6xhxwPlqUlKgHb_w/avatar',
    },
    {
      id: 'pewdiepie',
      name: 'PewDiePie',
      avatar: 'https://www.banner.yt/UC-lHJZR3Gqxm24_Vd_AJ5Yw/avatar',
    },
    {
      id: 'mark',
      name: 'Mark Rober',
      avatar: 'https://www.banner.yt/UCY1kMZp36IQSyNx_9h4mpCg/avatar',
    },
    {
      id: 'stokes',
      name: 'Stokes Twins',
      avatar: 'https://www.banner.yt/UCbp9MyKCTEww4CxEzc_Tp0Q/avatar',
    },
    {
      id: 'cocomelon',
      name: 'Cocomelon - Nursery Rhymes',
      avatar: 'https://www.banner.yt/UCbCmjCuTUZos6Inko4u57UQ/avatar',
    },
    {
      id: 'ronaldo',
      name: 'UR · Cristiano',
      avatar: 'https://www.banner.yt/UCtxD0x6AuNNqdXO9Wp5GHew/avatar',
    },
    {
      id: 'blackpink',
      name: 'BLACKPINK',
      avatar: 'https://www.banner.yt/UCOmHUn--16B90oW2L6FRR3A/avatar',
    },
  ],
  colors: {
    views: '#db421f',
    likes: '#1fb8db',
    comments: '#5bdb1f',
    uploads: '#9f1fdb',
  },
  responsive: {
    breakpoints: { mobile: 480, tablet: 768, desktop: 1024, large: 1280 },
    chartHeights: { mobile: 280, tablet: 350, desktop: 400, large: 450 },
    maxDataPoints: { mobile: 500, tablet: 1000, desktop: 2000, large: 3000 },
  },
  rankings: {
    defaultCount: 10,
    maxCount: 50,
    defaultHours: 24,
    maxHours: 168,
    defaultFilter: 'long',
    defaultMetric: 'views',
  },
  gains: {
    defaultPeriod: 1,
    defaultFilter: 'long',
    defaultMetric: 'views',
    defaultCount: 10,
    minCount: 3,
    maxCount: 50,
    defaultSortMode: 'absolute',
  },

  chartModes: {
    all: {
      label: 'All Data',
      period: 'all',
      dataPoints: 'daily',
      gains: false,
      customizable: true,
    },
    '90d': {
      label: 'Past 90 Days',
      period: 90,
      dataPoints: 'daily',
      gains: false,
    },
    '60d': {
      label: 'Past 60 Days',
      period: 60,
      dataPoints: 'hourly',
      gains: false,
    },
    '30d': {
      label: 'Past 30 Days',
      period: 30,
      dataPoints: 'hourly',
      gains: false,
    },
    '7d': {
      label: 'Past 7 Days',
      period: 7,
      dataPoints: 'hourly',
      gains: false,
    },
    '7dh': {
      label: '7 Day Hourly',
      period: 7,
      dataPoints: 'hourly-chart',
      gains: false,
      customizable: true,
    },
  },
  defaultChartMode: '30d',
  hourly: {
    defaultDays: 7,
  },
};

const Net = {
  inflight: new Map(),
  cache: new Map(),
  defaultTtl: 60 * 60 * 1000,
  scheduledClear: null,

  scheduleNextClear() {
    if (this.scheduledClear) {
      clearTimeout(this.scheduledClear);
    }

    const now = luxon.DateTime.now().setZone('America/New_York');
    const nextClear = now
      .plus({ hours: 1 })
      .startOf('hour')
      .plus({ minutes: 1 });
    const msUntilClear = nextClear.toMillis() - Date.now();

    this.scheduledClear = setTimeout(() => {
      console.log('[Cache] Clearing for backend update');
      this.cache.clear();
      this.scheduleNextClear();
    }, msUntilClear);

    console.log(`[Cache] Will clear at ${nextClear.toFormat('HH:mm')}`);
  },

  async fetchJson(url, options = {}) {
    const now = Date.now();
    const cached = this.cache.get(url);
    if (cached && now < cached.expiry) {
      return cached.data;
    }
    if (this.inflight.has(url)) {
      return this.inflight.get(url);
    }
    const cachedBeforeFetch = cached;

    const p = fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(json => {
        const expiry = Date.now() + this.defaultTtl;
        this.cache.set(url, { expiry, data: json });
        return json;
      })
      .catch(err => {
        if (cachedBeforeFetch && cachedBeforeFetch.data) {
          return cachedBeforeFetch.data;
        }
        throw err;
      })
      .finally(() => {
        this.inflight.delete(url);
      });

    this.inflight.set(url, p);
    return p;
  },

  invalidate(url) {
    this.cache.delete(url);
  },

  invalidatePrefix(prefix) {
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) this.cache.delete(key);
    }
  },

  clear() {
    this.cache.clear();
    this.inflight.clear();
  },
};

Net.scheduleNextClear();

const SessionSettings = {
  setRankingsSettings(settings) {
    try {
      sessionStorage.setItem('rankingsSettings', JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to save rankings settings:', error);
    }
  },
  getRankingsSettings() {
    try {
      const stored = sessionStorage.getItem('rankingsSettings');
      if (stored) return JSON.parse(stored);
    } catch (error) {
      console.warn('Failed to load rankings settings:', error);
    }
    return null;
  },
  setGainsSettings(settings) {
    try {
      sessionStorage.setItem('gainsSettings', JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to save gains settings:', error);
    }
  },
  getGainsSettings() {
    try {
      const stored = sessionStorage.getItem('gainsSettings');
      if (stored) return JSON.parse(stored);
    } catch (error) {
      console.warn('Failed to load gains settings:', error);
    }
    return null;
  },
  clear() {
    try {
      sessionStorage.removeItem('rankingsSettings');
      sessionStorage.removeItem('gainsSettings');
    } catch (error) {
      console.warn('Failed to clear settings:', error);
    }
  },
};

const State = {
  chart: null,
  rawData: {},
  processedData: {},
  videoUploadTime: null,
  currentEntityId: 'mrbeast',
  currentChannel: 'mrbeast',
  selectedMetricIndex: 0,
  isChartReady: false,
  pendingYAxisRange: null,

  isRankingsView: false,
  isGainsView: false,
  isVideosGridView: false,

  currentChartMode: Config.defaultChartMode,
  isGainsMode: false,
  isHourlyGainsMode: false,
  isHourlyMode: false,
  hourlyData: null,
  customDateRangeLabel: null,

  hourlyDateRange: { start: null, end: null },
  customDateRange: { start: null, end: null },
  persistedRange: null,

  chartModeData: new Map(),
  rankingsSettings: {
    videoCount: Config.rankings.defaultCount,
    timePeriod: Config.rankings.defaultHours,
    filter: Config.rankings.defaultFilter,
    metric: Config.rankings.defaultMetric,
  },
  gainsSettings: {
    period: Config.gains.defaultPeriod,
    filter: Config.gains.defaultFilter,
    metric: Config.gains.defaultMetric,
    count: Config.gains.defaultCount,
    sortMode: Config.gains.defaultSortMode,
  },
  cachedRankings: new Map(),
  cachedGains: new Map(),
  lastFetchTime: 0,
  _currentLoadKey: null,
  _dailyCache: null,
  _loadedKey: null,
  _loadPromises: new Map(),
  currentTab: 'combined',

  videosGrid: {
    items: [],
    filter: 'all',
    sortKey: 'uploadTime',
    sortDir: 'desc',
    q: '',
    mode: 'grid',
  },

  loadSettings() {
    const savedRankings = SessionSettings.getRankingsSettings();
    if (savedRankings) {
      this.rankingsSettings = { ...this.rankingsSettings, ...savedRankings };
    }
    const savedGains = SessionSettings.getGainsSettings();
    if (savedGains) {
      this.gainsSettings = { ...this.gainsSettings, ...savedGains };
    }
  },

  saveSettings() {
    if (this.isRankingsView) {
      SessionSettings.setRankingsSettings(this.rankingsSettings);
    }
    if (this.isGainsView) {
      SessionSettings.setGainsSettings(this.gainsSettings);
    }
  },

  getBreakpoint() {
    const w = window.innerWidth || 1024;
    const bp = Config.responsive.breakpoints;
    if (w <= bp.mobile) return 'mobile';
    if (w <= bp.tablet) return 'tablet';
    if (w <= bp.desktop) return 'desktop';
    return 'large';
  },
  isMobile() {
    return this.getBreakpoint() === 'mobile';
  },
  getMaxDataPoints() {
    return Config.responsive.maxDataPoints[this.getBreakpoint()];
  },
  getChartHeight() {
    return Config.responsive.chartHeights[this.getBreakpoint()];
  },

  getMetricName() {
    return (
      ['views', 'likes', 'comments', 'uploads'][this.selectedMetricIndex] ||
      'views'
    );
  },
  isNumericMetric() {
    return this.selectedMetricIndex < 3;
  },
  getChartConfig() {
    return (
      Config.chartModes[this.currentChartMode] ||
      Config.chartModes[Config.defaultChartMode]
    );
  },
  shouldUseHourlyData() {
    const config = this.getChartConfig();
    return config.dataPoints === 'hourly';
  },
  shouldUseDailyData() {
    const config = this.getChartConfig();
    return config.dataPoints === 'daily';
  },
  shouldUseHourlyChart() {
    const config = this.getChartConfig();
    return config.dataPoints === 'hourly-chart';
  },

  reset() {
    this.rawData = {};
    this.processedData = {};
    this.isChartReady = false;
    this.pendingYAxisRange = null;
    this.videoUploadTime = null;
    this.currentChartMode = Config.defaultChartMode;
    this.isGainsMode = false;
    this.isHourlyMode = false;
    this.isVideosGridView = false;
    this.isRankingsView = false;
    this.isGainsView = false;
    this.hourlyData = null;
    this.hourlyDateRange = { start: null, end: null };
    this.customDateRange = { start: null, end: null };
    this.customDateRangeLabel = null;
    this.chartModeData = new Map();
    this._dailyCache = null;
  },
};

const ScrollState = {
  positions: new Map(),

  _key(view, channelId) {
    return `${view}:${channelId}`;
  },

  save(view, channelId) {
    const y = window.scrollY || window.pageYOffset || 0;
    this.positions.set(this._key(view, channelId), y);
  },

  restore(view, channelId) {
    const key = this._key(view, channelId);
    if (!this.positions.has(key)) return false;

    const y = this.positions.get(key);
    if (typeof y === 'number') {
      window.scrollTo(0, y);
      return true;
    }
    return false;
  },

  has(view, channelId) {
    return this.positions.has(this._key(view, channelId));
  },

  clear(view, channelId) {
    this.positions.delete(this._key(view, channelId));
  },
};

const Dom = {
  cache: new Map(),

  getCssVar(name) {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    return (
      value || (name === '--card-background-color' ? '#1e1e1e' : '#db421f')
    );
  },

  get(id) {
    if (this.cache.has(id)) {
      const cached = this.cache.get(id);
      if (document.contains(cached)) return cached;
      this.cache.delete(id);
    }
    const el = document.getElementById(id);
    if (el) this.cache.set(id, el);
    return el;
  },

  create(tag, className, text = '') {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  },

  createImg(src, alt = 'Profile Image') {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.classList.add('profile-image');
    img.loading = 'eager';
    return img;
  },

  removeImg() {
    const existing = document.querySelector('header img.profile-image');
    if (existing) existing.remove();
  },

  updateUrl(path, channel = null, replace = false) {
    let newUrl = `${window.location.origin}${window.location.pathname}`;
    const params = new URLSearchParams();

    if (path === 'rankings' || path === 'gains') {
      params.set('channel', channel || 'mrbeast');
      const tab = path === 'rankings' ? 'rankings' : 'gains';
      params.set('tab', tab);
    } else if (path === 'videos') {
      params.set('channel', channel || 'mrbeast');
      params.set('tab', 'videos');
    } else if (
      path &&
      path.length >= 6 &&
      !Config.channels.find(c => c.id === path)
    ) {
      params.set('data', path);
      if (channel && channel !== 'mrbeast') params.set('channel', channel);
    } else {
      const ch = channel || path || 'mrbeast';
      params.set('channel', ch);
      params.set('tab', 'combined');
    }

    newUrl += `?${params.toString()}`;
    if (replace) {
      window.history.replaceState({}, '', newUrl);
    } else {
      window.history.pushState({}, '', newUrl);
    }
  },

  debounce(callback, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback.apply(this, args), delay);
    };
  },

  enableHorizontalWheelScroll(
    el,
    { requireShift = false, lockPage = false } = {}
  ) {
    if (!el) return;

    el.addEventListener(
      'wheel',
      e => {
        if (requireShift && !e.shiftKey) {
          if (lockPage) {
            e.preventDefault();
            e.stopPropagation();
          }
          return;
        }

        const maxScrollLeft = el.scrollWidth - el.clientWidth;

        if (maxScrollLeft <= 0) {
          if (lockPage) {
            e.preventDefault();
            e.stopPropagation();
          }
          return;
        }

        const before = el.scrollLeft;

        const dominantDelta =
          Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

        el.scrollLeft = Math.min(
          maxScrollLeft,
          Math.max(0, el.scrollLeft + dominantDelta)
        );

        if (lockPage || el.scrollLeft !== before) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      { passive: false }
    );
  },

  show(id) {
    const el = this.get(id);
    if (el) {
      if (id === 'videoInfoCard' || id === 'uploadCountCard') {
        el.style.display = 'flex';
      } else {
        el.style.display = 'block';
      }
    }
  },

  hide(id) {
    const el = this.get(id);
    if (el) el.style.display = 'none';
  },

  setMainView(view) {
    if (view === 'videos') {
      this.show('channelVideosView');
      this.hide('videoStatsView');
      this.hide('rankingsView');
      this.hide('gainsView');
    } else if (view === 'rankings') {
      this.hide('channelVideosView');
      this.hide('videoStatsView');
      this.show('rankingsView');
      this.hide('gainsView');
    } else if (view === 'gains') {
      this.hide('channelVideosView');
      this.hide('videoStatsView');
      this.hide('rankingsView');
      this.show('gainsView');
    } else if (view === 'video') {
      this.hide('channelVideosView');
      this.show('videoStatsView');
      this.hide('rankingsView');
      this.hide('gainsView');
    } else {
      this.hide('channelVideosView');
      this.show('videoStatsView');
      this.hide('rankingsView');
      this.hide('gainsView');
    }

    if (typeof Layout?.setupResponsive === 'function') {
      Layout.setupResponsive();
    }
  },
};

const EditableValue = {
  makeEditable(valueElement, slider, updateCallback) {
    if (!valueElement || !slider) return;

    const min = parseInt(slider.min) || 1;
    const max = parseInt(slider.max) || 100;
    const step = parseInt(slider.step) || 1;

    valueElement.classList.add('editable-value');
    valueElement.setAttribute('title', 'Click and type to change');
    valueElement.setAttribute('tabindex', '0');

    let typedValue = '';
    let typingTimeout = null;
    let updateTimeout = null;

    const applyValue = () => {
      if (typedValue === '') return;

      let newValue = parseInt(typedValue);

      if (!isNaN(newValue)) {
        newValue = Math.max(min, Math.min(max, newValue));
        newValue = Math.round(newValue / step) * step;

        valueElement.textContent = newValue;
        slider.value = newValue;

        if (updateCallback) {
          updateCallback(newValue);
        }
      }

      typedValue = '';
      valueElement.classList.remove('typing');
    };

    const handleTyping = key => {
      clearTimeout(typingTimeout);
      clearTimeout(updateTimeout);

      typedValue += key;
      valueElement.classList.add('typing');

      typingTimeout = setTimeout(() => {
        applyValue();
      }, 800);

      let tempValue = parseInt(typedValue);
      if (!isNaN(tempValue)) {
        tempValue = Math.max(min, Math.min(max, tempValue));
        slider.value = tempValue;

        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
          if (updateCallback) {
            updateCallback(tempValue);
          }
        }, 300);
      }
    };

    valueElement.addEventListener('keydown', e => {
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        handleTyping(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        if (typedValue.length > 0) {
          typedValue = typedValue.slice(0, -1);

          if (typedValue === '') {
            valueElement.classList.remove('typing');
            clearTimeout(typingTimeout);
            clearTimeout(updateTimeout);
          } else {
            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => {
              applyValue();
            }, 800);
          }
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        clearTimeout(typingTimeout);
        clearTimeout(updateTimeout);
        applyValue();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        typedValue = '';
        valueElement.classList.remove('typing');
        valueElement.removeAttribute('data-typing');
        clearTimeout(typingTimeout);
        clearTimeout(updateTimeout);
      }
    });

    valueElement.addEventListener('click', e => {
      e.stopPropagation();
      valueElement.focus();
    });

    valueElement.addEventListener('blur', () => {
      if (typedValue !== '') {
        applyValue();
      } else {
        valueElement.classList.remove('typing');
        valueElement.removeAttribute('data-typing');
      }
    });
  },
};

const Format = {
  axis(value, tickInterval) {
    const abs = Math.abs(value);
    if (abs >= 1e9) {
      const billions = value / 1e9;
      const decimals = tickInterval && tickInterval < 1e7 ? 3 : 1;
      return billions.toFixed(decimals) + 'B';
    } else if (abs >= 1e6) {
      const millions = value / 1e6;
      const decimals = tickInterval && tickInterval < 1e4 ? 2 : 1;
      return millions.toFixed(decimals) + 'M';
    } else if (abs >= 1e3) {
      const thousands = value / 1e3;
      const decimals = tickInterval && tickInterval < 10 ? 2 : 1;
      return thousands.toFixed(decimals) + 'K';
    }
    return Math.round(value).toLocaleString();
  },
  dateTime(luxonDateTime) {
    if (!luxonDateTime || typeof luxonDateTime.toFormat !== 'function') {
      return { dateString: '', timeString: '' };
    }
    return {
      dateString: luxonDateTime.toFormat('ccc, MMM d, yyyy'),
      timeString: luxonDateTime.toFormat('HH:mm:ss'),
    };
  },
};

const DataProcessor = {
  transform(rawData) {
    const processed = {
      timestamps: [],
      series: { views: [], likes: [], comments: [], uploads: [] },
    };
    if (!Array.isArray(rawData)) return processed;

    const isVideoContext = State.currentEntityId !== State.currentChannel;
    if (isVideoContext && State.videoUploadTime && rawData.length > 0) {
      const uploadTimestamp = luxon.DateTime.fromISO(State.videoUploadTime)
        .setZone('America/New_York')
        .toMillis();

      const firstDataTimestamp = rawData[0].timestamp
        ? luxon.DateTime.fromISO(rawData[0].timestamp)
            .setZone('America/New_York')
            .toMillis()
        : luxon.DateTime.fromISO(rawData[0].time)
            .setZone('America/New_York')
            .toMillis();

      const hoursDiff =
        (firstDataTimestamp - uploadTimestamp) / (1000 * 60 * 60);

      if (hoursDiff >= 0.5 && hoursDiff <= 1.5) {
        processed.timestamps.push(uploadTimestamp);
        processed.series.views.push(0);
        processed.series.likes.push(0);
        processed.series.comments.push(0);
        if (rawData[0].uploadCount !== undefined) {
          processed.series.uploads.push(0);
        }
      }
    }

    rawData.forEach(entry => {
      let timestamp;
      if (entry.timestamp) {
        timestamp = luxon.DateTime.fromISO(entry.timestamp)
          .setZone('America/New_York')
          .toMillis();
      } else if (entry.time) {
        timestamp = luxon.DateTime.fromISO(entry.time)
          .setZone('America/New_York')
          .toMillis();
      } else return;

      processed.timestamps.push(timestamp);
      processed.series.views.push(Math.round(entry.views || 0));
      processed.series.likes.push(Math.round(entry.likes || 0));
      processed.series.comments.push(Math.round(entry.comments || 0));

      if (entry.uploadCount !== undefined) {
        processed.series.uploads.push(Math.round(entry.uploadCount || 0));
      }
    });

    return processed;
  },

  downsample(timestamps, values) {
    if (!timestamps || !values || timestamps.length !== values.length)
      return [];
    const dataPoints = timestamps.map((time, i) => [time, values[i]]);
    const maxPoints = State.getMaxDataPoints();
    if (dataPoints.length <= maxPoints) return dataPoints;

    const step = Math.floor(dataPoints.length / maxPoints);
    const result = [];
    for (let i = 0; i < dataPoints.length; i += step) {
      result.push(dataPoints[i]);
    }
    if (result[result.length - 1] !== dataPoints[dataPoints.length - 1]) {
      result.push(dataPoints[dataPoints.length - 1]);
    }
    return result;
  },

  dailyFirstPoint(timestamps, values) {
    const map = new Map();
    for (let i = 0; i < timestamps.length; i++) {
      const ts = timestamps[i];
      const dt = luxon.DateTime.fromMillis(ts, {
        zone: 'America/New_York',
      });
      const key = dt.toFormat('yyyy-MM-dd');
      if (!map.has(key)) {
        map.set(key, { ts, val: values[i] });
      }
    }
    return Array.from(map.values())
      .sort((a, b) => a.ts - b.ts)
      .map(e => [e.ts, e.val]);
  },

  spanInDays(timestamps) {
    if (!timestamps || !timestamps.length) return 0;
    const first = luxon.DateTime.fromMillis(timestamps[0], {
      zone: 'America/New_York',
    }).startOf('day');
    const last = luxon.DateTime.fromMillis(timestamps[timestamps.length - 1], {
      zone: 'America/New_York',
    }).startOf('day');
    return Math.max(0, Math.floor(last.diff(first, 'days').days));
  },

  processGains(timestamps, values) {
    if (
      !timestamps ||
      !values ||
      timestamps.length !== values.length ||
      timestamps.length < 2
    ) {
      return [];
    }
    const gains = [];
    for (let i = 1; i < timestamps.length; i++) {
      const gain = values[i] - values[i - 1];
      gains.push([timestamps[i], gain]);
    }
    return gains;
  },

  processDailyGains(timestamps, values) {
    if (
      !timestamps ||
      !values ||
      timestamps.length !== values.length ||
      timestamps.length < 2
    ) {
      return [];
    }

    const rawDataPoints = timestamps.map((ts, i) => ({
      timestamp: luxon.DateTime.fromMillis(ts, {
        zone: 'America/New_York',
      }).toISO(),
      views: State.processedData.series.views[i],
      likes: State.processedData.series.likes[i],
      comments: State.processedData.series.comments[i],
    }));

    const dailyData = this.processDaily(rawDataPoints, true);
    const gains = [];

    for (let i = 1; i < dailyData.length; i++) {
      const current = dailyData[i];
      const previous = dailyData[i - 1];

      const metricKey = State.getMetricName();
      const gain = current[metricKey] - (previous[metricKey] || 0);

      const timestamp = luxon.DateTime.fromISO(current.timestamp, {
        zone: 'America/New_York',
      }).toMillis();

      gains.push([timestamp, gain]);
    }

    return gains;
  },

  downsamplePairs(points) {
    const max = State.getMaxDataPoints();
    if (!Array.isArray(points) || points.length <= max) return points || [];
    const step = Math.floor(points.length / max) || 1;
    const result = [];
    for (let i = 0; i < points.length; i += step) {
      result.push(points[i]);
    }
    const last = points[points.length - 1];
    const lastIn = result[result.length - 1];
    if (!lastIn || lastIn[0] !== last[0]) result.push(last);
    return result;
  },

  seriesPointsForChart(metricKey) {
    const values = State.processedData.series[metricKey];
    const ts = State.processedData.timestamps;
    if (!values || !ts || !ts.length || values.length !== ts.length) return [];
    const spanDays = this.spanInDays(ts);

    let points;
    if (spanDays > 90) {
      points = this.dailyFirstPoint(ts, values);
    } else {
      points = ts.map((t, i) => [t, values[i]]);
    }
    return this.downsamplePairs(points);
  },

  calcYRange(seriesData, xMin = null, xMax = null) {
    if (!seriesData || seriesData.length === 0) return { min: 0, max: 100 };

    let visibleData = seriesData;
    if (xMin !== null && xMax !== null) {
      visibleData = seriesData.filter(point => {
        const x = Array.isArray(point) ? point[0] : point.x;
        return x >= xMin && x <= xMax;
      });
      if (visibleData.length === 0) visibleData = seriesData;
    }

    const yValues = visibleData
      .map(point => (Array.isArray(point) ? point[1] : point.y))
      .filter(val => typeof val === 'number' && !isNaN(val) && isFinite(val));

    if (yValues.length === 0) return { min: 0, max: 100 };

    const minVal = Math.min(...yValues);
    const maxVal = Math.max(...yValues);
    const range = maxVal - minVal;
    const padding = Math.max(range * 0.05, 1);

    let calcMin = minVal - padding;
    let calcMax = maxVal + padding;

    if (State.isNumericMetric() && calcMin < 0 && minVal >= 0) calcMin = 0;
    if (calcMax <= calcMin)
      calcMax = calcMin + (calcMin > 0 ? calcMin * 0.1 : 100);

    return { min: calcMin, max: calcMax };
  },

  getCurrentSeries() {
    const metric = State.getMetricName();
    let points;

    if (State.isHourlyGainsMode && metric !== 'uploads') {
      const values = State.processedData.series[metric];
      const timestamps = State.processedData.timestamps;
      points = this.processGains(timestamps, values);

      if (Array.isArray(points) && points.length > 0) {
        const first2025Index = points.findIndex(([ts]) => {
          const dt = luxon.DateTime.fromMillis(ts, {
            zone: 'America/New_York',
          });
          return dt.year === 2025;
        });
        if (first2025Index !== -1) {
          const first2025Ts = points[first2025Index][0];
          const isZero = points[first2025Index][1] === 0;
          if (!isZero) {
            points = points.filter(([ts]) => ts !== first2025Ts);
          }
        }
      }
    } else if (State.isGainsMode && metric !== 'uploads') {
      const values = State.processedData.series[metric];
      const timestamps = State.processedData.timestamps;
      points = this.processDailyGains(timestamps, values);

      if (Array.isArray(points) && points.length > 0) {
        const first2025Index = points.findIndex(([ts]) => {
          const dt = luxon.DateTime.fromMillis(ts, {
            zone: 'America/New_York',
          });
          return dt.year === 2025;
        });
        if (first2025Index !== -1) {
          const first2025Ts = points[first2025Index][0];
          const isZero = points[first2025Index][1] === 0;
          if (!isZero) {
            points = points.filter(([ts]) => ts !== first2025Ts);
          }
        }
      }
    } else {
      points = this.seriesPointsForChart(metric);
      if (Array.isArray(points) && points.length > 0) {
        const first2025Index = points.findIndex(([ts]) => {
          const dt = luxon.DateTime.fromMillis(ts, {
            zone: 'America/New_York',
          });
          return dt.year === 2025;
        });
        if (first2025Index !== -1) {
          const first2025Ts = points[first2025Index][0];
          const isZero =
            State.videoUploadTime &&
            first2025Ts ===
              luxon.DateTime.fromISO(State.videoUploadTime)
                .setZone('America/New_York')
                .toMillis() &&
            points[first2025Index][1] === 0;
          if (!isZero) {
            points = points.filter(([ts]) => ts !== first2025Ts);
          }
        }
      }
    }
    return points;
  },

  processDaily(data, useTimestamp = false) {
    const dailyMap = new Map();
    if (!Array.isArray(data)) return [];
    for (let i = 0; i < data.length; i++) {
      const entry = data[i];
      const iso = useTimestamp ? entry.timestamp : entry.time;
      if (!iso) continue;

      const dt = luxon.DateTime.fromISO(iso).setZone('America/New_York');
      const dateKey = dt.toFormat('yyyy-MM-dd');

      if (!dailyMap.has(dateKey)) {
        const adjusted = { ...entry };
        const adjustedDT = dt.minus({ days: 1 });
        if (useTimestamp) {
          adjusted.timestamp = adjustedDT.toISO();
        } else {
          adjusted.time = adjustedDT.toISO();
        }
        adjusted._originalTime = iso;
        dailyMap.set(dateKey, adjusted);
      }
    }

    const arr = Array.from(dailyMap.values()).sort((a, b) => {
      const da = new Date(useTimestamp ? a.timestamp : a.time);
      const db = new Date(useTimestamp ? b.timestamp : b.time);
      return da - db;
    });

    return arr;
  },
};

const YAxisBounds = {
  state: {
    customMin: null,
    customMax: null,
    isCustom: false,
  },
  button: null,

  init() {
    return this.createButton();
  },

  createButton() {
    if (this.button && document.body.contains(this.button)) return this.button;

    const chart = Dom.get('videoChart');
    const parent = chart?.parentElement;
    if (!parent) return null;

    const button = document.createElement('button');
    button.className = 'y-axis-bounds-btn';
    button.innerHTML = '<i class="fas fa-arrows-alt-v"></i>';
    button.title = 'Set Y-Axis Bounds';
    button.onclick = () => this.openModal();

    const vt =
      window.VideoTypeToggle?.button ||
      document.querySelector('.video-type-toggle');
    const dp =
      window.CustomDatePicker?.datePickerButton ||
      document.querySelector('.custom-date-picker-button');
    const ref = (vt && vt.parentElement === parent ? vt : dp) || null;

    if (
      ref &&
      ref.parentElement === parent &&
      typeof ref.after === 'function'
    ) {
      ref.after(button);
    } else {
      parent.insertBefore(button, chart);
    }

    this.button = button;
    this.createModal();
    return this.button;
  },

  show() {
    if (!this.button) this.createButton();
    if (this.button) {
      this.button.classList.add('show');
      this.button.style.display = 'flex';

      if (this.state.isCustom) {
        this.button.classList.add('active');
      }
    }
  },

  hide() {
    if (this.button) {
      this.button.classList.remove('show');
      this.button.style.display = 'none';
    }
  },

  createModal() {
    if (document.getElementById('yAxisBoundsModal')) return;

    const modal = document.createElement('div');
    modal.id = 'yAxisBoundsModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Set Y-Axis Bounds</h3>
          <button class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <label>Minimum:</label>
            <input type="number" id="yAxisMin" step="any" placeholder="Auto">
          </div>
          <div class="input-group">
            <label>Maximum:</label>
            <input type="number" id="yAxisMax" step="any" placeholder="Auto">
          </div>
        </div>
        <div class="modal-footer">
          <button class="reset-btn">Reset to Default</button>
          <button class="apply-btn">Apply</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-btn').onclick = () => this.closeModal();
    modal.querySelector('.reset-btn').onclick = () => this.reset();
    modal.querySelector('.apply-btn').onclick = () => this.apply();
    modal.onclick = e => {
      if (e.target === modal) this.closeModal();
    };
    modal.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.apply();
      }
    });
  },

  openModal() {
    const modal = document.getElementById('yAxisBoundsModal');
    if (!modal) return;

    const minInput = document.getElementById('yAxisMin');
    const maxInput = document.getElementById('yAxisMax');

    if (this.state.isCustom) {
      minInput.value = this.state.customMin ?? '';
      maxInput.value = this.state.customMax ?? '';
    } else {
      minInput.value = '';
      maxInput.value = '';
    }

    modal.classList.add('active');
  },

  closeModal() {
    const modal = document.getElementById('yAxisBoundsModal');
    if (modal) modal.classList.remove('active');
  },

  reset() {
    this.state.customMin = null;
    this.state.customMax = null;
    this.state.isCustom = false;

    const minInput = document.getElementById('yAxisMin');
    const maxInput = document.getElementById('yAxisMax');
    minInput.value = '';
    maxInput.value = '';

    if (this.button) {
      this.button.classList.remove('active');
    }

    if (State.chart?.yAxis?.[0]) {
      const series = State.chart.series.filter(s => s.visible);
      const allValues = [];
      series.forEach(s => {
        s.data.forEach(p => {
          if (p?.y != null) allValues.push(p.y);
        });
      });

      if (allValues.length > 0) {
        const minVal = Math.min(...allValues);
        const maxVal = Math.max(...allValues);
        const range = maxVal - minVal;
        const padding = Math.max(range * 0.05, 1);
        let min = minVal - padding;
        let max = maxVal + padding;

        const isGainsMode = State.isGainsMode || State.isHourlyGainsMode;
        if (!isGainsMode && State.isNumericMetric() && min < 0 && minVal >= 0) {
          min = 0;
        }
        if (max <= min) max = min + (min > 0 ? min * 0.1 : 100);

        State.chart.yAxis[0].setExtremes(min, max, true, true);
      }
    }

    this.closeModal();
  },

  apply() {
    const minInput = document.getElementById('yAxisMin');
    const maxInput = document.getElementById('yAxisMax');

    const minVal = minInput.value ? parseFloat(minInput.value) : null;
    const maxVal = maxInput.value ? parseFloat(maxInput.value) : null;

    if (minVal !== null && maxVal !== null && minVal >= maxVal) {
      alert('Minimum must be less than maximum');
      return;
    }

    const computeAuto = () => {
      const series = State.chart?.series?.filter(s => s.visible) || [];
      const values = [];
      series.forEach(s => {
        s.data.forEach(p => {
          if (p && p.y != null && isFinite(p.y)) values.push(p.y);
        });
      });
      if (values.length === 0) return { min: 0, max: 100 };
      const minV = Math.min(...values);
      const maxV = Math.max(...values);
      const span = maxV - minV;
      const pad = Math.max(span * 0.05, 1);
      let autoMin = minV - pad;
      let autoMax = maxV + pad;
      const isGainsMode = State.isGainsMode || State.isHourlyGainsMode;
      if (!isGainsMode && State.isNumericMetric() && autoMin < 0 && minV >= 0) {
        autoMin = 0;
      }
      if (autoMax <= autoMin)
        autoMax = autoMin + (autoMin > 0 ? autoMin * 0.1 : 100);
      return { min: autoMin, max: autoMax };
    };

    const auto = computeAuto();
    const newMin = minVal !== null ? minVal : auto.min;
    const newMax = maxVal !== null ? maxVal : auto.max;

    this.state.customMin = minVal;
    this.state.customMax = maxVal;
    this.state.isCustom = minVal !== null || maxVal !== null;

    if (this.button && this.state.isCustom) {
      this.button.classList.add('active');
    } else if (this.button) {
      this.button.classList.remove('active');
    }

    if (State.chart?.yAxis?.[0]) {
      State.chart.yAxis[0].setExtremes(newMin, newMax, true, true);
    }

    this.closeModal();
  },

  getCurrentBounds() {
    if (this.state.isCustom) {
      return {
        min: this.state.customMin,
        max: this.state.customMax,
      };
    }
    return null;
  },
};

const ChartBuilder = {
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 219, g: 66, b: 31 };
  },

  gradient(color) {
    const rgb = this.hexToRgb(color);
    return {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: [
        [0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.75)`],
        [1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`],
      ],
    };
  },

  series() {
    if (CombinedMetricsFilter?.state?.filterMode === 'overlay') {
      const metricKey = State.getMetricName();
      const overlay = CombinedMetricsFilter.getOverlaySeries(metricKey);
      if (!overlay || (!overlay.short?.length && !overlay.long?.length)) {
        return [];
      }
      const shortColor = '#FF6B6B';
      const longColor = '#4ECDC4';
      return [
        {
          name:
            State.isGainsMode || State.isHourlyGainsMode
              ? 'Shorts Gains'
              : 'Shorts',
          data: overlay.short || [],
          visible: true,
          color: shortColor,
          fillColor: this.gradient(shortColor),
          lineWidth: State.isMobile() ? 2 : 3,
          boostThreshold: 2500,
        },
        {
          name:
            State.isGainsMode || State.isHourlyGainsMode
              ? 'Longform Gains'
              : 'Longform',
          data: overlay.long || [],
          visible: true,
          color: longColor,
          fillColor: this.gradient(longColor),
          lineWidth: State.isMobile() ? 2 : 3,
          boostThreshold: 2500,
        },
      ];
    }

    const configs = [
      {
        name: 'Views',
        key: 'views',
        visible: State.selectedMetricIndex === 0,
      },
      {
        name: 'Likes',
        key: 'likes',
        visible: State.selectedMetricIndex === 1,
      },
      {
        name: 'Comments',
        key: 'comments',
        visible: State.selectedMetricIndex === 2,
      },
    ];

    if (State.processedData.series.uploads?.length > 0) {
      configs.push({
        name: 'Uploads',
        key: 'uploads',
        visible: State.selectedMetricIndex === 3,
      });
    }

    return configs.map(config => {
      let seriesData;
      let seriesName = config.name;

      if (
        (State.isGainsMode || State.isHourlyGainsMode) &&
        config.key !== 'uploads'
      ) {
        seriesData = DataProcessor.getCurrentSeries();
        if (State.isHourlyGainsMode) {
          seriesName = `Hourly ${config.name} Gains`;
        } else {
          seriesName = `Daily ${config.name} Gains`;
        }
      } else {
        seriesData = DataProcessor.seriesPointsForChart(config.key);
        if (Array.isArray(seriesData) && seriesData.length > 0) {
          const first2025Index = seriesData.findIndex(([ts]) => {
            const dt = luxon.DateTime.fromMillis(ts, {
              zone: 'America/New_York',
            });
            return dt.year === 2025;
          });
          if (first2025Index !== -1) {
            const first2025Ts = seriesData[first2025Index][0];
            const isZero =
              State.videoUploadTime &&
              first2025Ts ===
                luxon.DateTime.fromISO(State.videoUploadTime)
                  .setZone('America/New_York')
                  .toMillis() &&
              seriesData[first2025Index][1] === 0;
            if (!isZero) {
              seriesData = seriesData.filter(([ts]) => ts !== first2025Ts);
            }
          }
        }
      }

      return {
        name: seriesName,
        data: seriesData,
        visible: config.visible,
        color: Config.colors[config.key],
        fillColor: this.gradient(Config.colors[config.key]),
        lineWidth: State.isMobile() ? 2 : 3,
        boostThreshold: 2500,
      };
    });
  },

  hourlySeries(hourlyData) {
    const metric = State.getMetricName();
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#FFA07A',
      '#98D8C8',
      '#F7DC6F',
      '#BB8FCE',
    ];

    const series = [];
    const now = luxon.DateTime.now().setZone('America/New_York');
    const currentHour = now.hour;
    this._first2025DateStr = null;

    hourlyData.dates.forEach((dateStr, index) => {
      if (!this._first2025DateStr) {
        const dt = luxon.DateTime.fromISO(dateStr, {
          zone: 'America/New_York',
        });
        if (dt.year === 2025) this._first2025DateStr = dateStr;
      }
      if (dateStr === this._first2025DateStr) return;

      const dateData = hourlyData.data[dateStr];
      const values = dateData[metric];
      const points = [];
      const date = luxon.DateTime.fromISO(dateStr, {
        zone: 'America/New_York',
      });
      const isToday =
        date.toFormat('yyyy-MM-dd') === now.toFormat('yyyy-MM-dd');

      let skipNext = false;
      for (let hour = 0; hour < 24; hour++) {
        const value = values[hour];
        if (isToday && hour > currentHour) break;
        if (skipNext) {
          points.push([hour, null]);
          skipNext = false;
          continue;
        }
        if (value === null) {
          points.push([hour, null]);
          skipNext = true;
          continue;
        }
        points.push([hour, value]);
      }

      if (points.length > 0) {
        const label = date.toFormat('EEE, MMM d');
        series.push({
          name: label,
          data: points,
          color: colors[index % colors.length],
          lineWidth: State.isMobile() ? 2 : 2.5,
          type: 'line',
          connectNulls: false,
          boostThreshold: 0,
          dateISO: date.toISODate(),
        });
      }
    });

    return series;
  },

  events() {
    return {
      load: function () {
        State.isChartReady = true;
        if (State.pendingYAxisRange) {
          const { min, max } = State.pendingYAxisRange;
          if (this.yAxis?.[0]) this.yAxis[0].setExtremes(min, max, true, false);
          State.pendingYAxisRange = null;
        }
        if (!State.isHourlyMode && State.persistedRange) {
          try {
            const xa = this.xAxis?.[0];
            if (
              xa &&
              Number.isFinite(xa.dataMin) &&
              Number.isFinite(xa.dataMax)
            ) {
              const xMin = Math.max(xa.dataMin, State.persistedRange.xMin);
              const xMax = Math.min(xa.dataMax, State.persistedRange.xMax);
              if (xMax > xMin) {
                xa.setExtremes(xMin, xMax, false, false);
                this.redraw(false);
              }
            }
          } catch {}
        }
      },
      redraw: function () {
        const isGainsMode = State.isGainsMode || State.isHourlyGainsMode;
        const customBounds = YAxisBounds.getCurrentBounds();
        if (
          !customBounds &&
          !isGainsMode &&
          State.isNumericMetric() &&
          this.yAxis?.[0] &&
          this.yAxis[0].min < 0 &&
          this.yAxis[0].dataMin >= 0
        ) {
          this.yAxis[0].setExtremes(0, null, false, false);
        }
      },
    };
  },

  calculateOptimalTickInterval(axis, dataRange, minPixelsBetweenTicks = 80) {
    const axisLength =
      axis === 'x'
        ? (State.chart?.chartWidth || 800) - 100
        : (State.chart?.chartHeight || 400) - 100;
    const maxTicks = Math.floor(axisLength / minPixelsBetweenTicks);
    const roughInterval = dataRange / maxTicks;

    if (axis === 'x') {
      const hour = 3600000;
      const day = 86400000;
      const week = 604800000;
      if (roughInterval < 6 * hour) return 6 * hour;
      if (roughInterval < 12 * hour) return 12 * hour;
      if (roughInterval < day) return day;
      if (roughInterval < 2 * day) return 2 * day;
      if (roughInterval < 7 * day) return 7 * day;
      return Math.ceil(roughInterval / week) * week;
    }

    const magnitude = Math.pow(10, Math.floor(Math.log10(roughInterval)));
    const normalized = roughInterval / magnitude;
    let nice;
    if (normalized < 1.5) nice = 1;
    else if (normalized < 3) nice = 2;
    else if (normalized < 7) nice = 5;
    else nice = 10;
    return nice * magnitude;
  },

  xAxis(isHourly = false) {
    if (isHourly) {
      return {
        title: {
          text: 'Hour of Day (EST)',
          style: {
            color: Dom.getCssVar('--text-color'),
            fontSize: State.isMobile() ? '13px' : '16px',
            fontWeight: '600',
          },
          margin: State.isMobile() ? 15 : 25,
        },
        categories: Array.from({ length: 24 }, (_, i) => {
          const hour = i % 12 || 12;
          const period = i < 12 ? 'am' : 'pm';
          return `${hour}${period}`;
        }),
        labels: {
          style: {
            color: Dom.getCssVar('--text-color'),
            fontSize: State.isMobile() ? '11px' : '13px',
            fontWeight: '500',
          },
          autoRotation: [-45, -90],
          formatter: function () {
            const visibleTicks = this.axis.tickPositions || [];
            const pixelsBetween = this.axis.width / visibleTicks.length;
            if (State.isMobile() && pixelsBetween < 50) {
              return this.pos % 2 === 0 ? this.value : '';
            }
            return this.value;
          },
        },
        tickPositioner: function () {
          const positions = [];
          const dataMax = 23;
          const interval = State.isMobile() ? 2 : 1;
          for (let i = 0; i <= dataMax; i += interval) {
            positions.push(i);
          }
          return positions;
        },
        gridLineColor: Dom.getCssVar('--border-color'),
        gridLineWidth: 1,
        gridLineDashStyle: 'Dash',
        lineColor: Dom.getCssVar('--border-color'),
        lineWidth: 2,
        tickColor: Dom.getCssVar('--border-color'),
        tickWidth: 1,
        tickLength: 5,
      };
    }

    return {
      title: {
        text: 'Time (EST)',
        style: {
          color: Dom.getCssVar('--text-color'),
          fontSize: State.isMobile() ? '13px' : '16px',
          fontWeight: '600',
        },
        margin: State.isMobile() ? 15 : 20,
      },
      type: 'datetime',
      labels: {
        formatter: function () {
          const dt = luxon.DateTime.fromMillis(this.value, {
            zone: 'America/New_York',
          });
          const range = this.axis.max - this.axis.min;
          if (State.isMobile()) {
            if (range <= 86400000) return dt.toFormat('HH:mm');
            return dt.toFormat('MM/dd');
          } else {
            if (range <= 86400000) return dt.toFormat('HH:mm<br/>MM/dd');
            if (range <= 604800000) return dt.toFormat('MM/dd<br/>HH:mm');
            return dt.toFormat('MMM dd<br/>yyyy');
          }
        },
        style: {
          color: Dom.getCssVar('--text-color'),
          fontSize: State.isMobile() ? '11px' : '13px',
          fontWeight: '500',
        },
        autoRotation: [-10, -20, -30, -45],
      },
      tickPositioner: function () {
        const dataMin = this.dataMin;
        const dataMax = this.dataMax;
        const dataRange = dataMax - dataMin;
        const optimalInterval = ChartBuilder.calculateOptimalTickInterval(
          'x',
          dataRange,
          State.isMobile() ? 60 : 80
        );
        const positions = [];
        let current = Math.ceil(dataMin / optimalInterval) * optimalInterval;
        while (current <= dataMax) {
          positions.push(current);
          current += optimalInterval;
        }
        return positions;
      },
      gridLineColor: Dom.getCssVar('--border-color'),
      gridLineWidth: 1,
      gridLineDashStyle: 'Dash',
      lineColor: Dom.getCssVar('--border-color'),
      lineWidth: 2,
      tickColor: Dom.getCssVar('--border-color'),
      tickWidth: 1,
      tickLength: 5,
      minorTickLength: 3,
      minorGridLineColor: Dom.getCssVar('--border-color'),
      minorGridLineWidth: 0.5,
      minorGridLineDashStyle: 'Dot',
      events: {
        afterSetExtremes: function (e) {
          if (
            typeof e.min === 'number' &&
            typeof e.max === 'number' &&
            e.max > e.min
          ) {
            State.persistedRange = { xMin: e.min, xMax: e.max };
          }

          const customBounds = YAxisBounds.getCurrentBounds();
          if (customBounds) return;

          if (!State.isMobile() && State.isChartReady && this.chart?.series) {
            const xMin = e.min ?? this.dataMin;
            const xMax = e.max ?? this.dataMax;

            const visiblePoints = [];
            this.chart.series.forEach(series => {
              if (!series.visible) return;
              series.data.forEach(p => {
                const x = p.x;
                if (typeof x !== 'number') return;
                if (x < xMin || x > xMax) return;
                visiblePoints.push(p);
              });
            });

            if (visiblePoints.length > 0 && this.chart.yAxis?.[0]) {
              const range = DataProcessor.calcYRange(visiblePoints, xMin, xMax);
              this.chart.yAxis[0].setExtremes(range.min, range.max, true, {
                duration: 300,
                easing: 'easeOutQuart',
              });
            }
          }
        },
      },
    };
  },

  yAxis(range, isHourly = false) {
    const isUploads =
      !isHourly &&
      State.selectedMetricIndex === 3 &&
      State.processedData.series.uploads?.length > 0;

    const metric =
      State.getMetricName().charAt(0).toUpperCase() +
      State.getMetricName().slice(1);
    let metricName = `${metric}`;
    if (isHourly) {
      metricName = `Hourly ${
        State.getMetricName().charAt(0).toUpperCase() +
        State.getMetricName().slice(1)
      }`;
    } else if (State.isHourlyGainsMode && State.getMetricName() !== 'uploads') {
      metricName = `Hourly ${metric} Gains`;
    } else if (State.isGainsMode && State.getMetricName() !== 'uploads') {
      metricName = `Daily ${metric} Gains`;
    }

    const config = {
      title: {
        text: metricName,
        style: {
          color: Dom.getCssVar('--text-color'),
          fontSize: State.isMobile() ? '13px' : '16px',
          fontWeight: '600',
        },
        margin: State.isMobile() ? 15 : 20,
      },
      labels: {
        style: {
          color: Dom.getCssVar('--text-color'),
          fontSize: State.isMobile() ? '11px' : '13px',
          fontWeight: '500',
        },
        formatter: function () {
          return isUploads
            ? Math.round(this.value).toLocaleString()
            : Format.axis(this.value, this.axis.tickInterval);
        },
        align: 'right',
        x: -5,
        y: 4,
      },
      gridLineColor: Dom.getCssVar('--border-color'),
      gridLineWidth: 1,
      gridLineDashStyle: 'Dash',
      lineColor: Dom.getCssVar('--border-color'),
      lineWidth: 2,
      tickColor: Dom.getCssVar('--border-color'),
      tickWidth: 1,
      tickLength: 5,
      minorTickLength: 3,
      minorGridLineColor: Dom.getCssVar('--border-color'),
      minorGridLineWidth: 0.5,
      minorGridLineDashStyle: 'Dot',
      min: range.min,
      max: range.max,
      startOnTick: true,
      endOnTick: true,
      allowDecimals: !isUploads,
      softMin: range.min,
      softMax: range.max,
    };

    const customBounds = YAxisBounds.getCurrentBounds();
    const isGainsMode = State.isGainsMode || State.isHourlyGainsMode;
    if (
      !customBounds &&
      State.isNumericMetric() &&
      range.min === 0 &&
      !isGainsMode
    ) {
      config.floor = 0;
      config.minPadding = 0;
    }

    return config;
  },

  tooltip(isHourly = false) {
    return {
      backgroundColor: Dom.getCssVar('--card-background-color'),
      borderColor: Dom.getCssVar('--border-color'),
      style: {
        color: Dom.getCssVar('--text-color'),
        fontSize: State.isMobile() ? '12px' : '14px',
      },
      formatter: function () {
        const isVideoContext = State.currentEntityId !== State.currentChannel;
        let dt;
        if (isHourly) {
          const seriesDateISO = this.series?.userOptions?.dateISO;
          if (seriesDateISO) {
            dt = luxon.DateTime.fromISO(seriesDateISO, {
              zone: 'America/New_York',
            }).set({ hour: this.x });
          } else {
            dt = luxon.DateTime.now().setZone('America/New_York').set({
              hour: this.x,
              minute: 0,
              second: 0,
              millisecond: 0,
            });
          }
        } else {
          dt = luxon.DateTime.fromMillis(this.x, { zone: 'America/New_York' });
        }

        const dateStr = dt.toFormat('MMM d, yyyy');
        const timeStr = dt.toFormat('ha').toLowerCase();

        let daySuffix = '';
        if (isVideoContext && State.videoUploadTime) {
          const uploadStart = luxon.DateTime.fromISO(State.videoUploadTime, {
            zone: 'America/New_York',
          }).startOf('day');
          const pointStart = dt.startOf('day');
          const rawDays = Math.floor(pointStart.diff(uploadStart, 'days').days);
          const dayNumber = Math.max(1, rawDays + 1);
          daySuffix = ` • Day ${dayNumber.toLocaleString()}`;
        }

        let header = `<b>${dateStr}, ${timeStr}${daySuffix}</b><br/>`;
        if (isHourly) {
          const metricName =
            State.getMetricName().charAt(0).toUpperCase() +
            State.getMetricName().slice(1);
          const value = this.y.toLocaleString();
          return `${header}${
            this.series.name
          }: ${value} ${metricName.toLowerCase()}`;
        } else {
          let body = '';
          for (const point of this.points) {
            const value = point.y.toLocaleString();
            body += `${point.series.name}: ${value}<br/>`;
          }
          return header + body;
        }
      },
      shared: !isHourly,
      useHTML: true,
      borderRadius: 10,
      shadow: {
        color: 'rgba(0,0,0,0.5)',
        offsetX: 2,
        offsetY: 2,
        opacity: 1,
      },
      hideDelay: 0,
      animation: false,
      followPointer: true,
      positioner: function (labelWidth, labelHeight, point) {
        const chart = this.chart;
        const chartWidth = chart.chartWidth;
        const chartHeight = chart.chartHeight;
        const tooltipPadding = 15;

        let x = point.plotX + chart.plotLeft;
        let y = point.plotY + chart.plotTop;

        x = x + tooltipPadding;

        if (x + labelWidth > chartWidth) {
          x = point.plotX + chart.plotLeft - labelWidth - tooltipPadding;
        }

        y = point.plotY + chart.plotTop - labelHeight / 2;

        if (y < 0) {
          y = tooltipPadding;
        } else if (y + labelHeight > chartHeight) {
          y = chartHeight - labelHeight - tooltipPadding;
        }

        return { x, y };
      },
    };
  },
};

const Charts = {
  validate() {
    if (State.isHourlyMode) {
      return State.hourlyData && State.hourlyData.dates?.length > 0;
    }
    if (!State.processedData.timestamps?.length) return false;
    const currentSeries = DataProcessor.getCurrentSeries();
    return currentSeries && currentSeries.length > 0;
  },

  destroy() {
    if (State.chart) {
      try {
        State.chart.destroy();
      } catch (e) {}
      State.chart = null;
    }
  },

  async create({ animate = true } = {}) {
    const container = Dom.get('videoChart');
    if (!container) return false;
    container.innerHTML = '';

    if (!this.validate()) {
      container.innerHTML =
        "<div style='text-align:center;padding:20px;'>No data available for the selected metric.</div>";
      return false;
    }

    this.destroy();
    State.isChartReady = false;

    if (typeof Highcharts === 'undefined') {
      container.innerHTML =
        '<div style="text-align:center;padding:20px;color:red;">Chart library not loaded</div>';
      return false;
    }

    const cardBg = Dom.getCssVar('--card-background-color');
    const textColor = Dom.getCssVar('--text-color');
    const isHourly = State.isHourlyMode;

    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
      if (isHourly) chartContainer.classList.add('hourly-mode');
      else chartContainer.classList.remove('hourly-mode');
    }

    const computeRangeFromSeries = (seriesList, xMin = null, xMax = null) => {
      const values = [];
      if (Array.isArray(seriesList)) {
        seriesList.forEach(s => {
          if (!s || !Array.isArray(s.data)) return;
          s.data.forEach(pt => {
            const x = Array.isArray(pt) ? pt[0] : pt?.x;
            const y = Array.isArray(pt) ? pt[1] : pt?.y;
            if (y == null || !isFinite(y)) return;
            if (xMin != null && xMax != null) {
              if (x < xMin || x > xMax) return;
            }
            values.push(y);
          });
        });
      }
      if (values.length === 0) return { min: 0, max: 100 };

      const minVal = Math.min(...values);
      const maxVal = Math.max(...values);
      const range = maxVal - minVal;
      const padding = Math.max(range * 0.05, 1);

      let min = minVal - padding;
      let max = maxVal + padding;

      const customBounds = YAxisBounds.getCurrentBounds();
      if (!customBounds) {
        const isGainsMode = State.isGainsMode || State.isHourlyGainsMode;
        if (!isGainsMode && State.isNumericMetric() && min < 0 && minVal >= 0) {
          min = 0;
        }
      }

      if (max <= min) {
        max = min + (min > 0 ? min * 0.1 : 100);
      }

      return { min, max };
    };

    let seriesConfig;
    let yRange;

    if (isHourly) {
      seriesConfig = ChartBuilder.hourlySeries(State.hourlyData);

      const allValues = [];
      seriesConfig.forEach(s => {
        s.data.forEach(point => {
          if (point && point[1] != null && isFinite(point[1])) {
            allValues.push(point[1]);
          }
        });
      });

      if (allValues.length === 0) {
        yRange = { min: 0, max: 100 };
      } else {
        const minVal = Math.min(...allValues);
        const maxVal = Math.max(...allValues);
        const range = maxVal - minVal;
        const padding = Math.max(range * 0.05, 1);
        let calcMin = minVal - padding;
        let calcMax = maxVal + padding;

        const customBounds = YAxisBounds.getCurrentBounds();
        if (!customBounds) {
          const isGainsMode = State.isGainsMode || State.isHourlyGainsMode;
          if (!isGainsMode && calcMin < 0 && minVal >= 0) {
            calcMin = 0;
          }
        }
        if (calcMax <= calcMin) {
          calcMax = calcMin + (calcMin > 0 ? calcMin * 0.1 : 100);
        }

        yRange = { min: calcMin, max: calcMax };
      }
    } else {
      seriesConfig = ChartBuilder.series();
      const initialVisible = seriesConfig.filter(s => s.visible !== false);
      yRange = computeRangeFromSeries(initialVisible);
    }

    const customBounds = YAxisBounds.getCurrentBounds();
    if (customBounds) {
      if (customBounds.min !== null && customBounds.min !== undefined) {
        yRange.min = customBounds.min;
      }
      if (customBounds.max !== null && customBounds.max !== undefined) {
        yRange.max = customBounds.max;
      }
    }

    if (!State.isChartReady) {
      State.pendingYAxisRange = yRange;
    }

    const metricName =
      State.getMetricName().charAt(0).toUpperCase() +
      State.getMetricName().slice(1);

    const modeLabel =
      State.customDateRangeLabel ||
      (Config.chartModes[State.currentChartMode] &&
        Config.chartModes[State.currentChartMode].label) ||
      '';

    const filterTypeLabel =
      CombinedMetricsFilter?.state?.filterMode === 'short'
        ? ' • Shorts'
        : CombinedMetricsFilter?.state?.filterMode === 'long'
          ? ' • Longform'
          : '';

    let chartTitle;
    if (isHourly) {
      const baseTitle = `Hourly ${metricName} Gains`;
      chartTitle = modeLabel
        ? `${baseTitle}${filterTypeLabel} - ${modeLabel}`
        : `${baseTitle}${filterTypeLabel}`;
    } else if (State.isHourlyGainsMode) {
      const baseTitle = `Hourly ${metricName} Gains`;
      chartTitle = modeLabel
        ? `${baseTitle}${filterTypeLabel} - ${modeLabel}`
        : `${baseTitle}${filterTypeLabel}`;
    } else if (State.isGainsMode) {
      const baseTitle = `Daily ${metricName} Gains`;
      chartTitle = modeLabel
        ? `${baseTitle}${filterTypeLabel} - ${modeLabel}`
        : `${baseTitle}${filterTypeLabel}`;
    } else if (CombinedMetricsFilter?.state?.filterMode === 'overlay') {
      if (State.isHourlyGainsMode) {
        chartTitle = `Hourly ${metricName} Gains - Short vs Long${
          modeLabel ? ` • ${modeLabel}` : ''
        }`;
      } else if (State.isGainsMode) {
        chartTitle = `Daily ${metricName} Gains - Short vs Long${
          modeLabel ? ` • ${modeLabel}` : ''
        }`;
      } else {
        chartTitle = `${metricName} - Short vs Long${
          modeLabel ? ` • ${modeLabel}` : ''
        }`;
      }
    } else {
      const label = seriesConfig[State.selectedMetricIndex]?.name || metricName;
      chartTitle = modeLabel
        ? `${label}${filterTypeLabel} - ${modeLabel}`
        : `${label}${filterTypeLabel}`;
    }

    const shouldAnimate = animate && !State.isMobile();
    const visibleSeries = seriesConfig.filter(s => s.visible !== false);
    const maxPointsVisible = Math.max(
      0,
      ...visibleSeries.map(s => (s.data ? s.data.length : 0))
    );

    State.chart = Highcharts.chart('videoChart', {
      chart: {
        type: isHourly ? 'line' : 'area',
        backgroundColor: cardBg,
        style: {
          fontFamily: "'Poppins', sans-serif",
          fontSize: '14px',
        },
        plotBackgroundColor: cardBg,
        plotBorderColor: Dom.getCssVar('--border-color'),
        plotBorderWidth: 1,
        zoomType: 'x',
        panning: { enabled: true, type: 'x' },
        panKey: 'shift',
        resetZoomButton: {
          position: {
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 10,
          },
        },
        animation: shouldAnimate
          ? { duration: 600, easing: 'easeOutQuart' }
          : false,
        events: {
          ...ChartBuilder.events(),
          load: function () {
            State.isChartReady = true;

            if (State.pendingYAxisRange) {
              const { min, max } = State.pendingYAxisRange;
              if (this.yAxis?.[0]) {
                this.yAxis[0].setExtremes(min, max, true, false);
              }
              State.pendingYAxisRange = null;
            }

            if (!State.isHourlyMode && State.persistedRange) {
              try {
                const xa = this.xAxis?.[0];
                if (
                  xa &&
                  Number.isFinite(xa.dataMin) &&
                  Number.isFinite(xa.dataMax)
                ) {
                  const xMin = Math.max(xa.dataMin, State.persistedRange.xMin);
                  const xMax = Math.min(xa.dataMax, State.persistedRange.xMax);
                  if (xMax > xMin) {
                    xa.setExtremes(xMin, xMax, false, false);
                    this.redraw(false);
                  }
                }
              } catch (e) {}
            }
          },
          render: function () {
            if (this.xAxis?.[0]?.axisTitle) {
              const centreX = this.chartWidth / 2 - this.plotLeft;
              this.xAxis[0].axisTitle.attr({ x: centreX + 105 });
            }

            try {
              const axis = this.xAxis && this.xAxis[0];
              const labelGroup =
                axis && axis.labelGroup && axis.labelGroup.element;
              if (!labelGroup) return;

              const texts = labelGroup.querySelectorAll('text');
              texts.forEach(node => {
                const tr = node.getAttribute('transform') || '';
                const xAttr = node.getAttribute('x') || '';
                if (tr === 'translate(0,0)' && xAttr === '0') {
                  if (node.parentNode) {
                    node.parentNode.removeChild(node);
                  }
                }
              });
            } catch (e) {}
          },
          redraw: function () {
            const customBounds = YAxisBounds.getCurrentBounds();
            const isGainsMode = State.isGainsMode || State.isHourlyGainsMode;

            if (
              !customBounds &&
              !isGainsMode &&
              State.isNumericMetric() &&
              this.yAxis?.[0] &&
              this.yAxis[0].min < 0 &&
              this.yAxis[0].dataMin >= 0
            ) {
              this.yAxis[0].setExtremes(0, null, false, false);
            }
          },
        },
        height: State.getChartHeight() + (isHourly ? 120 : 0),
        spacingBottom: State.isMobile() ? 15 : 30,
        spacingTop: State.isMobile() ? 10 : 25,
        spacingLeft: State.isMobile() ? 10 : 25,
        spacingRight: State.isMobile() ? 10 : 25,
        borderRadius: 12,
      },

      boost: {
        enabled: maxPointsVisible > 2500,
        useGPUTranslations: true,
        usePreAllocated: true,
      },

      title: {
        text: chartTitle,
        style: {
          color: textColor,
          fontWeight: '700',
          fontSize: State.isMobile() ? '16px' : '22px',
          fontFamily: "'Poppins', sans-serif",
        },
        margin: State.isMobile() ? 15 : 30,
        align: 'center',
      },

      credits: { enabled: false },

      xAxis: {
        crosshair: {
          color: Dom.getCssVar('--border-color'),
          width: 1.5,
          dashStyle: 'Dash',
          zIndex: 2,
        },
        ...ChartBuilder.xAxis(isHourly),
      },

      yAxis: ChartBuilder.yAxis(yRange, isHourly),

      series: seriesConfig,

      legend: {
        enabled:
          isHourly || CombinedMetricsFilter?.state?.filterMode === 'overlay',
        itemStyle: {
          color: textColor,
          fontWeight: '500',
          fontSize: State.isMobile() ? '11px' : '13px',
        },
        itemHoverStyle: { color: Dom.getCssVar('--hover-text-color') },
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        y: 15,
        floating: false,
        maxHeight: 60,
        navigation: { enabled: true, style: { color: textColor } },
        events: {
          itemClick: function (event) {
            const chart = this.chart;
            setTimeout(() => {
              const allValues = [];
              chart.series.forEach(series => {
                if (series.visible || series === event.target) {
                  series.data.forEach(point => {
                    if (point && point.y != null && isFinite(point.y)) {
                      allValues.push(point.y);
                    }
                  });
                }
              });

              if (allValues.length > 0) {
                const minVal = Math.min(...allValues);
                const maxVal = Math.max(...allValues);
                const range = maxVal - minVal;
                const padding = Math.max(range * 0.05, 1);
                let calcMin = minVal - padding;
                let calcMax = maxVal + padding;

                const customBounds = YAxisBounds.getCurrentBounds();
                if (!customBounds) {
                  const isGainsMode =
                    State.isGainsMode || State.isHourlyGainsMode;
                  if (!isGainsMode && calcMin < 0 && minVal >= 0) {
                    calcMin = 0;
                  }
                }

                if (calcMax <= calcMin) {
                  calcMax = calcMin + (calcMin > 0 ? calcMin * 0.1 : 100);
                }

                chart.yAxis[0].setExtremes(calcMin, calcMax, true, true);
              }
            }, 10);
            return true;
          },
        },
        itemMarginBottom: 5,
        itemMarginTop: 5,
        padding: 8,
        backgroundColor: cardBg,
        borderRadius: 8,
        itemDistance: State.isMobile() ? 10 : 20,
      },

      tooltip: ChartBuilder.tooltip(isHourly),

      plotOptions: {
        series: {
          animation: shouldAnimate
            ? { duration: 400, easing: 'easeOutQuart' }
            : false,
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: true,
                radius: State.isMobile() ? 4 : 6,
                lineWidth: 2,
                lineColor: '#ffffff',
              },
            },
          },
          states: {
            hover: {
              lineWidthPlus: State.isMobile() ? 1 : 2,
              halo: { size: 8, opacity: 0.3 },
            },
            inactive: { opacity: 0.2 },
          },
          turboThreshold: 0,
          cropThreshold: 0,
          boostThreshold: 2500,
        },
        area: {
          fillOpacity: State.isMobile() ? 0.4 : 0.6,
          lineWidth: State.isMobile() ? 2.5 : 3.5,
          threshold: null,
        },
        line: {
          lineWidth: State.isMobile() ? 2 : 2.5,
        },
      },

      responsive: {
        rules: [
          {
            condition: { maxWidth: 480 },
            chartOptions: {
              chart: {
                spacingBottom: 15,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10,
              },
              title: {
                style: { fontSize: '16px' },
                margin: 15,
              },
              legend: {
                itemStyle: { fontSize: '10px' },
                itemDistance: 8,
                y: 10,
              },
            },
          },
          {
            condition: { maxWidth: 768 },
            chartOptions: {
              legend: {
                itemStyle: { fontSize: '11px' },
                itemDistance: 12,
                y: 12,
              },
            },
          },
        ],
      },
    });

    if (!isHourly && State.persistedRange) {
      try {
        const xa = State.chart.xAxis?.[0];
        if (xa && Number.isFinite(xa.dataMin) && Number.isFinite(xa.dataMax)) {
          const xMin = Math.max(xa.dataMin, State.persistedRange.xMin);
          const xMax = Math.min(xa.dataMax, State.persistedRange.xMax);
          if (xMax > xMin) {
            xa.setExtremes(xMin, xMax, false, false);
            State.chart.redraw(false);
          }
        }
      } catch (e) {}
    }

    await ChartModeDropdown.refresh();
  },
};

const Stats = {
  update() {
    if (!State.processedData.series) return;
    const { views, likes, comments, uploads } = State.processedData.series;
    const stats = [
      { id: 'totalViews', value: views[views.length - 1] || 0 },
      { id: 'totalLikes', value: likes[likes.length - 1] || 0 },
      { id: 'totalComments', value: comments[comments.length - 1] || 0 },
    ];
    if (uploads?.length > 0) {
      stats.push({
        id: 'totalUploads',
        value: uploads[uploads.length - 1] || 0,
      });
      Dom.show('uploadCountCard');
    } else {
      Dom.hide('uploadCountCard');
    }
    stats.forEach(stat => {
      const el = Dom.get(stat.id);
      if (el) {
        if (typeof Odometer !== 'undefined') {
          try {
            new Odometer({ el, value: stat.value }).update(stat.value);
          } catch (e) {
            el.textContent = stat.value.toLocaleString();
          }
        } else {
          el.textContent = stat.value.toLocaleString();
        }
      }
    });

    const grid = document.querySelector('.stats-grid');
    if (grid) {
      if (uploads?.length > 0) grid.classList.remove('three-columns');
      else grid.classList.add('three-columns');
    }
  },
};

const Tables = {
  calcChanges(current, previous, dailyData, index) {
    const calcChange = (curr, prev) => {
      if (!prev && prev !== 0) return '';
      const change = curr - prev;
      const arrow = change < 0 ? '↓' : '';
      const changeString =
        change >= 0 ? `+${change.toLocaleString()}` : change.toLocaleString();
      return `${changeString} ${arrow}`.trim();
    };

    const determineClass = (currentChange, previousChange) =>
      currentChange >= previousChange ? 'positive' : 'negative';

    const result = {};
    ['views', 'likes', 'comments'].forEach(metric => {
      const currentChange = current[metric] - (previous?.[metric] || 0);
      const previousChange =
        previous && index > 1
          ? (previous[metric] || 0) - (dailyData[index - 2]?.[metric] || 0)
          : 0;
      result[metric] = {
        change: previous ? calcChange(current[metric], previous[metric]) : '',
        class: previous ? determineClass(currentChange, previousChange) : '',
      };
    });

    return result;
  },

  addCurrentRow(tableBody, currentData, dailyData, useTimestamp) {
    const row = document.createElement('tr');
    const currentTime = luxon.DateTime.fromISO(
      useTimestamp ? currentData.timestamp : currentData.time
    ).setZone('America/New_York');
    const rounded = currentTime.set({ minute: 0, second: 0, millisecond: 0 });
    const currentDate = luxon.DateTime.now().setZone('America/New_York');
    const displayTime = currentDate.set({
      hour: rounded.hour,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    const { dateString } = Format.dateTime(displayTime);
    const timeString = displayTime.toFormat('HH:mm');
    const prevData = dailyData[dailyData.length - 1];
    const changes = this.calcChanges(
      currentData,
      prevData,
      dailyData,
      dailyData.length
    );

    row.innerHTML = `
      <td data-label="Date (EST)">${dateString}, ${timeString}</td>
      <td data-label="Views">${Math.round(currentData.views).toLocaleString()}
        <span class="change ${changes.views.class}">(${
          changes.views.change
        })</span></td>
      <td data-label="Likes">${Math.round(currentData.likes).toLocaleString()}
        <span class="change ${changes.likes.class}">(${
          changes.likes.change
        })</span></td>
      <td data-label="Comments">${Math.round(
        currentData.comments
      ).toLocaleString()}
        <span class="change ${changes.comments.class}">(${
          changes.comments.change
        })</span></td>
    `;
    tableBody.insertBefore(row, tableBody.firstChild);
  },

  addHistoricalRowsChunked(
    tableBody,
    dailyData,
    useTimestamp,
    chunkSize = 250
  ) {
    let i = dailyData.length - 1;
    const renderChunk = () => {
      const frag = document.createDocumentFragment();
      let count = 0;
      while (i >= 0 && count < chunkSize) {
        const entry = dailyData[i];
        const row = document.createElement('tr');
        const date = luxon.DateTime.fromISO(
          useTimestamp ? entry.timestamp : entry.time
        ).setZone('America/New_York');
        const { dateString } = Format.dateTime(date);
        const changes = this.calcChanges(entry, dailyData[i - 1], dailyData, i);

        row.innerHTML = `
         <td data-label="Date (EST)">${dateString}</td>
         <td data-label="Views">${Math.round(
           entry.views
         ).toLocaleString()}            
            <span class="change ${changes.views.class}">(${
              changes.views.change
            })</span></td>
          <td data-label="Likes">${Math.round(entry.likes).toLocaleString()}
            <span class="change ${changes.likes.class}">(${
              changes.likes.change
            })</span></td>
          <td data-label="Comments">${Math.round(
            entry.comments
          ).toLocaleString()}
            <span class="change ${changes.comments.class}">(${
              changes.comments.change
            })</span></td>
        `;
        frag.appendChild(row);
        i--;
        count++;
      }
      tableBody.appendChild(frag);

      if (i >= 0) {
        if (typeof requestIdleCallback !== 'undefined') {
          requestIdleCallback(renderChunk);
        } else {
          setTimeout(renderChunk, 0);
        }
      }
    };
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(renderChunk);
    } else {
      setTimeout(renderChunk, 0);
    }
  },

  create(dailyData, currentData, useTimestamp = false) {
    const tableBody = Dom.get('dailyStatsBody');
    if (!tableBody || !Array.isArray(dailyData)) return;

    tableBody.innerHTML = '';
    const currentDate = currentData
      ? luxon.DateTime.fromISO(
          useTimestamp ? currentData.timestamp : currentData.time
        )
          .setZone('America/New_York')
          .toFormat('yyyy-MM-dd')
      : null;

    const lastDailyDate =
      dailyData.length > 0
        ? luxon.DateTime.fromISO(
            useTimestamp
              ? dailyData[dailyData.length - 1].timestamp
              : dailyData[dailyData.length - 1].time
          )
            .setZone('America/New_York')
            .toFormat('yyyy-MM-dd')
        : null;

    if (currentData && currentDate !== lastDailyDate) {
      this.addCurrentRow(tableBody, currentData, dailyData, useTimestamp);
    }

    this.addHistoricalRowsChunked(tableBody, dailyData, useTimestamp, 300);
    Dom.show('dailyStatsTable');
  },
};

const Rankings = {
  updateTimeouts: new Map(),

  async fetch(channelId, filter = 'long') {
    const cacheKey = `${channelId}-${filter}`;
    const url = `${Config.api.rankings}?channel=${channelId}&filter=${filter}`;
    try {
      const data = await Net.fetchJson(url, {}, 10 * 60 * 1000);
      if (!data.videos || !Array.isArray(data.videos)) {
        return State.cachedRankings.get(cacheKey) || [];
      }
      State.cachedRankings.set(cacheKey, data.videos);
      return data.videos;
    } catch (error) {
      console.error('Rankings fetch error:', error);
      return State.cachedRankings.get(cacheKey) || [];
    }
  },

  calcAge(uploadTime) {
    const uploadDT = luxon.DateTime.fromISO(uploadTime);
    const currentDT = luxon.DateTime.now().setZone('America/New_York');
    const diffHours = currentDT.diff(uploadDT, 'hours').hours;
    return Math.floor(Math.max(0, diffHours));
  },

  getDefaults(videos, currentFilter = 'long') {
    if (!videos || videos.length === 0) {
      return { videoCount: 10, timePeriod: 24, highlightNewest: false };
    }

    let filteredVideos = videos;
    if (currentFilter !== 'all') {
      const isShort = currentFilter === 'short';
      filteredVideos = videos.filter(v =>
        isShort ? v.isShort === true : v.isShort === false
      );
    }
    if (filteredVideos.length === 0) filteredVideos = videos;

    const newest = filteredVideos.sort(
      (a, b) => new Date(b.uploadTime) - new Date(a.uploadTime)
    )[0];
    const ageInHours = this.calcAge(newest.uploadTime);
    const hasData =
      newest.periodData && newest.periodData[`views_${ageInHours}`] > 0;

    let smartTimePeriod,
      highlightNewest = false;
    if (ageInHours > 0 && ageInHours < 168 && hasData) {
      smartTimePeriod = ageInHours;
      highlightNewest = true;
    } else {
      smartTimePeriod = 24;
    }

    return {
      videoCount: 10,
      timePeriod: smartTimePeriod,
      highlightNewest,
      newestVideoId: newest.videoId,
    };
  },

  processVideos(videos, timePeriod, videoCount, metric = 'views') {
    if (!videos || !Array.isArray(videos)) return [];
    const metricKey = `${metric}_${timePeriod}`;

    const withData = videos
      .filter(v => {
        const data = v.periodData && v.periodData[metricKey];
        return data && data > 0;
      })
      .map(v => ({ ...v, metricAtPeriod: v.periodData[metricKey] }));

    const recent = withData
      .sort((a, b) => new Date(b.uploadTime) - new Date(a.uploadTime))
      .slice(0, Math.min(videoCount, 50));

    return recent.sort((a, b) => b.metricAtPeriod - a.metricAtPeriod);
  },

  display(videos) {
    const list = Dom.get('rankingsList');
    if (!list) return;
    list.innerHTML = '';

    if (!videos || !Array.isArray(videos) || videos.length === 0) {
      list.innerHTML =
        '<div style="text-align:center;padding:40px;color:var(--muted-text-color);">No ranking data available for this time period.</div>';
      return;
    }

    const ranked = this.processVideos(
      videos,
      State.rankingsSettings.timePeriod,
      State.rankingsSettings.videoCount,
      State.rankingsSettings.metric
    );

    if (ranked.length === 0) {
      list.innerHTML =
        '<div style="text-align:center;padding:40px;color:var(--muted-text-color);">No videos with data for this time period.</div>';
      return;
    }

    const newest = ranked.reduce((newest, current) =>
      new Date(current.uploadTime) > new Date(newest.uploadTime)
        ? current
        : newest
    );

    const fragment = document.createDocumentFragment();
    ranked.forEach((video, index) => {
      const item = Dom.create('div', 'ranking-item');
      item.dataset.videoId = video.videoId;

      if (video.videoId === newest.videoId)
        item.classList.add('ranking-highlight');

      const formattedMetric = video.metricAtPeriod.toLocaleString();
      const periodUnit =
        State.rankingsSettings.timePeriod === 1 ? 'hour' : 'hours';

      item.innerHTML = `
        <div class="ranking-position">${index + 1}</div>
        <img class="ranking-thumbnail" src="${video.thumbnail}" alt="${
          video.title
        }"
          onerror="this.style.display='none'" loading="lazy">
        <div class="ranking-info">
          <div class="ranking-title">${video.title}</div>
        </div>
        <div class="ranking-views">
          ${formattedMetric}
          <span class="ranking-time">in ${
            State.rankingsSettings.timePeriod
          } ${periodUnit}</span>
        </div>
      `;

      item.addEventListener('click', () => {
        Loader.loadVideo(video.videoId, State.currentChannel);
        const searchInput = Dom.get('searchInput');
        if (searchInput) searchInput.value = video.title;
      });

      fragment.appendChild(item);
    });
    list.appendChild(fragment);

    const heading = document.querySelector('.rankings-header h2');
    if (heading) {
      heading.textContent = `Top ${State.rankingsSettings.videoCount} Performing Videos`;
    }

    const subtitle = document.querySelector('.rankings-subtitle');
    const formatTimePeriod = hours => {
      if (hours < 24) return `${hours} ${hours === 1 ? 'Hour' : 'Hours'}`;
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      if (remainingHours === 0) return `${days} ${days === 1 ? 'Day' : 'Days'}`;
      return `${days} ${days === 1 ? 'Day' : 'Days'}, ${remainingHours} ${
        remainingHours === 1 ? 'Hour' : 'Hours'
      }`;
    };
    if (subtitle) {
      const metricName =
        State.rankingsSettings.metric.charAt(0).toUpperCase() +
        State.rankingsSettings.metric.slice(1);
      subtitle.textContent = `${metricName} in First ${formatTimePeriod(
        State.rankingsSettings.timePeriod
      )}`;
    }
  },

  updateInstant() {
    if (!State.isRankingsView || !State.currentChannel) return;
    const cacheKey = `${State.currentChannel}-${State.rankingsSettings.filter}`;
    const cached = State.cachedRankings.get(cacheKey);
    if (cached) this.display(cached);
  },

  async updateWithFetch() {
    if (!State.isRankingsView || !State.currentChannel) return;

    const list = Dom.get('rankingsList');
    if (list) {
      list.innerHTML =
        '<div style="text-align:center;padding:20px;color:var(--muted-text-color);">Updating rankings...</div>';
    }

    const cacheKey = `${State.currentChannel}-${State.rankingsSettings.filter}`;
    const cached = State.cachedRankings.get(cacheKey);
    if (cached) this.display(cached);

    try {
      const videos = await this.fetch(
        State.currentChannel,
        State.rankingsSettings.filter
      );
      if (State.isRankingsView) {
        this.display(videos);
      }
    } catch (error) {
      if (list && !cached) {
        list.innerHTML =
          '<div style="text-align:center;padding:20px;color:red;">Error loading rankings. Please try again.</div>';
      }
    }
  },

  bindSliders() {
    const countSlider = Dom.get('videoCountSlider');
    const countValue = Dom.get('videoCountValue');
    const periodSlider = Dom.get('timePeriodSlider');
    const periodValue = Dom.get('timePeriodValue');

    if (countValue) countValue.textContent = State.rankingsSettings.videoCount;
    if (periodValue)
      periodValue.textContent = State.rankingsSettings.timePeriod;

    if (countSlider && countValue) {
      countSlider.value = State.rankingsSettings.videoCount;

      countSlider.addEventListener(
        'input',
        e => {
          State.rankingsSettings.videoCount = parseInt(e.target.value);
          countValue.textContent = State.rankingsSettings.videoCount;
          State.saveSettings();
          clearTimeout(this.updateTimeouts.get('videoCount'));
          this.updateTimeouts.set(
            'videoCount',
            setTimeout(() => this.updateInstant(), 50)
          );
        },
        { passive: true }
      );

      EditableValue.makeEditable(countValue, countSlider, newValue => {
        State.rankingsSettings.videoCount = newValue;
        countValue.textContent = newValue;
        State.saveSettings();
        clearTimeout(this.updateTimeouts.get('videoCount'));
        this.updateTimeouts.set(
          'videoCount',
          setTimeout(() => this.updateInstant(), 50)
        );
      });
    }

    if (periodSlider && periodValue) {
      periodSlider.value = State.rankingsSettings.timePeriod;

      periodSlider.addEventListener(
        'input',
        e => {
          State.rankingsSettings.timePeriod = parseInt(e.target.value);
          periodValue.textContent = State.rankingsSettings.timePeriod;
          State.saveSettings();
          clearTimeout(this.updateTimeouts.get('timePeriod'));
          this.updateTimeouts.set(
            'timePeriod',
            setTimeout(() => this.updateInstant(), 50)
          );
        },
        { passive: true }
      );

      EditableValue.makeEditable(periodValue, periodSlider, newValue => {
        State.rankingsSettings.timePeriod = newValue;
        periodValue.textContent = newValue;
        State.saveSettings();
        clearTimeout(this.updateTimeouts.get('timePeriod'));
        this.updateTimeouts.set(
          'timePeriod',
          setTimeout(() => this.updateInstant(), 50)
        );
      });
    }
  },

  bindButtons() {
    document.querySelectorAll('.rankings-filter-button').forEach(button => {
      button.addEventListener('click', e => {
        const btn = e.currentTarget;
        const filter = btn.dataset.filter;

        document
          .querySelectorAll('.rankings-filter-button')
          .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        State.rankingsSettings.filter = filter;
        State.saveSettings();
        this.updateSmartHours();
        this.updateWithFetch();
      });
    });

    document.querySelectorAll('.rankings-metric-button').forEach(button => {
      button.addEventListener('click', e => {
        const btn = e.currentTarget;
        const metric = btn.dataset.metric;

        document
          .querySelectorAll('.rankings-metric-button')
          .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        State.rankingsSettings.metric = metric;
        State.saveSettings();
        this.updateInstant();
      });
    });
  },

  async updateSmartHours() {
    if (!State.currentChannel) return;
    try {
      const videos = await this.fetch(
        State.currentChannel,
        State.rankingsSettings.filter
      );
      if (videos.length > 0) {
        const defaults = this.getDefaults(
          videos,
          State.rankingsSettings.filter
        );
        State.rankingsSettings.timePeriod = defaults.timePeriod;

        const periodSlider = Dom.get('timePeriodSlider');
        const periodValue = Dom.get('timePeriodValue');
        if (periodSlider)
          periodSlider.value = State.rankingsSettings.timePeriod;
        if (periodValue)
          periodValue.textContent = State.rankingsSettings.timePeriod;

        State.saveSettings();
      }
    } catch (error) {}
  },

  applySettings() {
    const countSlider = Dom.get('videoCountSlider');
    const countValue = Dom.get('videoCountValue');
    const periodSlider = Dom.get('timePeriodSlider');
    const periodValue = Dom.get('timePeriodValue');

    if (countSlider) countSlider.value = State.rankingsSettings.videoCount;
    if (countValue) countValue.textContent = State.rankingsSettings.videoCount;
    if (periodSlider) periodSlider.value = State.rankingsSettings.timePeriod;
    if (periodValue)
      periodValue.textContent = State.rankingsSettings.timePeriod;

    document.querySelectorAll('.rankings-filter-button').forEach(btn => {
      btn.classList.toggle(
        'active',
        btn.dataset.filter === State.rankingsSettings.filter
      );
    });

    document.querySelectorAll('.rankings-metric-button').forEach(btn => {
      btn.classList.toggle(
        'active',
        btn.dataset.metric === State.rankingsSettings.metric
      );
    });
  },

  init() {
    this.bindSliders();
    this.bindButtons();
  },
};

Rankings.prefetch = async function (channelId) {
  const filters = ['all', 'long', 'short'];
  try {
    await Promise.allSettled(filters.map(f => Rankings.fetch(channelId, f)));
  } catch {}
};

const Gains = {
  allVideosCache: new Map(),
  batchCache: new Map(),

  async fetchBatch(channelId) {
    if (this.batchCache.has(channelId)) return this.batchCache.get(channelId);
    const url = `${Config.api.gainsBatch}?channel=${channelId}&metrics=views,likes,comments`;
    try {
      const data = await Net.fetchJson(url, {}, 10 * 60 * 1000);
      if (data && data.videos && data.gainsByMetric) {
        this.batchCache.set(channelId, data);
        return data;
      }
      return null;
    } catch (e) {
      console.error('Gains batch fetch error:', e);
      return null;
    }
  },

  _computeFromBatch(channelId, metric, filter, period, sortMode, count) {
    const batch = this.batchCache.get(channelId);
    if (!batch) return [];
    const periodKey = this.getPeriodKey(period);
    const previousKey = this.getPreviousPeriodKey(period);

    const videos = batch.videos || [];
    const gainsByMetric = batch.gainsByMetric?.[metric] || {};

    let candidates = videos;
    if (filter === 'long') candidates = candidates.filter(v => !v.isShort);
    else if (filter === 'short') candidates = candidates.filter(v => v.isShort);

    const enriched = candidates
      .map(v => {
        const g = gainsByMetric[v.videoId];
        if (!g || g[periodKey] == null) return null;
        const currentGain = g[periodKey] || 0;
        const prevGain = g[previousKey] || 0;
        const pct = prevGain
          ? ((currentGain - prevGain) / prevGain) * 100
          : null;
        return {
          ...v,
          gains: g,
          _currentGain: currentGain,
          _prevGain: prevGain,
          _pct: pct,
        };
      })
      .filter(Boolean);

    let sorted;
    if (sortMode === 'percent') {
      sorted = enriched
        .sort((a, b) => {
          const av = a._pct != null ? a._pct : -Infinity;
          const bv = b._pct != null ? b._pct : -Infinity;
          return bv - av;
        })
        .slice(0, count);
    } else {
      sorted = enriched
        .sort((a, b) => b._currentGain - a._currentGain)
        .slice(0, count);
    }

    return sorted.map(v => ({
      videoId: v.videoId,
      title: v.title,
      uploadTime: v.uploadTime,
      thumbnail: v.thumbnail,
      isShort: v.isShort,
      gains: v.gains,
    }));
  },

  async fetch(channelId, metric, filter, period, sortMode = 'absolute') {
    const cacheKey = `${channelId}-${metric}-${filter}-${period}-${sortMode}`;
    const cached = this.allVideosCache.get(cacheKey);
    if (cached) return cached;

    if (!this.batchCache.get(channelId)) {
      await this.fetchBatch(channelId);
    }
    const list = this._computeFromBatch(
      channelId,
      metric,
      filter,
      period,
      sortMode,
      50
    );
    this.allVideosCache.set(cacheKey, list);
    return list;
  },

  getPeriodKey(period) {
    if (period === 0) return 'past1h';
    if (period === 1) return 'past24h';
    if (period === 7) return 'past7d';
    if (period === 30) return 'past30d';
    return 'past24h';
  },

  getPreviousPeriodKey(period) {
    if (period === 0) return 'previous1h';
    if (period === 1) return 'previous24h';
    if (period === 7) return 'previous7d';
    if (period === 30) return 'previous30d';
    return 'previous24h';
  },

  display(videos, count) {
    const list = Dom.get('gainsList');
    if (!list) return;

    list.innerHTML = '';

    if (!videos || !Array.isArray(videos) || videos.length === 0) {
      list.innerHTML =
        '<div style="text-align:center;padding:40px;color:var(--muted-text-color);">No gains data available for this selection.</div>';
      return;
    }

    const periodKey = this.getPeriodKey(State.gainsSettings.period);
    const previousKey = this.getPreviousPeriodKey(State.gainsSettings.period);

    const enriched = videos
      .filter(v => v.gains && v.gains[periodKey] != null)
      .map(video => {
        const currentGain = video.gains[periodKey] || 0;
        const previousGain = video.gains[previousKey] || 0;
        let pct = null;
        if (previousGain && previousGain !== 0) {
          pct = ((currentGain - previousGain) / previousGain) * 100;
        }
        return {
          ...video,
          _currentGain: currentGain,
          _prevGain: previousGain,
          _pct: pct,
        };
      });

    let sorted;
    if (State.gainsSettings.sortMode === 'percent') {
      sorted = enriched
        .sort((a, b) => {
          const av = a._pct != null ? a._pct : -Infinity;
          const bv = b._pct != null ? b._pct : -Infinity;
          return bv - av;
        })
        .slice(0, count);
    } else {
      sorted = enriched
        .sort((a, b) => b._currentGain - a._currentGain)
        .slice(0, count);
    }

    if (sorted.length === 0) {
      list.innerHTML =
        '<div style="text-align:center;padding:40px;color:var(--muted-text-color);">No videos with gains data for this time period.</div>';
      return;
    }

    const fragment = document.createDocumentFragment();
    sorted.forEach((video, index) => {
      const item = Dom.create('div', 'gains-item');
      item.dataset.videoId = video.videoId;

      const currentGain = video._currentGain;
      const previousGain = video._prevGain;
      const change = currentGain - previousGain;
      const percentage = video._pct != null ? video._pct : null;

      const isPositive = change >= 0;
      const arrow = isPositive ? '↑' : '↓';
      const changeClass = isPositive ? 'positive' : 'negative';
      const sign = isPositive ? '+' : '';

      const formattedCurrent = currentGain.toLocaleString();
      const formattedChange = change.toLocaleString();
      const formattedPercentage =
        percentage !== null
          ? `${percentage >= 0 ? '+' : ''}${percentage.toFixed(1)}%`
          : '';

      const periodLabel =
        State.gainsSettings.period === 0
          ? 'in last 1h'
          : State.gainsSettings.period === 1
            ? 'in last 24h'
            : State.gainsSettings.period === 7
              ? 'in last 7d'
              : 'in last 30d';

      const periodLabelGain =
        State.gainsSettings.period === 0
          ? '1h'
          : State.gainsSettings.period === 1
            ? '24h'
            : State.gainsSettings.period === 7
              ? '7d'
              : '30d';

      item.innerHTML = `
        <div class="gains-position">${index + 1}</div>
        <img class="gains-thumbnail" src="${video.thumbnail}" alt="${
          video.title
        }"
          onerror="this.style.display='none'" loading="lazy">
        <div class="gains-info">
          <div class="gains-title">${video.title}</div>
        </div>
        <div class="gains-stats">
          <div class="gains-current">
            ${formattedCurrent}
            <span class="gains-period-label">${periodLabel}</span>
          </div>
          <div class="gains-change ${changeClass}">
            <span class="gains-arrow">${arrow}</span>
            ${sign}${formattedChange} from prev. ${periodLabelGain}
            ${
              formattedPercentage
                ? `<span class="gains-percentage">(${formattedPercentage})</span>`
                : ''
            }
          </div>
        </div>
      `;

      item.addEventListener('click', () => {
        Loader.loadVideo(video.videoId, State.currentChannel);
        const searchInput = Dom.get('searchInput');
        if (searchInput) searchInput.value = video.title;
      });

      fragment.appendChild(item);
    });

    list.appendChild(fragment);

    const heading = document.querySelector('.gains-header h2');
    if (heading) {
      heading.textContent = `Top ${State.gainsSettings.count} Video Gains`;
    }

    const subtitle = document.querySelector('.gains-subtitle');
    const metricName =
      State.gainsSettings.metric.charAt(0).toUpperCase() +
      State.gainsSettings.metric.slice(1);
    const periodText =
      State.gainsSettings.period === 0
        ? '1 Hour'
        : State.gainsSettings.period === 1
          ? '24 Hours'
          : `${State.gainsSettings.period} Days`;
    if (subtitle) {
      const sortText =
        State.gainsSettings.sortMode === 'percent' ? '% Increase' : 'Total';
      subtitle.textContent = `${metricName} in Last ${periodText} • ${sortText}`;
    }
  },

  async updateInstant(refetch = false) {
    if (!State.isGainsView || !State.currentChannel) return;

    const list = Dom.get('gainsList');
    const cacheKey = `${State.currentChannel}-${State.gainsSettings.metric}-${State.gainsSettings.filter}-${State.gainsSettings.period}-${State.gainsSettings.sortMode}`;
    const cached = this.allVideosCache.get(cacheKey);

    if (cached && !refetch) {
      this.display(cached, State.gainsSettings.count);
      return;
    }

    if (list) {
      list.innerHTML =
        '<div style="text-align:center;padding:20px;color:var(--muted-text-color);">Updating gains...</div>';
    }

    if (cached) {
      this.display(cached, State.gainsSettings.count);
    }

    try {
      const videos = await this.fetch(
        State.currentChannel,
        State.gainsSettings.metric,
        State.gainsSettings.filter,
        State.gainsSettings.period,
        State.gainsSettings.sortMode
      );
      if (State.isGainsView) {
        this.display(videos, State.gainsSettings.count);
      }
    } catch (error) {
      if (list && !cached) {
        list.innerHTML =
          '<div style="text-align:center;padding:20px;color:red;">Error loading gains. Please try again.</div>';
      }
    }
  },

  bindButtons() {
    document.querySelectorAll('#gainsView .control-button').forEach(button => {
      button.addEventListener('click', e => {
        const btn = e.currentTarget;
        const group = btn.dataset.group;

        document
          .querySelectorAll(`#gainsView .control-button[data-group="${group}"]`)
          .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (group === 'period') {
          State.gainsSettings.period = parseInt(btn.dataset.period);
          State.saveSettings();
          this.updateInstant(true);
        } else if (group === 'filter') {
          State.gainsSettings.filter = btn.dataset.filter;
          State.saveSettings();
          this.updateInstant(true);
        } else if (group === 'metric') {
          State.gainsSettings.metric = btn.dataset.metric;
          State.saveSettings();
          this.updateInstant(true);
        } else if (group === 'sort') {
          State.gainsSettings.sortMode = btn.dataset.sort;
          State.saveSettings();
          this.updateInstant(true);
        }
      });
    });
  },

  bindInput() {
    const countSlider = Dom.get('gainsCountSlider');
    const countValue = Dom.get('gainsCountValue');

    if (countValue) countValue.textContent = State.gainsSettings.count;

    if (countSlider && countValue) {
      countSlider.value = State.gainsSettings.count;

      countSlider.addEventListener(
        'input',
        e => {
          State.gainsSettings.count = parseInt(e.target.value);
          countValue.textContent = State.gainsSettings.count;
          State.saveSettings();
          clearTimeout(this.updateTimeout);
          this.updateTimeout = setTimeout(() => this.updateInstant(false), 50);
        },
        { passive: true }
      );

      EditableValue.makeEditable(countValue, countSlider, newValue => {
        State.gainsSettings.count = newValue;
        countValue.textContent = newValue;
        State.saveSettings();
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(() => this.updateInstant(false), 50);
      });
    }
  },

  applySettings() {
    const countSlider = Dom.get('gainsCountSlider');
    const countValue = Dom.get('gainsCountValue');

    if (countSlider) countSlider.value = State.gainsSettings.count;
    if (countValue) countValue.textContent = State.gainsSettings.count;

    document
      .querySelectorAll('#gainsView .control-button[data-group="period"]')
      .forEach(btn => {
        btn.classList.toggle(
          'active',
          parseInt(btn.dataset.period) === State.gainsSettings.period
        );
      });

    document
      .querySelectorAll('#gainsView .control-button[data-group="filter"]')
      .forEach(btn => {
        btn.classList.toggle(
          'active',
          btn.dataset.filter === State.gainsSettings.filter
        );
      });

    document
      .querySelectorAll('#gainsView .control-button[data-group="metric"]')
      .forEach(btn => {
        btn.classList.toggle(
          'active',
          btn.dataset.metric === State.gainsSettings.metric
        );
      });

    document
      .querySelectorAll('#gainsView .control-button[data-group="sort"]')
      .forEach(btn => {
        btn.classList.toggle(
          'active',
          btn.dataset.sort === State.gainsSettings.sortMode
        );
      });
  },

  init() {
    this.bindButtons();
    this.bindInput();
  },
};

Gains.prefetch = async function (channelId) {
  try {
    await Gains.fetchBatch(channelId);
  } catch {}
};

const Export = {
  generateCsv(timestamps, mode = 'hourly') {
    if (!Array.isArray(timestamps) || timestamps.length === 0) return '';

    const estEntries = timestamps
      .map(entry => ({
        ...entry,
        dt: luxon.DateTime.fromJSDate(entry.date).setZone('America/New_York'),
      }))
      .sort((a, b) => a.dt.toMillis() - b.dt.toMillis());

    if (estEntries.length === 0) return '';

    if (mode === 'daily') {
      const startDay = estEntries[0].dt.startOf('day');
      const endDay = estEntries[estEntries.length - 1].dt.startOf('day');

      const days = [];
      let cur = startDay;
      while (cur <= endDay) {
        days.push(cur);
        cur = cur.plus({ days: 1 });
      }

      const dailyAtMidnight = new Map();
      estEntries.forEach(e => {
        const dayKey = e.dt.toFormat('yyyy-MM-dd');
        const existing = dailyAtMidnight.get(dayKey);
        if (!existing || e.dt.toMillis() < existing.dt.toMillis()) {
          dailyAtMidnight.set(dayKey, e);
        }
      });

      let csv =
        'data:text/csv;charset=utf-8,Timestamp (EST),Views,Likes,Comments\n';
      days.forEach(d => {
        const key = d.toFormat('yyyy-MM-dd');
        const found = dailyAtMidnight.get(key);
        if (found) {
          csv += `${d.toFormat('yyyy-MM-dd HH:mm:ss')},${found.views},${
            found.likes
          },${found.comments}\n`;
        } else {
          csv += `${d.toFormat('yyyy-MM-dd HH:mm:ss')},,,\n`;
        }
      });
      return csv;
    }

    const start = estEntries[0].dt.set({
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const end = estEntries[estEntries.length - 1].dt.set({
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    const fullRange = [];
    let currentTime = start;
    while (currentTime <= end) {
      fullRange.push(currentTime);
      currentTime = currentTime.plus({ hours: 1 });
    }

    const dataMap = new Map();
    estEntries.forEach(entry => {
      const hourKey = entry.dt.toFormat('yyyy-MM-dd-HH');
      dataMap.set(hourKey, entry);
    });

    let csv =
      'data:text/csv;charset=utf-8,Timestamp (EST),Views,Likes,Comments\n';
    fullRange.forEach(time => {
      const hourKey = time.toFormat('yyyy-MM-dd-HH');
      const entry = dataMap.get(hourKey);
      if (entry) {
        csv += `${time.toFormat('yyyy-MM-dd HH:mm:ss')},${entry.views},${
          entry.likes
        },${entry.comments}\n`;
      } else {
        csv += `${time.toFormat('yyyy-MM-dd HH:mm:ss')},,,\n`;
      }
    });
    return csv;
  },

  generateHourlyGridCsv(hourlyData, metric) {
    if (!hourlyData?.dates?.length || !hourlyData?.data) return '';

    const dates = hourlyData.dates.filter(d => hourlyData.data[d]?.[metric]);
    if (dates.length === 0) return '';

    const dateLabels = dates.map(d =>
      luxon.DateTime.fromISO(d, { zone: 'America/New_York' }).toFormat('MMM d')
    );

    const hourLabels = [];
    for (let h = 0; h < 24; h++) {
      const period = h < 12 ? 'AM' : 'PM';
      const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
      hourLabels.push(`${hour12}:00 ${period}`);
    }

    let csv = 'data:text/csv;charset=utf-8,';
    csv += `Hour (EST),${dateLabels.join(',')}\n`;

    for (let h = 0; h < 24; h++) {
      const values = dates.map(d => {
        const val = hourlyData.data[d][metric][h];
        return val != null ? val : '';
      });
      csv += `${hourLabels[h]},${values.join(',')}\n`;
    }

    return csv;
  },

  hourlyGridToCsv() {
    if (!State.hourlyData?.dates?.length) {
      console.error('No hourly data available for grid export');
      return;
    }
    const metric = State.getMetricName();
    const csvContent = this.generateHourlyGridCsv(State.hourlyData, metric);
    if (csvContent) {
      this.download(csvContent, `${State.currentEntityId}-7dh-grid.csv`);
    }
  },

  download(csvContent, filename) {
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  getExportRawData() {
    const rawData = Array.isArray(State.rawData) ? State.rawData : [];
    const isChannelContext = State.currentEntityId === State.currentChannel;
    if (!isChannelContext) return rawData;

    const filterMode = CombinedMetricsFilter?.state?.filterMode;
    if (filterMode === 'short') {
      const shortRaw = CombinedMetricsFilter?.state?.shortRaw;
      if (Array.isArray(shortRaw) && shortRaw.length) return shortRaw;
    } else if (filterMode === 'long') {
      const longRaw = CombinedMetricsFilter?.state?.longRaw;
      if (Array.isArray(longRaw) && longRaw.length) return longRaw;
    }

    return rawData;
  },

  getExportTypeSuffix() {
    const isChannelContext = State.currentEntityId === State.currentChannel;
    if (!isChannelContext) return '';
    const filterMode = CombinedMetricsFilter?.state?.filterMode;
    if (filterMode === 'short') return '-short';
    if (filterMode === 'long') return '-long';
    return '';
  },

  toCsv(mode = 'hourly') {
    const rawData = this.getExportRawData();
    if (!rawData || !Array.isArray(rawData)) {
      console.error('No data available for export');
      return;
    }
    const useTimestamp = !!rawData[0]?.timestamp;
    const timestamps = rawData
      .filter(entry => {
        const timeField = useTimestamp ? entry.timestamp : entry.time;
        return (
          timeField &&
          entry.views != null &&
          entry.likes != null &&
          entry.comments != null
        );
      })
      .map(entry => {
        const timeField = useTimestamp ? entry.timestamp : entry.time;
        return {
          date: luxon.DateTime.fromISO(timeField)
            .setZone('America/New_York')
            .toJSDate(),
          views: Math.round(entry.views || 0),
          likes: Math.round(entry.likes || 0),
          comments: Math.round(entry.comments || 0),
        };
      })
      .sort((a, b) => a.date - b.date);

    if (timestamps.length === 0) {
      console.error('No data found for export');
      return;
    }
    const csvContent = this.generateCsv(timestamps, mode);
    if (csvContent) {
      const suffix = mode === 'daily' ? '-daily' : '-hourly';
      const typeSuffix = this.getExportTypeSuffix();
      this.download(
        csvContent,
        `${State.currentEntityId}${typeSuffix}${suffix}.csv`
      );
    }
  },

  videosListToCsv() {
    if (
      !ChannelVideos.filteredItems ||
      ChannelVideos.filteredItems.length === 0
    ) {
      console.error('No videos available for export');
      return;
    }

    const videos = ChannelVideos.filteredItems;

    let csv = 'data:text/csv;charset=utf-8,';
    csv +=
      'Video ID,Title,Views,Likes,Comments,Duration,Upload Date (EST),Type\n';

    videos.forEach(video => {
      const title = (video.title || '').replace(/"/g, '""');
      const views = video.views || 0;
      const likes = video.likes || 0;
      const comments = video.comments || 0;
      const duration = video.duration || '';
      const uploadDate = video.uploadTime
        ? luxon.DateTime.fromISO(video.uploadTime)
            .setZone('America/New_York')
            .toFormat('yyyy-MM-dd HH:mm:ss')
        : '';
      const type = video.isShort ? 'Short' : 'Long';

      csv += `"${video.videoId}","${title}",${views},${likes},${comments},"${duration}","${uploadDate}","${type}"\n`;
    });

    const filename = `${State.currentChannel}-videos.csv`;

    this.download(csv, filename);
  },

  updateMenuForContext() {
    const menu = Dom.get('exportMenu');
    if (!menu) return;

    if (State.isVideosGridView && State.videosGrid.mode === 'list') {
      menu.innerHTML = `
        <button class="export-menu-item" data-mode="videos">
          <span class="item-icon"><i class="fas fa-list"></i></span>
          Export Videos List
        </button>
      `;
    } else if (State.isHourlyMode && State.currentChartMode === '7dh') {
      menu.innerHTML = `
        <button class="export-menu-item" data-mode="7dh-grid">
          <span class="item-icon"><i class="fas fa-table"></i></span>
          Export Grid CSV
        </button>
      `;
    } else {
      menu.innerHTML = `
        <button class="export-menu-item" data-mode="hourly">
          <span class="item-icon"><i class="fas fa-clock"></i></span>
          Export Hourly CSV
        </button>
        <button class="export-menu-item" data-mode="daily">
          <span class="item-icon"><i class="fas fa-calendar-day"></i></span>
          Export Daily CSV
        </button>
      `;
    }
  },

  init() {
    const exportBtn = Dom.get('exportButton');
    const menu = Dom.get('exportMenu');
    if (exportBtn && menu) {
      const getItems = () =>
        Array.from(menu.querySelectorAll('.export-menu-item'));
      const openMenu = (focusFirst = true) => {
        menu.classList.add('show');
        menu.setAttribute('aria-hidden', 'false');
        exportBtn.setAttribute('aria-expanded', 'true');
        if (focusFirst) getItems()[0]?.focus();
      };
      const closeMenu = (returnFocus = true) => {
        menu.classList.remove('show');
        menu.setAttribute('aria-hidden', 'true');
        exportBtn.setAttribute('aria-expanded', 'false');
        if (returnFocus) exportBtn.focus();
      };
      const toggleMenu = e => {
        e.preventDefault();
        e.stopPropagation();
        if (menu.classList.contains('show')) closeMenu(false);
        else {
          this.updateMenuForContext();
          openMenu(true);
        }
      };

      exportBtn.addEventListener('click', toggleMenu);
      exportBtn.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.updateMenuForContext();
          openMenu(true);
        } else if (e.key === 'Escape') {
          closeMenu();
        }
      });

      menu.addEventListener('click', e => {
        const btn = e.target.closest('.export-menu-item');
        if (!btn) return;

        if (State.isVideosGridView && State.videosGrid.mode === 'list') {
          if (btn.dataset.mode === 'videos') {
            closeMenu(false);
            this.videosListToCsv();
            return;
          }
        }

        if (btn.dataset.mode === '7dh-grid') {
          closeMenu(false);
          this.hourlyGridToCsv();
          return;
        }

        const mode = btn.dataset.mode === 'daily' ? 'daily' : 'hourly';
        closeMenu(false);
        this.toCsv(mode);
      });

      menu.addEventListener('keydown', e => {
        const list = getItems();
        const i = list.indexOf(document.activeElement);
        if (e.key === 'Escape') {
          e.preventDefault();
          closeMenu();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          list[(i + 1) % list.length]?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          list[(i - 1 + list.length) % list.length]?.focus();
        } else if (e.key === 'Home') {
          e.preventDefault();
          list[0]?.focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          list[list.length - 1]?.focus();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          document.activeElement?.click();
        } else if (e.key === 'Tab') {
          setTimeout(() => {
            if (!menu.contains(document.activeElement)) closeMenu(false);
          }, 0);
        }
      });

      document.addEventListener('click', e => {
        if (
          menu.classList.contains('show') &&
          !menu.contains(e.target) &&
          !exportBtn.contains(e.target)
        ) {
          closeMenu(false);
        }
      });

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && menu.classList.contains('show')) {
          closeMenu();
        }
      });
    }
  },
};

const VideoTypeToggle = {
  button: null,
  state: 'all',

  icons: {
    all: 'fa-layer-group',
    long: 'fa-film',
    short: 'fa-bolt',
    overlay: 'fa-object-group',
  },

  titles: {
    all: 'All Videos',
    long: 'Longform Only',
    short: 'Shorts Only',
    overlay: 'Overlay Comparison',
  },

  getState(from = this.state) {
    return from;
  },

  getNextState(from = this.state) {
    const order = ['all', 'long', 'short', 'overlay'];
    const i = order.indexOf(from);
    return order[(i + 1) % order.length];
  },

  create() {
    if (this.button) return this.button;

    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return null;

    this.button = Dom.create('button', 'video-type-toggle');

    this.button.addEventListener('click', () => {
      this.cycle();
    });

    const chart = Dom.get('videoChart');
    if (chart && chart.parentElement) {
      chart.parentElement.insertBefore(this.button, chart);
    }

    this.updateIcon();
    return this.button;
  },

  async cycle() {
    this.state = this.getNextState(this.state);
    this.updateIcon();
    await this.applyFilter();
  },

  updateIcon() {
    if (!this.button) return;

    const current = this.getState(this.state);
    const next = this.getNextState(this.state);

    this.button.innerHTML = `<i class="fas ${this.icons[next]}"></i>`;
    this.button.title = `Switch to ${this.titles[next]}`;

    this.button.classList.toggle('active', current !== 'all');

    this.button.classList.toggle('overlay-mode', current === 'overlay');
  },

  async applyFilter() {
    if (!CombinedMetricsFilter) return;
    if (YAxisBounds && YAxisBounds.state.isCustom) {
      YAxisBounds.state.customMin = null;
      YAxisBounds.state.customMax = null;
      YAxisBounds.state.isCustom = false;
      if (YAxisBounds.button) {
        YAxisBounds.button.classList.remove('active');
      }
    }
    await CombinedMetricsFilter.setFilterMode(this.state, { refresh: true });
  },

  show() {
    if (!this.button) this.create();
    if (this.button) {
      this.button.classList.add('show');
      this.button.style.display = 'flex';

      const current = this.getState(this.state);
      this.button.classList.toggle('active', current !== 'all');
      this.button.classList.toggle('overlay-mode', current === 'overlay');
    }
  },

  hide() {
    if (this.button) {
      this.button.classList.remove('show');
      this.button.style.display = 'none';
    }
  },

  reset() {
    this.state = 'all';
    this.updateIcon();
  },
};

const CombinedMetricsFilter = {
  state: {
    filterMode: 'all',
    shortRaw: null,
    longRaw: null,
    isFetching: false,
  },

  async setFilterMode(mode, { refresh = false } = {}) {
    if (mode !== this.state.filterMode) {
      this.state.filterMode = mode;
      VideoTypeToggle.state = mode;
      VideoTypeToggle.updateIcon();
      await this._ensureRawForMode();
    }
    if (refresh) {
      await this.refresh();
    }
  },

  async refresh() {
    await this._ensureRawForMode();

    const container = Dom.get('videoChart');
    if (container) {
      container.innerHTML =
        '<div style="text-align:center;padding:20px;"><i class="fas fa-spinner fa-spin"></i> Updating...</div>';
    }

    const mode = this.state.filterMode;

    if (mode === 'overlay') {
      const merged = this._mergeForCombinedTable(
        this.state.shortRaw || [],
        this.state.longRaw || []
      );
      State.rawData = merged;
      State._dailyCache = DataProcessor.processDaily(
        merged,
        !!merged[0]?.timestamp
      );
    } else {
      State._dailyCache = DataProcessor.processDaily(
        State.rawData,
        !!State.rawData?.[0]?.timestamp
      );
    }

    await ChartModeDropdown.loadAndDisplayData();
    Stats.update();

    const dailyData = State._dailyCache || [];
    const currentData = (State.rawData || [])[State.rawData.length - 1];
    if (dailyData.length && currentData) {
      Tables.create(dailyData, currentData, !!currentData.timestamp);
    }
  },

  getOverlaySeries(metricKey) {
    if (this.state.filterMode !== 'overlay') return null;
    if (
      !Array.isArray(this.state.shortRaw) ||
      !Array.isArray(this.state.longRaw)
    )
      return null;

    const shortPoints = this._buildSeriesPoints(this.state.shortRaw, metricKey);
    const longPoints = this._buildSeriesPoints(this.state.longRaw, metricKey);

    return { short: shortPoints, long: longPoints };
  },

  async _ensureRawForMode() {
    const mode = this.state.filterMode;
    const base =
      State.currentChannel === 'mrbeast'
        ? Config.api.combinedHistory.mrbeast
        : Config.api.combinedHistory.byChannel(State.currentChannel);

    if (mode === 'all') {
      if (!Array.isArray(State.rawData) || State.rawData.length === 0) {
        State.rawData = await Net.fetchJson(base, {}, 10 * 60 * 1000);
      }
      return;
    }

    if (mode === 'short') {
      const data = await Net.fetchJson(
        `${base}?type=short`,
        {},
        10 * 60 * 1000
      );
      State.rawData = Array.isArray(data) ? data : [];
      return;
    }

    if (mode === 'long') {
      const data = await Net.fetchJson(`${base}?type=long`, {}, 10 * 60 * 1000);
      State.rawData = Array.isArray(data) ? data : [];
      return;
    }

    if (!Array.isArray(this.state.shortRaw) || !this.state.shortRaw.length) {
      this.state.shortRaw = await Net.fetchJson(
        `${base}?type=short`,
        {},
        10 * 60 * 1000
      );
    }
    if (!Array.isArray(this.state.longRaw) || !this.state.longRaw.length) {
      this.state.longRaw = await Net.fetchJson(
        `${base}?type=long`,
        {},
        10 * 60 * 1000
      );
    }
    this.state.shortRaw = Array.isArray(this.state.shortRaw)
      ? this.state.shortRaw
      : [];
    this.state.longRaw = Array.isArray(this.state.longRaw)
      ? this.state.longRaw
      : [];
  },

  _mergeForCombinedTable(shortRaw, longRaw) {
    const map = new Map();
    const add = entry => {
      const iso = entry.timestamp || entry.time;
      if (!iso) return;
      const existing = map.get(iso) || {
        timestamp: iso,
        time: iso,
        views: 0,
        likes: 0,
        comments: 0,
      };
      existing.views += entry.views || 0;
      existing.likes += entry.likes || 0;
      existing.comments += entry.comments || 0;
      map.set(iso, existing);
    };
    shortRaw.forEach(add);
    longRaw.forEach(add);
    return Array.from(map.values()).sort((a, b) => {
      const ta = new Date(a.timestamp || a.time).getTime();
      const tb = new Date(b.timestamp || b.time).getTime();
      return ta - tb;
    });
  },

  _filterRawByCurrentRange(raw) {
    if (!Array.isArray(raw)) return [];
    const cfg = State.getChartConfig();

    if (State.customDateRange.start && State.customDateRange.end) {
      const start = luxon.DateTime.fromISO(State.customDateRange.start, {
        zone: 'America/New_York',
      }).startOf('day');
      const end = luxon.DateTime.fromISO(State.customDateRange.end, {
        zone: 'America/New_York',
      }).endOf('day');
      return raw.filter(e => {
        const iso = e.timestamp || e.time;
        if (!iso) return false;
        const dt = luxon.DateTime.fromISO(iso, {
          zone: 'America/New_York',
        });
        return dt >= start && dt <= end;
      });
    }

    if (cfg.period !== 'all' && typeof cfg.period === 'number') {
      const cutoff = luxon.DateTime.now()
        .setZone('America/New_York')
        .startOf('day')
        .minus({ days: cfg.period });
      return raw.filter(e => {
        const iso = e.timestamp || e.time;
        if (!iso) return false;
        const dt = luxon.DateTime.fromISO(iso, {
          zone: 'America/New_York',
        });
        return dt >= cutoff;
      });
    }
    return raw;
  },

  _buildSeriesPoints(raw, metricKey) {
    const filtered = this._filterRawByCurrentRange(raw);
    if (!filtered.length) return [];

    const processed = DataProcessor.transform(filtered);
    const ts = processed.timestamps;
    const vals = processed.series[metricKey];
    if (!ts || !vals || ts.length !== vals.length) return [];

    if (State.isHourlyGainsMode) {
      const gains = DataProcessor.processGains(ts, vals);
      return DataProcessor.downsamplePairs(gains);
    }

    if (State.isGainsMode) {
      const dailyRaw = DataProcessor.processDaily(
        filtered,
        !!filtered[0]?.timestamp
      );
      const gains = [];
      for (let i = 1; i < dailyRaw.length; i++) {
        const curr = dailyRaw[i];
        const prev = dailyRaw[i - 1];
        const gain = (curr[metricKey] || 0) - (prev[metricKey] || 0);
        const t = luxon.DateTime.fromISO(curr.timestamp || curr.time, {
          zone: 'America/New_York',
        }).toMillis();
        gains.push([t, gain]);
      }
      return DataProcessor.downsamplePairs(gains);
    }

    const spanDays = DataProcessor.spanInDays(ts);
    let points;
    if (spanDays > 90) {
      points = DataProcessor.dailyFirstPoint(ts, vals);
    } else {
      points = ts.map((t, i) => [t, vals[i]]);
    }
    return DataProcessor.downsamplePairs(points);
  },

  async prefetchData() {
    if (!State.currentChannel) return;
    const base =
      State.currentChannel === 'mrbeast'
        ? Config.api.combinedHistory.mrbeast
        : Config.api.combinedHistory.byChannel(State.currentChannel);
    try {
      const [shortRaw, longRaw] = await Promise.all([
        Net.fetchJson(`${base}?type=short`, {}, 10 * 60 * 1000),
        Net.fetchJson(`${base}?type=long`, {}, 10 * 60 * 1000),
      ]);
      if (Array.isArray(shortRaw)) this.state.shortRaw = shortRaw;
      if (Array.isArray(longRaw)) this.state.longRaw = longRaw;
    } catch (e) {
      console.error('Error prefetching filter data:', e);
    }
  },

  show() {
    VideoTypeToggle.show();
  },

  hide() {
    VideoTypeToggle.hide();
  },

  reset() {
    this.state.filterMode = 'all';
    this.state.shortRaw = null;
    this.state.longRaw = null;
    VideoTypeToggle.reset();
    this.hide();
  },
};

const Layout = {
  setupResponsive() {
    const headerControls = document.querySelector('.header-controls');
    const themeToggle = Dom.get('themeToggle');
    const exportControls = document.querySelector('.export-controls');

    if (!headerControls || !themeToggle || !exportControls) return;

    const existing = document.querySelector('.mobile-buttons');
    if (existing && !existing.parentElement) {
      existing.remove();
    }

    if (window.innerWidth <= Config.responsive.breakpoints.tablet) {
      let mobileButtons = document.querySelector('.mobile-buttons');
      if (!mobileButtons) {
        mobileButtons = Dom.create('div', 'mobile-buttons');
        headerControls.appendChild(mobileButtons);
      }

      mobileButtons.appendChild(themeToggle);
      mobileButtons.appendChild(exportControls);
    } else {
      headerControls.appendChild(themeToggle);
      headerControls.appendChild(exportControls);
    }
  },

  bindEvents() {
    window.addEventListener(
      'resize',
      Dom.debounce(() => {
        this.setupResponsive();
        if (State.chart && State.isChartReady) {
          const originalAnimation = State.chart.options.chart.animation;
          State.chart.update(
            {
              chart: { animation: false },
              plotOptions: { series: { animation: false } },
            },
            false
          );
          State.chart.redraw(false);
          setTimeout(() => {
            if (State.chart) {
              State.chart.update(
                {
                  chart: { animation: originalAnimation },
                  plotOptions: {
                    series: State.isMobile()
                      ? { animation: false }
                      : {
                          animation: { duration: 400, easing: 'easeOutQuart' },
                        },
                  },
                },
                false
              );
            }
          }, 100);
        }
      }, 250)
    );

    window.addEventListener('load', () => this.setupResponsive());
  },
};

const Theme = {
  updateIcons(theme) {
    const iconColor = theme === 'light' ? '000000' : 'ffffff';
    const themeIcon = Dom.get('themeIcon');
    const exportIcon = Dom.get('exportIcon');
    if (themeIcon)
      themeIcon.src = `https://img.icons8.com/material-outlined/24/${iconColor}/contrast.png`;
    if (exportIcon)
      exportIcon.src = `https://img.icons8.com/material-outlined/24/${iconColor}/download.png`;
  },

  bindToggle() {
    const toggle = Dom.get('themeToggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme') || 'dark';
      const newTheme = current === 'light' ? 'dark' : 'light';

      document.documentElement.classList.add('no-transitions');
      document.documentElement.setAttribute('data-theme', newTheme);
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      this.updateIcons(newTheme);

      if (State.chart) {
        setTimeout(() => {
          const newCardBg = Dom.getCssVar('--card-background-color');
          const newBorderColor = Dom.getCssVar('--border-color');
          const newTextColor = Dom.getCssVar('--text-color');
          const newHoverColor = Dom.getCssVar('--hover-text-color');
          const newMutedColor = Dom.getCssVar('--muted-text-color');

          State.chart.update(
            {
              chart: {
                backgroundColor: newCardBg,
                plotBackgroundColor: newCardBg,
                plotBorderColor: newBorderColor,
                animation: false,
              },
              title: { style: { color: newTextColor } },
              legend: {
                backgroundColor: newCardBg,
                itemStyle: { color: newTextColor },
                itemHoverStyle: { color: newHoverColor },
                itemHiddenStyle: { color: newMutedColor },
              },
              xAxis: {
                title: { style: { color: newTextColor } },
                labels: { style: { color: newTextColor } },
                gridLineColor: newBorderColor,
                lineColor: newBorderColor,
                tickColor: newBorderColor,
                minorGridLineColor: newBorderColor,
              },
              yAxis: {
                title: { style: { color: newTextColor } },
                labels: { style: { color: newTextColor } },
                gridLineColor: newBorderColor,
                lineColor: newBorderColor,
                tickColor: newBorderColor,
                minorGridLineColor: newBorderColor,
              },
            },
            true
          );
        }, 10);
      }

      setTimeout(() => {
        document.documentElement.classList.remove('no-transitions');
      }, 100);
    });
  },

  init() {
    const stored = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', stored);
    document.body.setAttribute('data-theme', stored);
    this.updateIcons(stored);
    this.bindToggle();
  },
};

const ChannelsBar = {
  el: null,
  searchInput: null,
  searchToggle: null,
  searchContainer: null,
  leftArrow: null,
  rightArrow: null,
  pillsWrapper: null,
  pillsContainer: null,
  fadeLeft: null,
  fadeRight: null,
  allChannels: [],
  isSearchOpen: false,
  lastQuery: '',

  create() {
    this.el = Dom.get('channelsBar');
    if (!this.el) return;
    this.el.innerHTML = '';

    this.allChannels = Config.channels.slice();

    this.searchContainer = Dom.create('div', 'channels-search-container');
    this.searchContainer.innerHTML = `
      <button class="channels-search-toggle" type="button" aria-label="Search channels" aria-expanded="false">
        <i class="fas fa-search"></i>
      </button>
      <input 
        type="text" 
        class="channels-search-input" 
        placeholder="Search channels..."
        aria-label="Search channels"
      />
    `;
    this.el.appendChild(this.searchContainer);

    this.searchToggle = this.searchContainer.querySelector(
      '.channels-search-toggle'
    );
    this.searchInput = this.searchContainer.querySelector(
      '.channels-search-input'
    );

    this.searchToggle.addEventListener('click', e => {
      e.stopPropagation();
      this.toggleSearch();
    });

    this.searchInput.addEventListener('input', e => {
      this.filterChannels(e.target.value);
    });

    this.searchInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.closeSearch();
      }
    });

    this.searchInput.addEventListener('blur', () => {
      setTimeout(() => {
        if (this.searchInput.value.trim() === '') {
          this.closeSearch();
        }
      }, 150);
    });

    document.addEventListener('click', e => {
      if (
        this.isSearchOpen &&
        !this.searchContainer.contains(e.target) &&
        this.searchInput.value.trim() === ''
      ) {
        this.closeSearch();
      }
    });

    this.leftArrow = Dom.create(
      'button',
      'channels-nav-arrow channels-nav-left'
    );
    this.leftArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
    this.leftArrow.setAttribute('type', 'button');
    this.leftArrow.setAttribute('aria-label', 'Scroll left');
    this.el.appendChild(this.leftArrow);

    this.pillsWrapper = Dom.create('div', 'channels-pills-wrapper');
    this.el.appendChild(this.pillsWrapper);

    this.pillsContainer = Dom.create('div', 'channels-pills-container');
    this.pillsWrapper.appendChild(this.pillsContainer);

    this.fadeLeft = Dom.create('div', 'channels-fade channels-fade-left');
    this.fadeRight = Dom.create('div', 'channels-fade channels-fade-right');
    this.pillsWrapper.appendChild(this.fadeLeft);
    this.pillsWrapper.appendChild(this.fadeRight);

    this.rightArrow = Dom.create(
      'button',
      'channels-nav-arrow channels-nav-right'
    );
    this.rightArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
    this.rightArrow.setAttribute('type', 'button');
    this.rightArrow.setAttribute('aria-label', 'Scroll right');
    this.el.appendChild(this.rightArrow);

    this.renderChannels(this.allChannels);
    this.bindArrowEvents();

    if (this.pillsContainer) {
      Dom.enableHorizontalWheelScroll(this.pillsContainer, {
        requireShift: false,
        lockPage: true,
      });

      this.pillsContainer.addEventListener('scroll', () => {
        this.updateFades();
      });

      const resizeObserver = new ResizeObserver(() => {
        this.updateFades();
      });
      resizeObserver.observe(this.pillsContainer);
    }

    this.updateFades();
    this.highlight(State.currentChannel);
  },

  toggleSearch() {
    if (this.isSearchOpen) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  },

  openSearch() {
    if (!this.searchInput || !this.searchToggle) return;
    this.isSearchOpen = true;
    this.searchInput.classList.add('visible');
    this.searchToggle.classList.add('active');
    this.searchToggle.setAttribute('aria-expanded', 'true');
    setTimeout(() => {
      this.searchInput.focus();
    }, 50);
  },

  closeSearch() {
    if (!this.searchInput || !this.searchToggle) return;
    this.isSearchOpen = false;
    this.searchInput.classList.remove('visible');
    this.searchToggle.classList.remove('active');
    this.searchToggle.setAttribute('aria-expanded', 'false');
    this.searchInput.value = '';
    this.renderChannels(this.allChannels);
    this.highlight(State.currentChannel);
    this.updateFades();
    this.lastQuery = '';
  },

  renderChannels(channels) {
    if (!this.pillsContainer) return;

    this.pillsContainer.innerHTML = '';

    channels.forEach(ch => {
      const pill = Dom.create('button', 'channel-pill');
      pill.setAttribute('type', 'button');
      pill.dataset.channel = ch.id;
      pill.innerHTML = `
        <img src="${ch.avatar}" alt="${ch.name}" loading="lazy" />
        <span>${ch.name}</span>
      `;
      pill.addEventListener('click', () => {
        const currentTab = ChannelTabs.getActiveTab() || 'combined';
        Router.goChannelTab(ch.id, currentTab);
      });
      this.pillsContainer.appendChild(pill);
    });
  },

  filterChannels(query) {
    const q = query.toLowerCase().trim();
    this.lastQuery = q;

    if (!q) {
      this.renderChannels(this.allChannels);
      this.highlight(State.currentChannel);
      this.updateFades();
      return;
    }

    const filtered = this.allChannels.filter(
      ch => ch.name.toLowerCase().includes(q) || ch.id.toLowerCase().includes(q)
    );

    this.renderChannels(filtered);
    this.highlight(State.currentChannel);
    this.updateFades();
  },

  bindArrowEvents() {
    if (!this.leftArrow || !this.rightArrow || !this.pillsContainer) return;

    const scrollAmount = 250;

    this.leftArrow.addEventListener('click', e => {
      e.preventDefault();
      this.pillsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    this.rightArrow.addEventListener('click', e => {
      e.preventDefault();
      this.pillsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    this.leftArrow.addEventListener('touchstart', e => {
      e.preventDefault();
      this.pillsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    this.rightArrow.addEventListener('touchstart', e => {
      e.preventDefault();
      this.pillsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  },

  updateFades() {
    if (!this.pillsContainer || !this.leftArrow || !this.rightArrow) return;

    const { scrollLeft, scrollWidth, clientWidth } = this.pillsContainer;
    const isScrollable = scrollWidth > clientWidth + 2;

    if (!isScrollable) {
      this.leftArrow.classList.remove('visible');
      this.rightArrow.classList.remove('visible');
      this.fadeLeft.classList.remove('visible');
      this.fadeRight.classList.remove('visible');
      return;
    }

    if (scrollLeft > 5) {
      this.leftArrow.classList.add('visible');
      this.fadeLeft.classList.add('visible');
    } else {
      this.leftArrow.classList.remove('visible');
      this.fadeLeft.classList.remove('visible');
    }

    if (scrollLeft < scrollWidth - clientWidth - 5) {
      this.rightArrow.classList.add('visible');
      this.fadeRight.classList.add('visible');
    } else {
      this.rightArrow.classList.remove('visible');
      this.fadeRight.classList.remove('visible');
    }
  },

  highlight(channelId) {
    if (!this.pillsContainer) return;
    this.pillsContainer.querySelectorAll('.channel-pill').forEach(el => {
      el.classList.toggle('active', el.dataset.channel === channelId);
    });
  },
};

const ChannelTabs = {
  el: null,
  tabs: [
    { id: 'combined', icon: 'fa-chart-area', label: 'Channel' },
    { id: 'videos', icon: 'fa-video', label: 'Videos' },
    { id: 'rankings', icon: 'fa-trophy', label: 'Video Rankings' },
    { id: 'gains', icon: 'fa-chart-line', label: 'Video Gains' },
  ],

  render() {
    this.el = Dom.get('channelTabs');
    if (!this.el) return;
    this.el.innerHTML = '';
    this.tabs.forEach(t => {
      const btn = Dom.create('button', 'channel-tab');
      btn.id = `tab-${t.id}`;
      btn.setAttribute('type', 'button');
      btn.setAttribute('role', 'tab');
      btn.dataset.tab = t.id;
      btn.innerHTML = `<i class="fas ${t.icon}"></i> ${t.label}`;
      btn.addEventListener('click', () => {
        Router.goChannelTab(State.currentChannel, t.id);
      });
      this.el.appendChild(btn);
    });
  },

  setActive(id) {
    if (!this.el) return;
    this.el.querySelectorAll('.channel-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === id);
    });
  },

  getActiveTab() {
    if (!this.el) return null;
    const active = this.el.querySelector('.channel-tab.active');
    return active ? active.dataset.tab : null;
  },
};

function formatDuration(duration) {
  if (!duration) return '';
  const parts = duration.split(':');
  if (parts.length === 3 && parseInt(parts[0]) === 0) {
    return `${parts[1]}:${parts[2]}`;
  }
  return duration;
}

const ChannelVideos = {
  grid: null,
  empty: null,
  listWrapper: null,
  listTbody: null,
  _controlsBound: false,

  pageSize: 60,
  filteredItems: [],
  visibleCount: 0,
  _scrollHandler: null,
  _listScrollHandler: null,

  parseDurationToSeconds(str) {
    if (!str) return 0;
    const parts = String(str)
      .split(':')
      .map(v => parseInt(v, 10));
    if (parts.some(isNaN)) return 0;
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return parts[0] || 0;
  },

  compare(a, b, key, dir) {
    const mul = dir === 'asc' ? 1 : -1;
    switch (key) {
      case 'views':
      case 'likes':
      case 'comments': {
        const av = parseInt(a[key] || 0, 10);
        const bv = parseInt(b[key] || 0, 10);
        return (av - bv) * mul;
      }
      case 'duration': {
        const av = this.parseDurationToSeconds(a.duration);
        const bv = this.parseDurationToSeconds(b.duration);
        return (av - bv) * mul;
      }
      case 'uploadTime':
      case 'lastUpdated': {
        const av = new Date(a[key] || 0).getTime();
        const bv = new Date(b[key] || 0).getTime();
        return (av - bv) * mul;
      }
      case 'isShort': {
        const av = a.isShort ? 1 : 0;
        const bv = b.isShort ? 1 : 0;
        return (av - bv) * mul;
      }
      case 'title':
      default: {
        const av = (a.title || '').toLowerCase();
        const bv = (b.title || '').toLowerCase();
        return av.localeCompare(bv) * mul;
      }
    }
  },

  formatDate(iso) {
    if (!iso) return '';
    const dt = luxon.DateTime.fromISO(iso, { zone: 'America/New_York' });
    if (!dt.isValid) return '';
    return `${dt.toFormat('M/d/yyyy')} ${dt.toFormat('h:mm:ss a')} EST`;
  },

  async load(channelId) {
    State.isVideosGridView = true;
    Dom.setMainView('videos');
    CombinedMetricsFilter.hide();

    const headerTitle = document.querySelector('header h1');
    if (headerTitle) headerTitle.textContent = 'Channel Videos';

    this.grid = Dom.get('videosGrid');
    this.empty = Dom.get('videosGridEmpty');
    this.listWrapper = Dom.get('videosListWrapper');
    this.listTbody = Dom.get('videosListTbody');

    if (this.grid) this.grid.innerHTML = '';
    if (this.listTbody) this.listTbody.innerHTML = '';

    const videos = await Net.fetchJson(
      `${Config.api.listing}?channel=${channelId}&filter=all`
    )
      .then(d => d.videos || [])
      .catch(() => []);

    State.videosGrid.items = Array.isArray(videos) ? videos : [];

    this.applyFiltersAndRender();
    ScrollToTop.show();
  },

  updateSortControlsUI() {
    const select = document.getElementById('videosSortSelect');
    const dirBtn = document.getElementById('videosSortDirBtn');
    const viewToggle = document.getElementById('videosViewToggle');

    if (select) {
      select.value = State.videosGrid.sortKey;
    }

    if (dirBtn) {
      dirBtn.dataset.dir = State.videosGrid.sortDir;
      dirBtn.title =
        State.videosGrid.sortDir === 'asc'
          ? 'Sort: Ascending'
          : 'Sort: Descending';
      dirBtn.innerHTML =
        State.videosGrid.sortDir === 'asc'
          ? '<i class="fas fa-arrow-up-short-wide"></i>'
          : '<i class="fas fa-arrow-down-wide-short"></i>';

      if (State.videosGrid.sortDir === 'asc') {
        dirBtn.classList.add('active');
      } else {
        dirBtn.classList.remove('active');
      }
    }

    if (viewToggle) {
      const mode = State.videosGrid.mode;
      viewToggle.dataset.mode = mode;
      viewToggle.title =
        mode === 'grid' ? 'Switch to list view' : 'Switch to grid view';
      viewToggle.innerHTML =
        mode === 'grid'
          ? '<i class="fas fa-th"></i>'
          : '<i class="fas fa-list"></i>';

      if (mode === 'list') {
        viewToggle.classList.add('active');
      } else {
        viewToggle.classList.remove('active');
      }
    }
  },

  applyFiltersAndRender() {
    const { filter, sortKey, sortDir, q, mode } = State.videosGrid;

    let list = (State.videosGrid.items || []).slice();

    if (filter === 'short') list = list.filter(v => v.isShort);
    else if (filter === 'long') list = list.filter(v => !v.isShort);

    if (q && q.trim()) {
      const qq = q.trim().toLowerCase();
      list = list.filter(v => (v.title || '').toLowerCase().includes(qq));
    }

    list.sort((a, b) => this.compare(a, b, sortKey, sortDir));

    this.filteredItems = list;
    this.visibleCount = Math.min(this.pageSize, this.filteredItems.length);

    const subtitle = Dom.get('videosSubtitle');
    if (subtitle) {
      const label = filter === 'short' ? 'shorts' : 'videos';
      let totalOfType = State.videosGrid.items.length;
      if (filter === 'short') {
        totalOfType = State.videosGrid.items.filter(v => v.isShort).length;
      } else if (filter === 'long') {
        totalOfType = State.videosGrid.items.filter(v => !v.isShort).length;
      }
      const available = this.filteredItems.length;
      subtitle.textContent = q
        ? `${available.toLocaleString()} of ${totalOfType.toLocaleString()} ${label} (filtered)`
        : `${available.toLocaleString()} ${label}`;
    }

    if (mode === 'grid') {
      if (this.listWrapper) this.listWrapper.style.display = 'none';
      if (this.grid) this.grid.style.display = 'grid';
      this.renderGridVisible(0);
      this.bindGridInfiniteScroll();
      this.unbindListInfiniteScroll();
    } else {
      if (this.grid) this.grid.style.display = 'none';
      if (this.listWrapper) this.listWrapper.style.display = 'block';
      this.renderListVisible(0);
      this.bindListInfiniteScroll();
      this.unbindGridInfiniteScroll();
    }

    const exportControls = document.querySelector('.export-controls');
    if (exportControls) {
      exportControls.style.display = mode === 'list' ? 'flex' : 'none';
    }

    this.updateSortControlsUI();

    if (typeof Export.updateMenuForContext === 'function') {
      Export.updateMenuForContext();
    }

    ScrollToTop.refresh();
    if (State.isVideosGridView) {
      ScrollToTop.bindScrollEvents();
    }
  },

  renderGridVisible(startIndex = 0) {
    if (!this.grid || !this.empty) return;

    if (!this.filteredItems || this.filteredItems.length === 0) {
      this.grid.innerHTML = '';
      this.empty.style.display = 'block';
      return;
    }
    this.empty.style.display = 'none';

    if (startIndex === 0) this.grid.innerHTML = '';

    const frag = document.createDocumentFragment();
    for (let i = startIndex; i < this.visibleCount; i++) {
      const v = this.filteredItems[i];
      if (!v) continue;

      const card = Dom.create('div', 'video-card');
      card.innerHTML = `
        <div class="video-card-thumb-wrapper">
          <img class="video-card-thumb" src="${
            v.thumbnail
          }" alt="" loading="lazy" />
          ${
            v.duration
              ? `<span class="video-duration-badge">${formatDuration(
                  v.duration
                )}</span>`
              : ''
          }
        </div>
        <div class="video-card-body">
          <div class="video-card-title">${v.title || ''}</div>
          <div class="video-card-meta">
            <span><i class="fas fa-eye"></i> ${(
              v.views || 0
            ).toLocaleString()}</span>
            <span><i class="fas fa-thumbs-up"></i> ${(
              v.likes || 0
            ).toLocaleString()}</span>
            <span><i class="fas fa-comments"></i> ${(
              v.comments || 0
            ).toLocaleString()}</span>
          </div>
          ${
            v.uploadTime
              ? `<div class="video-card-date">
                  <i class="fas fa-calendar"></i>
                  <span>${luxon.DateTime.fromISO(v.uploadTime)
                    .setZone('America/New_York')
                    .toFormat('MMM d, yyyy')}</span>
                </div>`
              : ''
          }
        </div>
      `;
      card.addEventListener('click', () => {
        Loader.loadVideo(v.videoId, State.currentChannel);
        const input = Dom.get('searchInput');
        if (input) input.value = v.title || '';
      });
      frag.appendChild(card);
    }

    this.grid.appendChild(frag);
  },

  renderListVisible(startIndex = 0) {
    if (!this.listTbody) return;

    if (!this.filteredItems || this.filteredItems.length === 0) {
      this.listTbody.innerHTML =
        '<tr><td colspan="8" style="padding: 1rem; text-align: center; color: var(--muted-text-color);">No videos match the current filters</td></tr>';
      return;
    }

    if (startIndex === 0) this.listTbody.innerHTML = '';

    const frag = document.createDocumentFragment();
    for (let i = startIndex; i < this.visibleCount; i++) {
      const v = this.filteredItems[i];
      if (!v) continue;

      const tr = document.createElement('tr');
      tr.className = 'listing-row';
      const typeLabel = v.isShort ? 'Short' : 'Long';
      const rank = i + 1;
      tr.innerHTML = `
        <td class="listing-rank-cell" data-label="#">
          <div class="listing-rank">${rank}</div>
        </td>
        <td class="listing-video-cell" data-label="Video">     
          <div class="listing-video">
            <img class="listing-video-thumb" src="${
              v.thumbnail
            }" alt="" loading="lazy"/>
            <div class="listing-video-title">${v.title || ''}</div>
          </div>
        </td>
        <td class="listing-num" data-label="Views">${(
          v.views || 0
        ).toLocaleString()}</td>
        <td class="listing-num" data-label="Likes">${(
          v.likes || 0
        ).toLocaleString()}</td>
        <td class="listing-num" data-label="Comments">${(
          v.comments || 0
        ).toLocaleString()}</td>
        <td data-label="Duration">${v.duration || ''}</td>
        <td data-label="Upload Date">${this.formatDate(v.uploadTime)}</td>
        <td data-label="Type"><span class="type-pill ${
          v.isShort ? 'short' : 'long'
        }">${typeLabel}</span></td>
      `;
      tr.addEventListener('click', () => {
        Loader.loadVideo(v.videoId, State.currentChannel);
        const searchInput = Dom.get('searchInput');
        if (searchInput) searchInput.value = v.title || '';
      });
      frag.appendChild(tr);
    }
    this.listTbody.appendChild(frag);
  },

  loadMoreGridIfNeeded() {
    if (!State.isVideosGridView) return;
    if (State.videosGrid.mode !== 'grid') return;
    if (!this.filteredItems || !this.filteredItems.length) return;
    if (this.visibleCount >= this.filteredItems.length) return;

    const scrollBottom = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - window.innerHeight * 2;
    if (scrollBottom < threshold) return;

    const prevCount = this.visibleCount;
    this.visibleCount = Math.min(
      this.visibleCount + this.pageSize,
      this.filteredItems.length
    );

    if (this.visibleCount > prevCount) {
      this.renderGridVisible(prevCount);
    }
  },

  bindGridInfiniteScroll() {
    if (this._scrollHandler) return;
    this._scrollHandler = Dom.debounce(() => this.loadMoreGridIfNeeded(), 20);
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },

  unbindGridInfiniteScroll() {
    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
      this._scrollHandler = null;
    }
  },

  loadMoreListIfNeeded() {
    if (!State.isVideosGridView) return;
    if (State.videosGrid.mode !== 'list') return;
    if (!this.filteredItems || !this.filteredItems.length) return;
    if (this.visibleCount >= this.filteredItems.length) return;

    const wrapper = this.listWrapper;
    if (!wrapper) return;

    const scrollBottom = wrapper.scrollTop + wrapper.clientHeight;
    const threshold = wrapper.scrollHeight - wrapper.clientHeight * 2;
    if (scrollBottom < threshold) return;

    const prevCount = this.visibleCount;
    this.visibleCount = Math.min(
      this.visibleCount + this.pageSize,
      this.filteredItems.length
    );

    if (this.visibleCount > prevCount) {
      this.renderListVisible(prevCount);
    }
  },

  bindListInfiniteScroll() {
    if (this._listScrollHandler) return;
    const wrapper = this.listWrapper;
    if (!wrapper) return;

    this._listScrollHandler = Dom.debounce(
      () => this.loadMoreListIfNeeded(),
      20
    );
    wrapper.addEventListener('scroll', this._listScrollHandler, {
      passive: true,
    });

    Dom.enableHorizontalWheelScroll(wrapper, { requireShift: true });

    wrapper.addEventListener(
      'wheel',
      e => {
        if (e.shiftKey) return;
        const { scrollTop, scrollHeight, clientHeight } = wrapper;
        const isUp = e.deltaY < 0;
        const isDown = e.deltaY > 0;
        if (
          (isUp && scrollTop === 0) ||
          (isDown && scrollTop + clientHeight >= scrollHeight)
        ) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  },

  unbindListInfiniteScroll() {
    if (this._listScrollHandler) {
      const wrapper = this.listWrapper;
      if (wrapper) {
        wrapper.removeEventListener('scroll', this._listScrollHandler);
      }
      this._listScrollHandler = null;
    }
  },

  bindControls() {
    if (this._controlsBound) return;
    this._controlsBound = true;

    document.querySelectorAll('.videos-filter-button').forEach(btn => {
      btn.addEventListener('click', () => {
        document
          .querySelectorAll('.videos-filter-button')
          .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        State.videosGrid.filter = btn.dataset.filter;
        window.scrollTo(0, 0);
        this.applyFiltersAndRender();
      });
    });

    const sortSelect = document.getElementById('videosSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', e => {
        State.videosGrid.sortKey = e.target.value;
        this.applyFiltersAndRender();
      });
    }

    const dirBtn = document.getElementById('videosSortDirBtn');
    if (dirBtn) {
      dirBtn.addEventListener('click', () => {
        State.videosGrid.sortDir =
          State.videosGrid.sortDir === 'asc' ? 'desc' : 'asc';

        if (State.videosGrid.sortDir === 'desc') {
          dirBtn.classList.add('active');
        } else {
          dirBtn.classList.remove('active');
        }

        this.applyFiltersAndRender();
      });
    }

    const viewToggle = document.getElementById('videosViewToggle');
    if (viewToggle) {
      viewToggle.addEventListener('click', () => {
        State.videosGrid.mode =
          State.videosGrid.mode === 'grid' ? 'list' : 'grid';

        if (State.videosGrid.mode === 'list') {
          viewToggle.classList.add('active');
        } else {
          viewToggle.classList.remove('active');
        }

        this.visibleCount = Math.min(this.pageSize, this.filteredItems.length);
        if (State.videosGrid.mode === 'grid') {
          window.scrollTo(0, 0);
        } else {
          const wrapper = this.listWrapper;
          if (wrapper) wrapper.scrollTop = 0;
        }
        this.applyFiltersAndRender();
      });
    }

    const searchInput = Dom.get('videosSearchInput');
    if (searchInput) {
      searchInput.addEventListener(
        'input',
        Dom.debounce(e => {
          State.videosGrid.q = e.target.value || '';
          if (State.isVideosGridView) {
            if (State.videosGrid.mode === 'grid') window.scrollTo(0, 0);
            else if (this.listWrapper) this.listWrapper.scrollTop = 0;
            this.applyFiltersAndRender();
          }
        }, 150)
      );
    }
  },
};

const ChartModeDropdown = {
  dropdown: null,
  gainsToggle: null,
  _lastAvailableModes: null,
  _isRefreshing: false,

  hasRenderableChart() {
    return (
      !State.isRankingsView &&
      !State.isGainsView &&
      !State.isVideosGridView &&
      !!State.chart &&
      (!State.isHourlyMode
        ? (State.processedData?.timestamps?.length || 0) > 0
        : !!State.hourlyData?.dates?.length)
    );
  },

  create() {
    if (this.dropdown) return this.dropdown;

    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return null;

    this.dropdown = Dom.create('div', 'chart-mode-dropdown');
    this.dropdown.innerHTML = `
      <button class="chart-mode-button" id="chartModeButton">
        <span class="chart-mode-text"></span>
        <i class="fas fa-chevron-down chart-mode-arrow"></i>
      </button>
      <div class="chart-mode-options" id="chartModeOptions"></div>
    `;
    this.dropdown.style.display = 'none';

    this.gainsToggle = Dom.create('button', 'chart-gains-toggle');
    this.gainsToggle.innerHTML = `
      <i class="fas fa-chart-line"></i>
      <span>Daily Gains</span>
    `;
    this.gainsToggle.style.display = 'none';

    const chart = Dom.get('videoChart');
    if (chart && chart.parentElement) {
      chart.parentElement.insertBefore(this.dropdown, chart);
      chart.parentElement.insertBefore(this.gainsToggle, chart);
    }

    const availableModes = this.getAvailableChartModes();
    this.renderOptions(availableModes);
    this.renderSelectedLabel();
    this.ensureModeSupported();

    this.bindEvents();
    return this.dropdown;
  },

  getAvailableChartModes() {
    const isChannelContext = State.currentEntityId === State.currentChannel;
    const isCommentsMetric = State.getMetricName() === 'comments';
    const modes = { ...Config.chartModes };
    if (isChannelContext || isCommentsMetric) {
      delete modes['7dh'];
    }
    return modes;
  },

  bindEvents() {
    if (!this.dropdown || !this.gainsToggle) return;
    const button = this.dropdown.querySelector('#chartModeButton');
    const options = this.dropdown.querySelector('#chartModeOptions');

    button.addEventListener('click', e => {
      e.stopPropagation();
      options.classList.toggle('show');
      button.querySelector('.chart-mode-arrow').classList.toggle('rotated');
    });

    document.addEventListener('click', e => {
      if (!this.dropdown.contains(e.target)) {
        options.classList.remove('show');
        button.querySelector('.chart-mode-arrow').classList.remove('rotated');
      }
    });

    options.addEventListener('click', e => {
      const option = e.target.closest('.chart-mode-option');
      if (!option) return;

      const available = this.getAvailableChartModes();
      const mode = option.dataset.mode;

      if (!available[mode]) return;
      if (mode === State.currentChartMode) return;

      this.selectMode(mode, true);
      options.classList.remove('show');
      button.querySelector('.chart-mode-arrow').classList.remove('rotated');
    });

    this.gainsToggle.addEventListener('click', () => {
      this.toggleGainsMode();
    });
  },

  renderOptions(availableModes) {
    if (!this.dropdown) return;
    const optionsEl = this.dropdown.querySelector('#chartModeOptions');
    if (!optionsEl) return;

    const markup = Object.entries(availableModes)
      .map(
        ([key, config]) => `
        <div class="chart-mode-option" data-mode="${key}">${config.label}</div>
      `
      )
      .join('');
    optionsEl.innerHTML = markup;
    this._lastAvailableModes = JSON.stringify(Object.keys(availableModes));
  },

  renderSelectedLabel() {
    if (!this.dropdown) return;
    const txt = this.dropdown.querySelector('.chart-mode-text');
    const mode = State.currentChartMode;
    const cfg =
      Config.chartModes[mode] || Config.chartModes[Config.defaultChartMode];
    if (txt) txt.textContent = cfg.label;
  },

  async ensureModeSupported() {
    const available = this.getAvailableChartModes();
    if (available[State.currentChartMode]) {
      this.renderSelectedLabel();
      this.updateGainsToggleVisibility();
      return false;
    }

    let fallback = Config.defaultChartMode;
    if (!available[fallback]) {
      const keys = Object.keys(available);
      fallback = keys.length ? keys[0] : null;
    }

    if (!fallback) {
      if (this.dropdown) this.dropdown.style.display = 'none';
      State.isHourlyMode = false;
      State.isGainsMode = false;
      State.isHourlyGainsMode = false;
      return false;
    }

    await this.selectMode(fallback, true);
    return true;
  },

  async refresh() {
    if (!this.dropdown) this.create();
    if (!this.dropdown) return false;
    if (this._isRefreshing) return false;

    this._isRefreshing = true;

    const availableNow = this.getAvailableChartModes();
    const currentSig = JSON.stringify(Object.keys(availableNow));
    const changed = currentSig !== this._lastAvailableModes;

    if (changed) {
      this.renderOptions(availableNow);
    }

    const didChangeMode = await this.ensureModeSupported();
    this.updateGainsToggleVisibility();

    if (this.dropdown) {
      this.dropdown.style.display = this.hasRenderableChart()
        ? 'block'
        : 'none';
    }

    this._isRefreshing = false;
    return didChangeMode;
  },

  async selectMode(mode, preserveGainsState = false) {
    if (!preserveGainsState) {
      State.customDateRange = { start: null, end: null };
      State.customDateRangeLabel = null;
    }

    State.currentChartMode = mode;

    if (!preserveGainsState) {
      State.isGainsMode = false;
      State.isHourlyGainsMode = false;
    }

    State.isHourlyMode = false;
    State.hourlyData = null;

    this.renderSelectedLabel();

    this.updateGainsToggleUI();
    this.updateGainsToggleVisibility();

    const config = Config.chartModes[mode];

    if (CombinedMetricsFilter.state.filterMode !== 'all') {
      await CombinedMetricsFilter.refresh();
      return;
    }

    if (config.dataPoints === 'hourly-chart') {
      await this.loadHourlyChart();
    } else {
      await this.loadAndDisplayData();
    }
  },

  updateGainsToggleUI() {
    if (!this.gainsToggle) return;

    if (State.isHourlyGainsMode) {
      this.gainsToggle.classList.add('active');
      this.gainsToggle.innerHTML = `
        <i class="fas fa-clock"></i>
        <span>Hourly Gains</span>
      `;
    } else if (State.isGainsMode) {
      this.gainsToggle.classList.add('active');
      this.gainsToggle.innerHTML = `
        <i class="fas fa-chart-area"></i>
        <span>Daily Gains</span>
      `;
    } else {
      this.gainsToggle.classList.remove('active');
      this.gainsToggle.innerHTML = `
        <i class="fas fa-chart-line"></i>
        <span>Daily Gains</span>
      `;
    }
  },

  async loadHourlyChart() {
    const container = Dom.get('videoChart');
    if (container) {
      container.innerHTML =
        '<div style="text-align:center;padding:20px;">Loading hourly chart data...</div>';
    }

    try {
      if (!State.hourlyData) {
        this.setDefaultDates();
        const data = await this.fetchHourlyData(
          State.currentEntityId,
          State.currentChannel,
          State.hourlyDateRange.start,
          State.hourlyDateRange.end
        );
        State.hourlyData = data;
      }

      State.isHourlyMode = true;
      await Charts.create();
    } catch (error) {
      console.error('Error loading hourly chart:', error);
      State.isHourlyMode = false;
      if (container) {
        container.innerHTML =
          '<div style="text-align:center;padding:20px;color:red;">Error loading hourly chart. This video may not have enough data yet.</div>';
      }
    }
  },

  setDefaultDates() {
    const end = luxon.DateTime.now().setZone('America/New_York');
    const start = end.minus({ days: Config.hourly.defaultDays });
    State.hourlyDateRange.start = start.toISODate();
    State.hourlyDateRange.end = end.toISODate();
  },

  async fetchHourlyData(videoId, channel, startDate, endDate) {
    const url = Config.api.hourly(videoId, channel, startDate, endDate);
    try {
      return await Net.fetchJson(url, {}, 10 * 60 * 1000);
    } catch (error) {
      throw error;
    }
  },

  async toggleGainsMode() {
    const config = State.getChartConfig();
    const isChannelContext = State.currentEntityId === State.currentChannel;
    const canShowHourlyGains =
      !isChannelContext &&
      config.dataPoints === 'hourly' &&
      config.period !== 'all' &&
      config.period <= 60;

    if (!State.isGainsMode && !State.isHourlyGainsMode) {
      State.isGainsMode = true;
      State.isHourlyGainsMode = false;
    } else if (State.isGainsMode && canShowHourlyGains) {
      State.isGainsMode = false;
      State.isHourlyGainsMode = true;
    } else {
      State.isGainsMode = false;
      State.isHourlyGainsMode = false;
    }

    this.updateGainsToggleUI();

    if (CombinedMetricsFilter.state.filterMode !== 'all') {
      await CombinedMetricsFilter.refresh();
    } else {
      await Charts.create();
    }
  },

  updateGainsToggleVisibility() {
    const config = State.getChartConfig();
    const hasRenderable = this.hasRenderableChart();

    const canShowGains =
      !State.isRankingsView &&
      !State.isGainsView &&
      !State.isVideosGridView &&
      config.dataPoints !== 'hourly-chart' &&
      hasRenderable;

    if (canShowGains) {
      this.gainsToggle.style.display = 'flex';
    } else {
      this.gainsToggle.style.display = 'none';
      State.isGainsMode = false;
      State.isHourlyGainsMode = false;
      this.updateGainsToggleUI();
    }

    const shouldShowDatePicker =
      !State.isRankingsView &&
      !State.isGainsView &&
      !State.isVideosGridView &&
      hasRenderable;

    if (shouldShowDatePicker) {
      if (!CustomDatePicker.datePickerButton) {
        CustomDatePicker.createDatePickerButton();
      }
      if (CustomDatePicker.datePickerButton) {
        CustomDatePicker.datePickerButton.classList.add('show');
        CustomDatePicker.datePickerButton.style.display = 'flex';
        const hasCustomRange =
          (State.customDateRange.start && State.customDateRange.end) ||
          (State.hourlyDateRange.start && State.hourlyDateRange.end);
        CustomDatePicker.datePickerButton.classList.toggle(
          'active',
          !!hasCustomRange
        );
      }
      YAxisBounds.createButton();
      YAxisBounds.show();
    } else {
      if (CustomDatePicker.datePickerButton) {
        CustomDatePicker.datePickerButton.classList.remove('show');
        CustomDatePicker.datePickerButton.style.display = 'none';
      }
      YAxisBounds.hide();
    }
    const chartContainer = document.querySelector('.chart-container');
    const videoToggleVisible = !!document.querySelector(
      '.video-type-toggle.show'
    );
    if (chartContainer) {
      chartContainer.classList.toggle('no-video-toggle', !videoToggleVisible);
    }
  },

  async loadAndDisplayData() {
    const container = Dom.get('videoChart');
    if (container) {
      container.innerHTML =
        '<div style="text-align:center;padding:20px;">Loading chart data...</div>';
    }

    try {
      const config = State.getChartConfig();
      const filterByDateRange = (arr, startISO, endISO) => {
        const startDate = luxon.DateTime.fromISO(startISO, {
          zone: 'America/New_York',
        }).startOf('day');
        const endDate = luxon.DateTime.fromISO(endISO, {
          zone: 'America/New_York',
        }).endOf('day');
        return arr.filter(entry => {
          const entryTime = entry.timestamp || entry.time;
          if (!entryTime) return false;
          const entryDate = luxon.DateTime.fromISO(entryTime, {
            zone: 'America/New_York',
          });
          return entryDate >= startDate && entryDate <= endDate;
        });
      };

      const haveCustom =
        State.customDateRange.start && State.customDateRange.end;
      const useTimestamp = !!State.rawData?.[0]?.timestamp;

      if (haveCustom) {
        if (config.dataPoints === 'hourly') {
          const filtered = filterByDateRange(
            Array.isArray(State.rawData) ? State.rawData : [],
            State.customDateRange.start,
            State.customDateRange.end
          );
          if (filtered.length === 0)
            throw new Error('No data available for the selected date range');
          State.processedData = DataProcessor.transform(filtered);
        } else {
          const baseDaily =
            Array.isArray(State._dailyCache) && State._dailyCache.length
              ? State._dailyCache
              : DataProcessor.processDaily(State.rawData, useTimestamp);
          const filteredDaily = filterByDateRange(
            baseDaily,
            State.customDateRange.start,
            State.customDateRange.end
          );
          if (filteredDaily.length === 0)
            throw new Error('No data available for the selected date range');
          State.processedData = DataProcessor.transform(filteredDaily);
        }
      } else if (
        config.period !== 'all' &&
        typeof config.period === 'number' &&
        Array.isArray(State.rawData)
      ) {
        const cutoffDate = luxon.DateTime.now()
          .setZone('America/New_York')
          .startOf('day')
          .minus({ days: config.period });

        if (config.dataPoints === 'hourly') {
          const recent = State.rawData.filter(entry => {
            const iso = entry.timestamp || entry.time;
            if (!iso) return false;
            const dt = luxon.DateTime.fromISO(iso, {
              zone: 'America/New_York',
            });
            return dt >= cutoffDate;
          });
          State.processedData = DataProcessor.transform(recent);
        } else {
          const baseDaily =
            Array.isArray(State._dailyCache) && State._dailyCache.length
              ? State._dailyCache
              : DataProcessor.processDaily(State.rawData, useTimestamp);
          const recentDaily = baseDaily.filter(entry => {
            const iso = entry.timestamp || entry.time;
            const dt = luxon.DateTime.fromISO(iso, {
              zone: 'America/New_York',
            });
            return dt >= cutoffDate;
          });
          State.processedData = DataProcessor.transform(recentDaily);
        }
      } else {
        if (config.dataPoints === 'hourly') {
          State.processedData = DataProcessor.transform(State.rawData);
        } else {
          const baseDaily =
            Array.isArray(State._dailyCache) && State._dailyCache.length
              ? State._dailyCache
              : DataProcessor.processDaily(State.rawData, useTimestamp);
          State.processedData = DataProcessor.transform(baseDaily);
        }
      }

      await Charts.create();
    } catch (error) {
      console.error('Error loading chart data:', error);
      const container = Dom.get('videoChart');
      if (container) {
        container.innerHTML = `<div style="text-align:center;padding:20px;color:red;">Error loading chart data: ${error.message}</div>`;
      }
    }
  },

  show() {
    if (State.isRankingsView || State.isGainsView || State.isVideosGridView) {
      this.hide();
      return;
    }
    if (!this.dropdown) this.create();
    if (this.dropdown) this.dropdown.style.display = 'block';
    this.refresh();
    this.updateGainsToggleVisibility();
  },

  hide() {
    if (this.dropdown) this.dropdown.style.display = 'none';
    if (this.gainsToggle) this.gainsToggle.style.display = 'none';
  },

  reset() {
    State.currentChartMode = Config.defaultChartMode;
    State.isGainsMode = false;
    State.isHourlyGainsMode = false;
    State.isHourlyMode = false;
    State.hourlyData = null;
    State.hourlyDateRange = { start: null, end: null };
    State.customDateRange = { start: null, end: null };
    State.customDateRangeLabel = null;
    this._lastAvailableModes = null;

    const availableModes = this.getAvailableChartModes();
    if (!availableModes[State.currentChartMode]) {
      State.currentChartMode = Config.defaultChartMode;
    }
    if (this.dropdown) {
      this.renderSelectedLabel();
    }
    if (this.gainsToggle) {
      this.updateGainsToggleUI();
    }
    CustomDatePicker.reset();
    this.refresh();
    if (this.dropdown) {
      this.dropdown.style.display = this.hasRenderableChart()
        ? 'block'
        : 'none';
    }
  },
};

const CustomDatePicker = {
  datePickerButton: null,
  modal: null,
  startDateInput: null,
  endDateInput: null,
  currentMode: null,

  createDatePickerButton() {
    if (this.datePickerButton) return this.datePickerButton;

    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return null;

    this.datePickerButton = Dom.create('button', 'custom-date-picker-button');
    this.datePickerButton.innerHTML = '<i class="fas fa-calendar-alt"></i>';
    this.datePickerButton.title = 'Select custom date range';

    this.datePickerButton.addEventListener('click', () => {
      this.openModal();
    });

    const chart = Dom.get('videoChart');
    if (chart && chart.parentElement) {
      chart.parentElement.insertBefore(this.datePickerButton, chart);
    }
    return this.datePickerButton;
  },

  createModal() {
    if (this.modal) return this.modal;

    this.modal = Dom.create('div', 'modal-overlay');
    this.modal.id = 'datePickerModal';
    this.modal.innerHTML = `
	      <div class="modal-content">
	        <div class="modal-header">
	          <h3 id="modalTitle">Select Date Range</h3>
	          <button class="close-btn">&times;</button>
	        </div>
	        <div class="modal-body">
	          <div class="input-group">
	            <label for="modalStartDate">Start Date</label>
	            <input type="date" id="modalStartDate" />
	          </div>
	          <div class="input-group">
	            <label for="modalEndDate">End Date</label>
	            <input type="date" id="modalEndDate" />
	          </div>
	        </div>
	        <div class="modal-footer">
	          <button class="reset-btn">Reset to Default</button>
	          <button class="apply-btn">Apply</button>
	        </div>
	      </div>
	    `;

    document.body.appendChild(this.modal);

    this.startDateInput = document.getElementById('modalStartDate');
    this.endDateInput = document.getElementById('modalEndDate');

    this.modal.querySelector('.close-btn').onclick = () => this.closeModal();
    this.modal.querySelector('.reset-btn').onclick = () =>
      this.resetToDefault();
    this.modal.querySelector('.apply-btn').onclick = () =>
      this.applyDateRange();

    this.modal.addEventListener('click', e => {
      if (e.target === this.modal) this.closeModal();
    });

    this.modal.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.applyDateRange();
      }
    });

    return this.modal;
  },

  openModal(mode = null) {
    if (!mode) {
      const config = State.getChartConfig();
      mode = config.dataPoints === 'hourly-chart' ? 'hourly' : 'regular';
    }
    this.currentMode = mode;

    if (!this.modal) this.createModal();

    if (this.startDateInput && this.endDateInput) {
      const now = luxon.DateTime.now().setZone('America/New_York');
      let start;
      if (mode === 'hourly') {
        if (State.currentChartMode === '7dh' && !State.hourlyDateRange.start) {
          start = now.minus({ days: 7 }).startOf('day');
        } else if (State.hourlyDateRange.start) {
          start = luxon.DateTime.fromISO(State.hourlyDateRange.start, {
            zone: 'America/New_York',
          });
        } else {
          start = now.minus({ days: Config.hourly.defaultDays }).startOf('day');
        }
        this.startDateInput.value =
          State.hourlyDateRange.start || start.toISODate();
        this.endDateInput.value = State.hourlyDateRange.end || now.toISODate();
      } else {
        if (State.customDateRange.start) {
          start = luxon.DateTime.fromISO(State.customDateRange.start, {
            zone: 'America/New_York',
          });
        } else {
          start = now.minus({ days: 30 }).startOf('day');
        }
        this.startDateInput.value =
          State.customDateRange.start || start.toISODate();
        this.endDateInput.value = State.customDateRange.end || now.toISODate();
      }
      this.endDateInput.max = now.toISODate();

      const title = this.modal.querySelector('#modalTitle');
      if (title) {
        title.textContent =
          mode === 'hourly'
            ? 'Select Hourly Chart Date Range'
            : 'Select Custom Date Range';
      }
    }
    this.modal.classList.add('show');
  },

  closeModal() {
    if (this.modal) this.modal.classList.remove('show');
  },

  async resetToDefault() {
    this.closeModal();

    State.customDateRange = { start: null, end: null };
    State.hourlyDateRange = { start: null, end: null };
    State.customDateRangeLabel = null;

    if (this.datePickerButton) {
      this.datePickerButton.classList.remove('active');
    }

    const container = Dom.get('videoChart');
    if (container) {
      container.innerHTML =
        '<div style="text-align:center;padding:20px;">Resetting to default range...</div>';
    }

    try {
      if (State.isHourlyMode) {
        State.hourlyData = null;
        await ChartModeDropdown.loadHourlyChart();
      } else {
        await ChartModeDropdown.loadAndDisplayData();
      }
    } catch (error) {
      console.error('Failed to reset date range:', error);
      if (container) {
        container.innerHTML =
          '<div style="text-align:center;padding:20px;color:red;">Error resetting date range. Please try again.</div>';
      }
    }
  },

  async applyDateRange() {
    if (!this.startDateInput || !this.endDateInput) return;
    const startDate = this.startDateInput.value;
    const endDate = this.endDateInput.value;

    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }
    if (startDate > endDate) {
      alert('Start date must be before end date');
      return;
    }
    this.closeModal();

    try {
      const container = Dom.get('videoChart');
      if (container) {
        container.innerHTML =
          '<div style="text-align:center;padding:20px;">Loading custom date range...</div>';
      }

      if (this.currentMode === 'hourly') {
        State.hourlyDateRange.start = startDate;
        State.hourlyDateRange.end = endDate;

        const data = await ChartModeDropdown.fetchHourlyData(
          State.currentEntityId,
          State.currentChannel,
          startDate,
          endDate
        );
        State.hourlyData = data;
        State.isHourlyMode = true;

        const start = luxon.DateTime.fromISO(startDate, {
          zone: 'America/New_York',
        });
        const end = luxon.DateTime.fromISO(endDate, {
          zone: 'America/New_York',
        });
        State.customDateRangeLabel = `${start.toFormat(
          'MM/dd'
        )} - ${end.toFormat('MM/dd')}`;

        if (this.datePickerButton) {
          this.datePickerButton.classList.add('active');
        }
      } else {
        State.customDateRange.start = startDate;
        State.customDateRange.end = endDate;

        const start = luxon.DateTime.fromISO(startDate, {
          zone: 'America/New_York',
        });
        const end = luxon.DateTime.fromISO(endDate, {
          zone: 'America/New_York',
        });
        State.customDateRangeLabel = `${start.toFormat(
          'MM/dd'
        )} - ${end.toFormat('MM/dd')}`;
        await this.loadCustomRangeData();

        if (this.datePickerButton) {
          this.datePickerButton.classList.add('active');
        }
      }
      await Charts.create();
    } catch (error) {
      console.error('Failed to load custom date range:', error);
      const container = Dom.get('videoChart');
      if (container) {
        container.innerHTML =
          '<div style="text-align:center;padding:20px;color:red;">Error loading custom date range. Please try again.</div>';
      }
      if (this.currentMode === 'hourly') {
        State.isHourlyMode = false;
        State.hourlyData = null;
        State.hourlyDateRange = { start: null, end: null };
      } else {
        State.customDateRange = { start: null, end: null };
      }
      State.customDateRangeLabel = null;

      if (this.datePickerButton) {
        this.datePickerButton.classList.remove('active');
      }
    }
  },

  async loadCustomRangeData() {
    const startDate = luxon.DateTime.fromISO(State.customDateRange.start, {
      zone: 'America/New_York',
    }).startOf('day');
    const endDate = luxon.DateTime.fromISO(State.customDateRange.end, {
      zone: 'America/New_York',
    }).endOf('day');

    let filteredData = State.rawData;
    if (Array.isArray(filteredData)) {
      filteredData = filteredData.filter(entry => {
        const entryTime = entry.timestamp || entry.time;
        if (!entryTime) return false;
        const entryDate = luxon.DateTime.fromISO(entryTime, {
          zone: 'America/New_York',
        });
        return entryDate >= startDate && entryDate <= endDate;
      });

      if (filteredData.length === 0) {
        throw new Error('No data available for the selected date range');
      }

      const daysDiff = Math.ceil(endDate.diff(startDate, 'days').days);
      if (daysDiff <= 60) {
        State.processedData = DataProcessor.transform(filteredData);
      } else {
        const dailyData = DataProcessor.processDaily(
          filteredData,
          !!filteredData[0]?.timestamp
        );
        State.processedData = DataProcessor.transform(dailyData);
      }
    } else {
      throw new Error('Invalid data format');
    }
  },

  show() {
    if (!this.datePickerButton) this.createDatePickerButton();

    const hasCustomRange =
      (State.customDateRange.start && State.customDateRange.end) ||
      (State.hourlyDateRange.start && State.hourlyDateRange.end);

    if (this.datePickerButton && hasCustomRange) {
      this.datePickerButton.classList.add('active');
    }
  },

  hide() {
    if (this.datePickerButton) this.datePickerButton.classList.remove('show');
  },

  reset() {
    State.hourlyDateRange = { start: null, end: null };
    State.customDateRange = { start: null, end: null };
    State.customDateRangeLabel = null;

    if (this.datePickerButton) {
      this.datePickerButton.classList.remove('active', 'show');
    }
  },
};

const ChannelPreloader = {
  preloadedChannels: new Set(),
  inProgress: new Map(),

  async preloadAll(channelId, excludeTab = null) {
    if (this.preloadedChannels.has(channelId)) return;

    if (this.inProgress.has(channelId)) {
      return this.inProgress.get(channelId);
    }

    const promise = this._doPreload(channelId, excludeTab);
    this.inProgress.set(channelId, promise);

    try {
      await promise;
      this.preloadedChannels.add(channelId);
    } finally {
      this.inProgress.delete(channelId);
    }
  },

  async _doPreload(channelId, excludeTab) {
    const tasks = [];

    if (excludeTab !== 'combined') {
      tasks.push(
        this._preloadCombined(channelId).catch(err =>
          console.warn('Failed to preload combined:', err)
        )
      );
    }

    if (excludeTab !== 'videos') {
      tasks.push(
        this._preloadVideos(channelId).catch(err =>
          console.warn('Failed to preload videos:', err)
        )
      );
    }

    if (excludeTab !== 'rankings') {
      tasks.push(
        Rankings.prefetch(channelId).catch(err =>
          console.warn('Failed to preload rankings:', err)
        )
      );
    }

    if (excludeTab !== 'gains') {
      tasks.push(
        Gains.prefetch(channelId).catch(err =>
          console.warn('Failed to preload gains:', err)
        )
      );
    }

    await Promise.allSettled(tasks);
  },

  async _preloadCombined(channelId) {
    const endpoint =
      channelId === 'mrbeast'
        ? Config.api.combinedHistory.mrbeast
        : Config.api.combinedHistory.byChannel(channelId);

    await Net.fetchJson(endpoint, {}, 10 * 60 * 1000);

    await Promise.all([
      Net.fetchJson(`${endpoint}?type=short`, {}, 10 * 60 * 1000).catch(
        () => null
      ),
      Net.fetchJson(`${endpoint}?type=long`, {}, 10 * 60 * 1000).catch(
        () => null
      ),
    ]);
  },

  async _preloadVideos(channelId) {
    const url = `${Config.api.listing}?channel=${channelId}&filter=all`;
    await Net.fetchJson(url, {}, 10 * 60 * 1000);
  },

  reset(channelId = null) {
    if (channelId) {
      this.preloadedChannels.delete(channelId);
      this.inProgress.delete(channelId);
    } else {
      this.preloadedChannels.clear();
      this.inProgress.clear();
    }
  },

  trigger(channelId, currentTab) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(
        () => {
          this.preloadAll(channelId, currentTab);
        },
        { timeout: 2000 }
      );
    } else {
      setTimeout(() => {
        this.preloadAll(channelId, currentTab);
      }, 500);
    }
  },
};

const Loader = {
  _loadPromises: new Map(),
  _loadedKey: null,

  saveCurrentScrollPosition() {
    if (State.isVideosGridView) {
      ScrollState.save('videos', State.currentChannel);
    } else if (State.isGainsView) {
      ScrollState.save('gains', State.currentChannel);
    } else if (State.isRankingsView) {
      ScrollState.save('rankings', State.currentChannel);
    } else if (State.currentEntityId === State.currentChannel) {
      ScrollState.save('combined', State.currentChannel);
    } else {
      ScrollState.save('video', State.currentEntityId);
    }
  },

  async setupProfile(profileUrl) {
    let headerLeft = document.querySelector('.header-left');
    if (!headerLeft) {
      headerLeft = Dom.create('div', 'header-left');
      const header = document.querySelector('header');
      const h1 = header?.querySelector('h1');
      if (header && h1) {
        header.insertBefore(headerLeft, h1);
        headerLeft.appendChild(h1);
      }
    }
    if (headerLeft && profileUrl) {
      Dom.removeImg();
      const profileImg = Dom.createImg(profileUrl);
      headerLeft.insertBefore(profileImg, headerLeft.firstChild);
    }
  },

  setupChannelHeader(channelId) {
    const ch =
      Config.channels.find(c => c.id === channelId) || Config.channels[0];
    const header = Dom.get('channelHeader');
    const avatar = Dom.get('channelAvatar');
    const name = Dom.get('channelName');

    if (avatar) avatar.src = ch.avatar;
    if (name) {
      const match = ch.avatar.match(/\/([^\/]+)\/avatar/);
      const youtubeChannelId = match ? match[1] : null;

      if (youtubeChannelId) {
        name.innerHTML = `<a href="https://www.youtube.com/channel/${youtubeChannelId}" target="_blank" rel="noopener">${ch.name}</a>`;
      } else {
        name.textContent = ch.name;
      }
    }
    if (header) header.style.display = 'flex';

    ChannelsBar.highlight(channelId);
    ChannelTabs.render();
    ChannelTabs.setActive(State.currentTab || 'combined');
  },

  updateVideoInfo(video) {
    const elements = {
      thumbnail: Dom.get('videoThumbnail'),
      videoLink: Dom.get('videoLink'),
      uploadDate: Dom.get('uploadDate'),
      duration: Dom.get('videoDuration'),
    };

    if (elements.thumbnail && video.thumbnail) {
      elements.thumbnail.src = video.thumbnail;
      elements.thumbnail.loading = 'eager';
    }

    if (elements.videoLink && video.videoId && video.title) {
      elements.videoLink.href = `https://www.youtube.com/watch?v=${video.videoId}`;
      elements.videoLink.textContent = video.title;

      const input = Dom.get('searchInput');
      if (input) input.value = video.title;
    }

    if (elements.uploadDate && video.uploadTime) {
      const uploadDate = luxon.DateTime.fromISO(video.uploadTime).setZone(
        'America/New_York'
      );
      elements.uploadDate.innerHTML = `Uploaded: ${uploadDate.toFormat(
        'M/d/yyyy'
      )} at ${uploadDate.toFormat('h:mm:ss a')} EST`;

      if (video.lastUpdated) {
        const lastUpdated = luxon.DateTime.fromISO(video.lastUpdated).setZone(
          'America/New_York'
        );
        const span = Dom.create('span', 'last-updated');
        span.textContent = ` (Stats last updated: ${lastUpdated.toFormat(
          'M/d/yyyy'
        )} at ${lastUpdated.toFormat('h:mm:ss a')} EST)`;
        elements.uploadDate.appendChild(span);
      }
    }

    if (elements.duration && video.duration) {
      elements.duration.innerHTML = `Duration: ${video.duration}`;
      const videoIdSpan = Dom.create('span', 'video-id');
      videoIdSpan.textContent = ` (Video ID: ${video.videoId})`;
      elements.duration.appendChild(videoIdSpan);
    }

    Dom.show('videoInfoCard');
  },

  async loadChannelCombined(channelId, profileUrl, isNavigation = false) {
    const key = `channel-combined:${channelId}`;
    if (this._loadPromises.has(key)) return this._loadPromises.get(key);
    const p = (async () => {
      this.saveCurrentScrollPosition();

      const switchingChannels =
        State.currentChannel && State.currentChannel !== channelId;

      if (switchingChannels) {
        ScrollState.clear('combined', channelId);
        CombinedMetricsFilter.reset();
      }

      State.reset();
      ScrollToTop.hide();
      ChartModeDropdown.reset();
      State.currentEntityId = channelId;
      State.currentChannel = channelId;
      State.isRankingsView = false;
      State.isGainsView = false;
      State.isVideosGridView = false;

      if (switchingChannels || !isNavigation) {
        window.scrollTo(0, 0);
      }

      const headerTitle = document.querySelector('header h1');
      if (headerTitle) headerTitle.textContent = 'Channel Analytics';

      await this.setupProfile(profileUrl);
      this.setupChannelHeader(channelId);

      Dom.updateUrl('combined', channelId, isNavigation);
      Dom.setMainView('combined');

      const exportControls = document.querySelector('.export-controls');
      if (exportControls) exportControls.style.display = 'flex';

      Dom.hide('videoInfoCard');

      const container = Dom.get('videoChart');
      if (container) {
        container.innerHTML =
          '<div style="text-align:center;padding:40px;"><i class="fas fa-spinner fa-spin"></i> Loading channel data...</div>';
      }

      const uploadCard = Dom.get('uploadCountCard');
      if (uploadCard) uploadCard.style.display = 'flex';
      const grid = document.querySelector('.stats-grid');
      if (grid) grid.classList.remove('three-columns');

      try {
        const endpoint =
          channelId === 'mrbeast'
            ? Config.api.combinedHistory.mrbeast
            : Config.api.combinedHistory.byChannel(channelId);

        const combinedData = await Net.fetchJson(endpoint, {}, 10 * 60 * 1000);
        if (Array.isArray(combinedData)) {
          State.rawData = combinedData;
          State._dailyCache = DataProcessor.processDaily(combinedData);
          await ChartModeDropdown.loadAndDisplayData();
          Stats.update();

          const dailyData = State._dailyCache || [];
          const currentData = combinedData[combinedData.length - 1];
          Tables.create(dailyData, currentData);

          ChartModeDropdown.show();
          CombinedMetricsFilter.show();

          if (!switchingChannels && ScrollState.has('combined', channelId)) {
            requestAnimationFrame(() => {
              ScrollState.restore('combined', channelId);
            });
          }

          ChannelPreloader.trigger(State.currentChannel, 'combined');
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        const chart = Dom.get('videoChart');
        if (chart) {
          chart.innerHTML = `<div style='text-align:center;padding:20px;color:red;'>Failed to load data: ${error.message}<br>Please try again.</div>`;
        }
      }
      this._loadedKey = key;
    })();

    this._loadPromises.set(key, p);
    try {
      await p;
    } finally {
      this._loadPromises.delete(key);
    }
    return p;
  },

  async loadChannelVideos(channelId, profileUrl, isNavigation = false) {
    const key = `channel-videos:${channelId}`;
    if (this._loadPromises.has(key)) return this._loadPromises.get(key);

    const p = (async () => {
      this.saveCurrentScrollPosition();

      const switchingChannels =
        State.currentChannel && State.currentChannel !== channelId;

      if (switchingChannels) {
        ScrollState.clear('videos', channelId);
      }

      State.reset();
      ScrollToTop.show();
      ChartModeDropdown.reset();
      ChartModeDropdown.hide();

      State.currentEntityId = channelId;
      State.currentChannel = channelId;
      State.isVideosGridView = true;

      if (switchingChannels || !isNavigation) {
        window.scrollTo(0, 0);
      }

      await this.setupProfile(profileUrl);
      this.setupChannelHeader(channelId);

      Dom.updateUrl('videos', channelId, isNavigation);
      Dom.setMainView('videos');
      CombinedMetricsFilter.hide();

      const exportControls = document.querySelector('.export-controls');
      if (exportControls) exportControls.style.display = 'none';

      ChannelVideos.bindControls();
      await ChannelVideos.load(channelId);

      if (!switchingChannels && ScrollState.has('videos', channelId)) {
        const savedY = ScrollState.positions.get(`videos:${channelId}`) || 0;
        const mode = State.videosGrid.mode || 'grid';

        if (mode === 'grid') {
          const estimatedRowHeight = 280;
          const columnsPerRow =
            window.innerWidth > 1024
              ? 4
              : window.innerWidth > 768
                ? 3
                : window.innerWidth > 480
                  ? 2
                  : 1;

          const neededRows = Math.ceil(savedY / estimatedRowHeight);
          const itemsToRender = Math.min(
            (neededRows + 2) * columnsPerRow,
            ChannelVideos.filteredItems.length
          );

          if (itemsToRender > ChannelVideos.visibleCount) {
            const prevCount = ChannelVideos.visibleCount;
            ChannelVideos.visibleCount = itemsToRender;
            ChannelVideos.renderGridVisible(prevCount);
          }

          ScrollState.restore('videos', channelId);
        } else {
          const approxRowHeight = 56;
          const rowsNeeded = Math.ceil(savedY / approxRowHeight) + 30;
          const itemsToRender = Math.min(
            rowsNeeded,
            ChannelVideos.filteredItems.length
          );
          if (itemsToRender > ChannelVideos.visibleCount) {
            const prevCount = ChannelVideos.visibleCount;
            ChannelVideos.visibleCount = itemsToRender;
            ChannelVideos.renderListVisible(prevCount);
          }
          const wrapper = Dom.get('videosListWrapper');
          if (wrapper) wrapper.scrollTop = savedY;
        }
      }

      ChannelPreloader.trigger(State.currentChannel, 'videos');

      this._loadedKey = key;
    })();

    this._loadPromises.set(key, p);
    try {
      await p;
    } finally {
      this._loadPromises.delete(key);
    }
    return p;
  },

  async loadChannelRankings(channelId, profileUrl, isNavigation = false) {
    const key = `channel-rank:${channelId}`;
    if (this._loadPromises.has(key)) return this._loadPromises.get(key);
    const p = (async () => {
      this.saveCurrentScrollPosition();

      const switchingChannels =
        State.currentChannel && State.currentChannel !== channelId;

      if (switchingChannels) {
        ScrollState.clear('rankings', channelId);
      }

      State.reset();
      ScrollToTop.hide();
      ChartModeDropdown.reset();
      ChartModeDropdown.hide();

      State.currentEntityId = channelId;
      State.currentChannel = channelId;
      State.isRankingsView = true;

      if (switchingChannels || !isNavigation) {
        window.scrollTo(0, 0);
      }

      const headerTitle = document.querySelector('header h1');
      if (headerTitle) headerTitle.textContent = 'Video Rankings';

      await this.setupProfile(profileUrl);
      this.setupChannelHeader(channelId);

      Dom.updateUrl('rankings', channelId, isNavigation);
      Dom.setMainView('rankings');
      CombinedMetricsFilter.hide();

      const exportControls = document.querySelector('.export-controls');
      if (exportControls) exportControls.style.display = 'none';

      Rankings.applySettings();
      const list = Dom.get('rankingsList');
      if (list) {
        list.innerHTML =
          '<div style="text-align:center;padding:40px;color:var(--muted-text-color);">Loading rankings...</div>';
      }

      try {
        const rankings = await Rankings.fetch(
          channelId,
          State.rankingsSettings.filter
        );
        if (rankings.length > 0) {
          const saved = SessionSettings.getRankingsSettings();
          if (!saved) {
            const defaults = Rankings.getDefaults(rankings);
            State.rankingsSettings.videoCount = defaults.videoCount;
            State.rankingsSettings.timePeriod = defaults.timePeriod;
            Rankings.applySettings();
          }
          Rankings.display(rankings);

          if (!switchingChannels && ScrollState.has('rankings', channelId)) {
            requestAnimationFrame(() => {
              ScrollState.restore('rankings', channelId);
            });
          }
        } else {
          if (list) {
            list.innerHTML =
              '<div style="text-align:center;padding:40px;color:var(--muted-text-color);">No ranking data available for this channel.</div>';
          }
        }
      } catch (error) {
        if (list) {
          list.innerHTML =
            '<div style="text-align:center;padding:20px;color:red;">Error loading rankings. Please try again.</div>';
        }
      }

      ChannelPreloader.trigger(State.currentChannel, 'rankings');

      this._loadedKey = key;
    })();

    this._loadPromises.set(key, p);
    try {
      await p;
    } finally {
      this._loadPromises.delete(key);
    }
    return p;
  },

  async loadChannelGains(channelId, profileUrl, isNavigation = false) {
    const key = `channel-gains:${channelId}`;
    if (this._loadPromises.has(key)) return this._loadPromises.get(key);
    const p = (async () => {
      this.saveCurrentScrollPosition();

      const switchingChannels =
        State.currentChannel && State.currentChannel !== channelId;

      if (switchingChannels) {
        ScrollState.clear('gains', channelId);
      }

      State.reset();
      ScrollToTop.hide();
      ChartModeDropdown.reset();
      ChartModeDropdown.hide();

      State.currentEntityId = channelId;
      State.currentChannel = channelId;
      State.isGainsView = true;

      if (switchingChannels || !isNavigation) {
        window.scrollTo(0, 0);
      }

      const headerTitle = document.querySelector('header h1');
      if (headerTitle) headerTitle.textContent = 'Video Gains';

      await this.setupProfile(profileUrl);
      this.setupChannelHeader(channelId);

      Dom.updateUrl('gains', channelId, isNavigation);
      Dom.setMainView('gains');
      CombinedMetricsFilter.hide();

      const exportControls = document.querySelector('.export-controls');
      if (exportControls) exportControls.style.display = 'none';

      Gains.applySettings();
      const list = Dom.get('gainsList');
      if (list) {
        list.innerHTML =
          '<div style="text-align:center;padding:40px;color:var(--muted-text-color);">Loading gains...</div>';
      }

      try {
        const gains = await Gains.fetch(
          channelId,
          State.gainsSettings.metric,
          State.gainsSettings.filter,
          State.gainsSettings.period,
          State.gainsSettings.sortMode
        );
        if (State.isGainsView) {
          Gains.display(gains, State.gainsSettings.count);

          if (!switchingChannels && ScrollState.has('gains', channelId)) {
            requestAnimationFrame(() => {
              ScrollState.restore('gains', channelId);
            });
          }
        }
      } catch (error) {
        if (list) {
          list.innerHTML =
            '<div style="text-align:center;padding:20px;color:red;">Error loading gains. Please try again.</div>';
        }
      }

      ChannelPreloader.trigger(State.currentChannel, 'gains');

      this._loadedKey = key;
    })();

    this._loadPromises.set(key, p);
    try {
      await p;
    } finally {
      this._loadPromises.delete(key);
    }
    return p;
  },

  async loadVideo(videoId, channelId = 'mrbeast', isNavigation = false) {
    const key = `video:${videoId}|${channelId}`;
    if (this._loadPromises.has(key)) return this._loadPromises.get(key);
    if (this._loadedKey === key && !isNavigation) return;

    const p = (async () => {
      this.saveCurrentScrollPosition();

      const switchingVideos =
        State.currentEntityId && State.currentEntityId !== videoId;

      if (switchingVideos) {
        ScrollState.clear('video', videoId);
      }

      State.reset();
      ScrollToTop.hide();
      ChartModeDropdown.reset();

      State.currentEntityId = videoId;
      State.currentChannel = channelId;
      State.isRankingsView = false;
      State.isGainsView = false;
      State.isVideosGridView = false;

      State.currentTab = 'videos';

      if (switchingVideos || !isNavigation) {
        window.scrollTo(0, 0);
      }

      Dom.setMainView('video');
      CombinedMetricsFilter.hide();

      const exportControls = document.querySelector('.export-controls');
      if (exportControls) exportControls.style.display = 'flex';

      const container = Dom.get('videoChart');
      if (container) {
        container.innerHTML =
          '<div style="text-align:center;padding:40px;">Loading video data...</div>';
      }

      const uploadCard = Dom.get('uploadCountCard');
      if (uploadCard) uploadCard.style.display = 'none';

      const grid = document.querySelector('.stats-grid');
      if (grid) grid.classList.add('three-columns');

      const headerTitle = document.querySelector('header h1');
      if (headerTitle) headerTitle.textContent = 'Video Analytics';

      if (State.selectedMetricIndex === 3) {
        State.selectedMetricIndex = 0;
        document.querySelectorAll('.stat-card').forEach((card, index) => {
          card.classList.toggle('active', index === 0);
        });
      }

      Dom.removeImg();
      const ch =
        Config.channels.find(c => c.id === channelId) || Config.channels[0];
      await this.setupProfile(ch.avatar);

      if (!isNavigation) {
        if (channelId !== 'mrbeast') Dom.updateUrl(videoId, channelId);
        else Dom.updateUrl(videoId);
      }

      try {
        let endpoint = Config.api.videoStats.byChannel(channelId, videoId);
        let video = null;
        try {
          video = await Net.fetchJson(endpoint, {}, 10 * 60 * 1000);
        } catch (e) {
          endpoint = Config.api.videoStats.base + videoId;
          video = await Net.fetchJson(endpoint, {}, 10 * 60 * 1000);
        }

        if (video?.stats && Array.isArray(video.stats)) {
          State.videoUploadTime = video.uploadTime || null;

          this.updateVideoInfo(video);

          const filtered = video.stats.filter(
            stat => stat.views != null && stat.likes != null
          );

          State.rawData = filtered;
          State._dailyCache = DataProcessor.processDaily(filtered, true);

          await ChartModeDropdown.loadAndDisplayData();
          Stats.update();

          const dailyData = State._dailyCache || [];
          const currentData = filtered[filtered.length - 1];
          Tables.create(dailyData, currentData, true);

          Dom.show('videoInfoCard');
          ChartModeDropdown.show();

          if (!switchingVideos && ScrollState.has('video', videoId)) {
            requestAnimationFrame(() => {
              ScrollState.restore('video', videoId);
            });
          }

          ChannelPreloader.trigger(State.currentChannel, null);

          const canPrefetch7dh =
            State.currentEntityId !== State.currentChannel &&
            State.getMetricName() !== 'comments' &&
            !State.hourlyData;

          if (canPrefetch7dh) {
            const endDt = luxon.DateTime.now().setZone('America/New_York');
            const startDt = endDt.minus({ days: Config.hourly.defaultDays });
            const startISO = startDt.toISODate();
            const endISO = endDt.toISODate();

            const doPrefetch = async () => {
              try {
                State.hourlyData = await ChartModeDropdown.fetchHourlyData(
                  State.currentEntityId,
                  State.currentChannel,
                  startISO,
                  endISO
                );
              } catch {}
            };

            if ('requestIdleCallback' in window) {
              requestIdleCallback(doPrefetch);
            } else {
              setTimeout(doPrefetch, 200);
            }
          }
        } else {
          throw new Error('Invalid video data format');
        }
      } catch (error) {
        const chart = Dom.get('videoChart');
        if (chart) {
          chart.innerHTML = `<div style='text-align:center;padding:20px;color:red;'>Failed to load video data: ${error.message}<br>Please try again.</div>`;
        }
      }

      this.setupChannelHeader(channelId);

      this._loadedKey = key;
    })();

    this._loadPromises.set(key, p);
    try {
      await p;
    } finally {
      this._loadPromises.delete(key);
    }

    return p;
  },
};

const ScrollToTop = {
  button: null,
  scrollThreshold: 300,
  _scrollHandler: null,

  create() {
    if (this.button) return this.button;

    this.button = Dom.create('button', 'scroll-to-top');
    this.button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    this.button.title = 'Scroll to top';
    this.button.setAttribute('aria-label', 'Scroll to top');
    this.button.setAttribute('type', 'button');

    this.button.addEventListener('click', () => {
      this.scrollToTop();
    });

    document.body.appendChild(this.button);
    return this.button;
  },

  scrollToTop() {
    if (State.isVideosGridView && State.videosGrid.mode === 'list') {
      const wrapper = Dom.get('videosListWrapper');
      if (wrapper) {
        wrapper.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  },

  updateVisibility() {
    if (!this.button) return;

    const shouldShow = State.isVideosGridView;

    if (!shouldShow) {
      this.button.classList.remove('show');
      return;
    }

    let scrolled = 0;
    if (State.videosGrid.mode === 'list') {
      const wrapper = Dom.get('videosListWrapper');
      scrolled = wrapper ? wrapper.scrollTop : 0;
    } else {
      scrolled = window.scrollY || window.pageYOffset || 0;
    }

    if (scrolled > this.scrollThreshold) {
      this.button.classList.add('show');
    } else {
      this.button.classList.remove('show');
    }
  },

  bindScrollEvents() {
    this.unbindScrollEvents();

    this._scrollHandler = () => {
      this.updateVisibility();
    };

    if (State.videosGrid.mode === 'list') {
      const wrapper = Dom.get('videosListWrapper');
      if (wrapper) {
        wrapper.addEventListener('scroll', this._scrollHandler, {
          passive: true,
        });
      }
    } else {
      window.addEventListener('scroll', this._scrollHandler, { passive: true });
    }
  },

  unbindScrollEvents() {
    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
      const wrapper = Dom.get('videosListWrapper');
      if (wrapper) {
        wrapper.removeEventListener('scroll', this._scrollHandler);
      }
      this._scrollHandler = null;
    }
  },

  show() {
    if (!this.button) this.create();
    this.bindScrollEvents();
    this.updateVisibility();
  },

  hide() {
    if (this.button) {
      this.button.classList.remove('show');
    }
    this.unbindScrollEvents();
  },

  refresh() {
    if (State.isVideosGridView) {
      this.show();
    } else {
      this.hide();
    }
  },
};

const Router = {
  parse() {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    const channelParam = params.get('channel');
    const tab = params.get('tab');

    const normTab = tab === 'list' || tab === 'listing' ? 'videos' : tab;

    return { data, channel: channelParam, tab: normTab };
  },

  getChannelInfo(channelId) {
    return Config.channels.find(c => c.id === channelId) || Config.channels[0];
  },

  async goChannelTab(channelId, tabId) {
    State.currentTab = tabId || 'combined';

    const ch = this.getChannelInfo(channelId);
    ChannelsBar.highlight(ch.id);

    ChannelTabs.render();
    ChannelTabs.setActive(State.currentTab);

    if (State.currentTab === 'videos') {
      await Loader.loadChannelVideos(ch.id, ch.avatar, false);
    } else if (State.currentTab === 'rankings') {
      await Loader.loadChannelRankings(ch.id, ch.avatar, false);
    } else if (State.currentTab === 'gains') {
      await Loader.loadChannelGains(ch.id, ch.avatar, false);
    } else {
      await Loader.loadChannelCombined(ch.id, ch.avatar, false);
      ChannelTabs.setActive('combined');
      State.currentTab = 'combined';
    }
  },

  async goVideo(videoId, channelId) {
    State.currentTab = 'videos';

    const ch = this.getChannelInfo(channelId || 'mrbeast');
    ChannelsBar.highlight(ch.id);
    ChannelTabs.render();
    ChannelTabs.setActive('videos');

    await Loader.loadVideo(videoId, ch.id, false);
  },

  async handlePop() {
    await this.routeFromUrl(true);
  },

  async routeFromUrl(isNavigation = false) {
    const { data, channel, tab } = this.parse();
    const ch = this.getChannelInfo(channel || 'mrbeast');

    const isTabKey = key => {
      if (!key) return false;
      const k = String(key).toLowerCase();
      return (
        k === 'combined' || k === 'videos' || k === 'rankings' || k === 'gains'
      );
    };

    if (isTabKey(tab)) {
      const t = tab.toLowerCase() === 'list' ? 'listing' : tab.toLowerCase();
      State.currentTab = t;

      if (t === 'videos') {
        await Loader.loadChannelVideos(ch.id, ch.avatar, isNavigation);
        ChannelTabs.setActive('videos');
        return;
      }
      if (t === 'rankings') {
        await Loader.loadChannelRankings(ch.id, ch.avatar, isNavigation);
        ChannelTabs.setActive('rankings');
        return;
      }
      if (t === 'gains') {
        await Loader.loadChannelGains(ch.id, ch.avatar, isNavigation);
        ChannelTabs.setActive('gains');
        return;
      }
      await Loader.loadChannelCombined(ch.id, ch.avatar, isNavigation);
      ChannelTabs.setActive('combined');
      return;
    }

    if (isTabKey(data)) {
      const t = data.toLowerCase() === 'list' ? 'listing' : data.toLowerCase();
      State.currentTab = t;

      if (t === 'videos') {
        await Loader.loadChannelVideos(ch.id, ch.avatar, isNavigation);
        ChannelTabs.setActive('videos');
        return;
      }
      if (t === 'rankings') {
        await Loader.loadChannelRankings(ch.id, ch.avatar, isNavigation);
        ChannelTabs.setActive('rankings');
        return;
      }
      if (t === 'gains') {
        await Loader.loadChannelGains(ch.id, ch.avatar, isNavigation);
        ChannelTabs.setActive('gains');
        return;
      }
      await Loader.loadChannelCombined(ch.id, ch.avatar, isNavigation);
      ChannelTabs.setActive('combined');
      return;
    }

    if (data && Config.channels.some(c => c.id === data)) {
      const legacyChannel = this.getChannelInfo(data);
      State.currentTab = 'combined';
      await Loader.loadChannelCombined(
        legacyChannel.id,
        legacyChannel.avatar,
        isNavigation
      );
      ChannelTabs.setActive('combined');
      return;
    }

    if (data) {
      State.currentTab = 'videos';
      await this.goVideo(data, ch.id);
      return;
    }

    State.currentTab = 'combined';
    await Loader.loadChannelCombined(ch.id, ch.avatar, isNavigation);
    ChannelTabs.setActive('combined');
  },

  start() {
    this.routeFromUrl(true);

    window.addEventListener('popstate', () => this.handlePop());
  },
};

const MetricCards = {
  colors: null,

  faded(hex) {
    const h = hex.replace('#', '');
    const r = parseInt(h.substr(0, 2), 16);
    const g = parseInt(h.substr(2, 2), 16);
    const b = parseInt(h.substr(4, 2), 16);
    const fadedR = Math.round(r + (255 - r) * 0.2);
    const fadedG = Math.round(g + (255 - g) * 0.2);
    const fadedB = Math.round(b + (255 - b) * 0.2);
    return `rgb(${fadedR}, ${fadedG}, ${fadedB})`;
  },

  bind() {
    const cards = Array.from(document.querySelectorAll('.stat-card'));
    this.colors = {
      0: this.faded(Config.colors.views),
      1: this.faded(Config.colors.likes),
      2: this.faded(Config.colors.comments),
      3: this.faded(Config.colors.uploads),
    };

    cards.forEach((card, index) => {
      card.addEventListener('click', async () => {
        cards.forEach(c => {
          c.classList.remove('active');
          c.style.removeProperty('--active-card-color');
        });
        card.classList.add('active');
        card.style.setProperty('--active-card-color', this.colors[index]);

        State.selectedMetricIndex = index;

        ChartModeDropdown.show();
        const didChangeMode = await ChartModeDropdown.refresh();
        if (!didChangeMode) {
          if (CombinedMetricsFilter.state.filterMode !== 'all') {
            await CombinedMetricsFilter.refresh();
          } else {
            Charts.create({ animate: true });
          }
        }
      });
    });

    const initial = cards[State.selectedMetricIndex] || cards[0];
    if (initial) {
      initial.classList.add('active');
      initial.style.setProperty(
        '--active-card-color',
        this.colors[State.selectedMetricIndex] || this.colors[0]
      );
    }
  },

  init() {
    this.bind();
  },
};

const App = {
  init() {
    try {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);

      this.checkDeps();
      Theme.init();
      Layout.bindEvents();
      Export.init();
      ChannelsBar.create();
      MetricCards.init();
      Rankings.init();
      Gains.init();
      ChannelVideos.bindControls();
      Router.start();
    } catch (error) {
      this.showFallback(error);
    }
  },

  checkDeps() {
    const deps = {
      Luxon: typeof luxon !== 'undefined',
      Highcharts: typeof Highcharts !== 'undefined',
    };
    if (!deps.Luxon)
      throw new Error('Luxon library is required but not loaded');
  },

  showFallback(error) {
    const body = document.body;
    if (body) {
      body.innerHTML = `
        <div style="
          max-width: 800px;
          margin: 50px auto;
          padding: 40px;
          text-align: center;
          font-family: 'Poppins', Arial, sans-serif;
          background: #f8f9fa;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        ">
          <h1 style="color: #db421f; margin-bottom: 20px;">Site Error</h1>
          <p style="color: #666; font-size: 18px; margin-bottom: 30px;">
            The site failed to initialize properly.
          </p>
          <div style="
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            text-align: left;
            border-left: 4px solid #db421f;
          ">
            <strong>Error:</strong> ${error.message}
          </div>
          <button onclick="window.location.reload()" style="
            background: #db421f;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            font-family: inherit;
          ">
            Reload Page
          </button>
        </div>
      `;
    }
  },
};

function initApp() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => App.init());
    } else {
      setTimeout(() => App.init(), 100);
    }
  }
}

initApp();
