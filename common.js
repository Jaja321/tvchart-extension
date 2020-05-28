const TVCHART_URL = "https://tvchart.benmiz.com/";

const tvchartWrapper = document.createElement('div');
tvchartWrapper.id = 'tvchart-wrapper';
const tvchartFrame = document.createElement('iframe');
tvchartFrame.id = 'tvchart-frame';
tvchartFrame.frameBorder = '0';
tvchartWrapper.appendChild(tvchartFrame);

const loadingIcon = document.createElement('img');
loadingIcon.src = chrome.extension.getURL('images/loading.svg');
loadingIcon.className = 'loading-icon';

tvchartWrapper.addEventListener('click', () => {
  document.body.removeChild(tvchartWrapper);
});

function registerButton(title, button, container) {
  button.addEventListener('click', (e) => {
    tvchartFrame.src = TVCHART_URL + title + "?extension=true";
    tvchartWrapper.style.height = '0px';
    container.replaceChild(loadingIcon, button);
    document.body.appendChild(tvchartWrapper);
  }, true);
  window.addEventListener('message', (e) => {
    if (e.data === 'seriesDataLoaded') {
      container.replaceChild(button, loadingIcon);
      tvchartWrapper.style.height = '100%';
    }
  });
}

function getChartButton() {
  const chartButton = document.createElement('span');
  chartButton.className = 'tvchart-button hint--top hint--rounded hint--info';
  chartButton.setAttribute('aria-label', 'TV Chart');
  chartButton.innerText = '📈';
  return chartButton;
}