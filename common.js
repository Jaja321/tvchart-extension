const TVCHART_URL = 'https://tvchart.benmiz.com';

//Create overlay
const tvchartOverlay = document.createElement('div');
tvchartOverlay.id = 'tvchart-overlay';
const tvchartFrame = document.createElement('iframe');
tvchartFrame.id = 'tvchart-frame';
tvchartFrame.frameBorder = '0';
tvchartOverlay.appendChild(tvchartFrame);
tvchartOverlay.addEventListener('click', () => {
  document.body.removeChild(tvchartOverlay);
});

//Create loading icon
const loadingIcon = document.createElement('img');
loadingIcon.src = chrome.extension.getURL('assets/loading.svg');
loadingIcon.className = 'loading-icon';

//Handle closing and errors. Messages are sent from the web app.
window.addEventListener('message', (e) => {
  if(e.origin !== TVCHART_URL) {
    return;
  }
  const msg = e.data;
  if (msg === 'close') {
    document.body.removeChild(tvchartOverlay);
  } else if (msg.startsWith('Error:')) {
    console.log(msg.split(':')[1]);
    toast("Rating data not available");
  }
});

function injectChartButton(seriesTitle, buttonContainer, buttonStyle) {
  const chartButton = createChartButton(buttonStyle);
  buttonContainer.appendChild(chartButton);
  chartButton.addEventListener('click',
    () => {
      tvchartFrame.src = `${TVCHART_URL}/${seriesTitle}?extension=true`;
      tvchartOverlay.style.height = '0px';
      buttonContainer.replaceChild(loadingIcon, chartButton);
      document.body.appendChild(tvchartOverlay);
    },
    true
  );
  window.addEventListener('message', (e) => {
    const msg = e.data;
    if (msg === 'seriesDataLoaded') {
      tvchartOverlay.style.height = '100%';
    }
    if (buttonContainer.contains(loadingIcon)) {
      buttonContainer.replaceChild(chartButton, loadingIcon);
    }
  });
}

function createChartButton(buttonStyle) {
  const chartButton = document.createElement('span');
  chartButton.className = 'tvchart-button hint--top hint--rounded hint--info';
  chartButton.setAttribute('aria-label', 'User ratings chart');
  chartButton.innerText = '📈';
  if(buttonStyle) {
    for(prop of Object.keys(buttonStyle)) {
      chartButton.style[prop] = buttonStyle[prop];
    }
  }
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
