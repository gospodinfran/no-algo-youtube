const yt = 'https://www.youtube.com/';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url.startsWith(yt) && tab.active) {
    chrome.scripting.insertCSS({
      files: ['search.css'],
      target: { tabId: tab.id },
    });
  }
});
