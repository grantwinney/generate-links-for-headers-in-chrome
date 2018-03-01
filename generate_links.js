// Copies the link to the clipboard and displays a small colored box so you know something happened
var copyFunc = function copyHeaderLinkToClipboard(event, text) {
    if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        document.body.appendChild(textarea);
        textarea.select();
        var svgElement = (event.target.tagName === "A") ? event.target.childNodes[0] : event.target;
        try {
            document.execCommand("copy");
            svgElement.style.border = "1px solid rgba(0,200,0,1)";
            return true;
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            setTimeout(function() { svgElement.style.border = "1px solid rgba(255,0,0,0)"; }, 750);
            document.body.removeChild(textarea);
        }
    }
    return false;
};

// Inject the above function into the current page
var script = document.createElement('script');
script.textContent = copyFunc;
(document.head||document.documentElement).appendChild(script);

// Select all anchors with a valid ID value
var selector = 'h1[id]:not([id=""]), h2[id]:not([id=""]), h3[id]:not([id=""]), h4[id]:not([id=""]), h5[id]:not([id=""]), h6[id]:not([id=""])';  // , a[name]:not([name=""])
var anchors = document.querySelectorAll(selector);

// The 'chain' SVG element
var chainsvg = "M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 " +
               "4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 " +
               "1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z";

// Rebuild the URL, omitting any existing anchors
var baseUrl = location.protocol + '//' + location.host + location.pathname + location.search + '#';

// Iterate through the anchors, adding a link to the left of each one
anchors.forEach(function(anchor) {
    var url = baseUrl + anchor.getAttribute("id");
    var link = '<a onclick="copyHeaderLinkToClipboard(event, \'' + url + '\')" href="javascript:;" title="Copy link to clipboard"><svg height="16" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="' + chainsvg + '"></path></svg></a>';
    anchor.innerHTML = '<div class="glfh_headerContainer"><div class="glfh_linkContainer">' + link + '</div><div class="glfh_textContainer">' + anchor.innerHTML + '</div></div>';
});
