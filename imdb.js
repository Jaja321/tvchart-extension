const isSeries = document.body.querySelector("a[title='See more release dates']").innerText.startsWith('TV Series');

const imdbTitleWrapper = document.getElementsByClassName('title_wrapper')[0];
const title = imdbTitleWrapper.querySelector('h1');
const titleWrapper = document.createElement('div');
titleWrapper.className = 'tvchart-title-wrapper';
titleWrapper.appendChild(title.cloneNode(true));
titleWrapper.appendChild(chartButton);
imdbTitleWrapper.replaceChild(titleWrapper, title);

setTitle(title.innerText.split('\xa0')[0]);