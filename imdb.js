const isSeries = document.body.querySelector("a[title='See more release dates']").innerText.startsWith('TV');

if(isSeries) {
  const imdbTitleWrapper = document.getElementsByClassName('title_wrapper')[0]; //handle other pages i.e. this doesn't exist
  const title = imdbTitleWrapper.querySelector('h1');
  const titleWrapper = document.createElement('div');
  titleWrapper.className = 'tvchart-title-wrapper';
  titleWrapper.appendChild(title.cloneNode(true));
  const chartButton = getChartButton();
  chartButton.style.fontSize = "20px";
  titleWrapper.appendChild(chartButton);
  imdbTitleWrapper.replaceChild(titleWrapper, title);
  registerButton(title.innerText.split('\xa0')[0], chartButton, titleWrapper);
}
