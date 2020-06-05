const TVCHART_URL = 'http://localhost:3000/';

const tvchartWrapper = document.createElement('div');
tvchartWrapper.id = 'tvchart-wrapper';
const tvchartFrame = document.createElement('iframe');
tvchartFrame.id = 'tvchart-frame';
tvchartFrame.frameBorder = '0';
tvchartWrapper.appendChild(tvchartFrame);

const loadingIcon = document.createElement('img');
loadingIcon.src = chrome.extension.getURL('assets/loading.svg');
loadingIcon.className = 'loading-icon';

tvchartWrapper.addEventListener('click', () => {
  document.body.removeChild(tvchartWrapper);
});

function registerButton(title, button, container) {
  button.addEventListener(
    'click',
    (e) => {
      tvchartFrame.src = TVCHART_URL + title + '?extension=true';
      tvchartWrapper.style.height = '0px';
      container.replaceChild(loadingIcon, button);
      document.body.appendChild(tvchartWrapper);
    },
    true
  );
  const messageHandler = (e) => {
    const msg = e.data;
    if (msg === 'seriesDataLoaded') {
      tvchartWrapper.style.height = '100%';
    }
    if (container.contains(loadingIcon)) {
      container.replaceChild(button, loadingIcon);
    }
  };
  window.addEventListener('message', messageHandler);
}

window.addEventListener('message', (e) => {
  const msg = e.data;
  if (msg === 'close') {
    document.body.removeChild(tvchartWrapper);
  } else if (msg.startsWith('Error:')) {
    console.log(msg.split(':')[1]);
    toast("Couldn't retrieve user rating data.");
  }
});

function getChartButton() {
  const chartButton = document.createElement('span');
  chartButton.className = 'tvchart-button hint--top hint--rounded hint--info';
  chartButton.setAttribute('aria-label', 'User ratings chart');
  chartButton.innerText = '📈';
  return chartButton;
}

function toast(message) {
  const toast = document.createElement('div');
  toast.className = 'tvchart-toast';
  const toastMessage = document.createElement('span');
  toastMessage.className = 'tvchart-toast-message';
  toastMessage.textContent = message;
  toast.appendChild(toastMessage);
  document.body.appendChild(toast);
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 3500);
}
