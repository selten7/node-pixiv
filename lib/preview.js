const request = require('request').defaults({
  gzip: true,
});

const jsdom = require('jsdom');

function generatePreviewUrl(illustId) {
  if (!Number.isInteger(illustId)) {
    throw new Error('illustId must be integer');
  }
  if (illustId < 0) {
    throw new Error('illustId must be > 0');
  }

  return `http://embed.pixiv.net/decorate.php?illust_id=${illustId}`;
}

function getPreviewUrl(pageUrl) {
  return new Promise((resolve, reject) => {
    request.get(pageUrl, (requestError, response, html) => {
      if (requestError) {
        reject(requestError);

        return;
      }

      jsdom.env({
        html,
        url: pageUrl,
        done: (jsdomError, window) => {
          if (jsdomError) {
            reject(jsdomError);

            return;
          }

          const { document } = window;

          const ogImage = document.querySelector('meta[property="og:image"]');
          const imageUrl = ogImage.getAttribute('content');

          resolve(imageUrl);
        },
      });
    });
  });
}

exports.getPreviewUrl = getPreviewUrl;
exports.generatePreviewUrl = generatePreviewUrl;
