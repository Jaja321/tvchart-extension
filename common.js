const TVCHART_URL = "http://localhost:3000/";

const chartButton = document.createElement('span');
chartButton.className = 'tvchart-button';
chartButton.innerText = '📈';

const tvchartWrapper = document.createElement('div');
tvchartWrapper.id = 'tvchart-wrapper';
const tvchartFrame = document.createElement('iframe');
tvchartFrame.id = 'tvchart-frame';
tvchartFrame.frameBorder = '0';
tvchartWrapper.appendChild(tvchartFrame);

const loadingIcon = document.createElement('img');
loadingIcon.src = chrome.extension.getURL('images/loading.svg');
loadingIcon.className = 'loading-icon';

chartButton.addEventListener('click', () => {
  tvchartWrapper.style.height = '0px';
  titleWrapper.replaceChild(loadingIcon, chartButton);
  document.body.appendChild(tvchartWrapper);
});

window.addEventListener('message', (e) => {
  if (e.data === 'seriesDataLoaded') {
    titleWrapper.replaceChild(chartButton, loadingIcon);
    tvchartWrapper.style.height = '100%';
  }
});

tvchartWrapper.addEventListener('click', () => {
  document.body.removeChild(tvchartWrapper);
});

function setTitle(title) {
  tvchartFrame.src = TVCHART_URL + title;
}