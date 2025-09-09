const CONFIG = {
  api: {
    videos: 'https://api.communitrics.com/videos/all',
    videoStats: 'https://api.communitrics.com/videostats/',
  },
  channels: [
    {
      id: 'mrbeast',
      name: 'MrBeast',
      endpoint: 'https://api.communitrics.com/combined-history',
      avatar: 'https://www.banner.yt/UCX6OQ3DkcsbYNE6H8uQQuVA/avatar',
    },
    {
      id: 'mrbeast2',
      name: 'MrBeast 2',
      endpoint: 'https://api.communitrics.com/combined-history-mb2',
      avatar: 'https://www.banner.yt/UC4-79UOlP48-QNGgCko5p2g/avatar',
    },
    {
      id: 'mrbeastgaming',
      name: 'MrBeast Gaming',
      endpoint: 'https://api.communitrics.com/combined-history-mbgaming',
      avatar: 'https://www.banner.yt/UCIPPMRA040LQr5QPyJEbmXA/avatar',
    },
    {
      id: 'mrbeastreacts',
      name: 'Beast Reacts',
      endpoint: 'https://api.communitrics.com/combined-history-mbreacts',
      avatar: 'https://www.banner.yt/UCUaT_39o1x6qWjz7K2pWcgw/avatar',
    },
    {
      id: 'mrbeastphilanthropy',
      name: 'Beast Philanthropy',
      endpoint: 'https://api.communitrics.com/combined-history-mbphilanthropy',
      avatar: 'https://www.banner.yt/UCAiLfjNXkNv24uhpzUgPa6A/avatar',
    },
    {
      id: 'beastanimations',
      name: 'Beast Animations',
      endpoint: 'https://api.communitrics.com/combined-history-mbanimations',
      avatar: 'https://www.banner.yt/UCZzvDDvaYti8Dd8bLEiSoyQ/avatar',
    },
    {
      id: 'moremrbeastgaming',
      name: 'More MrBeast Gaming',
      endpoint: 'https://api.communitrics.com/combined-history-mmbg',
      avatar: 'https://www.banner.yt/UCzfPgw5WN9bvMiBz-JJYVyw/avatar',
    },
    {
      id: 'cocomelon',
      name: 'Cocomelon - Nursery Rhymes',
      endpoint: 'https://api.communitrics.com/combined-history-cocomelon',
      avatar: 'https://www.banner.yt/UCbCmjCuTUZos6Inko4u57UQ/avatar',
    },
    {
      id: 'ronaldo',
      name: 'UR · Cristiano',
      endpoint: 'https://api.communitrics.com/combined-history-ronaldo',
      avatar: 'https://www.banner.yt/UCtxD0x6AuNNqdXO9Wp5GHew/avatar',
    },
    {
      id: 'taylor',
      name: 'Taylor Swift',
      endpoint: 'https://api.communitrics.com/combined-history-taylor',
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
};

const state = {
  chart: null,
  rawData: {},
  processedData: {},
  currentVideoId: 'mrbeast',
  selectedSeriesIndex: 0,
  isChartReady: false,
  pendingYRange: null,

  getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width <= CONFIG.responsive.breakpoints.mobile) return 'mobile';
    if (width <= CONFIG.responsive.breakpoints.tablet) return 'tablet';
    if (width <= CONFIG.responsive.breakpoints.desktop) return 'desktop';
    return 'large';
  },

  isMobile() {
    return this.getCurrentBreakpoint() === 'mobile';
  },

  getMaxDataPoints() {
    return CONFIG.responsive.maxDataPoints[this.getCurrentBreakpoint()];
  },

  getChartHeight() {
    return CONFIG.responsive.chartHeights[this.getCurrentBreakpoint()];
  },

  getCurrentSeriesName() {
    const names = ['views', 'likes', 'comments', 'uploads'];
    return names[this.selectedSeriesIndex];
  },

  isCountBasedMetric() {
    return this.selectedSeriesIndex < 3;
  },

  reset() {
    this.rawData = {};
    this.processedData = {};
    this.isChartReady = false;
    this.pendingYRange = null;
  },
};

const dom = {
  getCSSVariable(name) {
    return getComputedStyle(document.body).getPropertyValue(name).trim();
  },

  async createProfileImage(src, alt = 'Profile Image') {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.classList.add('profile-image');
    return img;
  },

  async removeExistingProfileImage() {
    const existing = document.querySelector('header img.profile-image');
    if (existing) existing.remove();
  },

  async updateBrowserURL(path) {
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?data=${path}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  },

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
};

