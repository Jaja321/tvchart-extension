const targetNode = document.body;

const config = { childList: true, subtree: true };

const callback = function (mutationsList) {
  for (let mutation of mutationsList) {
    for (let element of mutation.addedNodes) {
      const className = element.className;
      if (
        (className && className.includes('bob-card')) ||
        className.includes('jawBoneOpenContainer') ||
        className.includes('jawBonePane')
      ) {
        setTimeout(() => {
          const duration = element.querySelector('.duration')?.textContent;
          if (!duration || !duration.includes('Season') && !duration.includes('Series') && !duration.includes('Parts')) {
            //not a series.
            return;
          }
          const chartButton = getChartButton();
          const buttonContainer = element.querySelector('div[class~="video-meta"]');
          buttonContainer.appendChild(chartButton);
          const title = element.querySelector('.bob-title')?.textContent || element.querySelector('img[class="logo"]')?.alt;
          registerButton(title, chartButton, buttonContainer);
  
        }, 300);
      }
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
