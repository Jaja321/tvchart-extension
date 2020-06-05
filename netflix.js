const config = { childList: true, subtree: true };
const seriesDurationKeywords = ['Season', 'Series', 'Part', 'Volume'];
const seriesContainerClassKeywords = ['bob-card', 'jawBoneOpenContainer', 'jawBonePane'];

const includesOneOf = (str, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (str.includes(arr[i])) return true;
  }
  return false;
};

const callback = function (mutationsList) {
  for (let mutation of mutationsList) {
    for (let element of mutation.addedNodes) {
      const className = element.className;
      if (className && includesOneOf(className, seriesContainerClassKeywords)) {
        setTimeout(() => {
          const duration = element.querySelector('.duration')?.textContent;
          if (!duration || !includesOneOf(duration, seriesDurationKeywords)) {
            //not a series.
            return;
          }
          const chartButton = getChartButton();
          const buttonContainer = element.querySelector('div[class~="video-meta"]');
          buttonContainer.appendChild(chartButton);
          const title =
            element.querySelector('.bob-title')?.textContent || element.querySelector('img[class="logo"]')?.alt;
          registerButton(title, chartButton, buttonContainer);
        }, 300);
      }
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(document.body, config);
