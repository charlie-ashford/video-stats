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
    combinedHistory: {
      mrbeast: 'https://api.communitrics.com/combined-history',
      byChannel: channel =>
        `https://api.communitrics.com/combined-history-${channel}`,
    },
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
      id: 'taylor',
      name: 'Taylor Swift',
      avatar: 'https://www.banner.yt/UCANLZYMidaCbLQFWXBC95Jg/avatar',
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
  rankings: { defaultCount: 10, maxCount: 25, defaultHours: 24, maxHours: 168 },
};

const State = {
  chart: null,
  rawData: {},
  processedData: {},
  currentEntityId: 'mrbeast',
  currentChannel: 'mrbeast',
  selectedMetricIndex: 0,
  isChartReady: false,
  pendingYAxisRange: null,
  isRankingsView: false,
  rankingsSettings: {
    videoCount: Config.rankings.defaultCount,
    timePeriod: Config.rankings.defaultHours,
  },
  cachedRankings: new Map(),
  lastFetchTime: 0,

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

  reset() {
    this.rawData = {};
    this.processedData = {};
    this.isChartReady = false;
    this.pendingYAxisRange = null;
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

  updateUrl(path) {
    const newUrl = `${window.location.origin}${window.location.pathname}?data=${path}`;
    window.history.replaceState({ path }, '', newUrl);
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
      if (id === 'videoInfoCard') {
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
      this.hide('videoStatsView');
    } else {
      this.hide('rankingsView');
      this.show('videoStatsView');
    }
  },
};

const Format = {
  addCommas: (() => {
    const formatter = new Intl.NumberFormat('en-US');
    return num => formatter.format(num);
  })(),

  addCommasToTitle(title) {
    return title ? title.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '';
  },

  compact(value) {
    if (typeof value !== 'number') return '0';
    if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B';
    if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
    if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
    return value.toString();
  },

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

  pluralize(count, singular, plural) {
    return count === 1 ? singular : plural || `${singular}s`;
  },
};

const DataProcessor = {
  transform(rawData) {
    const processed = {
      timestamps: [],
      series: { views: [], likes: [], comments: [], uploads: [] },
    };
    if (!Array.isArray(rawData)) return processed;

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
    const values = State.processedData.series[metric];
    if (!values || !State.processedData.timestamps) return [];
    return this.downsample(State.processedData.timestamps, values);
  },

  processDaily(data, useTimestamp = false) {
    const dailyData = [];
    const processedDates = new Set();
    if (!Array.isArray(data)) return dailyData;

    data.forEach(entry => {
      const entryDT = luxon.DateTime.fromISO(
        useTimestamp ? entry.timestamp : entry.time
      ).setZone('America/New_York');
      const dateKey = entryDT.toFormat('yyyy-MM-dd');
      if (processedDates.has(dateKey)) return;

      const sameDayEntries = data.filter(e => {
        const dt = luxon.DateTime.fromISO(
          useTimestamp ? e.timestamp : e.time
        ).setZone('America/New_York');
        return dt.toFormat('yyyy-MM-dd') === dateKey;
      });

      let closest = sameDayEntries[0];
      let minDist = Infinity;

      sameDayEntries.forEach(e => {
        const dt = luxon.DateTime.fromISO(
          useTimestamp ? e.timestamp : e.time
        ).setZone('America/New_York');
        const minutesFromMidnight = dt.hour * 60 + dt.minute;
        if (minutesFromMidnight < minDist) {
          minDist = minutesFromMidnight;
          closest = e;
        }
      });

      if (closest) {
        const adjusted = { ...closest };
        const originalDT = luxon.DateTime.fromISO(
          useTimestamp ? adjusted.timestamp : adjusted.time
        ).setZone('America/New_York');
        const adjustedDT = originalDT.minus({ days: 1 });

        if (useTimestamp) {
          adjusted.timestamp = adjustedDT.toISO();
        } else {
          adjusted.time = adjustedDT.toISO();
        }

        adjusted._originalTime = useTimestamp
          ? closest.timestamp
          : closest.time;
        dailyData.push(adjusted);
        processedDates.add(dateKey);
      }
    });

    return dailyData.sort((a, b) => {
      const dateA = new Date(useTimestamp ? a.timestamp : a.time);
      const dateB = new Date(useTimestamp ? b.timestamp : b.time);
      return dateA - dateB;
    });
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
      const rawValues = State.processedData.series[config.key];
      const seriesData = rawValues
        ? DataProcessor.downsample(State.processedData.timestamps, rawValues)
        : [];

      return {
        name: config.name,
        data: seriesData,
        visible: config.visible,
        color: Config.colors[config.key],
        fillColor: this.gradient(Config.colors[config.key]),
        lineWidth: State.isMobile() ? 2 : 3,
      };
    });
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

  xAxis() {
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
          if (State.isMobile()) {
            return dt.toFormat('MM/dd<br/>HH:mm');
          } else {
            const range = this.axis.max - this.axis.min;
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
        step: State.isMobile() ? 2 : 1,
        rotation: 0,
        align: 'center',
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

  yAxis(range) {
    const isUploads =
      State.selectedMetricIndex === 3 &&
      State.processedData.series.uploads?.length > 0;
    const config = {
      title: {
        text: 'Count',
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

  tooltip() {
    return {
      backgroundColor: Dom.getCssVar('--card-background-color'),
      borderColor: Dom.getCssVar('--border-color'),
      style: {
        color: Dom.getCssVar('--text-color'),
        fontSize: State.isMobile() ? '12px' : '14px',
      },
      formatter: function () {
        const dt = luxon.DateTime.fromMillis(this.x, {
          zone: 'America/New_York',
        });
        const date = dt.toFormat('yyyy-MM-dd');
        const time = dt.toFormat('HH:mm:ss');
        let tooltip = `<b>${date} ${time}</b><br>`;
        for (const point of this.points) {
          const value = State.isMobile()
            ? Format.compact(point.y)
            : point.y.toLocaleString();
          tooltip += `${point.series.name}: ${value}<br>`;
        }
        return tooltip;
      },
      shared: true,
      useHTML: true,
      borderRadius: 10,
      shadow: true,
      hideDelay: State.isMobile() ? 1000 : 500,
    };
  },
};

const Charts = {
  validate() {
    if (!State.processedData.timestamps?.length) return false;
    const currentSeries = State.processedData.series[State.getMetricName()];
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

  async create() {
    const container = Dom.get('videoChart');
    if (!container) return false;
    container.innerHTML = '';

    if (!this.validate()) {
      container.innerHTML =
        "<div style='text-align:center;padding:20px;'>No data available for the selected metric.</div>";
      return false;
    }

    const seriesConfig = ChartBuilder.series();
    const currentSeries = DataProcessor.getCurrentSeries();
    const yRange = DataProcessor.calcYRange(currentSeries);

    if (!State.isChartReady) State.pendingYAxisRange = yRange;
    this.destroy();
    State.isChartReady = false;

    if (typeof Highcharts === 'undefined') {
      container.innerHTML =
        '<div style="text-align:center;padding:20px;color:red;">Chart library not loaded</div>';
      return false;
    }

    const cardBg = Dom.getCssVar('--card-background-color');

    State.chart = Highcharts.chart('videoChart', {
      chart: {
        type: 'area',
        backgroundColor: cardBg,
        style: { fontFamily: "'Poppins', sans-serif", fontSize: '14px' },
        plotBackgroundColor: cardBg,
        plotBorderColor: Dom.getCssVar('--border-color'),
        plotBorderWidth: 1,
        zoomType: 'x',
        panning: { enabled: true, type: 'x' },
        panKey: 'shift',
        animation: State.isMobile()
          ? false
          : { duration: 600, easing: 'easeOutQuart' },
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
        height: State.getChartHeight(),
        spacingBottom: State.isMobile() ? 15 : 30,
        spacingTop: State.isMobile() ? 10 : 25,
        spacingLeft: State.isMobile() ? 10 : 25,
        spacingRight: State.isMobile() ? 10 : 25,
        borderRadius: 12,
      },
      boost: { enabled: false },
      title: {
        text: seriesConfig[State.selectedMetricIndex]?.name || 'Chart',
        style: {
          color: Dom.getCssVar('--text-color'),
          fontWeight: '700',
          fontSize: State.isMobile() ? '16px' : '22px',
          fontFamily: "'Poppins', sans-serif",
        },
        margin: State.isMobile() ? 15 : 30,
        align: 'center',
      },
      credits: { enabled: false },
      xAxis: ChartBuilder.xAxis(),
      yAxis: ChartBuilder.yAxis(yRange),
      series: seriesConfig,
      legend: { enabled: false },
      tooltip: ChartBuilder.tooltip(),
      plotOptions: {
        series: {
          animation: State.isMobile()
            ? false
            : { duration: 400, easing: 'easeOutQuart' },
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
            inactive: { opacity: 0.6 },
          },
          turboThreshold: State.isMobile() ? 500 : 1000,
          cropThreshold: State.isMobile() ? 250 : 500,
        },
        area: {
          fillOpacity: State.isMobile() ? 0.4 : 0.6,
          lineWidth: State.isMobile() ? 2.5 : 3.5,
          threshold: null,
        },
      },
      responsive: {
        rules: [
          {
            condition: { maxWidth: 480 },
            chartOptions: {
              chart: {
                height: 280,
                spacingBottom: 15,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10,
              },
              title: { style: { fontSize: '16px' }, margin: 15 },
            },
          },
          {
            condition: { maxWidth: 768 },
            chartOptions: { chart: { height: 350 } },
          },
        ],
      },
    });

    return true;
  },

  redraw() {
    const delay = State.isMobile() ? 300 : 100;
    setTimeout(() => this.create(), delay);
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
      if (!prev) return '';
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

  addHistoricalRows(tableBody, dailyData, useTimestamp) {
    const fragment = document.createDocumentFragment();

    for (let i = dailyData.length - 1; i >= 0; i--) {
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

      fragment.appendChild(row);
    }

    tableBody.appendChild(fragment);
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

    this.addHistoricalRows(tableBody, dailyData, useTimestamp);
    Dom.show('dailyStatsTable');
  },
};

const Rankings = {
  updateTimeouts: new Map(),

  async fetch(channelId) {
    const cacheKey = channelId;
    const currentTime = Date.now();

    if (
      State.cachedRankings.has(cacheKey) &&
      currentTime - State.lastFetchTime < 300000
    ) {
      return State.cachedRankings.get(cacheKey);
    }

    const url = `${Config.api.rankings}?channel=${channelId}`;

    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);

      const data = await response.json();
      if (!data.videos || !Array.isArray(data.videos)) return [];

      State.cachedRankings.set(cacheKey, data.videos);
      State.lastFetchTime = currentTime;
      return data.videos;
    } catch (error) {
      return State.cachedRankings.get(cacheKey) || [];
    }
  },

  calcAge(uploadTime) {
    const uploadDT = luxon.DateTime.fromISO(uploadTime);
    const currentDT = luxon.DateTime.now().setZone('America/New_York');
    const diffHours = currentDT.diff(uploadDT, 'hours').hours;
    return Math.floor(Math.max(0, diffHours));
  },

  getDefaults(videos) {
    if (!videos || videos.length === 0) {
      return { videoCount: 10, timePeriod: 24, highlightNewest: false };
    }

    const newest = videos[0];
    const ageInHours = this.calcAge(newest.uploadTime);
    const hasData =
      newest.periodData && newest.periodData[ageInHours.toString()] > 0;

    let smartTimePeriod,
      highlightNewest = false;

    if (ageInHours > 0 && ageInHours < 24 && hasData) {
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

  processVideos(videos, timePeriod, videoCount) {
    if (!videos || !Array.isArray(videos)) return [];

    const withData = videos
      .filter(
        v =>
          v.periodData &&
          v.periodData[timePeriod.toString()] &&
          v.periodData[timePeriod.toString()] > 0
      )
      .map(v => ({ ...v, viewsAtPeriod: v.periodData[timePeriod.toString()] }));

    const recent = withData
      .sort((a, b) => new Date(b.uploadTime) - new Date(a.uploadTime))
      .slice(0, Math.min(videoCount, 25));

    return recent.sort((a, b) => b.viewsAtPeriod - a.viewsAtPeriod);
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
      State.rankingsSettings.videoCount
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

      const formattedViews = Format.addCommas(video.viewsAtPeriod);
      const periodUnit = Format.pluralize(
        State.rankingsSettings.timePeriod,
        'hour'
      );

      item.innerHTML = `
        <div class="ranking-position">${index + 1}</div>
        <img class="ranking-thumbnail" src="${video.thumbnail}" alt="${
        video.title
      }" 
             onerror="this.style.display='none'" loading="lazy">
        <div class="ranking-info">
          <div class="ranking-title">${Format.addCommasToTitle(
            video.title
          )}</div>
        </div>
        <div class="ranking-views">
          ${formattedViews}
          <span class="ranking-time">in ${
            State.rankingsSettings.timePeriod
          } ${periodUnit}</span>
        </div>
      `;

      item.addEventListener('click', () => {
        Loader.loadVideo(video.videoId, State.currentChannel);
        const searchInput = Dom.get('searchInput');
        if (searchInput)
          searchInput.value = Format.addCommasToTitle(video.title);
      });

      fragment.appendChild(item);
    });

    list.appendChild(fragment);

    const heading = document.querySelector('.rankings-header h2');
    if (heading) {
      heading.textContent = `Top ${State.rankingsSettings.videoCount} Performing Videos`;
    }

    const subtitle = document.querySelector('.rankings-subtitle');
    const periodUnit = Format.pluralize(
      State.rankingsSettings.timePeriod,
      'Hour'
    );
    if (subtitle) {
      subtitle.textContent = `Views in First ${State.rankingsSettings.timePeriod} ${periodUnit}`;
    }
  },

  updateInstant() {
    if (!State.isRankingsView || !State.currentChannel) return;

    const list = Dom.get('rankingsList');
    if (list) {
      list.innerHTML =
        '<div style="text-align:center;padding:20px;color:var(--muted-text-color);">Updating rankings...</div>';
    }

    const cached = State.cachedRankings.get(State.currentChannel);
    if (cached) this.display(cached);

    this.fetch(State.currentChannel)
      .then(videos => {
        if (State.isRankingsView) this.display(videos);
      })
      .catch(error => {
        if (list && !cached) {
          list.innerHTML =
            '<div style="text-align:center;padding:20px;color:red;">Error loading rankings. Please try again.</div>';
        }
      });
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

          clearTimeout(this.updateTimeouts.get('videoCount'));
          this.updateTimeouts.set(
            'videoCount',
            setTimeout(() => this.updateInstant(), 200)
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

          clearTimeout(this.updateTimeouts.get('timePeriod'));
          this.updateTimeouts.set(
            'timePeriod',
            setTimeout(() => this.updateInstant(), 200)
          );
        },
        { passive: true }
      );
    }
  },

  init() {
    this.bindSliders();
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

        document.documentElement.setAttribute('data-theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateIcons(newTheme);

        if (State.chart) {
          setTimeout(() => {
            const newCardBg = Dom.getCssVar('--card-background-color');
            const newBorderColor = Dom.getCssVar('--border-color');

            State.chart.update(
              {
                chart: {
                  backgroundColor: newCardBg,
                  plotBackgroundColor: newCardBg,
                  plotBorderColor: newBorderColor,
                },
              },
              true
            );
          }, 10);
        }

        Charts.redraw();
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
  handleInput: Dom.debounce(function (e) {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('.dropdown-list-item').forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(term)
        ? ''
        : 'none';
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
        Charts.redraw();
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

      const defaultCh = Config.channels[0];
      Loader.loadChannel(defaultCh.id, defaultCh.avatar, defaultCh.id, true);
    });

    Config.channels.forEach(channel => {
      const option = this.createChannelOption(channel);
      dropdown.appendChild(option);

      option.addEventListener('click', () => {
        const input = Dom.get('searchInput');
        if (input) input.value = channel.name;
        dropdown.classList.remove('show');
        Loader.loadChannel(channel.id, channel.avatar, channel.id, false);
      });
    });
  },

  addVideoOpts(videos) {
    const dropdown = Dom.get('dropdownList');
    if (!dropdown || !Array.isArray(videos)) return;

    const fragment = document.createDocumentFragment();

    videos.forEach(video => {
      const item = Dom.create('div', 'dropdown-list-item');
      item.textContent = Format.addCommasToTitle(video.title);
      item.dataset.videoId = video.videoId;

      item.addEventListener('click', e => {
        const selectedId = e.currentTarget.dataset.videoId;
        const input = Dom.get('searchInput');
        if (input) input.value = e.currentTarget.textContent;
        dropdown.classList.remove('show');
        Loader.loadVideo(selectedId, State.currentChannel);
      });

      fragment.appendChild(item);
    });

    dropdown.appendChild(fragment);
  },

  handleUrlParams(videos) {
    const params = new URLSearchParams(window.location.search);
    const videoId = params.get('data');

    const channelMap = Config.channels.reduce((acc, ch) => {
      acc[ch.id] = ch;
      return acc;
    }, {});

    if (videoId === 'rankings') {
      const defaultCh = Config.channels[0];
      const input = Dom.get('searchInput');
      if (input) input.value = 'Top Video Rankings';
      Loader.loadChannel(defaultCh.id, defaultCh.avatar, defaultCh.id, true);
    } else if (channelMap[videoId]) {
      const channel = channelMap[videoId];
      const input = Dom.get('searchInput');
      if (input) input.value = channel.name;
      Loader.loadChannel(channel.id, channel.avatar, channel.id, false);
    } else if (videoId && Array.isArray(videos)) {
      const matching = videos.find(v => v.videoId === videoId);
      if (matching) {
        const input = Dom.get('searchInput');
        if (input) input.value = Format.addCommasToTitle(matching.title);
        Loader.loadVideo(matching.videoId, 'mrbeast');
      } else {
        this.loadDefaultRankings();
      }
    } else if (Array.isArray(videos) && videos.length > 0) {
      this.loadDefaultVideo(videos);
    } else {
      this.loadDefaultRankings();
    }
  },

  loadDefaultVideo(videos) {
    const recent = videos.sort(
      (a, b) => new Date(b.uploadTime) - new Date(a.uploadTime)
    )[0];
    const input = Dom.get('searchInput');
    if (input) input.value = Format.addCommasToTitle(recent.title);
    Loader.loadVideo(recent.videoId, 'mrbeast');
  },

  loadDefaultRankings() {
    const defaultCh = Config.channels[0];
    const input = Dom.get('searchInput');
    if (input) input.value = 'Top Video Rankings';
    Loader.loadChannel(defaultCh.id, defaultCh.avatar, defaultCh.id, true);
  },

  async fetchInitialVideos() {
    try {
      const response = await fetch(Config.api.videos.all);
      if (!response.ok)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);

      const data = await response.json();
      if (data?.videos) {
        this.addVideoOpts(data.videos);
        this.handleUrlParams(data.videos);
      } else {
        this.loadDefaultRankings();
      }
    } catch (error) {
      this.loadDefaultRankings();
    }
  },

  init() {
    this.bindEvents();
    this.createChannelOpts();
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => this.fetchInitialVideos());
    } else {
      setTimeout(() => this.fetchInitialVideos(), 100);
    }
  },
};

