function getParmsFromURL(url) {
    var parms = {}, pieces, parts, i;
    var hash = url.lastIndexOf("#");
    if (hash !== -1) {
        // remove hash value
        url = url.slice(0, hash);
    }
    var question = url.lastIndexOf("?");
    if (question !== -1) {
        url = url.slice(question + 1);
        pieces = url.split("&");
        for (i = 0; i < pieces.length; i++) {
            parts = pieces[i].split("=");
            if (parts.length < 2) {
                parts.push("");
            }
            parms[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        }
    }
    return parms;
}
