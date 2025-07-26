document.addEventListener('DOMContentLoaded', () => {
  const CONFIG = {
    endpoints: {
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
        id: 'beastanimations',
        name: 'Beast Animations',
        endpoint: 'https://api.communitrics.com/combined-history-mb3',
        avatar: 'https://www.banner.yt/UCZzvDDvaYti8Dd8bLEiSoyQ/avatar',
      },
      {
        id: 'mrbeastgaming',
        name: 'MrBeast Gaming',
        endpoint: 'https://api.communitrics.com/combined-history-mbgaming',
        avatar: 'https://www.banner.yt/UCIPPMRA040LQr5QPyJEbmXA/avatar',
      },
      {
        id: 'moremrbeastgaming',
        name: 'More MrBeast Gaming',
        endpoint: 'https://api.communitrics.com/combined-history-mmbg',
        avatar: 'https://www.banner.yt/UCzfPgw5WN9bvMiBz-JJYVyw/avatar',
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
        endpoint:
          'https://api.communitrics.com/combined-history-mbphilanthropy',
        avatar: 'https://www.banner.yt/UCAiLfjNXkNv24uhpzUgPa6A/avatar',
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
      {
        id: 'ryan',
        name: 'Ryan Trahan',
        endpoint: 'https://api.communitrics.com/combined-history-ryan',
        avatar: 'https://www.banner.yt/UCnmGIkw-KdI0W5siakKPKog/avatar',
      },
    ],
    seriesColors: {
      views: '#db421f',
      likes: '#1fb8db',
      comments: '#5bdb1f',
      uploads: '#9f1fdb',
    },
    mobile: {
      breakpoint: 768,
      maxPoints: 1000,
      desktopMaxPoints: 3000,
    },
    responsive: {
      breakpoints: {
        mobile: 480,
        tablet: 768,
        desktop: 1024,
        large: 1280,
      },
      chartHeights: {
        mobile: 280,
        tablet: 350,
        desktop: 400,
        large: 500,
      },
      maxDataPoints: {
        mobile: 500,
        tablet: 1000,
        desktop: 2000,
        large: 3000,
      },
    },
  };

  const AppState = {
    videoChart: null,
    allData: {},
    currentVideoId: 'mrbeast',
    selectedSeriesIndex: 0,

    get currentBreakpoint() {
      const width = window.innerWidth;
      if (width <= CONFIG.responsive.breakpoints.mobile) return 'mobile';
      if (width <= CONFIG.responsive.breakpoints.tablet) return 'tablet';
      if (width <= CONFIG.responsive.breakpoints.desktop) return 'desktop';
      return 'large';
    },

    get isMobile() {
      return this.currentBreakpoint === 'mobile';
    },

    get isTablet() {
      return this.currentBreakpoint === 'tablet';
    },

    get maxPoints() {
      return CONFIG.responsive.maxDataPoints[this.currentBreakpoint];
    },
  };

  const DOM = {
    searchInput: document.getElementById('searchInput'),
    dropdownList: document.getElementById('dropdownList'),
    exportButton: document.getElementById('exportButton'),
    tableContainer: document.querySelector('.table-responsive'),
    themeToggle: document.getElementById('themeToggle'),
    themeIcon: document.getElementById('themeIcon'),
    exportIcon: document.getElementById('exportIcon'),
  };

  const Utils = {
    getCssVar(name) {
      return getComputedStyle(document.body).getPropertyValue(name).trim();
    },

    addCommasToTitle(title) {
      return title.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },

    formatValue(value) {
      if (value >= 1000000000) {
        return (value / 1000000000).toFixed(1) + 'B';
      } else if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
      } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
      }
      return value;
    },

    createProfileImage(src, alt = 'Profile Image') {
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;
      img.classList.add('profile-image');
      return img;
    },

    updateUrl(path) {
      const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?data=${path}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    },

    removeExistingProfileImage() {
      const existing = document.querySelector('header img.profile-image');
      if (existing) existing.remove();
    },
  };

  const ThemeManager = {
    init() {
      const storedTheme = localStorage.getItem('theme') || 'dark';
      document.body.setAttribute('data-theme', storedTheme);
      this.updateIconColors(storedTheme);
      this.bindEvents();
    },

    updateIconColors(theme) {
      const iconColor = theme === 'light' ? '000000' : 'ffffff';
      DOM.themeIcon.src = `https://img.icons8.com/material-outlined/24/${iconColor}/contrast.png`;
      DOM.exportIcon.src = `https://img.icons8.com/material-outlined/24/${iconColor}/download.png`;
    },

    bindEvents() {
      DOM.themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateIconColors(newTheme);
        ChartManager.redrawWithDelay();
      });
    },
  };

  const DataProcessor = {
    downsampleData(timestamps, data) {
      if (!timestamps || !data || timestamps.length !== data.length) {
        return [];
      }

      const length = timestamps.length;

      if (length <= AppState.maxPoints) {
        return this.createDataPoints(timestamps, data, false);
      }

      const step = Math.floor(length / AppState.maxPoints);
      return this.createDataPoints(timestamps, data, step);
    },

    createDataPoints(timestamps, data, step = false) {
      const result = [];
      const length = timestamps.length;

      for (let i = 0; i < length; i += step || 1) {
        const time = new Date(timestamps[i]).getTime();
        const value = data[i];

        if (
          !isNaN(time) &&
          !isNaN(value) &&
          value !== null &&
          value !== undefined
        ) {
          result.push([time, value]);
        }
      }
      return result;
    },

    getDataRange(data) {
      if (!data || data.length === 0) {
        return { min: 0, max: 100 };
      }

      const yValues = data.map(point => point[1]).filter(val => !isNaN(val));
      if (yValues.length === 0) {
        return { min: 0, max: 100 };
      }

      const min = Math.min(...yValues);
      const max = Math.max(...yValues);
      const padding = (max - min) * 0.1 || 10;
      return { min: min - padding, max: max + padding };
    },

    getVisibleDataRange(series, min, max) {
      if (!series || !series.data || series.data.length === 0) {
        return { min: 0, max: 100 };
      }

      const visiblePoints = series.data.filter(point => {
        const x = point[0];
        return x >= min && x <= max;
      });

      if (visiblePoints.length === 0) {
        return { min: series.dataMin || 0, max: series.dataMax || 100 };
      }

      const yValues = visiblePoints
        .map(point => point[1])
        .filter(val => !isNaN(val));
      if (yValues.length === 0) {
        return { min: 0, max: 100 };
      }

      const visibleMin = Math.min(...yValues);
      const visibleMax = Math.max(...yValues);
      const padding = (visibleMax - visibleMin) * 0.1;
      return { min: visibleMin - padding, max: visibleMax + padding };
    },

    processDailyData(data, useTimestamp = false) {
      const dailyData = [];
      let currentDate = null;
      let closestToMidnight = null;
      let firstEntryOfDay = null;

      data.forEach((entry, index) => {
        const entryDate = new Date(useTimestamp ? entry.timestamp : entry.time);
        const entryDateString = entryDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          timeZone: 'America/New_York',
        });

        const entryEasternTime = new Date(
          entryDate.toLocaleString('en-US', { timeZone: 'America/New_York' })
        );
        const millisecondsFromMidnight =
          entryEasternTime.getHours() * 3600000 +
          entryEasternTime.getMinutes() * 60000 +
          entryEasternTime.getSeconds() * 1000 +
          entryEasternTime.getMilliseconds();

        if (entryDateString !== currentDate) {
          if (useTimestamp && firstEntryOfDay) {
            dailyData.push(
              firstEntryOfDay.views < 1000 ? firstEntryOfDay : closestToMidnight
            );
          } else if (!useTimestamp && (closestToMidnight || index === 0)) {
            dailyData.push(closestToMidnight || entry);
          }

          currentDate = entryDateString;
          firstEntryOfDay = entry;
          closestToMidnight = entry;
        } else {
          const closestDate = new Date(
            useTimestamp ? closestToMidnight.timestamp : closestToMidnight.time
          );
          const closestEasternTime = new Date(
            closestDate.toLocaleString('en-US', {
              timeZone: 'America/New_York',
            })
          );
          const closestMillisecondsFromMidnight =
            closestEasternTime.getHours() * 3600000 +
            closestEasternTime.getMinutes() * 60000 +
            closestEasternTime.getSeconds() * 1000 +
            closestEasternTime.getMilliseconds();

          if (millisecondsFromMidnight < closestMillisecondsFromMidnight) {
            closestToMidnight = entry;
          }
        }
      });

      if (useTimestamp && firstEntryOfDay) {
        dailyData.push(
          firstEntryOfDay.views < 1000 ? firstEntryOfDay : closestToMidnight
        );
      } else if (
        !useTimestamp &&
        closestToMidnight &&
        closestToMidnight !== dailyData[dailyData.length - 1]
      ) {
        dailyData.push(closestToMidnight);
      }

      return dailyData;
    },
  };

  const ChartConfigFactory = {
    createSeriesData() {
      const seriesConfig = [
        {
          name: 'Views',
          data: AppState.allData.views,
          visible: AppState.selectedSeriesIndex === 0,
        },
        {
          name: 'Likes',
          data: AppState.allData.likes,
          visible: AppState.selectedSeriesIndex === 1,
        },
        {
          name: 'Comments',
          data: AppState.allData.comments,
          visible: AppState.selectedSeriesIndex === 2,
        },
      ];

      if (AppState.allData.uploads) {
        seriesConfig.push({
          name: 'Uploads',
          data: AppState.allData.uploads,
          visible: AppState.selectedSeriesIndex === 3,
        });
      }

      return seriesConfig.map(config => ({
        name: config.name,
        data: DataProcessor.downsampleData(
          AppState.allData.timestamps,
          config.data
        ),
        color: CONFIG.seriesColors[config.name.toLowerCase()],
        fillColor: this.createGradient(
          CONFIG.seriesColors[config.name.toLowerCase()]
        ),
        visible: config.visible,
        lineWidth: AppState.isMobile ? 2 : 3,
      }));
    },

    createGradient(color) {
      const rgb = this.hexToRgb(color);
      return {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.75)`],
          [1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`],
        ],
      };
    },

    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    },

    getChartEvents(storedInitialRange) {
      return {
        load: function () {
          setTimeout(
            () => {
              this.yAxis[0].setExtremes(
                storedInitialRange.min,
                storedInitialRange.max,
                true
              );
            },
            AppState.isMobile ? 200 : 50
          );
        },
        redraw: function () {
          if (AppState.isMobile) {
            const currentYMin = this.yAxis[0].min;
            const currentYMax = this.yAxis[0].max;

            if (
              Math.abs(currentYMax - storedInitialRange.max) >
              storedInitialRange.max * 0.5
            ) {
              this.yAxis[0].setExtremes(
                storedInitialRange.min,
                storedInitialRange.max,
                false
              );
            }
          }
        },
      };
    },

    getXAxisConfig() {
      return {
        title: {
          text: 'Time (EST)',
          style: {
            color: Utils.getCssVar('--text-color'),
            fontSize: AppState.isMobile ? '12px' : '14px',
          },
        },
        type: 'datetime',
        labels: {
          formatter: function () {
            return luxon.DateTime.fromMillis(this.value, {
              zone: 'America/New_York',
            }).toFormat(
              AppState.isMobile ? 'MM-dd<br>HH:mm' : 'yyyy-MM-dd<br>HH:mm'
            );
          },
          style: {
            color: Utils.getCssVar('--text-color'),
            fontSize: AppState.isMobile ? '10px' : '12px',
          },
          step: AppState.isMobile ? 2 : 1,
        },
        gridLineColor: Utils.getCssVar('--border-color'),
        gridLineWidth: 1,
        tickPositioner: this.getTickPositioner(),
        events: {
          afterSetExtremes: function (e) {
            if (!AppState.isMobile && this.chart && this.chart.series) {
              const activeSeries =
                this.chart.series[AppState.selectedSeriesIndex];
              if (activeSeries && activeSeries.data) {
                const range = DataProcessor.getVisibleDataRange(
                  activeSeries,
                  e.min || this.dataMin,
                  e.max || this.dataMax
                );

                this.chart.yAxis[0].setExtremes(range.min, range.max, true, {
                  duration: 500,
                  easing: 'easeOutCubic',
                });
              }
            }
          },
        },
      };
    },

    getYAxisConfig(initialRange) {
      return {
        title: {
          text: 'Count',
          style: {
            color: Utils.getCssVar('--text-color'),
            fontSize: AppState.isMobile ? '12px' : '14px',
          },
        },
        labels: {
          style: {
            color: Utils.getCssVar('--text-color'),
            fontSize: AppState.isMobile ? '10px' : '12px',
          },
          formatter: function () {
            return Utils.formatValue(this.value);
          },
        },
        gridLineColor: Utils.getCssVar('--border-color'),
        gridLineWidth: 1,
        startOnTick: false,
        endOnTick: false,
        tickAmount: AppState.isMobile ? 4 : 6,
        softThreshold: true,
        minPadding: 0.1,
        maxPadding: 0.1,
        ...(!AppState.isMobile
          ? {
              min: initialRange.min,
              max: initialRange.max,
            }
          : {}),
        events: {
          afterSetExtremes: function (e) {},
        },
      };
    },

    getTickPositioner() {
      return function () {
        const positions = [];
        const min = this.min || this.dataMin;
        const max = this.max || this.dataMax;
        const range = max - min;

        let roundingInterval;
        if (range <= 3600000) {
          roundingInterval = 5 * 60 * 1000;
        } else if (range <= 86400000) {
          roundingInterval = 30 * 60 * 1000;
        } else if (range <= 604800000) {
          roundingInterval = 4 * 3600 * 1000;
        } else {
          roundingInterval = 24 * 3600 * 1000;
        }

        const tickCount = AppState.isMobile ? 4 : 8;
        const interval = range / tickCount;

        for (let i = 0; i <= tickCount; i++) {
          const rawPosition = min + i * interval;
          const roundedPosition =
            Math.round(rawPosition / roundingInterval) * roundingInterval;
          positions.push(roundedPosition);
        }

        return positions;
      };
    },

    getTooltipConfig() {
      return {
        backgroundColor: Utils.getCssVar('--card-background-color'),
        borderColor: Utils.getCssVar('--border-color'),
        style: {
          color: Utils.getCssVar('--text-color'),
          fontSize: AppState.isMobile ? '12px' : '14px',
        },
        formatter: function () {
          let formattedDate = Highcharts.dateFormat('%Y-%m-%d', this.x);
          let formattedTime = Highcharts.dateFormat('%H:%M', this.x) + ':00';
          let tooltipText = `<b>${formattedDate} ${formattedTime}</b><br>`;

          this.points.forEach(point => {
            let label = point.series.name;
            let value = point.y;
            let formattedValue = AppState.isMobile
              ? Utils.formatValue(value)
              : value.toLocaleString();
            tooltipText += `${label}: ${formattedValue}<br>`;
          });

          return tooltipText;
        },
        shared: true,
        useHTML: true,
        borderRadius: 10,
        shadow: true,
        hideDelay: AppState.isMobile ? 1000 : 500,
      };
    },
  };

  const ChartManager = {
    drawChart() {
      this.logDebugInfo();

      if (!this.validateData()) return;

      this.setupContainer();

      const seriesData = ChartConfigFactory.createSeriesData();
      const activeSeries = seriesData[AppState.selectedSeriesIndex];

      if (
        !activeSeries ||
        !activeSeries.data ||
        activeSeries.data.length === 0
      ) {
        document.getElementById('videoChart').innerHTML =
          "<div style='text-align:center;padding:20px;'>No data available for selected series.</div>";
        return;
      }

      const initialRange = DataProcessor.getDataRange(activeSeries.data);
      const storedInitialRange = { ...initialRange };

      this.destroyExistingChart();
      this.createChart(
        seriesData,
        activeSeries,
        initialRange,
        storedInitialRange
      );
    },

    logDebugInfo() {},

    validateData() {
      if (
        !AppState.allData ||
        !AppState.allData.timestamps ||
        AppState.allData.timestamps.length === 0 ||
        !AppState.allData.views ||
        AppState.allData.views.length === 0
      ) {
        document.getElementById('videoChart').innerHTML =
          "<div style='text-align:center;padding:20px;'>Unable to load chart data. Please try again.</div>";
        return false;
      }
      return true;
    },

    setupContainer() {
      const chartContainer = document.getElementById('videoChart');
      const parentContainer = chartContainer.parentElement;

      chartContainer.style.height = '';
      chartContainer.style.minHeight = '';
      parentContainer.style.height = '';
      parentContainer.style.minHeight = '';
    },

    destroyExistingChart() {
      if (AppState.videoChart) {
        try {
          AppState.videoChart.destroy();
        } catch (e) {}
      }
    },

    createChart(seriesData, activeSeries, initialRange, storedInitialRange) {
      try {
        const getChartHeight = () => {
          const width = window.innerWidth;
          if (width <= 480) return 250;
          if (width <= 768) return 300;
          if (width <= 1024) return 350;
          return 400;
        };

        const chartHeight = getChartHeight();

        AppState.videoChart = Highcharts.chart('videoChart', {
          chart: {
            type: 'area',
            backgroundColor: Utils.getCssVar('--card-background-color'),
            style: { fontFamily: "'Poppins', 'Roboto', sans-serif" },
            plotBorderColor: Utils.getCssVar('--border-color'),
            zoomType: 'x',
            panning: true,
            panKey: 'shift',
            animation: AppState.isMobile ? false : { duration: 500 },
            events: ChartConfigFactory.getChartEvents(storedInitialRange),
            height: chartHeight,
            spacingBottom: AppState.isMobile ? 10 : 25,
            spacingTop: AppState.isMobile ? 5 : 20,
            spacingLeft: AppState.isMobile ? 5 : 20,
            spacingRight: AppState.isMobile ? 5 : 20,
          },
          boost: { enabled: false },
          title: {
            text: activeSeries.name,
            style: {
              color: Utils.getCssVar('--text-color'),
              fontWeight: 'bold',
              fontSize: AppState.isMobile ? '14px' : '20px',
            },
            margin: AppState.isMobile ? 10 : 25,
          },
          credits: { enabled: false },
          xAxis: ChartConfigFactory.getXAxisConfig(),
          yAxis: ChartConfigFactory.getYAxisConfig(initialRange),
          series: seriesData,
          legend: { enabled: false },
          tooltip: ChartConfigFactory.getTooltipConfig(),
          plotOptions: {
            series: {
              animation: AppState.isMobile ? false : { duration: 300 },
              marker: {
                enabled: false,
                states: {
                  hover: { enabled: true, radius: AppState.isMobile ? 2 : 3 },
                },
              },
              states: { hover: { lineWidthPlus: 0 } },
              turboThreshold: AppState.isMobile ? 500 : 1000,
              cropThreshold: AppState.isMobile ? 250 : 500,
            },
            area: { fillOpacity: AppState.isMobile ? 0.3 : 0.5 },
          },
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 480,
                },
                chartOptions: {
                  chart: {
                    height: 250,
                    spacingBottom: 10,
                    spacingTop: 5,
                    spacingLeft: 5,
                    spacingRight: 5,
                  },
                  title: {
                    style: {
                      fontSize: '14px',
                    },
                    margin: 10,
                  },
                },
              },
              {
                condition: {
                  maxWidth: 768,
                },
                chartOptions: {
                  chart: {
                    height: 300,
                  },
                },
              },
            ],
          },
        });

        this.finalizeChart(storedInitialRange);
      } catch (error) {
        document.getElementById(
          'videoChart'
        ).innerHTML = `<div style='text-align:center;padding:20px;color:red;'>Chart creation failed: ${error.message}</div>`;
      }
    },

    finalizeChart(storedInitialRange) {
      if (AppState.isMobile) {
        setTimeout(() => {
          if (
            AppState.videoChart &&
            AppState.videoChart.yAxis &&
            AppState.videoChart.yAxis[0]
          ) {
            const currentRange = {
              min: AppState.videoChart.yAxis[0].min,
              max: AppState.videoChart.yAxis[0].max,
            };

            if (
              Math.abs(currentRange.max - storedInitialRange.max) >
              storedInitialRange.max * 0.5
            ) {
              AppState.videoChart.yAxis[0].setExtremes(
                storedInitialRange.min,
                storedInitialRange.max,
                true
              );
            }
          }
        }, 500);
      }
    },

    redrawWithDelay() {
      const delay = AppState.isMobile ? 300 : 100;
      setTimeout(() => {
        try {
          this.drawChart();
        } catch (error) {}
      }, delay);
    },
  };

  const StatsManager = {
    update(views, likes, comments, uploads) {
      const stats = [
        { id: 'totalViews', value: views[views.length - 1] || 0 },
        { id: 'totalLikes', value: likes[likes.length - 1] || 0 },
        { id: 'totalComments', value: comments[comments.length - 1] || 0 },
      ];

      if (uploads) {
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

  const TableManager = {
    createDailyTable(dailyData, currentDayData, useTimestamp = false) {
      const tableBody = document.getElementById('dailyStatsBody');
      tableBody.innerHTML = '';

      if (currentDayData) {
        this.addCurrentDayRow(
          tableBody,
          currentDayData,
          dailyData,
          useTimestamp
        );
      }

      this.addHistoricalRows(tableBody, dailyData, useTimestamp);
      document.getElementById('dailyStatsTable').style.display = 'block';
    },

    addCurrentDayRow(tableBody, currentDayData, dailyData, useTimestamp) {
      const currentRow = document.createElement('tr');
      const currentDate = new Date(
        useTimestamp ? currentDayData.timestamp : currentDayData.time
      );

      const { dateString, timeString } = this.formatDateTime(currentDate, true);
      const previousDayData = dailyData[dailyData.length - 1];

      const changes = this.calculateChanges(
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

    addHistoricalRows(tableBody, dailyData, useTimestamp) {
      for (let index = dailyData.length - 1; index >= 0; index--) {
        const entry = dailyData[index];
        const row = document.createElement('tr');
        const date = new Date(useTimestamp ? entry.timestamp : entry.time);

        if (useTimestamp) date.setDate(date.getDate() - 1);

        const { dateString } = this.formatDateTime(date);
        const changes = this.calculateChanges(
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

    formatDateTime(date, includeTime = false) {
      const dateString = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'America/New_York',
      });

      const timeString = includeTime
        ? date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'America/New_York',
          })
        : null;

      return { dateString, timeString };
    },

    calculateChanges(current, previous, dailyData, index) {
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
  };

  const SearchManager = {
    init() {
      this.bindEvents();
      this.createChannelOptions();
      this.handleInitialLoad();
    },

    bindEvents() {
      DOM.searchInput.addEventListener('focus', () =>
        DOM.dropdownList.classList.add('show')
      );
      DOM.searchInput.addEventListener('input', this.handleSearch);
      document.addEventListener('click', this.handleClickOutside);
      document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.addEventListener('click', () => {
          AppState.selectedSeriesIndex = index;
          ChartManager.redrawWithDelay();
        });
      });
    },

    handleSearch(e) {
      const searchTerm = e.target.value.toLowerCase();
      document.querySelectorAll('.dropdown-list-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? '' : 'none';
      });
    },

    handleClickOutside(e) {
      if (!e.target.closest('.search-bar')) {
        DOM.dropdownList.classList.remove('show');
      }
    },

    createChannelOptions() {
      CONFIG.channels.forEach(channel => {
        const option = this.createChannelOption(channel);
        DOM.dropdownList.appendChild(option);

        option.addEventListener('click', () => {
          DOM.searchInput.value = channel.name;
          DOM.dropdownList.classList.remove('show');
          DataFetcher.fetchCombinedStats(
            channel.endpoint,
            channel.avatar,
            channel.id
          );
        });
      });
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

    handleInitialLoad() {
      fetch(CONFIG.endpoints.videos)
        .then(response => response.json())
        .then(data => {
          this.addVideoOptions(data.videos);
          this.handleUrlParameter(data.videos);
        });
    },

    addVideoOptions(videos) {
      videos.forEach(video => {
        const item = document.createElement('div');
        item.classList.add('dropdown-list-item');
        item.textContent = Utils.addCommasToTitle(video.title);
        item.dataset.videoId = video.videoId;
        DOM.dropdownList.appendChild(item);

        item.addEventListener('click', e => {
          const selectedVideoId = e.currentTarget.dataset.videoId;
          DOM.searchInput.value = e.currentTarget.textContent;
          DOM.dropdownList.classList.remove('show');
          DataFetcher.fetchVideoStats(selectedVideoId);
        });
      });
    },

    handleUrlParameter(videos) {
      const urlParams = new URLSearchParams(window.location.search);
      const videoIdFromUrl = urlParams.get('data');

      const channelMap = CONFIG.channels.reduce((acc, channel) => {
        acc[channel.id] = channel;
        return acc;
      }, {});

      if (channelMap[videoIdFromUrl]) {
        const channel = channelMap[videoIdFromUrl];
        DOM.searchInput.value = channel.name;
        DataFetcher.fetchCombinedStats(
          channel.endpoint,
          channel.avatar,
          channel.id
        );
      } else if (videoIdFromUrl) {
        const matchingVideo = videos.find(
          video => video.videoId === videoIdFromUrl
        );
        if (matchingVideo) {
          DOM.searchInput.value = Utils.addCommasToTitle(matchingVideo.title);
          DataFetcher.fetchVideoStats(matchingVideo.videoId);
        }
      } else if (videos.length > 0) {
        const mostRecentVideo = videos.sort(
          (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
        )[0];
        DOM.searchInput.value = mostRecentVideo.title;
        DataFetcher.fetchVideoStats(mostRecentVideo.videoId);
      }
    },
  };

  const DataFetcher = {
    fetchCombinedStats(endpoint, profileImageUrl, urlPath) {
      AppState.currentVideoId = urlPath;
      document.getElementById('videoInfoCard').style.display = 'none';
      document.querySelector('header h1').textContent = 'Channel Analytics';

      Utils.removeExistingProfileImage();

      let headerLeft = document.querySelector('.header-left');
      if (!headerLeft) {
        headerLeft = document.createElement('div');
        headerLeft.className = 'header-left';
        const header = document.querySelector('header');
        const h1 = header.querySelector('h1');
        header.insertBefore(headerLeft, h1);
        headerLeft.appendChild(h1);
      }

      const profileImage = Utils.createProfileImage(profileImageUrl);
      headerLeft.insertBefore(profileImage, headerLeft.firstChild);

      Utils.updateUrl(urlPath);
      document.getElementById('uploadCountCard').style.display = 'flex';
      document.querySelector('.stats-grid').classList.remove('three-columns');

      fetch(endpoint)
        .then(response => response.json())
        .then(combinedData => {
          AppState.allData = {
            timestamps: combinedData.map(entry => new Date(entry.time)),
            views: combinedData.map(entry => entry.views),
            likes: combinedData.map(entry => entry.likes),
            comments: combinedData.map(entry => entry.comments),
            uploads: combinedData.map(entry => entry.uploadCount),
          };

          setTimeout(() => ChartManager.drawChart(), 50);
          StatsManager.update(
            AppState.allData.views,
            AppState.allData.likes,
            AppState.allData.comments,
            AppState.allData.uploads
          );

          const dailyData = DataProcessor.processDailyData(combinedData);
          const currentDayData = combinedData[combinedData.length - 1];
          TableManager.createDailyTable(dailyData, currentDayData);
        });
    },

    fetchVideoStats(videoId) {
      AppState.currentVideoId = videoId;
      Utils.updateUrl(videoId);

      document.getElementById('uploadCountCard').style.display = 'none';
      document.querySelector('.stats-grid').classList.add('three-columns');
      document.querySelector('header h1').textContent = 'Video Analytics';

      if (AppState.selectedSeriesIndex === 3) {
        AppState.selectedSeriesIndex = 0;
      }

      Utils.removeExistingProfileImage();

      fetch(CONFIG.endpoints.videoStats + videoId)
        .then(response => response.json())
        .then(video => {
          this.updateVideoInfo(video);

          const filteredStats = video.stats.filter(
            stat =>
              stat.views != null &&
              stat.views !== 0 &&
              stat.likes != null &&
              stat.likes !== 0 &&
              stat.comments != null &&
              stat.comments !== 0
          );

          AppState.allData = {
            timestamps: filteredStats.map(stat => new Date(stat.timestamp)),
            views: filteredStats.map(stat => Math.round(stat.views)),
            likes: filteredStats.map(stat => Math.round(stat.likes)),
            comments: filteredStats.map(stat => Math.round(stat.comments)),
          };

          setTimeout(() => ChartManager.drawChart(), 50);
          StatsManager.update(
            AppState.allData.views,
            AppState.allData.likes,
            AppState.allData.comments
          );

          const dailyData = DataProcessor.processDailyData(filteredStats, true);
          const currentDayData = filteredStats[filteredStats.length - 1];
          TableManager.createDailyTable(dailyData, currentDayData, true);
        });
    },

    updateVideoInfo(video) {
      const videoInfoCard = document.getElementById('videoInfoCard');
      const elements = {
        thumbnail: document.getElementById('videoThumbnail'),
        videoLink: document.getElementById('videoLink'),
        uploadDate: document.getElementById('uploadDate'),
        duration: document.getElementById('videoDuration'),
      };

      elements.thumbnail.src = video.thumbnail;
      elements.videoLink.href = `https://www.youtube.com/watch?v=${video.videoId}`;
      elements.videoLink.textContent = Utils.addCommasToTitle(video.title);

      const uploadDate = new Date(video.uploadTime);
      elements.uploadDate.textContent = `Uploaded on: ${uploadDate.toLocaleDateString()} at ${uploadDate.toLocaleTimeString()}`;

      const lastUpdatedDate = new Date(video.lastUpdated);
      const lastUpdatedSpan = document.createElement('span');
      lastUpdatedSpan.classList.add('last-updated');
      lastUpdatedSpan.textContent = ` (Stats last updated: ${lastUpdatedDate.toLocaleDateString()} at ${lastUpdatedDate.toLocaleTimeString()})`;
      elements.uploadDate.appendChild(lastUpdatedSpan);

      elements.duration.textContent = `Duration: ${video.stats[0].duration}`;
      const videoIdSpan = document.createElement('span');
      videoIdSpan.classList.add('video-id');
      videoIdSpan.textContent = ` (Video ID: ${video.videoId})`;
      elements.duration.appendChild(videoIdSpan);

      videoInfoCard.style.display = 'flex';
    },
  };

  const ExportManager = {
    init() {
      DOM.exportButton.addEventListener('click', () => this.exportData());
      DOM.tableContainer.addEventListener('wheel', e =>
        this.handleTableScroll(e)
      );
    },

    exportData() {
      if (!AppState.allData || !AppState.allData.timestamps) {
        return;
      }

      const timestamps = AppState.allData.timestamps
        .map((t, i) => ({
          date: new Date(t),
          views: Math.round(AppState.allData.views[i]),
          likes: Math.round(AppState.allData.likes[i]),
          comments: Math.round(AppState.allData.comments[i]),
        }))
        .sort((a, b) => a.date - b.date);

      const csvContent = this.generateCSV(timestamps);
      this.downloadCSV(csvContent, `${AppState.currentVideoId}.csv`);
    },

    generateCSV(timestamps) {
      const start = new Date(timestamps[0].date);
      start.setMinutes(0, 0, 0);
      const end = new Date(timestamps[timestamps.length - 1].date);
      end.setMinutes(0, 0, 0);

      const fullRange = [];
      const currentTime = new Date(start);

      while (currentTime <= end) {
        fullRange.push(new Date(currentTime));
        currentTime.setHours(currentTime.getHours() + 1);
      }

      const dataMap = new Map();
      timestamps.forEach(entry => {
        const hourKey = entry.date.toISOString().slice(0, 13);
        dataMap.set(hourKey, entry);
      });

      let csvContent =
        'data:text/csv;charset=utf-8,Timestamp,Views,Likes,Comments\n';

      fullRange.forEach(time => {
        const hourKey = time.toISOString().slice(0, 13);
        const entry = dataMap.get(hourKey);

        if (entry) {
          csvContent += `${time.toISOString()},${entry.views},${entry.likes},${
            entry.comments
          }\n`;
        } else {
          csvContent += `${time.toISOString()},,,\n`;
        }
      });

      return csvContent;
    },

    downloadCSV(csvContent, filename) {
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    handleTableScroll(e) {
      if (DOM.tableContainer.scrollHeight > DOM.tableContainer.clientHeight) {
        e.preventDefault();
        DOM.tableContainer.scrollTop += e.deltaY;
      }
    },
  };

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function createResponsiveLayout() {
    const headerControls = document.querySelector('.header-controls');
    const themeToggle = document.getElementById('themeToggle');
    const exportButton = document.getElementById('exportButton');
    const searchBar = document.querySelector('.search-bar');

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
  }

  window.addEventListener(
    'resize',
    debounce(() => {
      if (AppState.videoChart) {
        ChartManager.redrawWithDelay();
      }
    }, 250)
  );

  window.addEventListener('load', createResponsiveLayout);
  window.addEventListener('resize', createResponsiveLayout);

  ThemeManager.init();
  SearchManager.init();
  ExportManager.init();
});