const formatters = {
  addCommasToNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  },

  addCommasToTitle(title) {
    return title.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  },

  formatCompactNumber(value) {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + 'B';
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value;
  },

  formatAxisLabel(value, tickInterval) {
    const absValue = Math.abs(value);

    if (absValue >= 1000000000) {
      const billions = value / 1000000000;
      const decimalPlaces = tickInterval && tickInterval < 10000000 ? 3 : 1;
      return billions.toFixed(decimalPlaces) + 'B';
    } else if (absValue >= 1000000) {
      const millions = value / 1000000;
      const decimalPlaces = tickInterval && tickInterval < 10000 ? 2 : 1;
      return millions.toFixed(decimalPlaces) + 'M';
    } else if (absValue >= 1000) {
      const thousands = value / 1000;
      const decimalPlaces = tickInterval && tickInterval < 10 ? 2 : 1;
      return thousands.toFixed(decimalPlaces) + 'K';
    }
    return Math.round(value).toLocaleString();
  },

  formatDateTime(luxonDateTime) {
    return {
      dateString: luxonDateTime.toFormat('ccc, MMM d, yyyy'),
    };
  },
};

const dataProcessor = {
  async transformRawData(rawData) {
    const processed = {
      timestamps: [],
      series: { views: [], likes: [], comments: [], uploads: [] },
    };

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
      } else {
        return;
      }

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

  async downsampleForPerformance(timestamps, values) {
    if (!timestamps || !values || timestamps.length !== values.length) {
      return [];
    }

    const dataPoints = timestamps.map((time, i) => [time, values[i]]);

    if (dataPoints.length <= state.getMaxDataPoints()) {
      return dataPoints;
    }

    const step = Math.floor(dataPoints.length / state.getMaxDataPoints());
    const result = [];

    for (let i = 0; i < dataPoints.length; i += step) {
      result.push(dataPoints[i]);
    }

    if (result[result.length - 1] !== dataPoints[dataPoints.length - 1]) {
      result.push(dataPoints[dataPoints.length - 1]);
    }

    return result;
  },

  async calculateOptimalYRange(seriesData, xMin = null, xMax = null) {
    if (!seriesData || seriesData.length === 0) {
      return { min: 0, max: 100 };
    }

    let visibleData = seriesData;
    if (xMin !== null && xMax !== null) {
      visibleData = seriesData.filter(point => {
        const x = Array.isArray(point) ? point[0] : point.x;
        return x >= xMin && x <= xMax;
      });

      if (visibleData.length === 0) {
        visibleData = seriesData;
      }
    }

    const yValues = visibleData
      .map(point => (Array.isArray(point) ? point[1] : point.y))
      .filter(val => typeof val === 'number' && !isNaN(val) && isFinite(val));

    if (yValues.length === 0) {
      return { min: 0, max: 100 };
    }

    const rawMin = Math.min(...yValues);
    const rawMax = Math.max(...yValues);

    const range = rawMax - rawMin;
    const padding = Math.max(range * 0.05, 1);

    let calculatedMin = rawMin - padding;
    let calculatedMax = rawMax + padding;

    const isCountBased = state.isCountBasedMetric();

    if (isCountBased && calculatedMin < 0 && rawMin >= 0) {
      calculatedMin = 0;
    }

    if (calculatedMax <= calculatedMin) {
      calculatedMax =
        calculatedMin + (calculatedMin > 0 ? calculatedMin * 0.1 : 100);
    }

    return { min: calculatedMin, max: calculatedMax };
  },

  async getCurrentSeriesData() {
    const seriesName = state.getCurrentSeriesName();
    const rawValues = state.processedData.series[seriesName];

    if (!rawValues || !state.processedData.timestamps) {
      return [];
    }

    return await this.downsampleForPerformance(
      state.processedData.timestamps,
      rawValues
    );
  },

  async processDailyData(data, useTimestamp = false) {
    const dailyData = [];
    const processedDates = new Set();

    data.forEach(entry => {
      const entryDateTime = luxon.DateTime.fromISO(
        useTimestamp ? entry.timestamp : entry.time
      ).setZone('America/New_York');

      const dateKey = entryDateTime.toFormat('yyyy-MM-dd');

      if (processedDates.has(dateKey)) {
        return;
      }

      const sameDayEntries = data.filter(e => {
        const dt = luxon.DateTime.fromISO(
          useTimestamp ? e.timestamp : e.time
        ).setZone('America/New_York');
        return dt.toFormat('yyyy-MM-dd') === dateKey;
      });

      let closestToMidnight = sameDayEntries[0];
      let minDistanceFromMidnight = Infinity;

      sameDayEntries.forEach(e => {
        const dt = luxon.DateTime.fromISO(
          useTimestamp ? e.timestamp : e.time
        ).setZone('America/New_York');

        const minutesFromMidnight = dt.hour * 60 + dt.minute;

        if (minutesFromMidnight < minDistanceFromMidnight) {
          minDistanceFromMidnight = minutesFromMidnight;
          closestToMidnight = e;
        }
      });

      if (closestToMidnight) {
        const adjustedEntry = { ...closestToMidnight };

        const originalDateTime = luxon.DateTime.fromISO(
          useTimestamp ? adjustedEntry.timestamp : adjustedEntry.time
        ).setZone('America/New_York');

        const adjustedDateTime = originalDateTime.minus({ days: 1 });

        if (useTimestamp) {
          adjustedEntry.timestamp = adjustedDateTime.toISO();
        } else {
          adjustedEntry.time = adjustedDateTime.toISO();
        }

        adjustedEntry._originalTime = useTimestamp
          ? closestToMidnight.timestamp
          : closestToMidnight.time;

        dailyData.push(adjustedEntry);
        processedDates.add(dateKey);
      }
    });

    dailyData.sort((a, b) => {
      const dateA = new Date(useTimestamp ? a.timestamp : a.time);
      const dateB = new Date(useTimestamp ? b.timestamp : b.time);
      return dateA - dateB;
    });

    return dailyData;
  },
};

