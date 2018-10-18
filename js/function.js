function maxValue(data, type) {
    return d3.max(data, function(d) {
        // body...
        switch (type) {
            case "sta_ph_v":
                return d.sta_ph_v;
                break;
            case "sta_do_v":
                return d.sta_do_v;
                break;
            case "sta_an_v":
                return d.sta_an_v;
                break;
            case "sta_toc_v":
                return d.sta_toc_v;
                break;
            case "sta_pp_v":
                return d.sta_pp_v;
                break;
        }
    });
}

function minValue(data, type) {
    return d3.min(data, function(d) {
        // body...
        switch (type) {
            case "sta_ph_v":
                return d.sta_ph_v;
                break;
            case "sta_do_v":
                return d.sta_do_v;
                break;
            case "sta_an_v":
                return d.sta_an_v;
                break;
            case "sta_toc_v":
                return d.sta_toc_v;
                break;
            case "sta_pp_v":
                return d.sta_pp_v;
                break;
        }
    });
}

function unique(array) {
    var res = [];
    for (var i = 0, len = array.length; i < len; i++) {
        var current = array[i];
        if (res.indexOf(current) === -1) {
            res.push(current)
        }
    }
    return res;
}

$(document).ready(function() {
    // body...
    $('[data-toggle="fullscreentips"]').tooltip();
});

function enterfullscreen() {
    var docElm = document.documentElement;
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    document.getElementById("fullscreen").src = "../img/fullscreen-exit.png";
}

function exitfullscreen() { //退出全屏
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    document.getElementById("fullscreen").src = "../img/fullscreen.png";
}

function fullscreen() {
    // body...
    var imgSource = document.getElementById("fullscreen").src;
    console.log(imgSource);
    if (imgSource == 'file:///C:/Users/Dream/Desktop/Visualization/img/fullscreen.png') {
        enterfullscreen();
    } else {
        exitfullscreen();
    }
}