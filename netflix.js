const seriesDurationKeywords = ['Season', 'Series', 'Part', 'Volume'];
const seriesContainerClasses = ['bob-card', 'jawBoneOpenContainer', 'jawBonePane'];

//Returns true iff one of the strings in arr is contained in str.
function includesOneOf(str, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (str.includes(arr[i])) return true;
  }
  return false;
};

//Detect opening of show details container (i.e when hovering over the show's thumbnail),
//and inject the chart button.
const observerCallback = function (mutationsList) {
  for (let mutation of mutationsList) {
    for (let element of mutation.addedNodes) {
      const className = element.className;
      if (className && includesOneOf(className, seriesContainerClasses)) {
        setTimeout(() => {
          const duration = element.querySelector('.duration')?.textContent;
          if (!duration || !includesOneOf(duration, seriesDurationKeywords)) {
            //not a series, don't inject button.
            return;
          }
          const buttonContainer = element.querySelector('div[class~="video-meta"]');
          const seriesTitle =
            element.querySelector('.bob-title')?.textContent || element.querySelector('img[class="logo"]')?.alt;
          injectChartButton(seriesTitle, buttonContainer);
        }, 300);
      }
    }
  }
};

const observer = new MutationObserver(observerCallback);
observer.observe(document.body, { childList: true, subtree: true });
