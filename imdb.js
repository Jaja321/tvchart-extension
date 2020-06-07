const isSeries = document.body.querySelector("a[title='See more release dates']").innerText.startsWith('TV');

if(isSeries) {
  const titleWrapper = document.getElementsByClassName('title_wrapper')[0];
  const originalTitleElement = titleWrapper.querySelector('h1');
  const newTitleElement = document.createElement('div');
  newTitleElement.className = 'tvchart-title-wrapper';
  newTitleElement.appendChild(originalTitleElement.cloneNode(true));
  titleWrapper.replaceChild(newTitleElement, originalTitleElement);
  const seriesTitle =originalTitleElement.innerText.split('\xa0')[0];
  injectChartButton(seriesTitle, newTitleElement, {fontSize: '20px'});
}
