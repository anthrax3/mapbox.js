var url = {};

url.HTTP_URLS = [
    'http://a.tiles.mapbox.com/v3/',
    'http://b.tiles.mapbox.com/v3/',
    'http://c.tiles.mapbox.com/v3/',
    'http://d.tiles.mapbox.com/v3/'];

url.HTTPS_URLS = [];

url.idUrl = function(_, t) {
    if (_.indexOf('/') == -1) t.loadID(_);
    else t.loadURL(_);
};

// Return the base url of a specific version of MapBox's API.
//
// `hash`, if provided must be a number and is used to distribute requests
// against multiple `CNAME`s in order to avoid connection limits in browsers
url.base = function(hash) {
    // By default, use public HTTP urls
    var urls = url.HTTP_URLS;

    // Support HTTPS if the user has specified HTTPS urls to use, and this
    // page is under HTTPS
    if (window.location.protocol === 'https:' && url.HTTPS_URLS.length) {
        urls = url.HTTPS_URLS;
    }

    console.log(urls);

    if (hash === undefined || typeof hash !== 'number') {
        return urls[0];
    } else {
        return urls[hash % urls.length];
    }
};

module.exports = url;
