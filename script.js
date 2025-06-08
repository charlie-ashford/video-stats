document.addEventListener('DOMContentLoaded', () => {
  const apiEndpoint = 'https://api.communitrics.com/videos/all';
  const combinedEndpoint = 'https://api.communitrics.com/combined-history';
  const mrbeast2Endpoint = 'https://api.communitrics.com/combined-history-mb2';
  const mrbeastphilanthropyEndpoint =
    'https://api.communitrics.com/combined-history-mbphilanthropy';
  const mrbeastGamingEndpoint =
    'https://api.communitrics.com/combined-history-mbgaming';
  const moreMrBeastGamingEndpoint =
    'https://api.communitrics.com/combined-history-mmbg';
  const mrbeastReactsEndpoint =
    'https://api.communitrics.com/combined-history-mbreacts';
  const cocomelonEndpoint =
    'https://api.communitrics.com/combined-history-cocomelon';
  const ronaldoEndpoint =
    'https://api.communitrics.com/combined-history-ronaldo';
  const taylorEndpoint = 'https://api.communitrics.com/combined-history-taylor';
  const ryanEndpoint = 'https://api.communitrics.com/combined-history-ryan';
  const searchInput = document.getElementById('searchInput');
  const dropdownList = document.getElementById('dropdownList');
  const exportButton = document.getElementById('exportButton');
  const tableContainer = document.querySelector('.table-responsive');
  let videoChart;
  let allData = {};
  let currentVideoId = 'mrbeast';
  let selectedSeriesIndex = 0;

  const storedTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', storedTheme);

  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const exportIcon = document.getElementById('exportIcon');

  function updateIconColors(theme) {
    if (theme === 'light') {
      themeIcon.src =
        'https://img.icons8.com/material-outlined/24/000000/contrast.png';
      exportIcon.src =
        'https://img.icons8.com/material-outlined/24/000000/download.png';
    } else {
      themeIcon.src =
        'https://img.icons8.com/material-outlined/24/ffffff/contrast.png';
      exportIcon.src =
        'https://img.icons8.com/material-outlined/24/ffffff/download.png';
    }
  }

  document.body.setAttribute('data-theme', storedTheme);

  updateIconColors(storedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    updateIconColors(newTheme);
    setTimeout(() => {
      drawChart();
    });
  });
  searchInput.addEventListener('focus', () => {
    dropdownList.classList.add('show');
  });

  searchInput.addEventListener('input', e => {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.dropdown-list-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(searchTerm) ? '' : 'none';
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-bar')) {
      dropdownList.classList.remove('show');
    }
  });

  tableContainer.addEventListener('wheel', function (e) {
    if (tableContainer.scrollHeight > tableContainer.clientHeight) {
      e.preventDefault();
      tableContainer.scrollTop += e.deltaY;
    }
  });

  const combinedOption = document.createElement('div');
  combinedOption.classList.add('dropdown-list-item', 'bold');
  combinedOption.innerHTML = `
    <div style="display: flex; align-items: center;">
      <img src="https://www.banner.yt/UCX6OQ3DkcsbYNE6H8uQQuVA/avatar" alt="MrBeast" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
      MrBeast
    </div>
  `;
  dropdownList.appendChild(combinedOption);

  combinedOption.addEventListener('click', () => {
    searchInput.value = 'MrBeast';
    dropdownList.classList.remove('show');
    fetchCombinedStats(
      combinedEndpoint,
      'https://www.banner.yt/UCX6OQ3DkcsbYNE6H8uQQuVA/avatar',
      'mrbeast'
    );
  });

  const mrbeast2Option = document.createElement('div');
  mrbeast2Option.classList.add('dropdown-list-item', 'bold');
  mrbeast2Option.innerHTML = `
    <div style="display: flex; align-items: center;">
      <img src="https://www.banner.yt/UC4-79UOlP48-QNGgCko5p2g/avatar" alt="MrBeast 2" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
      MrBeast 2
    </div>
  `;
  dropdownList.appendChild(mrbeast2Option);

  mrbeast2Option.addEventListener('click', () => {
    searchInput.value = 'MrBeast 2';
    dropdownList.classList.remove('show');
    fetchCombinedStats(
      mrbeast2Endpoint,
      'https://www.banner.yt/UC4-79UOlP48-QNGgCko5p2g/avatar',
      'mrbeast2'
    );
  });

  const mrbeastGamingOption = document.createElement('div');
  mrbeastGamingOption.classList.add('dropdown-list-item', 'bold');
  mrbeastGamingOption.innerHTML = `
    <div style="display: flex; align-items: center;">
      <img src="https://www.banner.yt/UCIPPMRA040LQr5QPyJEbmXA/avatar" alt="MrBeast Gaming" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
      MrBeast Gaming
    </div>
  `;
  dropdownList.appendChild(mrbeastGamingOption);

  mrbeastGamingOption.addEventListener('click', () => {
    searchInput.value = 'MrBeast Gaming';
    dropdownList.classList.remove('show');
    fetchCombinedStats(
      mrbeastGamingEndpoint,
      'https://www.banner.yt/UCIPPMRA040LQr5QPyJEbmXA/avatar',
      'mrbeastgaming'
    );
  });

  const moreMrBeastGamingOption = document.createElement('div');
  moreMrBeastGamingOption.classList.add('dropdown-list-item', 'bold');
  moreMrBeastGamingOption.innerHTML = `
    <div style="display: flex; align-items: center;">
      <img src="https://www.banner.yt/UCzfPgw5WN9bvMiBz-JJYVyw/avatar" alt="More MrBeast Gaming" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
      More MrBeast Gaming
    </div>
  `;
  dropdownList.appendChild(moreMrBeastGamingOption);

  moreMrBeastGamingOption.addEventListener('click', () => {
    searchInput.value = 'More MrBeast Gaming';
    dropdownList.classList.remove('show');
    fetchCombinedStats(
      moreMrBeastGamingEndpoint,
      'https://www.banner.yt/UCzfPgw5WN9bvMiBz-JJYVyw/avatar',
      'moremrbeastgaming'
    );
  });

  const mrbeastReactsOption = document.createElement('div');
  mrbeastReactsOption.classList.add('dropdown-list-item', 'bold');
  mrbeastReactsOption.innerHTML = `
    <div style="display: flex; align-items: center;">
      <img src="https://www.banner.yt/UCUaT_39o1x6qWjz7K2pWcgw/avatar" alt="Beast Reacts" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
      Beast Reacts
    </div>
  `;
  dropdownList.appendChild(mrbeastReactsOption);

  mrbeastReactsOption.addEventListener('click', () => {
    searchInput.value = 'Beast Reacts';
    dropdownList.classList.remove('show');
    fetchCombinedStats(
      mrbeastReactsEndpoint,
      'https://www.banner.yt/UCUaT_39o1x6qWjz7K2pWcgw/avatar',
      'mrbeastreacts'
    );
  });

  const mrbeastphilanthropyOption = document.createElement('div');
  mrbeastphilanthropyOption.classList.add('dropdown-list-item', 'bold');
  mrbeastphilanthropyOption.innerHTML = `
    <div style="display: flex; align-items: center;">
      <img src="https://www.banner.yt/UCAiLfjNXkNv24uhpzUgPa6A/avatar" alt="Beast Philanthropy" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
      Beast Philanthropy
    </div>
  `;
  dropdownList.appendChild(mrbeastphilanthropyOption);

  mrbeastphilanthropyOption.addEventListener('click', () => {
    searchInput.value = 'Beast Philanthropy';
    dropdownList.classList.remove('show');
    fetchCombinedStats(
      mrbeastphilanthropyEndpoint,
      'https://www.banner.yt/UCAiLfjNXkNv24uhpzUgPa6A/avatar',
      'mrbeastphilanthropy'
    );
  });

  const cocomelonOption = document.createElement('div');
  cocomelonOption.classList.add('dropdown-list-item', 'bold');
  cocomelonOption.innerHTML = `
    <div style="display: flex; align-items: center;">
      <img src="https://www.banner.yt/UCbCmjCuTUZos6Inko4u57UQ/avatar" alt="Cocomelon - Nursery Rhymes" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
      Cocomelon - Nursery Rhymes
    </div>
  `;
  dropdownList.appendChild(cocomelonOption);

  cocomelonOption.addEventListener('click', () => {
    searchInput.value = 'Cocomelon - Nursery Rhymes';
    dropdownList.classList.remove('show');
    fetchCombinedStats(
      cocomelonEndpoint,
      'https://www.banner.yt/UCbCmjCuTUZos6Inko4u57UQ/avatar',
      'cocomelon'
    );
  });

  const ronaldoOption = document.createElement('div');
  ronaldoOption.classList.add('dropdown-list-item', 'bold');
  ronaldoOption.innerHTML = `
    <div style="display: flex; align-items: center;">
      <img src="https://www.banner.yt/UCtxD0x6AuNNqdXO9Wp5GHew/avatar" alt="UR · Cristiano" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
      UR · Cristiano
    </div>
  `;
  dropdownList.appendChild(ronaldoOption);

  ronaldoOption.addEventListener('click', () => {
    searchInput.value = 'UR · Cristiano';
    dropdownList.classList.remove('show');
    fetchCombinedStats(
      ronaldoEndpoint,
      'https://www.banner.yt/UCtxD0x6AuNNqdXO9Wp5GHew/avatar',
      'ronaldo'
    );
  });

  const taylorOption = document.createElement('div');
  taylorOption.classList.add('dropdown-list-item', 'bold');
  taylorOption.innerHTML = `
    <div style="display: flex; align-items: center;">
      <img src="https://www.banner.yt/UCANLZYMidaCbLQFWXBC95Jg/avatar" alt="Taylor Swift" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
      Taylor Swift
    </div>
  `;
  dropdownList.appendChild(taylorOption);

  taylorOption.addEventListener('click', () => {
    searchInput.value = 'Taylor Swift';
    dropdownList.classList.remove('show');
    fetchCombinedStats(
      taylorEndpoint,
      'https://www.banner.yt/UCANLZYMidaCbLQFWXBC95Jg/avatar',
      'taylor'
    );
  });

  const ryanOption = document.createElement('div');
  ryanOption.classList.add('dropdown-list-item', 'bold');
  ryanOption.innerHTML = `
    <div style="display: flex; align-items: center;">
      <img src="https://www.banner.yt/UCnmGIkw-KdI0W5siakKPKog/avatar" alt="Ryan Trahan" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
      Ryan Trahan
    </div>
  `;
  dropdownList.appendChild(ryanOption);

  ryanOption.addEventListener('click', () => {
    searchInput.value = 'Ryan Trahan';
    dropdownList.classList.remove('show');
    fetchCombinedStats(
      ryanEndpoint,
      'https://www.banner.yt/UCnmGIkw-KdI0W5siakKPKog/avatar',
      'ryan'
    );
  });

  const urlParams = new URLSearchParams(window.location.search);
  const videoIdFromUrl = urlParams.get('data');

  fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      const videos = data.videos;

      function addCommasToTitle(title) {
        return title.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      }

      videos.forEach(video => {
        const item = document.createElement('div');
        item.classList.add('dropdown-list-item');
        item.textContent = addCommasToTitle(video.title);
        item.dataset.videoId = video.videoId;
        dropdownList.appendChild(item);

        item.addEventListener('click', e => {
          const selectedVideoId = e.currentTarget.dataset.videoId;
          searchInput.value = e.currentTarget.textContent;
          dropdownList.classList.remove('show');
          fetchVideoStats(selectedVideoId);
        });
      });

      if (videoIdFromUrl === 'mrbeast') {
        searchInput.value = 'MrBeast';
        fetchCombinedStats(
          combinedEndpoint,
          'https://www.banner.yt/UCX6OQ3DkcsbYNE6H8uQQuVA/avatar',
          'mrbeast'
        );
      } else if (videoIdFromUrl === 'mrbeast2') {
        searchInput.value = 'MrBeast 2';
        fetchCombinedStats(
          mrbeast2Endpoint,
          'https://www.banner.yt/UC4-79UOlP48-QNGgCko5p2g/avatar',
          'mrbeast2'
        );
      } else if (videoIdFromUrl === 'mrbeastgaming') {
        searchInput.value = 'MrBeast Gaming';
        fetchCombinedStats(
          mrbeastGamingEndpoint,
          'https://www.banner.yt/UCIPPMRA040LQr5QPyJEbmXA/avatar',
          'mrbeastgaming'
        );
      } else if (videoIdFromUrl === 'mrbeastreacts') {
        searchInput.value = 'Beast Reacts';
        fetchCombinedStats(
          mrbeastReactsEndpoint,
          'https://www.banner.yt/UCUaT_39o1x6qWjz7K2pWcgw/avatar',
          'mrbeastreacts'
        );
      } else if (videoIdFromUrl === 'mrbeastphilanthropy') {
        searchInput.value = 'Beast Philanthropy';
        fetchCombinedStats(
          mrbeastphilanthropyEndpoint,
          'https://www.banner.yt/UCAiLfjNXkNv24uhpzUgPa6A/avatar',
          'mrbeastphilanthropy'
        );
      } else if (videoIdFromUrl === 'moremrbeastgaming') {
        searchInput.value = 'More MrBeast Gaming';
        fetchCombinedStats(
          moreMrBeastGamingEndpoint,
          'https://www.banner.yt/UCzfPgw5WN9bvMiBz-JJYVyw/avatar',
          'moremrbeastgaming'
        );
      } else if (videoIdFromUrl === 'cocomelon') {
        searchInput.value = 'Cocomelon - Nursery Rhymes';
        fetchCombinedStats(
          cocomelonEndpoint,
          'https://www.banner.yt/UCbCmjCuTUZos6Inko4u57UQ/avatar',
          'cocomelon'
        );
      } else if (videoIdFromUrl === 'ronaldo') {
        searchInput.value = 'UR · Cristiano';
        fetchCombinedStats(
          ronaldoEndpoint,
          'https://www.banner.yt/UCtxD0x6AuNNqdXO9Wp5GHew/avatar',
          'ronaldo'
        );
      } else if (videoIdFromUrl === 'taylor') {
        searchInput.value = 'Taylor Swift';
        fetchCombinedStats(
          taylorEndpoint,
          'https://www.banner.yt/UCANLZYMidaCbLQFWXBC95Jg/avatar',
          'taylor'
        );
      } else if (videoIdFromUrl === 'ryan') {
        searchInput.value = 'Ryan Trahan';
        fetchCombinedStats(
          ryanEndpoint,
          'https://www.banner.yt/UCnmGIkw-KdI0W5siakKPKog/avatar',
          'ryan'
        );
      } else if (videoIdFromUrl) {
        const matchingVideo = videos.find(
          video => video.videoId === videoIdFromUrl
        );
        if (matchingVideo) {
          searchInput.value = addCommasToTitle(matchingVideo.title);
          fetchVideoStats(matchingVideo.videoId);
        } else {
          console.error('Video ID from URL not found in the list of videos.');
        }
      } else if (videos.length > 0) {
        const mostRecentVideo = videos.sort(
          (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
        )[0];
        searchInput.value = mostRecentVideo.title;
        fetchVideoStats(mostRecentVideo.videoId);
      }
    });

  function fetchCombinedStats(endpoint, profileImageUrl, urlPath) {
    currentVideoId = urlPath;
    document.getElementById('videoInfoCard').style.display = 'none';
    document.querySelector('header h1').textContent = 'Channel Analytics';

    const existingProfileImage = document.querySelector(
      'header img.profile-image'
    );
    if (existingProfileImage) {
      existingProfileImage.remove();
    }

    const combinedProfileImage = document.createElement('img');
    combinedProfileImage.src = profileImageUrl;
    combinedProfileImage.alt = 'Profile Image';
    combinedProfileImage.style.width = '60px';
    combinedProfileImage.style.height = '60px';
    combinedProfileImage.style.borderRadius = '50%';
    combinedProfileImage.style.marginRight = '-150px';
    combinedProfileImage.classList.add('profile-image');

    const header = document.querySelector('header');
    header.insertBefore(combinedProfileImage, header.firstChild);

    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?data=${urlPath}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    document.getElementById('uploadCountCard').style.display = 'flex';

    fetch(endpoint)
      .then(response => response.json())
      .then(combinedData => {
        const timestamps = combinedData.map(entry => new Date(entry.time));
        const views = combinedData.map(entry => entry.views);
        const likes = combinedData.map(entry => entry.likes);
        const comments = combinedData.map(entry => entry.comments);
        const uploads = combinedData.map(entry => entry.uploadCount);

        allData = { timestamps, views, likes, comments, uploads };

        setTimeout(() => {
          drawChart();
        }, 50);
        updateStats(
          allData.views,
          allData.likes,
          allData.comments,
          allData.uploads
        );

        const dailyData = processDailyData(combinedData);
        const currentDayData = combinedData[combinedData.length - 1];

        createDailyTable(dailyData, currentDayData);

        document.getElementById('dailyStatsTable').style.display = 'block';
      });
  }

  function processDailyData(data) {
    const dailyData = [];
    let currentDate = null;
    let closestToMidnight = null;

    data.forEach((entry, index) => {
      const entryDate = new Date(entry.time);

      const entryDateString = entryDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'America/New_York',
      });

      const entryEasternTime = new Date(
        entryDate.toLocaleString('en-US', {
          timeZone: 'America/New_York',
        })
      );

      const millisecondsFromMidnight =
        entryEasternTime.getHours() * 3600000 +
        entryEasternTime.getMinutes() * 60000 +
        entryEasternTime.getSeconds() * 1000 +
        entryEasternTime.getMilliseconds();

      if (entryDateString !== currentDate) {
        if (closestToMidnight || index === 0) {
          dailyData.push(closestToMidnight || entry);
        }
        currentDate = entryDateString;
        closestToMidnight = entry;
      } else {
        const closestDate = new Date(closestToMidnight.time);
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

    if (
      closestToMidnight &&
      closestToMidnight !== dailyData[dailyData.length - 1]
    ) {
      dailyData.push(closestToMidnight);
    }

    return dailyData;
  }

  function processDailyDataForVideo(data) {
    const dailyData = [];
    let currentDate = null;
    let closestToMidnight = null;
    let firstEntryOfDay = null;

    data.forEach(entry => {
      const entryDate = new Date(entry.timestamp);
      const entryDateString = entryDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'America/New_York',
      });

      const entryEasternTime = new Date(
        entryDate.toLocaleString('en-US', {
          timeZone: 'America/New_York',
        })
      );

      const millisecondsFromMidnight =
        entryEasternTime.getHours() * 3600000 +
        entryEasternTime.getMinutes() * 60000 +
        entryEasternTime.getSeconds() * 1000 +
        entryEasternTime.getMilliseconds();

      if (entryDateString !== currentDate) {
        if (firstEntryOfDay) {
          if (firstEntryOfDay.views < 1000) {
            dailyData.push(firstEntryOfDay);
          } else if (closestToMidnight) {
            dailyData.push(closestToMidnight);
          }
        }
        currentDate = entryDateString;
        firstEntryOfDay = entry;
        closestToMidnight = entry;
      } else {
        const closestDate = new Date(closestToMidnight.timestamp);
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

    if (firstEntryOfDay) {
      if (firstEntryOfDay.views < 1000) {
        dailyData.push(firstEntryOfDay);
      } else if (closestToMidnight) {
        dailyData.push(closestToMidnight);
      }
    }

    return dailyData;
  }

  function createDailyTableForVideo(dailyData, currentDayData) {
    const tableBody = document.getElementById('dailyStatsBody');
    tableBody.innerHTML = '';

    const calculateChange = (current, previous) => {
      const change = current - previous;
      const arrow = change < 0 ? '↓' : '';
      const changeString =
        change >= 0 ? `+${change.toLocaleString()}` : change.toLocaleString();
      return `${changeString} ${arrow}`.trim();
    };

    const determineClass = (currentChange, previousChange) => {
      return currentChange > previousChange ? 'positive' : 'negative';
    };

    if (currentDayData) {
      const currentRow = document.createElement('tr');
      const currentDate = new Date(currentDayData.timestamp);

      const timeString = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/New_York',
      });

      const dateString = currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'America/New_York',
      });

      const previousDayData = dailyData[dailyData.length - 1];
      const viewsChange = calculateChange(
        currentDayData.views,
        previousDayData.views
      );
      const likesChange = calculateChange(
        currentDayData.likes,
        previousDayData.likes
      );
      const commentsChange = calculateChange(
        currentDayData.comments,
        previousDayData.comments
      );

      const viewsClass = determineClass(
        currentDayData.views - previousDayData.views,
        previousDayData.views - (dailyData[dailyData.length - 2]?.views || 0)
      );
      const likesClass = determineClass(
        currentDayData.likes - previousDayData.likes,
        previousDayData.likes - (dailyData[dailyData.length - 2]?.likes || 0)
      );
      const commentsClass = determineClass(
        currentDayData.comments - previousDayData.comments,
        previousDayData.comments -
          (dailyData[dailyData.length - 2]?.comments || 0)
      );

      currentRow.innerHTML = `
      <td>${dateString}, ${timeString}</td>
      <td>${Math.round(
        currentDayData.views
      ).toLocaleString()} <span class="change ${viewsClass}" data-change="${viewsChange}">(${viewsChange})</span></td>
      <td>${Math.round(
        currentDayData.likes
      ).toLocaleString()} <span class="change ${likesClass}" data-change="${likesChange}">(${likesChange})</span></td>
      <td>${Math.round(
        currentDayData.comments
      ).toLocaleString()} <span class="change ${commentsClass}" data-change="${commentsChange}">(${commentsChange})</span></td>
    `;

      tableBody.insertBefore(currentRow, tableBody.firstChild);
    }

    for (let index = dailyData.length - 1; index >= 0; index--) {
      const entry = dailyData[index];
      const row = document.createElement('tr');
      const date = new Date(entry.timestamp);

      date.setDate(date.getDate() - 1);
      const dateString = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'America/New_York',
      });

      const viewsChange =
        index > 0
          ? calculateChange(entry.views, dailyData[index - 1].views)
          : '';
      const likesChange =
        index > 0
          ? calculateChange(entry.likes, dailyData[index - 1].likes)
          : '';
      const commentsChange =
        index > 0
          ? calculateChange(entry.comments, dailyData[index - 1].comments)
          : '';

      const viewsClass =
        index > 1
          ? determineClass(
              entry.views - dailyData[index - 1].views,
              dailyData[index - 1].views - dailyData[index - 2].views
            )
          : '';
      const likesClass =
        index > 1
          ? determineClass(
              entry.likes - dailyData[index - 1].likes,
              dailyData[index - 1].likes - dailyData[index - 2].likes
            )
          : '';
      const commentsClass =
        index > 1
          ? determineClass(
              entry.comments - dailyData[index - 1].comments,
              dailyData[index - 1].comments - dailyData[index - 2].comments
            )
          : '';

      row.innerHTML = `
      <td>${dateString}</td>
      <td>${Math.round(
        entry.views
      ).toLocaleString()} <span class="change ${viewsClass}" data-change="${viewsChange}">(${viewsChange})</span></td>
      <td>${Math.round(
        entry.likes
      ).toLocaleString()} <span class="change ${likesClass}" data-change="${likesChange}">(${likesChange})</span></td>
      <td>${Math.round(
        entry.comments
      ).toLocaleString()} <span class="change ${commentsClass}" data-change="${commentsChange}">(${commentsChange})</span></td>
    `;

      tableBody.appendChild(row);
    }
  }

  function createDailyTable(dailyData, currentDayData) {
    const tableBody = document.getElementById('dailyStatsBody');
    tableBody.innerHTML = '';

    const calculateChange = (current, previous) => {
      const change = current - previous;
      const arrow = change < 0 ? '↓' : '';
      const changeString =
        change >= 0 ? `+${change.toLocaleString()}` : change.toLocaleString();
      return `${changeString} ${arrow}`.trim();
    };

    const determineClass = (currentChange, previousChange) => {
      return currentChange > previousChange ? 'positive' : 'negative';
    };

    if (currentDayData) {
      const currentRow = document.createElement('tr');
      const currentDate = new Date(currentDayData.time);

      const timeString = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/New_York',
      });

      const dateString = currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'America/New_York',
      });

      const previousDayData = dailyData[dailyData.length - 1];
      const viewsChange = calculateChange(
        currentDayData.views,
        previousDayData.views
      );
      const likesChange = calculateChange(
        currentDayData.likes,
        previousDayData.likes
      );
      const commentsChange = calculateChange(
        currentDayData.comments,
        previousDayData.comments
      );

      const viewsClass = determineClass(
        currentDayData.views - previousDayData.views,
        previousDayData.views - (dailyData[dailyData.length - 2]?.views || 0)
      );
      const likesClass = determineClass(
        currentDayData.likes - previousDayData.likes,
        previousDayData.likes - (dailyData[dailyData.length - 2]?.likes || 0)
      );
      const commentsClass = determineClass(
        currentDayData.comments - previousDayData.comments,
        previousDayData.comments -
          (dailyData[dailyData.length - 2]?.comments || 0)
      );

      currentRow.innerHTML = `
      <td>${dateString}, ${timeString}</td>
      <td>${Math.round(
        currentDayData.views
      ).toLocaleString()} <span class="change ${viewsClass}" data-change="${viewsChange}">(${viewsChange})</span></td>
      <td>${Math.round(
        currentDayData.likes
      ).toLocaleString()} <span class="change ${likesClass}" data-change="${likesChange}">(${likesChange})</span></td>
      <td>${Math.round(
        currentDayData.comments
      ).toLocaleString()} <span class="change ${commentsClass}" data-change="${commentsChange}">(${commentsChange})</span></td>
    `;

      tableBody.insertBefore(currentRow, tableBody.firstChild);
    }

    for (let index = dailyData.length - 1; index >= 0; index--) {
      const entry = dailyData[index];
      const row = document.createElement('tr');
      const date = new Date(entry.time);

      date.setDate(date.getDate() - 1);
      const dateString = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'America/New_York',
      });

      const viewsChange =
        index > 0
          ? calculateChange(entry.views, dailyData[index - 1].views)
          : '';
      const likesChange =
        index > 0
          ? calculateChange(entry.likes, dailyData[index - 1].likes)
          : '';
      const commentsChange =
        index > 0
          ? calculateChange(entry.comments, dailyData[index - 1].comments)
          : '';

      const viewsClass =
        index > 1
          ? determineClass(
              entry.views - dailyData[index - 1].views,
              dailyData[index - 1].views - dailyData[index - 2].views
            )
          : '';
      const likesClass =
        index > 1
          ? determineClass(
              entry.likes - dailyData[index - 1].likes,
              dailyData[index - 1].likes - dailyData[index - 2].likes
            )
          : '';
      const commentsClass =
        index > 1
          ? determineClass(
              entry.comments - dailyData[index - 1].comments,
              dailyData[index - 1].comments - dailyData[index - 2].comments
            )
          : '';

      row.innerHTML = `
      <td>${dateString}</td>
      <td>${Math.round(
        entry.views
      ).toLocaleString()} <span class="change ${viewsClass}" data-change="${viewsChange}">(${viewsChange})</span></td>
      <td>${Math.round(
        entry.likes
      ).toLocaleString()} <span class="change ${likesClass}" data-change="${likesChange}">(${likesChange})</span></td>
      <td>${Math.round(
        entry.comments
      ).toLocaleString()} <span class="change ${commentsClass}" data-change="${commentsChange}">(${commentsChange})</span></td>
    `;

      tableBody.appendChild(row);
    }
  }

  function fetchVideoStats(videoId) {
    function addCommasToTitle(title) {
      return title.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    currentVideoId = videoId;
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?data=${videoId}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    document.getElementById('uploadCountCard').style.display = 'none';
    document.querySelector('header h1').textContent = 'Video Analytics';

    if (selectedSeriesIndex === 3) {
      selectedSeriesIndex = 0;
    }

    const existingProfileImage = document.querySelector(
      'header img.profile-image'
    );
    if (existingProfileImage) {
      existingProfileImage.remove();
    }

    const videoStatsEndpoint = `https://api.communitrics.com/videostats/${videoId}`;

    fetch(videoStatsEndpoint)
      .then(response => response.json())
      .then(video => {
        const videoInfoCard = document.getElementById('videoInfoCard');
        const thumbnailElement = document.getElementById('videoThumbnail');
        const videoLinkElement = document.getElementById('videoLink');
        const uploadDateElement = document.getElementById('uploadDate');
        const durationElement = document.getElementById('videoDuration');

        thumbnailElement.src = video.thumbnail;
        videoLinkElement.href = `https://www.youtube.com/watch?v=${video.videoId}`;
        videoLinkElement.textContent = addCommasToTitle(video.title);

        const uploadDate = new Date(video.uploadTime);
        uploadDateElement.textContent = `Uploaded on: ${uploadDate.toLocaleDateString()} at ${uploadDate.toLocaleTimeString()}`;

        const lastUpdatedDate = new Date(video.lastUpdated);
        const lastUpdatedSpan = document.createElement('span');
        lastUpdatedSpan.classList.add('last-updated');
        lastUpdatedSpan.textContent = ` (Stats last updated: ${lastUpdatedDate.toLocaleDateString()} at ${lastUpdatedDate.toLocaleTimeString()})`;
        uploadDateElement.appendChild(lastUpdatedSpan);

        durationElement.textContent = `Duration: ${video.stats[0].duration}`;
        const videoIdSpan = document.createElement('span');
        videoIdSpan.classList.add('video-id');
        videoIdSpan.textContent = ` (Video ID: ${video.videoId})`;
        durationElement.appendChild(videoIdSpan);

        videoInfoCard.style.display = 'flex';
        const filteredStats = video.stats.filter(
          stat =>
            stat.views != null &&
            stat.views !== 0 &&
            stat.likes != null &&
            stat.likes !== 0 &&
            stat.comments != null &&
            stat.comments !== 0
        );

        const timestamps = filteredStats.map(stat => new Date(stat.timestamp));
        const views = filteredStats.map(stat => Math.round(stat.views));
        const likes = filteredStats.map(stat => Math.round(stat.likes));
        const comments = filteredStats.map(stat => Math.round(stat.comments));

        allData = { timestamps, views, likes, comments };
        setTimeout(() => {
          drawChart();
        }, 50);
        updateStats(views, likes, comments);

        const dailyData = processDailyDataForVideo(filteredStats);
        const currentDayData = filteredStats[filteredStats.length - 1];

        createDailyTableForVideo(dailyData, currentDayData);
        document.getElementById('dailyStatsTable').style.display = 'block';
      });
  }

  function getCssVar(name) {
    return getComputedStyle(document.body).getPropertyValue(name).trim();
  }

  function drawChart() {
    if (
      !allData ||
      !allData.timestamps ||
      allData.timestamps.length === 0 ||
      !allData.views ||
      allData.views.length === 0
    ) {
      console.error('Invalid data for chart rendering');
      document.getElementById('videoChart').innerHTML =
        "<div style='text-align:center;padding:20px;'>Unable to load chart data. Please try again.</div>";
      return;
    }
    const MAX_POINTS = window.innerWidth < 768 ? 1000 : 3000;

    if (!allData || !allData.timestamps || allData.timestamps.length === 0) {
      console.error('No data available to draw the chart.');
      return;
    }

    if (videoChart) {
      videoChart.destroy();
    }

    function downsampleData(timestamps, data) {
      const length = timestamps.length;

      function convertToEasternTime(timestamp) {
        const utcDate = new Date(Date.parse(timestamp + 'Z'));
        return new Date(
          utcDate.toLocaleString('en-US', {
            timeZone: 'America/New_York',
          })
        ).getTime();
      }

      if (length <= MAX_POINTS) {
        return timestamps.map((t, i) => [convertToEasternTime(t), data[i]]);
      }

      const step = Math.floor(length / MAX_POINTS);
      const sampledData = [];
      for (let i = 0; i < length; i += step) {
        sampledData.push([convertToEasternTime(timestamps[i]), data[i]]);
      }
      return sampledData;
    }

    function getVisibleDataRange(series, min, max) {
      const visiblePoints = series.data.filter(point => {
        const x = point[0];
        return x >= min && x <= max;
      });

      if (visiblePoints.length === 0) {
        return { min: series.dataMin, max: series.dataMax };
      }

      const yValues = visiblePoints.map(point => point[1]);
      const visibleMin = Math.min(...yValues);
      const visibleMax = Math.max(...yValues);
      const padding = (visibleMax - visibleMin) * 0.1;
      return {
        min: visibleMin - padding,
        max: visibleMax + padding,
      };
    }

    function getInitialDataRange(data) {
      const yValues = data.map(point => point[1]);
      const min = Math.min(...yValues);
      const max = Math.max(...yValues);
      const padding = (max - min) * 0.1;
      return {
        min: min - padding,
        max: max + padding,
      };
    }

    const seriesData = [
      {
        name: 'Views',
        data: downsampleData(allData.timestamps, allData.views),
        color: '#db421f',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(219, 65, 31, 0.75)'],
            [1, 'rgba(219, 65, 31, 0.15)'],
          ],
        },
        visible: selectedSeriesIndex === 0,
        lineWidth: 3,
      },
      {
        name: 'Likes',
        data: downsampleData(allData.timestamps, allData.likes),
        color: '#1fb8db',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(31, 185, 219, 0.75)'],
            [1, 'rgba(31, 185, 219, 0.15)'],
          ],
        },
        visible: selectedSeriesIndex === 1,
        lineWidth: 3,
      },
      {
        name: 'Comments',
        data: downsampleData(allData.timestamps, allData.comments),
        color: '#5bdb1f',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(91, 219, 31, 0.75)'],
            [1, 'rgba(91, 219, 31, 0.15)'],
          ],
        },
        visible: selectedSeriesIndex === 2,
        lineWidth: 3,
      },
    ];

    if (allData.uploads) {
      seriesData.push({
        name: 'Uploads',
        data: downsampleData(allData.timestamps, allData.uploads),
        color: '#9f1fdb',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(159, 31, 219, 0.75)'],
            [1, 'rgba(159, 31, 219, 0.15)'],
          ],
        },
        visible: selectedSeriesIndex === 3,
        lineWidth: 3,
      });
    }

    if (selectedSeriesIndex >= seriesData.length) {
      selectedSeriesIndex = 0;
    }

    const initialRange = getInitialDataRange(
      seriesData[selectedSeriesIndex].data
    );

    videoChart = Highcharts.chart('videoChart', {
      chart: {
        type: 'area',
        backgroundColor: getCssVar('--card-background-color'),
        style: {
          fontFamily: "'Poppins', 'Roboto', sans-serif",
        },
        plotBorderColor: 'var(--border-color)',
        zoomType: 'x',
        panning: true,
        panKey: 'shift',
        events: {
          load: function () {
            const activeSeries = this.series[selectedSeriesIndex];
            const range = getInitialDataRange(activeSeries.data);
            this.yAxis[0].setExtremes(range.min, range.max);
          },
        },
        resetZoomButton: {
          position: {
            align: 'right',
            x: -10,
            y: 10,
            verticalAlign: 'top',
          },
          theme: {
            fill: '#3b82f6',
            stroke: '#2563eb',
            strokeWidth: 1,
            r: 4,
            states: {
              hover: {
                fill: '#2563eb',
                stroke: '#1d4ed8',
                style: {
                  color: '#ffffff',
                },
              },
            },
            style: {
              color: '#ffffff',
              fontWeight: '500',
              fontSize: '13px',
              fontFamily: "'Poppins', 'Roboto', sans-serif",
              textTransform: 'uppercase',
              padding: '8px 12px',
            },
            zIndex: 20,
          },
          relativeTo: 'plot',
        },
      },
      title: {
        text:
          selectedSeriesIndex === 0
            ? 'Views'
            : selectedSeriesIndex === 1
            ? 'Likes'
            : selectedSeriesIndex === 2
            ? 'Comments'
            : 'Uploads',
        style: {
          color: getCssVar('--text-color'),
          fontWeight: 'bold',
          fontSize: '20px',
        },
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        title: {
          text: 'Time (EST)',
          style: {
            color: getCssVar('--text-color'),
            fontSize: '14px',
          },
        },
        type: 'datetime',
        labels: {
          formatter: function () {
            return Highcharts.dateFormat('%Y-%m-%d<br>%H:%M', this.value);
          },
          style: {
            color: getCssVar('--text-color'),
            fontSize: '12px',
          },
        },
        gridLineColor: getCssVar('--border-color'),
        gridLineWidth: 1,
        tickPositioner: function () {
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

          const interval = range / 9;

          for (let i = 0; i < 9; i++) {
            const rawPosition = min + i * interval;
            const roundedPosition =
              Math.round(rawPosition / roundingInterval) * roundingInterval;
            positions.push(roundedPosition);
          }

          return positions;
        },
        events: {
          afterSetExtremes: function (e) {
            if (this.chart) {
              const activeSeries = this.chart.series[selectedSeriesIndex];
              const range = getVisibleDataRange(
                activeSeries,
                e.min || this.dataMin,
                e.max || this.dataMax
              );

              this.chart.yAxis[0].setExtremes(range.min, range.max, true, {
                duration: 500,
                easing: 'easeOutCubic',
              });
            }
          },
        },
      },
      yAxis: {
        title: {
          text: 'Count',
          style: {
            color: getCssVar('--text-color'),
            fontSize: '14px',
          },
        },
        labels: {
          style: {
            color: getCssVar('--text-color'),
            fontSize: '12px',
          },
        },
        gridLineColor: getCssVar('--border-color'),
        gridLineWidth: 1,
        startOnTick: false,
        endOnTick: false,
        tickAmount: 8,
        softThreshold: true,
        minPadding: 0.1,
        maxPadding: 0.1,
        min: initialRange.min,
        max: initialRange.max,
        events: {
          afterSetExtremes: function (e) {
            if (!e.userMin && !e.userMax) {
              const activeSeries = this.chart.series[selectedSeriesIndex];
              const range = getVisibleDataRange(
                activeSeries,
                this.chart.xAxis[0].min,
                this.chart.xAxis[0].max
              );
              if (range.min !== range.max) {
                this.update(
                  {
                    min: range.min,
                    max: range.max,
                  },
                  false
                );
              }
            }
          },
        },
      },
      series: seriesData,
      legend: {
        enabled: false,
      },
      tooltip: {
        backgroundColor: getCssVar('--card-background-color'),
        borderColor: getCssVar('--border-color'),
        style: {
          color: getCssVar('--text-color'),
          fontSize: '14px',
        },
        formatter: function () {
          let formattedDate = Highcharts.dateFormat('%Y-%m-%d', this.x);
          let formattedTime = Highcharts.dateFormat('%H:%M', this.x) + ':00';

          let tooltipText = `<b>${formattedDate} ${formattedTime}</b><br>`;

          this.points.forEach(point => {
            let label = point.series.name;
            tooltipText += `${label}: ${point.y.toLocaleString()}<br>`;
          });

          return tooltipText;
        },
        shared: true,
        useHTML: true,
        borderRadius: 10,
        shadow: true,
      },
      plotOptions: {
        series: {
          animaton: false,
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: true,
                radius: 3,
              },
            },
          },
          events: {
            hide: function () {
              updateSelectedSeriesIndex();
            },
            show: function () {
              updateSelectedSeriesIndex();
            },
          },
          states: {
            hover: {
              lineWidthPlus: 0,
            },
          },
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 600,
            },
          },
        ],
      },
      rangeSelector: {
        enabled: false,
      },
      navigator: {
        enabled: false,
      },
      scrollbar: {
        enabled: false,
      },
      resetZoomButton: {
        theme: {
          backgroundColor: getCssVar('--card-background-color'),
          stroke: getCssVar('--border-color'),
          style: {
            color: getCssVar('--text-color'),
          },
          states: {
            hover: {
              fill: getCssVar('--border-color'),
              style: {
                backgroundColor: getCssVar('--card-background-color'),
              },
            },
          },
          r: 4,
        },
        position: {
          align: 'right',
          x: -10,
          y: 10,
        },
      },
    });
  }

  function updateStats(views, likes, comments, uploads) {
    const totalViews = views[views.length - 1] || 0;
    const totalLikes = likes[likes.length - 1] || 0;
    const totalComments = comments[comments.length - 1] || 0;

    const viewsElement = document.getElementById('totalViews');
    const likesElement = document.getElementById('totalLikes');
    const commentsElement = document.getElementById('totalComments');

    new Odometer({
      el: viewsElement,
      value: totalViews,
    }).update(totalViews);

    new Odometer({
      el: likesElement,
      value: totalLikes,
    }).update(totalLikes);

    new Odometer({
      el: commentsElement,
      value: totalComments,
    }).update(totalComments);

    if (uploads) {
      const totalUploads = uploads[uploads.length - 1] || 0;
      const uploadsElement = document.getElementById('totalUploads');

      new Odometer({
        el: uploadsElement,
        value: totalUploads,
      }).update(totalUploads);
    }
  }

  function updateSelectedSeriesIndex() {
    selectedSeriesIndex = videoChart.series.findIndex(series => series.visible);
  }

  function showOnlySelectedSeries(index) {
    selectedSeriesIndex = index;
    setTimeout(() => {
      drawChart();
    }, 50);
  }

  document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.addEventListener('click', () => {
      selectedSeriesIndex = index;
      setTimeout(() => {
        drawChart();
      }, 50);
    });
  });

  exportButton.addEventListener('click', () => {
    if (!allData || !allData.timestamps) {
      console.error('No data available to export.');
      return;
    }

    let timestamps = allData.timestamps.map((t, i) => ({
      date: new Date(t),
      views: Math.round(allData.views[i]),
      likes: Math.round(allData.likes[i]),
      comments: Math.round(allData.comments[i]),
    }));

    timestamps.sort((a, b) => a.date - b.date);

    let start = new Date(timestamps[0].date);
    start.setMinutes(0, 0, 0);
    let end = new Date(timestamps[timestamps.length - 1].date);
    end.setMinutes(0, 0, 0);

    let fullRange = [];
    let currentTime = new Date(start);

    while (currentTime <= end) {
      fullRange.push(new Date(currentTime));
      currentTime.setHours(currentTime.getHours() + 1);
    }

    let dataMap = new Map();
    timestamps.forEach(entry => {
      let hourKey = entry.date.toISOString().slice(0, 13);
      dataMap.set(hourKey, entry);
    });

    let csvContent =
      'data:text/csv;charset=utf-8,Timestamp,Views,Likes,Comments\n';

    fullRange.forEach(time => {
      let hourKey = time.toISOString().slice(0, 13);
      let entry = dataMap.get(hourKey);

      if (entry) {
        csvContent += `${time.toISOString()},${entry.views},${entry.likes},${
          entry.comments
        }\n`;
      } else {
        csvContent += `${time.toISOString()},,,\n`;
      }
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${currentVideoId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