const chartFactory = {
  convertHexToRGB(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  },

  createGradientFill(color) {
    const rgb = this.convertHexToRGB(color);
    return {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: [
        [0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.75)`],
        [1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`],
      ],
    };
  },

  async buildSeriesConfig() {
    const seriesConfigs = [
      {
        name: 'Views',
        key: 'views',
        visible: state.selectedSeriesIndex === 0,
      },
      {
        name: 'Likes',
        key: 'likes',
        visible: state.selectedSeriesIndex === 1,
      },
      {
        name: 'Comments',
        key: 'comments',
        visible: state.selectedSeriesIndex === 2,
      },
    ];

    if (state.processedData.series.uploads?.length > 0) {
      seriesConfigs.push({
        name: 'Uploads',
        key: 'uploads',
        visible: state.selectedSeriesIndex === 3,
      });
    }

    const results = [];
    for (const config of seriesConfigs) {
      const rawValues = state.processedData.series[config.key];
      const seriesData = rawValues
        ? await dataProcessor.downsampleForPerformance(
            state.processedData.timestamps,
            rawValues
          )
        : [];

      results.push({
        name: config.name,
        data: seriesData,
        visible: config.visible,
        color: CONFIG.colors[config.key],
        fillColor: this.createGradientFill(CONFIG.colors[config.key]),
        lineWidth: state.isMobile() ? 2 : 3,
      });
    }

    return results;
  },

  async getEventHandlers() {
    return {
      load: function () {
        state.isChartReady = true;

        if (state.pendingYRange) {
          const { min, max } = state.pendingYRange;
          if (this.yAxis && this.yAxis[0]) {
            this.yAxis[0].setExtremes(min, max, true, false);
          }
          state.pendingYRange = null;
        }
      },

      redraw: function () {
        if (
          state.isCountBasedMetric() &&
          this.yAxis &&
          this.yAxis[0] &&
          typeof this.yAxis[0].min === 'number' &&
          this.yAxis[0].min < 0 &&
          this.yAxis[0].dataMin >= 0
        ) {
          this.yAxis[0].setExtremes(0, null, false, false);
        }
      },
    };
  },

  async getXAxisConfig() {
    return {
      title: {
        text: 'Time (EST)',
        style: {
          color: dom.getCSSVariable('--text-color'),
          fontSize: state.isMobile() ? '13px' : '16px',
          fontWeight: '600',
        },
        margin: state.isMobile() ? 15 : 20,
      },
      type: 'datetime',
      labels: {
        formatter: function () {
          const dt = luxon.DateTime.fromMillis(this.value, {
            zone: 'America/New_York',
          });

          if (state.isMobile()) {
            return dt.toFormat('MM/dd<br/>HH:mm');
          } else {
            const range = this.axis.max - this.axis.min;
            if (range <= 86400000) {
              return dt.toFormat('HH:mm<br/>MM/dd');
            } else if (range <= 604800000) {
              return dt.toFormat('MM/dd<br/>HH:mm');
            } else {
              return dt.toFormat('MMM dd<br/>yyyy');
            }
          }
        },
        style: {
          color: dom.getCSSVariable('--text-color'),
          fontSize: state.isMobile() ? '11px' : '13px',
          fontWeight: '500',
        },
        step: state.isMobile() ? 2 : 1,
        rotation: 0,
        align: 'center',
      },
      gridLineColor: dom.getCSSVariable('--border-color'),
      gridLineWidth: 1,
      gridLineDashStyle: 'Dash',
      lineColor: dom.getCSSVariable('--border-color'),
      lineWidth: 2,
      tickColor: dom.getCSSVariable('--border-color'),
      tickWidth: 1,
      tickLength: 5,
      minorTickLength: 3,
      minorGridLineColor: dom.getCSSVariable('--border-color'),
      minorGridLineWidth: 0.5,
      minorGridLineDashStyle: 'Dot',
      events: {
        afterSetExtremes: async function (e) {
          if (!state.isMobile() && state.isChartReady && this.chart?.series) {
            const activeSeries = this.chart.series[state.selectedSeriesIndex];

            if (activeSeries?.data?.length > 0) {
              const range = await dataProcessor.calculateOptimalYRange(
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

  async getYAxisConfig(range) {
    const isUploadsChart =
      state.selectedSeriesIndex === 3 &&
      state.processedData.series.uploads?.length > 0;

    const yAxisConfig = {
      title: {
        text: 'Count',
        style: {
          color: dom.getCSSVariable('--text-color'),
          fontSize: state.isMobile() ? '13px' : '16px',
          fontWeight: '600',
        },
        margin: state.isMobile() ? 15 : 20,
      },
      labels: {
        style: {
          color: dom.getCSSVariable('--text-color'),
          fontSize: state.isMobile() ? '11px' : '13px',
          fontWeight: '500',
        },
        formatter: function () {
          if (isUploadsChart) {
            return Math.round(this.value).toLocaleString();
          } else {
            return formatters.formatAxisLabel(
              this.value,
              this.axis.tickInterval
            );
          }
        },
        align: 'right',
        x: -5,
        y: 4,
      },
      gridLineColor: dom.getCSSVariable('--border-color'),
      gridLineWidth: 1,
      gridLineDashStyle: 'Dash',
      lineColor: dom.getCSSVariable('--border-color'),
      lineWidth: 2,
      tickColor: dom.getCSSVariable('--border-color'),
      tickWidth: 1,
      tickLength: 5,
      minorTickLength: 3,
      minorGridLineColor: dom.getCSSVariable('--border-color'),
      minorGridLineWidth: 0.5,
      minorGridLineDashStyle: 'Dot',
      min: range.min,
      max: range.max,
      startOnTick: true,
      endOnTick: true,
      allowDecimals: !isUploadsChart,
      softMin: range.min,
      softMax: range.max,
    };

    if (state.isCountBasedMetric() && range.min === 0) {
      yAxisConfig.floor = 0;
      yAxisConfig.minPadding = 0;
    }

    return yAxisConfig;
  },

  async getTooltipConfig() {
    return {
      backgroundColor: dom.getCSSVariable('--card-background-color'),
      borderColor: dom.getCSSVariable('--border-color'),
      style: {
        color: dom.getCSSVariable('--text-color'),
        fontSize: state.isMobile() ? '12px' : '14px',
      },
      formatter: function () {
        const dateTime = luxon.DateTime.fromMillis(this.x, {
          zone: 'America/New_York',
        });

        const formattedDate = dateTime.toFormat('yyyy-MM-dd');
        const formattedTime = dateTime.toFormat('HH:mm:ss');

        let tooltipText = `<b>${formattedDate} ${formattedTime}</b><br>`;

        for (const point of this.points) {
          let label = point.series.name;
          let value = point.y;
          let formattedValue = state.isMobile()
            ? formatters.formatCompactNumber(value)
            : value.toLocaleString();
          tooltipText += `${label}: ${formattedValue}<br>`;
        }

        return tooltipText;
      },
      shared: true,
      useHTML: true,
      borderRadius: 10,
      shadow: true,
      hideDelay: state.isMobile() ? 1000 : 500,
    };
  },
};

const chartManager = {
  async validateData() {
    if (!state.processedData.timestamps?.length) {
      return false;
    }

    const currentSeriesData =
      state.processedData.series[state.getCurrentSeriesName()];
    return currentSeriesData && currentSeriesData.length > 0;
  },

  async destroyExisting() {
    if (state.chart) {
      try {
        state.chart.destroy();
      } catch (e) {}
      state.chart = null;
    }
  },

  async create() {
    const chartContainer = document.getElementById('videoChart');
    chartContainer.innerHTML = '';

    if (!(await this.validateData())) {
      chartContainer.innerHTML =
        "<div style='text-align:center;padding:20px;'>No data available for the selected series.</div>";
      return false;
    }

    const seriesConfig = await chartFactory.buildSeriesConfig();
    const currentSeriesData = await dataProcessor.getCurrentSeriesData();
    const yRange = await dataProcessor.calculateOptimalYRange(
      currentSeriesData
    );

    if (!state.isChartReady) {
      state.pendingYRange = yRange;
    }

    await this.destroyExisting();
    state.isChartReady = false;

    try {
      state.chart = Highcharts.chart('videoChart', {
        chart: {
          type: 'area',
          backgroundColor: dom.getCSSVariable('--card-background-color'),
          style: {
            fontFamily: "'Poppins', sans-serif",
            fontSize: '14px',
          },
          plotBackgroundColor: dom.getCSSVariable('--card-background-color'),
          plotBorderColor: dom.getCSSVariable('--border-color'),
          plotBorderWidth: 1,
          zoomType: 'x',
          panning: { enabled: true, type: 'x' },
          panKey: 'shift',
          animation: state.isMobile()
            ? false
            : {
                duration: 600,
                easing: 'easeOutQuart',
              },
          events: await chartFactory.getEventHandlers(),
          height: state.getChartHeight(),
          spacingBottom: state.isMobile() ? 15 : 30,
          spacingTop: state.isMobile() ? 10 : 25,
          spacingLeft: state.isMobile() ? 10 : 25,
          spacingRight: state.isMobile() ? 10 : 25,
          borderRadius: 12,
        },
        boost: { enabled: false },
        title: {
          text: seriesConfig[state.selectedSeriesIndex]?.name || 'Chart',
          style: {
            color: dom.getCSSVariable('--text-color'),
            fontWeight: '700',
            fontSize: state.isMobile() ? '16px' : '22px',
            fontFamily: "'Poppins', sans-serif",
          },
          margin: state.isMobile() ? 15 : 30,
          align: 'center',
        },
        credits: { enabled: false },
        xAxis: await chartFactory.getXAxisConfig(),
        yAxis: await chartFactory.getYAxisConfig(yRange),
        series: seriesConfig,
        legend: { enabled: false },
        tooltip: await chartFactory.getTooltipConfig(),
        plotOptions: {
          series: {
            animation: state.isMobile()
              ? false
              : {
                  duration: 400,
                  easing: 'easeOutQuart',
                },
            marker: {
              enabled: false,
              states: {
                hover: {
                  enabled: true,
                  radius: state.isMobile() ? 4 : 6,
                  lineWidth: 2,
                  lineColor: '#ffffff',
                },
              },
            },
            states: {
              hover: {
                lineWidthPlus: state.isMobile() ? 1 : 2,
                halo: { size: 8, opacity: 0.3 },
              },
              inactive: { opacity: 0.6 },
            },
            turboThreshold: state.isMobile() ? 500 : 1000,
            cropThreshold: state.isMobile() ? 250 : 500,
          },
          area: {
            fillOpacity: state.isMobile() ? 0.4 : 0.6,
            lineWidth: state.isMobile() ? 2.5 : 3.5,
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
    } catch (error) {
      chartContainer.innerHTML = `<div style='text-align:center;padding:20px;color:red;'>Chart creation failed: ${error.message}</div>`;
      return false;
    }
  },

  async redrawWithDelay() {
    const delay = state.isMobile() ? 300 : 100;
    setTimeout(async () => {
      try {
        await this.create();
      } catch (error) {}
    }, delay);
  },
};

const statisticsUI = {
  async update() {
    if (!state.processedData.series) return;

    const { views, likes, comments, uploads } = state.processedData.series;

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
    }

    stats.forEach(stat => {
      const element = document.getElementById(stat.id);
      if (element) {
        new Odometer({ el: element, value: stat.value }).update(stat.value);
      }
    });
  },
};

const tableManager = {
  async calculateChanges(current, previous, dailyData, index) {
    const calculateChange = (curr, prev) => {
      if (!prev) return '';
      const change = curr - prev;
      const arrow = change < 0 ? '↓' : '';
      const changeString =
        change >= 0 ? `+${change.toLocaleString()}` : change.toLocaleString();
      return `${changeString} ${arrow}`.trim();
    };

    const determineClass = (currentChange, previousChange) => {
      return currentChange > previousChange ? 'positive' : 'negative';
    };

    const result = {};
    ['views', 'likes', 'comments'].forEach(metric => {
      result[metric] = {
        change: previous
          ? calculateChange(current[metric], previous[metric])
          : '',
        class:
          index > 1
            ? determineClass(
                current[metric] - (previous?.[metric] || 0),
                (previous?.[metric] || 0) -
                  (dailyData[index - 2]?.[metric] || 0)
              )
            : '',
      };
    });

    return result;
  },

  async addCurrentDayRow(tableBody, currentDayData, dailyData, useTimestamp) {
    const currentRow = document.createElement('tr');

    const currentDataTime = luxon.DateTime.fromISO(
      useTimestamp ? currentDayData.timestamp : currentDayData.time
    ).setZone('America/New_York');

    const roundedToHour = currentDataTime.set({
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    const currentDate = luxon.DateTime.now().setZone('America/New_York');
    const displayDateTime = currentDate.set({
      hour: roundedToHour.hour,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    const { dateString } = formatters.formatDateTime(displayDateTime);
    const timeString = displayDateTime.toFormat('HH:mm');
    const previousDayData = dailyData[dailyData.length - 1];

    const changes = await this.calculateChanges(
      currentDayData,
      previousDayData,
      dailyData,
      dailyData.length - 1
    );

    currentRow.innerHTML = `
      <td>${dateString}, ${timeString}</td>
      <td>${Math.round(
        currentDayData.views
      ).toLocaleString()} <span class="change ${changes.views.class}">(${
      changes.views.change
    })</span></td>
      <td>${Math.round(
        currentDayData.likes
      ).toLocaleString()} <span class="change ${changes.likes.class}">(${
      changes.likes.change
    })</span></td>
      <td>${Math.round(
        currentDayData.comments
      ).toLocaleString()} <span class="change ${changes.comments.class}">(${
      changes.comments.change
    })</span></td>
    `;

    tableBody.insertBefore(currentRow, tableBody.firstChild);
  },

  async addHistoricalRows(tableBody, dailyData, useTimestamp) {
    for (let index = dailyData.length - 1; index >= 0; index--) {
      const entry = dailyData[index];
      const row = document.createElement('tr');

      const date = luxon.DateTime.fromISO(
        useTimestamp ? entry.timestamp : entry.time
      ).setZone('America/New_York');

      const { dateString } = formatters.formatDateTime(date);
      const changes = await this.calculateChanges(
        entry,
        dailyData[index - 1],
        dailyData,
        index
      );

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

      tableBody.appendChild(row);
    }
  },

  async create(dailyData, currentDayData, useTimestamp = false) {
    const tableBody = document.getElementById('dailyStatsBody');
    tableBody.innerHTML = '';

    const currentDate = currentDayData
      ? luxon.DateTime.fromISO(
          useTimestamp ? currentDayData.timestamp : currentDayData.time
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

    if (currentDayData && currentDate !== lastDailyDate) {
      await this.addCurrentDayRow(
        tableBody,
        currentDayData,
        dailyData,
        useTimestamp
      );
    }

    await this.addHistoricalRows(tableBody, dailyData, useTimestamp);
    document.getElementById('dailyStatsTable').style.display = 'block';
  },
};

const themeManager = {
  async updateIcons(theme) {
    const iconColor = theme === 'light' ? '000000' : 'ffffff';
    document.getElementById(
      'themeIcon'
    ).src = `https://img.icons8.com/material-outlined/24/${iconColor}/contrast.png`;
    document.getElementById(
      'exportIcon'
    ).src = `https://img.icons8.com/material-outlined/24/${iconColor}/download.png`;
  },

  async bindToggleEvent() {
    document
      .getElementById('themeToggle')
      .addEventListener('click', async () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        await this.updateIcons(newTheme);
        await chartManager.redrawWithDelay();
      });
  },

  async initialize() {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', storedTheme);
    await this.updateIcons(storedTheme);
    await this.bindToggleEvent();
  },
};

const searchManager = {
  async handleInput(e) {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.dropdown-list-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(searchTerm) ? '' : 'none';
    });
  },

  async handleClickOutside(e) {
    if (!e.target.closest('.search-bar')) {
      document.getElementById('dropdownList').classList.remove('show');
    }
  },

  async bindSeriesCardEvents() {
    const createFadedColor = hexColor => {
      const hex = hexColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);

      const fadedR = Math.round(r + (255 - r) * 0.2);
      const fadedG = Math.round(g + (255 - g) * 0.2);
      const fadedB = Math.round(b + (255 - b) * 0.2);

      return `rgb(${fadedR}, ${fadedG}, ${fadedB})`;
    };

    const seriesColors = {
      0: createFadedColor(CONFIG.colors.views),
      1: createFadedColor(CONFIG.colors.likes),
      2: createFadedColor(CONFIG.colors.comments),
      3: createFadedColor(CONFIG.colors.uploads),
    };

    document.querySelectorAll('.stat-card').forEach((card, index) => {
      card.addEventListener('click', async () => {
        document.querySelectorAll('.stat-card').forEach(c => {
          c.classList.remove('active');
          c.style.removeProperty('--active-card-color');
        });

        card.classList.add('active');
        card.style.setProperty('--active-card-color', seriesColors[index]);

        state.selectedSeriesIndex = index;
        await chartManager.redrawWithDelay();
      });
    });

    const initialCard =
      document.querySelectorAll('.stat-card')[state.selectedSeriesIndex];
    if (initialCard) {
      initialCard.classList.add('active');
      initialCard.style.setProperty(
        '--active-card-color',
        seriesColors[state.selectedSeriesIndex]
      );
    }
  },

  async bindEvents() {
    const searchInput = document.getElementById('searchInput');
    const dropdownList = document.getElementById('dropdownList');

    searchInput.addEventListener('focus', () =>
      dropdownList.classList.add('show')
    );

    searchInput.addEventListener('input', this.handleInput);
    document.addEventListener('click', this.handleClickOutside);

    await this.bindSeriesCardEvents();
  },

  createChannelOption(channel) {
    const option = document.createElement('div');
    option.classList.add('dropdown-list-item', 'bold');
    option.innerHTML = `
      <div style="display: flex; align-items: center;">
        <img src="${channel.avatar}" alt="${channel.name}" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
        ${channel.name}
      </div>
    `;
    return option;
  },

  async createChannelOptions() {
    const dropdownList = document.getElementById('dropdownList');

    CONFIG.channels.forEach(channel => {
      const option = this.createChannelOption(channel);
      dropdownList.appendChild(option);

      option.addEventListener('click', async () => {
        document.getElementById('searchInput').value = channel.name;
        dropdownList.classList.remove('show');
        await dataLoader.loadChannel(
          channel.endpoint,
          channel.avatar,
          channel.id
        );
      });
    });
  },

  async addVideoOptions(videos) {
    const dropdownList = document.getElementById('dropdownList');

    for (const video of videos) {
      const item = document.createElement('div');
      item.classList.add('dropdown-list-item');
      item.textContent = formatters.addCommasToTitle(video.title);
      item.dataset.videoId = video.videoId;
      dropdownList.appendChild(item);

      item.addEventListener('click', async e => {
        const selectedVideoId = e.currentTarget.dataset.videoId;
        document.getElementById('searchInput').value =
          e.currentTarget.textContent;
        dropdownList.classList.remove('show');
        await dataLoader.loadVideo(selectedVideoId);
      });
    }
  },

  async handleURLParams(videos) {
    const urlParams = new URLSearchParams(window.location.search);
    const videoIdFromUrl = urlParams.get('data');

    const channelMap = CONFIG.channels.reduce((acc, channel) => {
      acc[channel.id] = channel;
      return acc;
    }, {});

    if (channelMap[videoIdFromUrl]) {
      const channel = channelMap[videoIdFromUrl];
      document.getElementById('searchInput').value = channel.name;
      await dataLoader.loadChannel(
        channel.endpoint,
        channel.avatar,
        channel.id
      );
    } else if (videoIdFromUrl) {
      const matchingVideo = videos.find(
        video => video.videoId === videoIdFromUrl
      );
      if (matchingVideo) {
        document.getElementById('searchInput').value =
          formatters.addCommasToTitle(matchingVideo.title);
        await dataLoader.loadVideo(matchingVideo.videoId);
      }
    } else if (videos.length > 0) {
      const mostRecentVideo = videos.sort(
        (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
      )[0];
      document.getElementById('searchInput').value = mostRecentVideo.title;
      await dataLoader.loadVideo(mostRecentVideo.videoId);
    }
  },

  async handleInitialLoad() {
    try {
      const response = await fetch(CONFIG.api.videos);
      const data = await response.json();
      await this.addVideoOptions(data.videos);
      await this.handleURLParams(data.videos);
    } catch (error) {}
  },

  async initialize() {
    await this.bindEvents();
    await this.createChannelOptions();
    await this.handleInitialLoad();
  },
};

const dataLoader = {
  async setupChannelProfile(profileImageUrl) {
    let headerLeft = document.querySelector('.header-left');
    if (!headerLeft) {
      headerLeft = document.createElement('div');
      headerLeft.className = 'header-left';
      const header = document.querySelector('header');
      const h1 = header.querySelector('h1');
      header.insertBefore(headerLeft, h1);
      headerLeft.appendChild(h1);
    }

    const profileImage = await dom.createProfileImage(profileImageUrl);
    headerLeft.insertBefore(profileImage, headerLeft.firstChild);
  },

  async updateVideoInfo(video) {
    const elements = {
      thumbnail: document.getElementById('videoThumbnail'),
      videoLink: document.getElementById('videoLink'),
      uploadDate: document.getElementById('uploadDate'),
      duration: document.getElementById('videoDuration'),
    };

    elements.thumbnail.src = video.thumbnail;
    elements.videoLink.href = `https://www.youtube.com/watch?v=${video.videoId}`;
    elements.videoLink.textContent = formatters.addCommasToTitle(video.title);

    const uploadDate = luxon.DateTime.fromISO(video.uploadTime).setZone(
      'America/New_York'
    );
    elements.uploadDate.textContent = `Uploaded: ${uploadDate.toFormat(
      'M/d/yyyy'
    )} at ${uploadDate.toFormat('h:mm:ss a')} EST`;

    const lastUpdatedDate = luxon.DateTime.fromISO(video.lastUpdated).setZone(
      'America/New_York'
    );
    const lastUpdatedSpan = document.createElement('span');
    lastUpdatedSpan.classList.add('last-updated');
    lastUpdatedSpan.textContent = ` (Stats last updated: ${lastUpdatedDate.toFormat(
      'M/d/yyyy'
    )} at ${lastUpdatedDate.toFormat('h:mm:ss a')} EST)`;
    elements.uploadDate.appendChild(lastUpdatedSpan);

    elements.duration.textContent = `Duration: ${video.stats[0].duration}`;
    const videoIdSpan = document.createElement('span');
    videoIdSpan.classList.add('video-id');
    videoIdSpan.textContent = ` (Video ID: ${video.videoId})`;
    elements.duration.appendChild(videoIdSpan);

    document.getElementById('videoInfoCard').style.display = 'flex';
  },

  async loadChannel(endpoint, profileImageUrl, urlPath) {
    state.reset();
    state.currentVideoId = urlPath;

    document.getElementById('videoInfoCard').style.display = 'none';
    document.querySelector('header h1').textContent = 'Channel Analytics';

    await dom.removeExistingProfileImage();
    await this.setupChannelProfile(profileImageUrl);

    await dom.updateBrowserURL(urlPath);
    document.getElementById('uploadCountCard').style.display = 'flex';
    document.querySelector('.stats-grid').classList.remove('three-columns');

    try {
      const response = await fetch(endpoint);
      const combinedData = await response.json();

      state.rawData = combinedData;
      state.processedData = await dataProcessor.transformRawData(combinedData);

      await chartManager.create();
      await statisticsUI.update();

      const dailyData = await dataProcessor.processDailyData(combinedData);
      const currentDayData = combinedData[combinedData.length - 1];
      await tableManager.create(dailyData, currentDayData);
    } catch (error) {
      document.getElementById('videoChart').innerHTML =
        "<div style='text-align:center;padding:20px;color:red;'>Failed to load data. Please try again.</div>";
    }
  },

  async loadVideo(videoId) {
    state.reset();
    state.currentVideoId = videoId;
    await dom.updateBrowserURL(videoId);

    document.getElementById('uploadCountCard').style.display = 'none';
    document.querySelector('.stats-grid').classList.add('three-columns');
    document.querySelector('header h1').textContent = 'Video Analytics';

    if (state.selectedSeriesIndex === 3) {
      state.selectedSeriesIndex = 0;
    }

    await dom.removeExistingProfileImage();

    try {
      const response = await fetch(CONFIG.api.videoStats + videoId);
      const video = await response.json();

      await this.updateVideoInfo(video);

      const filteredStats = video.stats.filter(
        stat =>
          stat.views != null &&
          stat.views !== 0 &&
          stat.likes != null &&
          stat.likes !== 0 &&
          stat.comments != null &&
          stat.comments !== 0
      );

      state.rawData = filteredStats;

      const processedData = await dataProcessor.transformRawData(filteredStats);
      delete processedData.series.uploads;
      state.processedData = processedData;

      await chartManager.create();
      await statisticsUI.update();

      const dailyData = await dataProcessor.processDailyData(
        filteredStats,
        true
      );
      const currentDayData = filteredStats[filteredStats.length - 1];
      await tableManager.create(dailyData, currentDayData, true);
    } catch (error) {
      document.getElementById('videoChart').innerHTML =
        "<div style='text-align:center;padding:20px;color:red;'>Failed to load video data. Please try again.</div>";
    }
  },
};

const exportManager = {
  async generateCSVContent(timestamps) {
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

  async downloadFile(csvContent, filename) {
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  async handleTableScroll(e) {
    const tableContainer = document.querySelector('.table-responsive');
    if (tableContainer.scrollHeight > tableContainer.clientHeight) {
      e.preventDefault();
      tableContainer.scrollTop += e.deltaY;
    }
  },

  async exportToCSV() {
    if (!state.processedData.timestamps || !state.processedData.series) {
      return;
    }

    const timestamps = state.processedData.timestamps
      .map((timestamp, i) => ({
        date: luxon.DateTime.fromMillis(timestamp)
          .setZone('America/New_York')
          .toJSDate(),
        views: Math.round(state.processedData.series.views[i] || 0),
        likes: Math.round(state.processedData.series.likes[i] || 0),
        comments: Math.round(state.processedData.series.comments[i] || 0),
      }))
      .sort((a, b) => a.date - b.date);

    const csvContent = await this.generateCSVContent(timestamps);
    await this.downloadFile(csvContent, `${state.currentVideoId}.csv`);
  },

  async initialize() {
    document
      .getElementById('exportButton')
      .addEventListener('click', this.exportToCSV);
    document
      .querySelector('.table-responsive')
      .addEventListener('wheel', this.handleTableScroll);
  },
};

const layoutManager = {
  async setupResponsive() {
    const headerControls = document.querySelector('.header-controls');
    const searchBar = document.querySelector('.search-bar');
    const themeToggle = document.getElementById('themeToggle');
    const exportButton = document.getElementById('exportButton');

    const existingMobileButtons = document.querySelector('.mobile-buttons');
    if (existingMobileButtons) {
      existingMobileButtons.remove();
    }

    if (window.innerWidth <= 768) {
      let mobileButtons = document.querySelector('.mobile-buttons');
      if (!mobileButtons) {
        mobileButtons = document.createElement('div');
        mobileButtons.className = 'mobile-buttons';
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

  async bindEvents() {
    window.addEventListener(
      'resize',
      dom.debounce(async () => {
        if (state.chart && state.isChartReady) {
          await chartManager.redrawWithDelay();
        }
      }, 250)
    );

    window.addEventListener('load', this.setupResponsive);
    window.addEventListener('resize', this.setupResponsive);
  },
};

const app = {
  async initialize() {
    await themeManager.initialize();
    await searchManager.initialize();
    await exportManager.initialize();
    await layoutManager.bindEvents();
  },
};

document.addEventListener('DOMContentLoaded', app.initialize);
