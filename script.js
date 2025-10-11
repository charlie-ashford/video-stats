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
      id: 'taylor',
      name: 'Taylor Swift',
      avatar: 'https://www.banner.yt/UCANLZYMidaCbLQFWXBC95Jg/avatar',
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
    defaultFilter: 'short',
    defaultMetric: 'likes',
    defaultCount: 10,
    minCount: 3,
    maxCount: 50,
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
  defaultTtl: 5 * 60 * 1000,

  getTenMinuteAlignedExpiryMs(minMs = 10000) {
    const nowMs = Date.now();
    const nowEst = luxon.DateTime.now().setZone('America/New_York');
    const remainder = nowEst.minute % 10;
    const add = remainder === 0 ? 10 : 10 - remainder;
    const nextSlot = nowEst.plus({ minutes: add }).startOf('minute');
    const targetMs = nextSlot.toMillis();
    return Math.max(targetMs, nowMs + minMs);
  },

  async fetchJson(url, options = {}, _ttlIgnored = null) {
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
        const expiry = this.getTenMinuteAlignedExpiryMs();
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
      if (stored) {
        return JSON.parse(stored);
      }
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
      if (stored) {
        return JSON.parse(stored);
      }
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
  isListingView: false,
  currentChartMode: Config.defaultChartMode,
  isGainsMode: false,
  isHourlyGainsMode: false,
  isHourlyMode: false,
  hourlyData: null,
  customDateRangeLabel: null,
  hourlyDateRange: {
    start: null,
    end: null,
  },
  customDateRange: {
    start: null,
    end: null,
  },
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
  },
  cachedRankings: new Map(),
  cachedGains: new Map(),
  lastFetchTime: 0,

  _currentLoadKey: null,
  _dailyCache: null,
  _loadedKey: null,
  _loadPromises: new Map(),

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
    this.isListingView = false;
    this.hourlyData = null;
    this.hourlyDateRange = { start: null, end: null };
    this.customDateRange = { start: null, end: null };
    this.customDateRangeLabel = null;
    this.chartModeData = new Map();
    this._dailyCache = null;
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
      <div class="chart-mode-options" id="chartModeOptions">
        <!-- options injected dynamically -->
      </div>
    `;
    this.dropdown.style.display = 'none';

    this.gainsToggle = Dom.create('button', 'chart-gains-toggle');
    this.gainsToggle.innerHTML = `
      <i class="fas fa-chart-line"></i>
      <span>Daily Gains</span>
    `;
    this.gainsToggle.style.display = 'none';

    const title = chartContainer.querySelector('#videoChart');
    if (title && title.parentElement) {
      title.parentElement.insertBefore(this.dropdown, title);
      title.parentElement.insertBefore(this.gainsToggle, title);
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

      this.selectMode(mode);
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
        <div class="chart-mode-option" data-mode="${key}">
          ${config.label}
        </div>
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

    await this.selectMode(fallback);
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

  async selectMode(mode) {
    State.customDateRange = { start: null, end: null };
    State.customDateRangeLabel = null;

    State.currentChartMode = mode;
    State.isGainsMode = false;
    State.isHourlyGainsMode = false;
    State.isHourlyMode = false;
    State.hourlyData = null;

    this.renderSelectedLabel();

    this.gainsToggle.classList.remove('active');
    this.gainsToggle.innerHTML = `
      <i class="fas fa-chart-line"></i>
      <span>Daily Gains</span>
    `;

    this.updateGainsToggleVisibility();

    const config = Config.chartModes[mode];

    if (config.dataPoints === 'hourly-chart') {
      await this.loadHourlyChart();
    } else {
      await this.loadAndDisplayData();
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
      return await Net.fetchJson(url, {}, 5 * 60 * 1000);
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
      this.gainsToggle.classList.add('active');
      this.gainsToggle.innerHTML = `
        <i class="fas fa-chart-area"></i>
        <span>Daily Gains</span>
      `;
    } else if (State.isGainsMode && canShowHourlyGains) {
      State.isGainsMode = false;
      State.isHourlyGainsMode = true;
      this.gainsToggle.classList.add('active');
      this.gainsToggle.innerHTML = `
        <i class="fas fa-clock"></i>
        <span>Hourly Gains</span>
      `;
    } else {
      State.isGainsMode = false;
      State.isHourlyGainsMode = false;
      this.gainsToggle.classList.remove('active');
      this.gainsToggle.innerHTML = `
        <i class="fas fa-chart-line"></i>
        <span>Daily Gains</span>
      `;
    }

    await Charts.create();
  },

  updateGainsToggleVisibility() {
    const config = State.getChartConfig();
    const hasRenderable = this.hasRenderableChart();

    const canShowGains =
      !State.isRankingsView &&
      !State.isGainsView &&
      config.dataPoints !== 'hourly-chart' &&
      hasRenderable;

    if (canShowGains) {
      this.gainsToggle.style.display = 'flex';
    } else {
      this.gainsToggle.style.display = 'none';
      State.isGainsMode = false;
      State.isHourlyGainsMode = false;
      this.gainsToggle.classList.remove('active');
      this.gainsToggle.innerHTML = `
        <i class="fas fa-chart-line"></i>
        <span>Daily Gains</span>
      `;
    }

    const shouldShowDatePicker =
      config.customizable &&
      !State.isRankingsView &&
      !State.isGainsView &&
      hasRenderable;

    if (shouldShowDatePicker) {
      if (!CustomDatePicker.datePickerButton) {
        CustomDatePicker.createDatePickerButton();
      }
      if (CustomDatePicker.datePickerButton) {
        CustomDatePicker.datePickerButton.classList.add('show');
        CustomDatePicker.datePickerButton.style.display = 'flex';
      }
    } else {
      if (CustomDatePicker.datePickerButton) {
        CustomDatePicker.datePickerButton.classList.remove('show');
        CustomDatePicker.datePickerButton.style.display = 'none';
      }
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
          if (filtered.length === 0) {
            throw new Error('No data available for the selected date range');
          }
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
          if (filteredDaily.length === 0) {
            throw new Error('No data available for the selected date range');
          }
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
      if (container) {
        container.innerHTML = `<div style="text-align:center;padding:20px;color:red;">Error loading chart data: ${error.message}</div>`;
      }
    }
  },

  show() {
    if (State.isRankingsView || State.isGainsView) {
      this.hide();
      return;
    }

    if (!this.dropdown) {
      this.create();
    }

    if (this.dropdown) {
      this.dropdown.style.display = 'block';
    }

    this.refresh();

    this.updateGainsToggleVisibility();
  },

  hide() {
    if (this.dropdown) {
      this.dropdown.style.display = 'none';
    }
    if (this.gainsToggle) {
      this.gainsToggle.style.display = 'none';
    }
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
      this.gainsToggle.classList.remove('active');
      this.gainsToggle.innerHTML = `
        <i class="fas fa-chart-line"></i>
        <span>Daily Gains</span>
      `;
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
    let newUrl = `${window.location.origin}${window.location.pathname}?data=${path}`;
    if (channel && channel !== 'mrbeast') {
      newUrl += `&channel=${channel}`;
    }

    const state = { path, channel };

    if (replace) {
      window.history.replaceState(state, '', newUrl);
    } else {
      window.history.pushState(state, '', newUrl);
    }
  },

  debounce(callback, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback.apply(this, args), delay);
    };
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

  setView(type) {
    if (type === 'rankings') {
      this.show('rankingsView');
      this.hide('gainsView');
      this.hide('listingView');
      this.hide('videoStatsView');
    } else if (type === 'gains') {
      this.hide('rankingsView');
      this.show('gainsView');
      this.hide('listingView');
      this.hide('videoStatsView');
    } else if (type === 'listing') {
      this.hide('rankingsView');
      this.hide('gainsView');
      this.show('listingView');
      this.hide('videoStatsView');
    } else {
      this.hide('rankingsView');
      this.hide('gainsView');
      this.hide('listingView');
      this.show('videoStatsView');
    }
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
    } else if (State.isGainsMode && metric !== 'uploads') {
      const values = State.processedData.series[metric];
      const timestamps = State.processedData.timestamps;
      points = this.processDailyGains(timestamps, values);
    } else {
      points = this.seriesPointsForChart(metric);
    }

    if (Array.isArray(points) && points.length > 0) {
      const first2025Index = points.findIndex(([ts]) => {
        const dt = luxon.DateTime.fromMillis(ts, { zone: 'America/New_York' });
        return dt.year === 2025;
      });

      if (first2025Index !== -1) {
        const first2025Ts = points[first2025Index][0];
        const isZeroDatapoint =
          State.videoUploadTime &&
          first2025Ts ===
            luxon.DateTime.fromISO(State.videoUploadTime)
              .setZone('America/New_York')
              .toMillis() &&
          points[first2025Index][1] === 0;

        if (!isZeroDatapoint) {
          points = points.filter(([ts]) => ts !== first2025Ts);
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
    const configs = [
      { name: 'Views', key: 'views', visible: State.selectedMetricIndex === 0 },
      { name: 'Likes', key: 'likes', visible: State.selectedMetricIndex === 1 },
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
            const isZeroDatapoint =
              State.videoUploadTime &&
              first2025Ts ===
                luxon.DateTime.fromISO(State.videoUploadTime)
                  .setZone('America/New_York')
                  .toMillis() &&
              seriesData[first2025Index][1] === 0;

            if (!isZeroDatapoint) {
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

    hourlyData.dates.forEach((dateStr, index) => {
      if (!this._first2025DateStr) {
        const dt = luxon.DateTime.fromISO(dateStr, {
          zone: 'America/New_York',
        });
        if (dt.year === 2025) {
          this._first2025DateStr = dateStr;
        }
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

        if (isToday && hour > currentHour) {
          break;
        }

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
      },
      redraw: function () {
        if (
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
        overflow: 'justify',
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
          if (!State.isMobile() && State.isChartReady && this.chart?.series) {
            const activeSeries = this.chart.series[State.selectedMetricIndex];
            if (activeSeries?.data?.length > 0) {
              const range = DataProcessor.calcYRange(
                activeSeries.data,
                e.min || this.dataMin,
                e.max || this.dataMax
              );
              if (this.chart.yAxis?.[0]) {
                this.chart.yAxis[0].setExtremes(range.min, range.max, true, {
                  duration: 300,
                  easing: 'easeOutQuart',
                });
              }
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

    if (State.isNumericMetric() && range.min === 0) {
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
          dt = luxon.DateTime.fromMillis(this.x, {
            zone: 'America/New_York',
          });
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
      shadow: true,
      hideDelay: State.isMobile() ? 1000 : 500,
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
      if (isHourly) {
        chartContainer.classList.add('hourly-mode');
      } else {
        chartContainer.classList.remove('hourly-mode');
      }
    }

    let seriesConfig, yRange;

    if (isHourly) {
      seriesConfig = ChartBuilder.hourlySeries(State.hourlyData);
      const allValues = [];
      seriesConfig.forEach(s => {
        s.data.forEach(point => {
          if (point && point[1] != null) allValues.push(point[1]);
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
        const calcMax = maxVal + padding;

        if (calcMin < 0 && minVal >= 0) {
          calcMin = 0;
        }

        yRange = { min: calcMin, max: calcMax };
      }
    } else {
      seriesConfig = ChartBuilder.series();
      const currentSeries = DataProcessor.getCurrentSeries();
      yRange = DataProcessor.calcYRange(currentSeries);
    }

    if (!State.isChartReady) State.pendingYAxisRange = yRange;

    let chartTitle;
    if (isHourly) {
      const baseTitle = `Hourly ${
        State.getMetricName().charAt(0).toUpperCase() +
        State.getMetricName().slice(1)
      } Gains`;
      chartTitle = State.customDateRangeLabel
        ? `${baseTitle} - ${State.customDateRangeLabel}`
        : baseTitle;
    } else if (State.isHourlyGainsMode) {
      const metricName =
        State.getMetricName().charAt(0).toUpperCase() +
        State.getMetricName().slice(1);
      const baseTitle = `Hourly ${metricName} Gains`;
      const modeLabel = State.customDateRangeLabel
        ? State.customDateRangeLabel
        : Config.chartModes[State.currentChartMode].label;
      chartTitle = `${baseTitle} - ${modeLabel}`;
    } else if (State.isGainsMode) {
      const metricName =
        State.getMetricName().charAt(0).toUpperCase() +
        State.getMetricName().slice(1);
      const baseTitle = `Daily ${metricName} Gains`;
      const modeLabel = State.customDateRangeLabel
        ? State.customDateRangeLabel
        : Config.chartModes[State.currentChartMode].label;
      chartTitle = `${baseTitle} - ${modeLabel}`;
    } else {
      const metricName =
        seriesConfig[State.selectedMetricIndex]?.name || 'Chart';
      const modeLabel = State.customDateRangeLabel
        ? State.customDateRangeLabel
        : Config.chartModes[State.currentChartMode].label;
      chartTitle = `${metricName} - ${modeLabel}`;
    }

    const shouldAnimate = animate && !State.isMobile();

    const visibleSeries = seriesConfig.filter(s => s.visible);
    const maxPointsVisible = Math.max(
      0,
      ...visibleSeries.map(s => (s.data ? s.data.length : 0))
    );

    State.chart = Highcharts.chart('videoChart', {
      chart: {
        type: isHourly ? 'line' : 'area',
        backgroundColor: cardBg,
        style: { fontFamily: "'Poppins', sans-serif", fontSize: '14px' },
        plotBackgroundColor: cardBg,
        plotBorderColor: Dom.getCssVar('--border-color'),
        plotBorderWidth: 1,
        zoomType: isHourly ? undefined : 'x',
        panning: { enabled: !isHourly, type: 'x' },
        panKey: 'shift',
        animation: shouldAnimate
          ? { duration: 600, easing: 'easeOutQuart' }
          : false,
        events: {
          ...ChartBuilder.events(),
          load: function () {
            State.isChartReady = true;
            if (State.pendingYAxisRange) {
              const { min, max } = State.pendingYAxisRange;
              if (this.yAxis?.[0])
                this.yAxis[0].setExtremes(min, max, true, false);
              State.pendingYAxisRange = null;
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
      xAxis: ChartBuilder.xAxis(isHourly),
      yAxis: ChartBuilder.yAxis(yRange, isHourly),
      series: seriesConfig,
      legend: {
        enabled: isHourly,
        itemStyle: {
          color: textColor,
          fontWeight: '500',
          fontSize: State.isMobile() ? '11px' : '13px',
        },
        itemHoverStyle: {
          color: Dom.getCssVar('--hover-text-color'),
        },
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        y: 15,
        floating: false,
        maxHeight: 60,
        navigation: {
          enabled: true,
          style: {
            color: textColor,
          },
        },
        events: {
          itemClick: function (event) {
            const chart = this.chart;
            setTimeout(() => {
              const allValues = [];
              chart.series.forEach(series => {
                if (series.visible || series === event.target) {
                  series.data.forEach(point => {
                    if (point && point.y != null) {
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
                const calcMax = maxVal + padding;

                if (calcMin < 0 && minVal >= 0) calcMin = 0;

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
              title: { style: { fontSize: '16px' }, margin: 15 },
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

    await ChartModeDropdown.refresh();
  },

  redraw() {
    const delay = State.isMobile() ? 300 : 100;
    setTimeout(() => this.create({ animate: false }), delay);
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
      if (uploads?.length > 0) {
        grid.classList.remove('three-columns');
      } else {
        grid.classList.add('three-columns');
      }
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
      <td>${dateString}, ${timeString}</td>
      <td>${Math.round(
        currentData.views
      ).toLocaleString()} <span class="change ${changes.views.class}">(${
      changes.views.change
    })</span></td>
      <td>${Math.round(
        currentData.likes
      ).toLocaleString()} <span class="change ${changes.likes.class}">(${
      changes.likes.change
    })</span></td>
      <td>${Math.round(
        currentData.comments
      ).toLocaleString()} <span class="change ${changes.comments.class}">(${
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

    const renderChunk = deadline => {
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
          <td>${dateString}</td>
          <td>${Math.round(entry.views).toLocaleString()} <span class="change ${
          changes.views.class
        }">(${changes.views.change})</span></td>
          <td>${Math.round(entry.likes).toLocaleString()} <span class="change ${
          changes.likes.class
        }">(${changes.likes.change})</span></td>
          <td>${Math.round(
            entry.comments
          ).toLocaleString()} <span class="change ${changes.comments.class}">(${
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
      const data = await Net.fetchJson(url, {}, 5 * 60 * 1000);
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
      filteredVideos = videos.filter(v => {
        return isShort ? v.isShort === true : v.isShort === false;
      });
    }

    if (filteredVideos.length === 0) {
      filteredVideos = videos;
    }

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
      .map(v => ({
        ...v,
        metricAtPeriod: v.periodData[metricKey],
      }));

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

      const shouldHighlight = video.videoId === newest.videoId;
      if (shouldHighlight) item.classList.add('ranking-highlight');

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
      if (hours < 24) {
        return `${hours} ${hours === 1 ? 'Hour' : 'Hours'}`;
      }
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      if (remainingHours === 0) {
        return `${days} ${days === 1 ? 'Day' : 'Days'}`;
      }
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

    if (cached) {
      this.display(cached);
    }
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

    if (countSlider) {
      countSlider.value = State.rankingsSettings.videoCount;
      countSlider.addEventListener(
        'input',
        e => {
          State.rankingsSettings.videoCount = parseInt(e.target.value);
          if (countValue)
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
    }

    if (periodSlider) {
      periodSlider.value = State.rankingsSettings.timePeriod;
      periodSlider.addEventListener(
        'input',
        e => {
          State.rankingsSettings.timePeriod = parseInt(e.target.value);
          if (periodValue)
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
  } catch (e) {}
};

const Gains = {
  allVideosCache: new Map(),

  async fetch(channelId, metric, filter, period) {
    const cacheKey = `${channelId}-${metric}-${filter}-${period}`;
    const url = `${Config.api.gains}?channel=${channelId}&metric=${metric}&filter=${filter}`;

    try {
      const data = await Net.fetchJson(url, {}, 5 * 60 * 1000);
      if (!data.videos || !Array.isArray(data.videos)) {
        return this.allVideosCache.get(cacheKey) || [];
      }
      this.allVideosCache.set(cacheKey, data.videos);
      return data.videos;
    } catch (error) {
      console.error('Gains fetch error:', error);
      return this.allVideosCache.get(cacheKey) || [];
    }
  },

  getPeriodKey(period) {
    if (period === 0) return 'past1h';
    if (period === 1) return 'past24h';
    if (period === 3) return 'past3d';
    if (period === 7) return 'past7d';
    return 'past24h';
  },

  getPreviousPeriodKey(period) {
    if (period === 0) return 'previous1h';
    if (period === 1) return 'previous24h';
    if (period === 3) return 'previous3d';
    if (period === 7) return 'previous7d';
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

    const withGains = videos
      .filter(v => v.gains && v.gains[periodKey] != null)
      .sort((a, b) => b.gains[periodKey] - a.gains[periodKey])
      .slice(0, count);

    if (withGains.length === 0) {
      list.innerHTML =
        '<div style="text-align:center;padding:40px;color:var(--muted-text-color);">No videos with gains data for this time period.</div>';
      return;
    }

    const fragment = document.createDocumentFragment();

    withGains.forEach((video, index) => {
      const item = Dom.create('div', 'gains-item');
      item.dataset.videoId = video.videoId;

      const currentGain = video.gains[periodKey];
      const previousGain = video.gains[previousKey] || 0;
      const change = currentGain - previousGain;
      const percentage =
        previousGain && previousGain !== 0
          ? ((currentGain - previousGain) / previousGain) * 100
          : null;

      const isPositive = change >= 0;
      const arrow = isPositive ? '↑' : '↓';
      const changeClass = isPositive ? 'positive' : 'negative';
      const sign = isPositive ? '+' : '-';

      const formattedCurrent = currentGain.toLocaleString();
      const formattedChange = Math.abs(change).toLocaleString();
      const formattedPercentage =
        percentage !== null ? `${sign}${Math.abs(percentage).toFixed(1)}%` : '';

      const periodLabel =
        State.gainsSettings.period === 0
          ? 'in last 1h'
          : State.gainsSettings.period === 1
          ? 'in last 24h'
          : State.gainsSettings.period === 3
          ? 'in last 3d'
          : 'in last 7d';

      const periodLabelGain =
        State.gainsSettings.period === 0
          ? '1h'
          : State.gainsSettings.period === 1
          ? '24h'
          : State.gainsSettings.period === 3
          ? '3d'
          : '7d';

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
      subtitle.textContent = `${metricName} in Last ${periodText}`;
    }
  },

  async updateInstant(refetch = false) {
    if (!State.isGainsView || !State.currentChannel) return;

    const list = Dom.get('gainsList');

    const cacheKey = `${State.currentChannel}-${State.gainsSettings.metric}-${State.gainsSettings.filter}-${State.gainsSettings.period}`;
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
        State.gainsSettings.period
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
    document.querySelectorAll('.control-button').forEach(button => {
      button.addEventListener('click', e => {
        const btn = e.currentTarget;
        const group = btn.dataset.group;

        document
          .querySelectorAll(`.control-button[data-group="${group}"]`)
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
        }
      });
    });
  },

  bindInput() {
    const countSlider = Dom.get('gainsCountSlider');
    const countValue = Dom.get('gainsCountValue');

    if (countValue) countValue.textContent = State.gainsSettings.count;

    if (countSlider) {
      countSlider.value = State.gainsSettings.count;

      countSlider.addEventListener(
        'input',
        e => {
          State.gainsSettings.count = parseInt(e.target.value);
          if (countValue) countValue.textContent = State.gainsSettings.count;

          State.saveSettings();

          clearTimeout(this.updateTimeout);
          this.updateTimeout = setTimeout(() => this.updateInstant(false), 50);
        },
        { passive: true }
      );
    }
  },

  applySettings() {
    const countSlider = Dom.get('gainsCountSlider');
    const countValue = Dom.get('gainsCountValue');

    if (countSlider) countSlider.value = State.gainsSettings.count;
    if (countValue) countValue.textContent = State.gainsSettings.count;

    document
      .querySelectorAll('.control-button[data-group="period"]')
      .forEach(btn => {
        btn.classList.toggle(
          'active',
          parseInt(btn.dataset.period) === State.gainsSettings.period
        );
      });

    document
      .querySelectorAll('.control-button[data-group="filter"]')
      .forEach(btn => {
        btn.classList.toggle(
          'active',
          btn.dataset.filter === State.gainsSettings.filter
        );
      });

    document
      .querySelectorAll('.control-button[data-group="metric"]')
      .forEach(btn => {
        btn.classList.toggle(
          'active',
          btn.dataset.metric === State.gainsSettings.metric
        );
      });
  },

  init() {
    this.bindButtons();
    this.bindInput();
  },
};

Gains.prefetch = async function (channelId) {
  const metrics = ['views', 'likes'];
  const filters = ['all', 'long', 'short'];
  const periods = [0, 1, 3, 7];
  try {
    await Promise.allSettled(
      metrics.flatMap(m =>
        filters.map(f => periods.map(p => Gains.fetch(channelId, m, f, p)))
      )
    );
  } catch (e) {}
};

const CustomDatePicker = {
  datePickerButton: null,
  modal: null,
  startDateInput: null,
  endDateInput: null,
  currentMode: null,

  createDatePickerButton() {
    if (this.datePickerButton) {
      return this.datePickerButton;
    }

    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) {
      return null;
    }

    this.datePickerButton = Dom.create('button', 'custom-date-picker-button');
    this.datePickerButton.innerHTML = '<i class="fas fa-calendar-alt"></i>';
    this.datePickerButton.title = 'Select custom date range';

    this.datePickerButton.addEventListener('click', () => {
      this.openModal();
    });

    const title = chartContainer.querySelector('#videoChart');
    if (title && title.parentElement) {
      title.parentElement.insertBefore(this.datePickerButton, title);
    } else {
    }

    return this.datePickerButton;
  },

  createModal() {
    if (this.modal) return this.modal;

    this.modal = Dom.create('div', 'date-picker-modal');
    this.modal.innerHTML = `
      <div class="date-picker-content">
        <div class="date-picker-header">
          <h3 id="modalTitle">Select Date Range</h3>
        </div>
        <div class="date-picker-body">
          <div class="date-input-group">
            <label for="modalStartDate">Start Date</label>
            <input type="date" id="modalStartDate" />
          </div>
          <div class="date-input-group">
            <label for="modalEndDate">End Date</label>
            <input type="date" id="modalEndDate" />
          </div>
        </div>
        <div class="date-picker-actions">
          <button class="date-picker-button secondary" id="cancelDatePicker">
            Cancel
          </button>
          <button class="date-picker-button primary" id="applyDatePicker">
            Apply
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(this.modal);

    this.startDateInput = document.getElementById('modalStartDate');
    this.endDateInput = document.getElementById('modalEndDate');

    this.modal.addEventListener('click', e => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    const cancelBtn = document.getElementById('cancelDatePicker');
    cancelBtn.addEventListener('click', () => this.closeModal());

    const applyBtn = document.getElementById('applyDatePicker');
    applyBtn.addEventListener('click', () => this.applyDateRange());

    return this.modal;
  },

  openModal(mode = null) {
    if (!mode) {
      const config = State.getChartConfig();
      mode = config.dataPoints === 'hourly-chart' ? 'hourly' : 'regular';
    }

    this.currentMode = mode;

    if (!this.modal) {
      this.createModal();
    }

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
        if (mode === 'hourly') {
          title.textContent = 'Select Hourly Chart Date Range';
        } else {
          title.textContent = 'Select Custom Date Range';
        }
      }
    }

    this.modal.classList.add('show');
  },

  closeModal() {
    if (this.modal) {
      this.modal.classList.remove('show');
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
        const isInRange = entryDate >= startDate && entryDate <= endDate;

        return isInRange;
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
    if (!this.datePickerButton) {
      this.createDatePickerButton();
    }
  },

  hide() {
    if (this.datePickerButton) {
      this.datePickerButton.classList.remove('show');
    }
  },

  reset() {
    State.hourlyDateRange = { start: null, end: null };
    State.customDateRange = { start: null, end: null };
    State.customDateRangeLabel = null;
    if (this.datePickerButton) {
      this.datePickerButton.classList.remove('show');
    }
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
    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = document.body.getAttribute('data-theme');
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

            State.chart.update(
              {
                chart: {
                  backgroundColor: newCardBg,
                  plotBackgroundColor: newCardBg,
                  plotBorderColor: newBorderColor,
                  animation: false,
                },
                title: {
                  style: { color: newTextColor },
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
                legend: {
                  itemStyle: { color: newTextColor },
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
    }
  },

  init() {
    const stored = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', stored);
    document.body.setAttribute('data-theme', stored);
    this.updateIcons(stored);
    this.bindToggle();
  },
};

const Search = {
  videoChannelMap: new Map(),
  allVideosByChannel: {},
  currentDropdownChannel: 'mrbeast',

  _initialUrlHandled: false,

  handleInput: Dom.debounce(function (e) {
    const dropdown = Dom.get('dropdownList');
    if (!dropdown) return;

    const term = e.target.value.trim().toLowerCase();
    const isSearching = term.length > 0;

    dropdown.querySelectorAll('.dropdown-list-item.bold').forEach(item => {
      item.style.display = isSearching ? 'none' : '';
    });

    dropdown
      .querySelectorAll('.dropdown-list-item:not(.bold)')
      .forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(term) ? '' : 'none';
      });
  }, 150),

  handleClickOut(e) {
    if (!e.target.closest('.search-bar')) {
      const dropdown = Dom.get('dropdownList');
      if (dropdown) dropdown.classList.remove('show');
    }
  },

  bindMetricCards() {
    const createFaded = hex => {
      const h = hex.replace('#', '');
      const r = parseInt(h.substr(0, 2), 16);
      const g = parseInt(h.substr(2, 2), 16);
      const b = parseInt(h.substr(4, 2), 16);

      const fadedR = Math.round(r + (255 - r) * 0.2);
      const fadedG = Math.round(g + (255 - g) * 0.2);
      const fadedB = Math.round(b + (255 - b) * 0.2);

      return `rgb(${fadedR}, ${fadedG}, ${fadedB})`;
    };

    const colors = {
      0: createFaded(Config.colors.views),
      1: createFaded(Config.colors.likes),
      2: createFaded(Config.colors.comments),
      3: createFaded(Config.colors.uploads),
    };

    document.querySelectorAll('.stat-card').forEach((card, index) => {
      card.addEventListener('click', async () => {
        document.querySelectorAll('.stat-card').forEach(c => {
          c.classList.remove('active');
          c.style.removeProperty('--active-card-color');
        });

        card.classList.add('active');
        card.style.setProperty('--active-card-color', colors[index]);
        State.selectedMetricIndex = index;

        ChartModeDropdown.show();
        const didChangeMode = await ChartModeDropdown.refresh();

        if (!didChangeMode) {
          Charts.create({ animate: true });
        }
      });
    });

    const initial =
      document.querySelectorAll('.stat-card')[State.selectedMetricIndex];
    if (initial) {
      initial.classList.add('active');
      initial.style.setProperty(
        '--active-card-color',
        colors[State.selectedMetricIndex]
      );
    }
  },

  bindHistoryNav() {
    window.addEventListener('popstate', event => {
      const params = new URLSearchParams(window.location.search);
      const videoId = params.get('data');
      const channelParam = params.get('channel');

      const channelMap = Config.channels.reduce((acc, ch) => {
        acc[ch.id] = ch;
        return acc;
      }, {});

      if (videoId === 'rankings') {
        const channel =
          channelParam && channelMap[channelParam]
            ? channelMap[channelParam]
            : Config.channels[0];
        const input = Dom.get('searchInput');
        if (input) input.value = 'Top Video Rankings';
        Loader.loadChannel(
          channel.id,
          channel.avatar,
          channel.id,
          true,
          false,
          true
        );
      } else if (videoId === 'gains') {
        const channel =
          channelParam && channelMap[channelParam]
            ? channelMap[channelParam]
            : Config.channels[0];
        const input = Dom.get('searchInput');
        if (input) input.value = 'Top Video Gains';
        Loader.loadChannel(
          channel.id,
          channel.avatar,
          channel.id,
          false,
          true,
          true
        );
      } else if (videoId === 'list') {
        const channel =
          channelParam && channelMap[channelParam]
            ? channelMap[channelParam]
            : Config.channels[0];
        const input = Dom.get('searchInput');
        if (input) input.value = 'Channel Video List';
        Loader.loadChannelListing(channel.id, channel.avatar, true);
      } else if (channelMap[videoId]) {
        const channel = channelMap[videoId];
        const input = Dom.get('searchInput');
        if (input) input.value = channel.name;
        Loader.loadChannel(
          channel.id,
          channel.avatar,
          channel.id,
          false,
          false,
          true
        );
      } else if (videoId) {
        const actualChannel =
          channelParam || this.getChannelForVideo(videoId) || 'mrbeast';
        Loader.loadVideo(videoId, actualChannel, true);
      } else {
        this.loadDefaultVideo();
      }
    });
  },

  bindEvents() {
    const searchInput = Dom.get('searchInput');
    const dropdown = Dom.get('dropdownList');

    if (searchInput && dropdown) {
      searchInput.addEventListener('focus', () =>
        dropdown.classList.add('show')
      );
      searchInput.addEventListener('input', this.handleInput);
    }

    document.addEventListener('click', this.handleClickOut);
    this.bindMetricCards();
  },

  createChannelOption(channel) {
    const option = Dom.create('div', 'dropdown-list-item bold');
    option.innerHTML = `
      <div style="display: flex; align-items: center;">
        <img src="${channel.avatar}" alt="${channel.name}" 
             style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;" 
             onerror="this.style.display='none'" loading="lazy">
        ${channel.name}
      </div>
    `;
    return option;
  },

  createChannelOpts() {
    const dropdown = Dom.get('dropdownList');
    if (!dropdown) return;

    const rankingsOpt = Dom.create('div', 'dropdown-list-item bold');
    rankingsOpt.innerHTML = `
      <div style="display: flex; align-items: center;">
        <i class="fas fa-trophy" style="margin-right: 10px; color: var(--primary-color); font-size: 1.2rem;"></i>
        Top Video Rankings
      </div>
    `;
    dropdown.appendChild(rankingsOpt);

    rankingsOpt.addEventListener('click', () => {
      const input = Dom.get('searchInput');
      if (input) input.value = 'Top Video Rankings';
      dropdown.classList.remove('show');

      const currentChannel = State.currentChannel || 'mrbeast';
      const channelConfig =
        Config.channels.find(ch => ch.id === currentChannel) ||
        Config.channels[0];
      Loader.loadChannel(
        channelConfig.id,
        channelConfig.avatar,
        channelConfig.id,
        true
      );
    });

    const gainsOpt = Dom.create('div', 'dropdown-list-item bold');
    gainsOpt.innerHTML = `
      <div style="display: flex; align-items: center;">
        <i class="fas fa-chart-line" style="margin-right: 10px; color: var(--primary-color); font-size: 1.2rem;"></i>
        Top Video Gains
      </div>
    `;
    dropdown.appendChild(gainsOpt);

    gainsOpt.addEventListener('click', () => {
      const input = Dom.get('searchInput');
      if (input) input.value = 'Top Video Gains';
      dropdown.classList.remove('show');

      const currentChannel = State.currentChannel || 'mrbeast';
      const channelConfig =
        Config.channels.find(ch => ch.id === currentChannel) ||
        Config.channels[0];
      Loader.loadChannel(
        channelConfig.id,
        channelConfig.avatar,
        channelConfig.id,
        false,
        true
      );
    });

    const listOpt = Dom.create('div', 'dropdown-list-item bold');
    listOpt.innerHTML = `
    <div style="display: flex; align-items: center;">
      <i class="fas fa-list" style="margin-right: 10px; color: var(--primary-color); font-size: 1.2rem;"></i>
      Channel Video List
    </div>
  `;
    dropdown.appendChild(listOpt);

    listOpt.addEventListener('click', () => {
      const input = Dom.get('searchInput');
      if (input) input.value = 'Channel Video List';
      dropdown.classList.remove('show');

      const currentChannel = State.currentChannel || 'mrbeast';
      const channelConfig =
        Config.channels.find(ch => ch.id === currentChannel) ||
        Config.channels[0];
      Loader.loadChannelListing(channelConfig.id, channelConfig.avatar);
    });

    Config.channels.forEach(channel => {
      const option = this.createChannelOption(channel);
      dropdown.appendChild(option);

      option.addEventListener('click', () => {
        const input = Dom.get('searchInput');
        if (input) input.value = channel.name;
        dropdown.classList.remove('show');

        this.updateVideoList(channel.id);

        Loader.loadChannel(
          channel.id,
          channel.avatar,
          channel.id,
          false,
          false
        );
      });
    });
  },

  updateVideoList(channelId) {
    const dropdown = Dom.get('dropdownList');
    if (!dropdown) return;

    const videoItems = dropdown.querySelectorAll(
      '.dropdown-list-item:not(.bold)'
    );
    videoItems.forEach(item => item.remove());

    this.currentDropdownChannel = channelId;
    const videos = this.allVideosByChannel[channelId] || [];

    if (videos.length > 0) {
      this.addVideoOpts(videos, channelId);
    }
  },

  addVideoOpts(videos, channelId) {
    const dropdown = Dom.get('dropdownList');
    if (!dropdown || !Array.isArray(videos)) return;

    const fragment = document.createDocumentFragment();

    videos.forEach(video => {
      const item = Dom.create('div', 'dropdown-list-item');
      item.textContent = video.title;
      item.dataset.videoId = video.videoId;
      item.dataset.channel = channelId;

      item.addEventListener('click', e => {
        const selectedId = e.currentTarget.dataset.videoId;
        const videoChannel = e.currentTarget.dataset.channel;
        const input = Dom.get('searchInput');
        if (input) input.value = e.currentTarget.textContent;
        dropdown.classList.remove('show');
        Loader.loadVideo(selectedId, videoChannel);
      });

      fragment.appendChild(item);
    });

    dropdown.appendChild(fragment);
  },

  getChannelForVideo(videoId) {
    return this.videoChannelMap.get(videoId) || 'mrbeast';
  },

  async fetchAllVideos() {
    try {
      const data = await Net.fetchJson(
        `${Config.api.baseUrl}/allvideos`,
        {},
        60 * 60 * 1000
      );
      if (data?.channels) {
        Object.entries(data.channels).forEach(([channel, videos]) => {
          this.allVideosByChannel[channel] = videos;
          videos.forEach(video => {
            this.videoChannelMap.set(video.videoId, channel);
          });
        });

        console.log(
          `Loaded ${this.videoChannelMap.size} videos across ${
            Object.keys(this.allVideosByChannel).length
          } channels`
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to fetch all videos:', error);
      return false;
    }
  },

  handleUrlParams(hasAllVideos) {
    const params = new URLSearchParams(window.location.search);
    const videoId = params.get('data');
    let channelParam = params.get('channel');

    const channelMap = Config.channels.reduce((acc, ch) => {
      acc[ch.id] = ch;
      return acc;
    }, {});

    if (!this._initialUrlHandled) {
      this._initialUrlHandled = true;
    }

    if (videoId === 'rankings') {
      const channel =
        channelParam && channelMap[channelParam]
          ? channelMap[channelParam]
          : Config.channels[0];
      const input = Dom.get('searchInput');
      if (input) input.value = 'Top Video Rankings';

      if (hasAllVideos) {
        this.updateVideoList(channel.id);
      }

      Loader.loadChannel(
        channel.id,
        channel.avatar,
        channel.id,
        true,
        false,
        true
      );
    } else if (videoId === 'gains') {
      const channel =
        channelParam && channelMap[channelParam]
          ? channelMap[channelParam]
          : Config.channels[0];
      const input = Dom.get('searchInput');
      if (input) input.value = 'Top Video Gains';

      if (hasAllVideos) {
        this.updateVideoList(channel.id);
      }

      Loader.loadChannel(
        channel.id,
        channel.avatar,
        channel.id,
        false,
        true,
        true
      );
    } else if (videoId === 'list') {
      const channel =
        channelParam && channelMap[channelParam]
          ? channelMap[channelParam]
          : Config.channels[0];
      const input = Dom.get('searchInput');
      if (input) input.value = 'Channel Video List';

      if (hasAllVideos) {
        this.updateVideoList(channel.id);
      }

      Loader.loadChannelListing(channel.id, channel.avatar, true);
    } else if (channelMap[videoId]) {
      const channel = channelMap[videoId];
      const input = Dom.get('searchInput');
      if (input) input.value = channel.name;

      if (hasAllVideos) {
        this.updateVideoList(channel.id);
      }

      Loader.loadChannel(
        channel.id,
        channel.avatar,
        channel.id,
        false,
        false,
        true
      );
    } else if (videoId) {
      const container = Dom.get('videoChart');
      if (container) {
        container.innerHTML =
          '<div style="text-align:center;padding:40px;">Loading video data...</div>';
      }

      if (!channelParam && hasAllVideos) {
        channelParam = this.getChannelForVideo(videoId);
      }

      const actualChannel = channelParam || 'mrbeast';

      if (hasAllVideos) {
        this.updateVideoList(actualChannel);
      }

      Loader.loadVideo(videoId, actualChannel, true);
    } else {
      this.loadDefaultVideo();
    }

    if (!this._initialUrlHandled) this._initialUrlHandled = true;
  },

  async loadDefaultVideo() {
    try {
      const data = await Net.fetchJson(
        Config.api.videos.byChannel('mrbeast'),
        {},
        5 * 60 * 1000
      );

      if (
        !data.videos ||
        !Array.isArray(data.videos) ||
        data.videos.length === 0
      ) {
        this.loadDefaultGains();
        return;
      }

      const recent = data.videos.sort(
        (a, b) => new Date(b.uploadTime) - new Date(a.uploadTime)
      )[0];
      const input = Dom.get('searchInput');
      if (input) input.value = recent.title;
      Loader.loadVideo(recent.videoId, 'mrbeast', false);
    } catch (error) {
      console.error('Failed to load default video:', error);
      this.loadDefaultGains();
    }
  },

  loadDefaultGains() {
    const defaultCh = Config.channels[0];
    const input = Dom.get('searchInput');
    if (input) input.value = 'Top Video Gains';

    this.updateVideoList(defaultCh.id);

    Loader.loadChannel(
      defaultCh.id,
      defaultCh.avatar,
      defaultCh.id,
      false,
      true,
      true
    );
  },

  needsVideoData() {
    const params = new URLSearchParams(window.location.search);
    const videoId = params.get('data');

    return (
      videoId &&
      videoId !== 'rankings' &&
      videoId !== 'gains' &&
      !Config.channels.find(ch => ch.id === videoId)
    );
  },

  async init() {
    this.bindEvents();
    this.createChannelOpts();
    this.bindHistoryNav();

    this.handleUrlParams(false);

    const runBg = async () => {
      const hasAllVideos = await this.fetchAllVideos();

      if (hasAllVideos) {
        this.updateVideoList('mrbeast');
      }

      if (this.needsVideoData()) {
        this.handleUrlParams(hasAllVideos);
      }
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(runBg);
    } else {
      setTimeout(runBg, 100);
    }
  },
};

const Loader = {
  _loadPromises: new Map(),
  _loadedKey: null,

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

  async loadChannel(
    channelId,
    profileUrl,
    _,
    showRankings = false,
    showGains = false,
    isNavigation = false
  ) {
    const key = `channel:${channelId}|${
      showRankings ? 'rank' : showGains ? 'gains' : 'stats'
    }`;

    if (this._loadPromises.has(key)) {
      return this._loadPromises.get(key);
    }

    const p = (async () => {
      State.reset();
      ChartModeDropdown.reset();
      ChartModeDropdown.hide();

      if (State.isListingView) {
        Listing.state = {
          items: [],
          sortKey: 'uploadTime',
          sortDir: 'desc',
          filter: 'all',
          q: '',
          loading: false,
        };
      }

      State.currentEntityId = channelId;
      State.currentChannel = channelId;
      State.isRankingsView = showRankings;
      State.isGainsView = showGains;
      State.isListingView = false;

      State.loadSettings();

      if (!isNavigation) window.scrollTo({ top: 0, behavior: 'smooth' });

      Search.updateVideoList(channelId);

      const headerTitle = document.querySelector('header h1');
      if (headerTitle) {
        if (showRankings) {
          headerTitle.textContent = 'Top Video Rankings';
        } else if (showGains) {
          headerTitle.textContent = 'Top Video Gains';
        } else {
          headerTitle.textContent = 'Channel Analytics';
        }
      }

      Dom.removeImg();
      await this.setupProfile(profileUrl);

      if (showRankings) {
        if (!isNavigation) {
          Dom.updateUrl('rankings', channelId);
        }
        Dom.setView('rankings');
        const exportBtn = Dom.get('exportButton');
        if (exportBtn) exportBtn.style.display = 'none';

        const list = Dom.get('rankingsList');
        if (list) {
          list.innerHTML =
            '<div style="text-align:center;padding:40px;color:var(--muted-text-color);">Loading rankings...</div>';
        }

        Rankings.applySettings();

        try {
          const rankings = await Rankings.fetch(
            channelId,
            State.rankingsSettings.filter
          );

          if (rankings.length > 0) {
            const savedSettings = SessionSettings.getRankingsSettings();
            if (!savedSettings) {
              const defaults = Rankings.getDefaults(rankings);
              State.rankingsSettings.videoCount = defaults.videoCount;
              State.rankingsSettings.timePeriod = defaults.timePeriod;
              Rankings.applySettings();
            }

            Rankings.display(rankings);
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
      } else if (showGains) {
        if (!isNavigation) {
          Dom.updateUrl('gains', channelId);
        }
        Dom.setView('gains');
        const exportBtn = Dom.get('exportButton');
        if (exportBtn) exportBtn.style.display = 'none';

        const list = Dom.get('gainsList');
        if (list) {
          list.innerHTML =
            '<div style="text-align:center;padding:40px;color:var(--muted-text-color);">Loading gains...</div>';
        }

        Gains.applySettings();

        try {
          const gains = await Gains.fetch(
            channelId,
            State.gainsSettings.metric,
            State.gainsSettings.filter,
            State.gainsSettings.period
          );

          if (State.isGainsView) {
            Gains.display(gains, State.gainsSettings.count);
          }
        } catch (error) {
          if (list) {
            list.innerHTML =
              '<div style="text-align:center;padding:20px;color:red;">Error loading gains. Please try again.</div>';
          }
        }
      } else {
        if (!isNavigation) {
          Dom.updateUrl(channelId);
        }
        Dom.setView('video');
        Dom.hide('videoInfoCard');
        const exportBtn = Dom.get('exportButton');
        if (exportBtn) exportBtn.style.display = 'flex';

        const container = Dom.get('videoChart');
        if (container) {
          container.innerHTML =
            '<div style="text-align:center;padding:40px;">Loading channel data...</div>';
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

          const combinedData = await Net.fetchJson(endpoint, {}, 5 * 60 * 1000);

          if (Array.isArray(combinedData)) {
            State.rawData = combinedData;

            State._dailyCache = DataProcessor.processDaily(combinedData);

            await ChartModeDropdown.loadAndDisplayData();
            Stats.update();

            const dailyData = State._dailyCache || [];
            const currentData = combinedData[combinedData.length - 1];
            Tables.create(dailyData, currentData);

            ChartModeDropdown.show();

            if ('requestIdleCallback' in window) {
              requestIdleCallback(() => {
                Rankings.prefetch(State.currentChannel);
                Gains.prefetch(State.currentChannel);
                Listing.prefetch(State.currentChannel);
              });
            } else {
              setTimeout(() => {
                Rankings.prefetch(State.currentChannel);
                Gains.prefetch(State.currentChannel);
                Listing.prefetch(State.currentChannel);
              }, 150);
            }
          } else {
            throw new Error('Invalid data format received');
          }
        } catch (error) {
          const chart = Dom.get('videoChart');
          if (chart) {
            chart.innerHTML = `<div style='text-align:center;padding:20px;color:red;'>Failed to load data: ${error.message}<br>Please try again.</div>`;
          }
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

  async loadChannelListing(channelId, profileUrl, isNavigation = false) {
    const key = `channel-list:${channelId}`;
    if (this._loadPromises.has(key)) {
      return this._loadPromises.get(key);
    }
    if (this._loadedKey === key && !isNavigation) {
      return;
    }

    const p = (async () => {
      State.reset();
      ChartModeDropdown.reset();
      ChartModeDropdown.hide();

      State.currentEntityId = channelId;
      State.currentChannel = channelId;
      State.isRankingsView = false;
      State.isGainsView = false;
      State.isListingView = true;

      if (!isNavigation) window.scrollTo({ top: 0, behavior: 'smooth' });

      Search.updateVideoList(channelId);

      const headerTitle = document.querySelector('header h1');
      if (headerTitle) {
        headerTitle.textContent = 'Channel Video List';
      }

      Dom.removeImg();
      await this.setupProfile(profileUrl);

      if (!isNavigation) {
        Dom.updateUrl('list', channelId);
      }
      Dom.setView('listing');

      const exportBtn = Dom.get('exportButton');
      if (exportBtn) exportBtn.style.display = 'none';

      Listing.applySettings();
      await Listing.refresh();
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

    if (this._loadPromises.has(key)) {
      return this._loadPromises.get(key);
    }
    if (this._loadedKey === key && !isNavigation) {
      return;
    }

    const p = (async () => {
      State.reset();
      ChartModeDropdown.reset();
      State.currentEntityId = videoId;
      State.currentChannel = channelId;
      State.isRankingsView = false;
      State.isGainsView = false;

      if (!isNavigation) window.scrollTo({ top: 0, behavior: 'smooth' });

      Search.updateVideoList(channelId);

      if (!isNavigation) {
        if (channelId !== 'mrbeast') {
          Dom.updateUrl(videoId, channelId);
        } else {
          Dom.updateUrl(videoId);
        }
      }

      Dom.setView('video');
      const exportBtn = Dom.get('exportButton');
      if (exportBtn) exportBtn.style.display = 'flex';

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

      try {
        let endpoint = Config.api.videoStats.byChannel(channelId, videoId);
        let video = null;
        try {
          video = await Net.fetchJson(endpoint, {}, 5 * 60 * 1000);
        } catch (e) {
          endpoint = Config.api.videoStats.base + videoId;
          video = await Net.fetchJson(endpoint, {}, 5 * 60 * 1000);
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

          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              Rankings.prefetch(State.currentChannel);
              Gains.prefetch(State.currentChannel);
              Listing.prefetch(State.currentChannel);
            });
          } else {
            setTimeout(() => {
              Rankings.prefetch(State.currentChannel);
              Gains.prefetch(State.currentChannel);
              Listing.prefetch(State.currentChannel);
            }, 150);
          }

          const sevenDhAvailable =
            State.currentEntityId !== State.currentChannel &&
            State.getMetricName() !== 'comments';

          if (sevenDhAvailable && !State.hourlyData) {
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

const Listing = {
  state: {
    items: [],
    sortKey: 'uploadTime',
    sortDir: 'desc',
    filter: 'all',
    q: '',
    loading: false,
  },

  cache: new Map(),

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

  async fetch(channelId, filter = 'all') {
    const cacheKey = `${channelId}-${filter}`;
    const url = `${Config.api.listing}?channel=${channelId}&filter=${filter}`;

    try {
      const data = await Net.fetchJson(url, {}, 5 * 60 * 1000);
      if (!data.videos || !Array.isArray(data.videos)) {
        return this.cache.get(cacheKey) || [];
      }
      this.cache.set(cacheKey, data.videos);
      return data.videos;
    } catch (error) {
      console.error('Listing fetch error:', error);
      return this.cache.get(cacheKey) || [];
    }
  },

  async fetchAll() {
    const cacheKey = `${State.currentChannel}-${this.state.filter}`;
    const cached = this.cache.get(cacheKey);

    if (cached) {
      this.state.items = cached;
      this.render();
    }

    try {
      this.state.loading = true;
      const videos = await this.fetch(State.currentChannel, this.state.filter);
      this.state.items = videos;
      if (State.isListingView) {
        this.render();
      }
    } catch (e) {
      if (!cached) {
        this.state.items = [];
        if (State.isListingView) {
          this.render();
        }
      }
      console.error('Listing fetch error:', e);
    } finally {
      this.state.loading = false;
    }
  },

  updateInstant() {
    if (!State.isListingView || !State.currentChannel) return;

    const cacheKey = `${State.currentChannel}-${this.state.filter}`;
    const cached = this.cache.get(cacheKey);

    if (cached) {
      this.state.items = cached;
      this.render();
    }
  },

  async updateWithFetch() {
    if (!State.isListingView || !State.currentChannel) return;

    const tbody = Dom.get('listingTbody');
    if (tbody) {
      tbody.innerHTML =
        '<tr><td colspan="8" style="padding: 1rem; text-align: center; color: var(--muted-text-color);">Updating video list...</td></tr>';
    }

    const cacheKey = `${State.currentChannel}-${this.state.filter}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      this.state.items = cached;
      this.render();
    }

    try {
      const videos = await this.fetch(State.currentChannel, this.state.filter);
      if (State.isListingView) {
        this.state.items = videos;
        this.render();
      }
    } catch (error) {
      if (tbody && !cached) {
        tbody.innerHTML =
          '<tr><td colspan="8" style="padding: 1rem; text-align: center; color: red;">Error loading video list. Please try again.</td></tr>';
      }
    }
  },

  render() {
    const tbody = Dom.get('listingTbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (this.state.loading && this.state.items.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="8" style="padding: 1rem; text-align: center; color: var(--muted-text-color);">Loading video list...</td></tr>';
      return;
    }

    const q = this.state.q.trim().toLowerCase();
    const filtered = this.state.items.filter(v =>
      q ? (v.title || '').toLowerCase().includes(q) : true
    );

    if (filtered.length === 0) {
      const message = q
        ? `No videos found matching "${q}"`
        : this.state.items.length === 0
        ? 'No videos available for this filter'
        : 'No videos match the current search';
      tbody.innerHTML = `<tr><td colspan="8" style="padding: 1rem; text-align: center; color: var(--muted-text-color);">${message}</td></tr>`;
      return;
    }

    const sorted = filtered.sort((a, b) =>
      this.compare(a, b, this.state.sortKey, this.state.sortDir)
    );

    const frag = document.createDocumentFragment();
    sorted.forEach((v, index) => {
      const tr = document.createElement('tr');
      tr.className = 'listing-row';
      const typeLabel = v.isShort ? 'Short' : 'Long';
      const rank = index + 1;
      tr.innerHTML = `
	  <td class="listing-rank-cell">
	    <div class="listing-rank">${rank}</div>
	  </td>
	  <td class="listing-video-cell">     
      <div class="listing-video">
         <img
           class="listing-video-thumb"
           src="${v.thumbnail}"
           alt=""
           loading="lazy"
         />
         <div class="listing-video-title">${v.title || ''}</div>
       </div>
     </td>
     <td class="listing-num">${(v.views || 0).toLocaleString()}</td>
     <td class="listing-num">${(v.likes || 0).toLocaleString()}</td>
     <td class="listing-num">${(v.comments || 0).toLocaleString()}</td>
     <td>${v.duration || ''}</td>
     <td>${this.formatDate(v.uploadTime)}</td>
     <td>
       <span class="type-pill ${
         v.isShort ? 'short' : 'long'
       }">${typeLabel}</span>
     </td>
   `;

      tr.addEventListener('click', () => {
        Loader.loadVideo(v.videoId, State.currentChannel);
        const searchInput = Dom.get('searchInput');
        if (searchInput) searchInput.value = v.title || '';
      });
      frag.appendChild(tr);
    });
    tbody.appendChild(frag);

    const subtitle = document.getElementById('listingSubtitle');
    if (subtitle) {
      const totalCount = this.state.items.length;
      const filteredCount = filtered.length;
      const label =
        this.state.filter === 'all'
          ? 'videos'
          : this.state.filter === 'long'
          ? 'videos'
          : 'shorts';

      if (q) {
        subtitle.textContent = `${filteredCount.toLocaleString()} of ${totalCount.toLocaleString()} ${label} (filtered)`;
      } else {
        subtitle.textContent = `${filteredCount.toLocaleString()} ${label} loaded`;
      }
    }
  },

  bind() {
    document.querySelectorAll('.listing-table th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const key = th.dataset.key;
        const defaultKey = 'uploadTime';
        const defaultDir = 'desc';

        if (this.state.sortKey === key) {
          if (this.state.sortDir === 'desc') {
            this.state.sortDir = 'asc';
          } else if (this.state.sortDir === 'asc') {
            this.state.sortKey = defaultKey;
            this.state.sortDir = defaultDir;
          } else {
            this.state.sortDir = 'desc';
          }
        } else {
          this.state.sortKey = key;
          this.state.sortDir = 'desc';
        }
        document.querySelectorAll('.listing-table th.sortable').forEach(h => {
          h.classList.remove('sorted-asc', 'sorted-desc');
          h.removeAttribute('aria-sort');
        });
        const applyIndicator = (colKey, dir) => {
          const activeTh = document.querySelector(
            `.listing-table th.sortable[data-key="${colKey}"]`
          );
          if (activeTh) {
            activeTh.classList.add(
              dir === 'asc' ? 'sorted-asc' : 'sorted-desc'
            );
            activeTh.setAttribute('aria-sort', dir);
          }
        };

        if (
          this.state.sortKey === defaultKey &&
          this.state.sortDir === defaultDir
        ) {
          applyIndicator(defaultKey, defaultDir);
        } else {
          applyIndicator(this.state.sortKey, this.state.sortDir);
        }

        this.render();
      });
    });

    document.querySelectorAll('.listing-filter-button').forEach(btn => {
      btn.addEventListener('click', e => {
        document
          .querySelectorAll('.listing-filter-button')
          .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.filter = btn.dataset.filter;
        this.updateWithFetch();
      });
    });

    const input = Dom.get('listingSearchInput');
    if (input) {
      input.addEventListener(
        'input',
        Dom.debounce(e => {
          this.state.q = e.target.value || '';
          this.render();
        }, 150)
      );
    }

    const tableWrapper = document.querySelector('.listing-table-wrapper');
    if (tableWrapper) {
      tableWrapper.addEventListener('scroll', e => {
        if (e.target.scrollTop > 0) {
          e.target.classList.add('scrolled');
        } else {
          e.target.classList.remove('scrolled');
        }
      });

      tableWrapper.addEventListener(
        'wheel',
        e => {
          const { scrollTop, scrollHeight, clientHeight } = tableWrapper;
          const isScrollingUp = e.deltaY < 0;
          const isScrollingDown = e.deltaY > 0;

          if (
            (isScrollingUp && scrollTop === 0) ||
            (isScrollingDown && scrollTop + clientHeight >= scrollHeight)
          ) {
            e.preventDefault();
          }
        },
        { passive: false }
      );
    }
  },

  applySettings() {
    document.querySelectorAll('.listing-filter-button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === this.state.filter);
    });
    const activeTh = document.querySelector(
      `.listing-table th.sortable[data-key="${this.state.sortKey}"]`
    );
    document
      .querySelectorAll('.listing-table th.sortable')
      .forEach(h => h.classList.remove('sorted-asc', 'sorted-desc'));
    if (activeTh) {
      activeTh.classList.add(
        this.state.sortDir === 'asc' ? 'sorted-asc' : 'sorted-desc'
      );
      activeTh.setAttribute('aria-sort', this.state.sortDir);
    }
  },

  async refresh() {
    await this.fetchAll();
  },

  init() {
    this.bind();
  },
};

Listing.prefetch = async function (channelId) {
  const filters = ['all', 'long', 'short'];
  try {
    await Promise.allSettled(filters.map(f => Listing.fetch(channelId, f)));
  } catch (e) {
    console.error('Listing prefetch error:', e);
  }
};

const Export = {
  generateCsv(timestamps) {
    if (!Array.isArray(timestamps)) return '';

    const estTimestamps = timestamps.map(entry => ({
      ...entry,
      date: luxon.DateTime.fromJSDate(entry.date).setZone('America/New_York'),
    }));

    const start = estTimestamps[0].date.set({
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const end = estTimestamps[estTimestamps.length - 1].date.set({
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
    estTimestamps.forEach(entry => {
      const hourKey = entry.date.toFormat('yyyy-MM-dd-HH');
      dataMap.set(hourKey, entry);
    });

    let csvContent =
      'data:text/csv;charset=utf-8,Timestamp (EST),Views,Likes,Comments\n';

    fullRange.forEach(time => {
      const hourKey = time.toFormat('yyyy-MM-dd-HH');
      const entry = dataMap.get(hourKey);

      if (entry) {
        csvContent += `${time.toFormat('yyyy-MM-dd HH:mm:ss')},${entry.views},${
          entry.likes
        },${entry.comments}\n`;
      } else {
        csvContent += `${time.toFormat('yyyy-MM-dd HH:mm:ss')},,,\n`;
      }
    });

    return csvContent;
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

  toCsv() {
    if (!State.rawData || !Array.isArray(State.rawData)) {
      console.error('No data available for export');
      return;
    }

    const useTimestamp = !!State.rawData[0]?.timestamp;
    const timestamps = State.rawData
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

    const csvContent = this.generateCsv(timestamps);
    if (csvContent) {
      this.download(csvContent, `${State.currentEntityId}.csv`);
    }
  },

  init() {
    const exportBtn = Dom.get('exportButton');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.toCsv());
    }

    const tableResponsive = document.querySelector('.table-responsive');
    if (tableResponsive) {
      tableResponsive.addEventListener('wheel', e => {
        if (tableResponsive.scrollHeight > tableResponsive.clientHeight) {
          e.preventDefault();
          tableResponsive.scrollTop += e.deltaY;
        }
      });
    }
  },
};

const Layout = {
  setupResponsive() {
    const headerControls = document.querySelector('.header-controls');
    const searchBar = document.querySelector('.search-bar');
    const themeToggle = Dom.get('themeToggle');
    const exportButton = Dom.get('exportButton');

    if (!headerControls || !searchBar || !themeToggle || !exportButton) return;

    const existing = document.querySelector('.mobile-buttons');
    if (existing) existing.remove();

    if (window.innerWidth <= Config.responsive.breakpoints.tablet) {
      let mobileButtons = document.querySelector('.mobile-buttons');
      if (!mobileButtons) {
        mobileButtons = Dom.create('div', 'mobile-buttons');
        headerControls.appendChild(mobileButtons);
      }

      mobileButtons.appendChild(themeToggle);
      mobileButtons.appendChild(exportButton);
      headerControls.insertBefore(searchBar, mobileButtons);
    } else {
      headerControls.appendChild(searchBar);
      headerControls.appendChild(themeToggle);
      headerControls.appendChild(exportButton);
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
              plotOptions: {
                series: { animation: false },
              },
            },
            false
          );

          Charts.redraw();

          setTimeout(() => {
            if (State.chart) {
              State.chart.update(
                {
                  chart: { animation: originalAnimation },
                  plotOptions: {
                    series: {
                      animation: State.isMobile()
                        ? false
                        : { duration: 400, easing: 'easeOutQuart' },
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

function lockScroll(el) {
  if (!el) return;

  el.addEventListener(
    'wheel',
    e => {
      const delta = e.deltaY;
      const atTop = el.scrollTop <= 0;
      const atBottom =
        Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;

      if ((delta < 0 && atTop) || (delta > 0 && atBottom)) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  let startY = 0;
  el.addEventListener(
    'touchstart',
    e => {
      startY = e.touches[0].clientY;
    },
    { passive: true }
  );

  el.addEventListener(
    'touchmove',
    e => {
      const currentY = e.touches[0].clientY;
      const delta = startY - currentY;
      const atTop = el.scrollTop <= 0;
      const atBottom =
        Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;

      if ((delta < 0 && atTop) || (delta > 0 && atBottom)) {
        e.preventDefault();
      }
    },
    { passive: false }
  );
}

const dropdown = Dom.get('dropdownList');
if (dropdown) lockScroll(dropdown);

const App = {
  init() {
    try {
      this.checkDeps();
      Theme.init();

      State.loadSettings();

      Search.init();
      Export.init();
      Layout.bindEvents();
      Rankings.init();
      Gains.init();
      Listing.init();
    } catch (error) {
      this.showFallback(error);
    }
  },

  checkDeps() {
    const deps = {
      Luxon: typeof luxon !== 'undefined',
      Highcharts: typeof Highcharts !== 'undefined',
      Odometer: typeof Odometer !== 'undefined',
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