const Loader = {
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
      elements.videoLink.textContent = Format.addCommasToTitle(video.title);
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

    if (elements.duration && video.stats?.[0]?.duration) {
      elements.duration.innerHTML = `Duration: ${video.stats[0].duration}`;
      const videoIdSpan = Dom.create('span', 'video-id');
      videoIdSpan.textContent = ` (Video ID: ${video.videoId})`;
      elements.duration.appendChild(videoIdSpan);
    }

    Dom.show('videoInfoCard');
  },

  async loadChannel(channelId, profileUrl, _, showRankings = false) {
    State.reset();
    State.currentEntityId = channelId;
    State.currentChannel = channelId;
    State.isRankingsView = showRankings;

    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
      headerTitle.textContent = showRankings
        ? 'Top Video Rankings'
        : 'Channel Analytics';
    }

    Dom.removeImg();
    await this.setupProfile(profileUrl);
    Dom.updateUrl(showRankings ? 'rankings' : channelId);

    if (showRankings) {
      Dom.setView('rankings');

      const list = Dom.get('rankingsList');
      if (list) {
        list.innerHTML =
          '<div style="text-align:center;padding:40px;color:var(--muted-text-color);">Loading rankings...</div>';
      }

      try {
        const rankings = await Rankings.fetch(channelId);

        if (rankings.length > 0) {
          const defaults = Rankings.getDefaults(rankings);

          State.rankingsSettings.videoCount = defaults.videoCount;
          State.rankingsSettings.timePeriod = defaults.timePeriod;

          const countSlider = Dom.get('videoCountSlider');
          const countValue = Dom.get('videoCountValue');
          const periodSlider = Dom.get('timePeriodSlider');
          const periodValue = Dom.get('timePeriodValue');

          if (countSlider) countSlider.value = defaults.videoCount;
          if (countValue) countValue.textContent = defaults.videoCount;
          if (periodSlider) periodSlider.value = defaults.timePeriod;
          if (periodValue) periodValue.textContent = defaults.timePeriod;

          Rankings.display(rankings, defaults);
        } else {
          if (list) {
            list.innerHTML =
              '<div style="text-align:center;padding:40px;color:var(--muted-text-color);">No ranking data available for this channel.</div>';
          }
        }
      } catch (error) {
        if (list) {
          list.innerHTML =
            '<div style="text-align:center;padding:40px;color:red;">Error loading rankings. Please try again.</div>';
        }
      }
    } else {
      Dom.setView('video');
      Dom.hide('videoInfoCard');

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

        const response = await fetch(endpoint);
        if (!response.ok)
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);

        const combinedData = await response.json();

        if (Array.isArray(combinedData)) {
          State.rawData = combinedData;
          State.processedData = DataProcessor.transform(combinedData);

          await Charts.create();
          Stats.update();

          const dailyData = DataProcessor.processDaily(combinedData);
          const currentData = combinedData[combinedData.length - 1];
          Tables.create(dailyData, currentData);
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
  },

  async loadVideo(videoId, channelId = 'mrbeast') {
    State.reset();
    State.currentEntityId = videoId;
    State.currentChannel = channelId;
    State.isRankingsView = false;
    Dom.updateUrl(videoId);

    Dom.setView('video');

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
      let response = await fetch(endpoint);

      if (!response.ok) {
        endpoint = Config.api.videoStats.base + videoId;
        response = await fetch(endpoint);
      }

      if (!response.ok)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);

      const video = await response.json();

      if (video?.stats && Array.isArray(video.stats)) {
        this.updateVideoInfo(video);

        const filtered = video.stats.filter(
          stat =>
            stat.views != null &&
            stat.views !== 0 &&
            stat.likes != null &&
            stat.likes !== 0 &&
            stat.comments != null &&
            stat.comments !== 0
        );

        State.rawData = filtered;

        const processed = DataProcessor.transform(filtered);
        delete processed.series.uploads;
        State.processedData = processed;

        await Charts.create();
        Stats.update();

        const dailyData = DataProcessor.processDaily(filtered, true);
        const currentData = filtered[filtered.length - 1];
        Tables.create(dailyData, currentData, true);

        Dom.show('videoInfoCard');
      } else {
        throw new Error('Invalid video data format');
      }
    } catch (error) {
      const chart = Dom.get('videoChart');
      if (chart) {
        chart.innerHTML = `<div style='text-align:center;padding:20px;color:red;'>Failed to load video data: ${error.message}<br>Please try again.</div>`;
      }
    }
  },
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
        csvContent += `${time.toISO()},${entry.views},${entry.likes},${
          entry.comments
        }\n`;
      } else {
        csvContent += `${time.toISO()},,,\n`;
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
    if (!State.processedData.timestamps || !State.processedData.series) return;

    const timestamps = State.processedData.timestamps
      .map((timestamp, i) => ({
        date: luxon.DateTime.fromMillis(timestamp)
          .setZone('America/New_York')
          .toJSDate(),
        views: Math.round(State.processedData.series.views[i] || 0),
        likes: Math.round(State.processedData.series.likes[i] || 0),
        comments: Math.round(State.processedData.series.comments[i] || 0),
      }))
      .sort((a, b) => a.date - b.date);

    const csvContent = this.generateCsv(timestamps);
    if (csvContent) {
      this.download(csvContent, `${State.currentEntityId}_data.csv`);
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
        if (State.chart && State.isChartReady) Charts.redraw();
      }, 250)
    );

    window.addEventListener('load', () => this.setupResponsive());
  },
};

const App = {
  init() {
    try {
      this.checkDeps();
      Theme.init();
      Search.init();
      Export.init();
      Layout.bindEvents();
      Rankings.init();
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
          <h1 style="color: #db421f; margin-bottom: 20px;">Application Error</h1>
          <p style="color: #666; font-size: 18px; margin-bottom: 30px;">
            The application failed to initialize properly.
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
