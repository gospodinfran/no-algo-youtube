chrome.runtime.onInstalled.addListener(() => {
  chrome.action.chrome.action.setBadgeText({
    text: 'OFF',
  });
});

const yt_url = 'https://youtube.com/';

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(yt_url)) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === 'ON') {
      await chrome.scripting.insertCSS({
        files: ['injection.css'],
        target: { tabId: tab.id },
      });
    } else if (nextState === 'OFF') {
      await chrome.scripting.removeCSS({
        files: ['injection.css'],
        target: { tabId: tab.id },
      });
    }
  }
});
