"use strict";

(function() {
    var count = 0,
        data = [],
        event = new CustomEvent("myEvent", {bubbles: true});

    function createDomino() {
        var domino = new Domino(data, event);
        domino.build(count++);
    }
    function getDataFromJSON() {
        var xhr = new XMLHttpRequest(),
            url = 'data.json',
            method = 'Get';

        xhr.open(method, url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            }
            else {
                data = JSON.parse(xhr.responseText);
                new Panel();
                document.getElementById('addBtn').addEventListener('click', createDomino);
            }
        };
    }

    window.addEventListener("load", getDataFromJSON);
})();
