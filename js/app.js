(function() {
    data = [
        {key: 1, position: [{top: '40%', left: '40%'}]},
        {key: 2, position: [{top: '10%', left: '10%'}, {top: '70%', left: '70%'}]},
        {key: 3, position: [{top: '10%', left: '10%'}, {top: '40%', left: '40%'}, {top: '70%', left: '70%'}]},
        {key: 4, position: [{top: '10%', left: '10%'}, {top: '70%', left: '10%'}, {top: '10%', left: '70%'}, {top: '70%', left: '70%'}]},
        {key: 5, position: [{top: '10%', left: '10%'}, {top: '70%', left: '10%'}, {top: '40%', left: '40%'}, {top: '10%', left: '70%'}, {top: '70%', left: '70%'}]},
        {key: 6, position: [{top: '10%', left: '10%'}, {top: '40%', left: '10%'}, {top: '70%', left: '10%'}, {top: '10%', left: '70%'}, {top: '40%', left: '70%'}, {top: '70%', left: '70%'}]}

    ];

    function Domino() {}

    var def = Domino.prototype;

    def.createContainer = function() {
        var container = document.createElement('div'),
            divider = document.createElement('div');

        container.style.transform = "rotate(0deg)";
        container.setAttribute('draggable', true);

        divider.setAttribute('class', 'divider');

        container.appendChild(def.createUpperSide());
        container.appendChild(divider);
        container.appendChild(def.createDownSide());
        container.setAttribute('id', 'container');
        document.body.appendChild(container);

        def.addListeners();
    };

    def.getEl = function(id) {
        return document.getElementById(id);
    };

    def.addListeners = function() {
        var container = def.getEl('container');

        def.getEl('moveToRightBtn').addEventListener('click', this.moveToRight);
        def.getEl('moveToLeftBtn').addEventListener('click', this.moveToLeft);
        def.getEl('resetBtn').addEventListener('click', this.reset);
        container.addEventListener("dragstart", this.drag, false);
        document.body.addEventListener("drop", this.drop);
        document.body.addEventListener("dragover", this.allowDrop);
    };

    def.drop = function(e) {
        var offset = e.dataTransfer.getData("text/plain").split(','),
            container = def.getEl('container');

        container.style.left = (e.clientX + parseInt(offset[0],10)) + 'px';
        container.style.top = (e.clientY + parseInt(offset[1],10)) + 'px';
        e.preventDefault();
        return false;
    };

    def.allowDrop = function(e) {
        e.preventDefault();
        return false;
    };
    def.drag = function(e) {
        var style = window.getComputedStyle(event.target, null);

        e.dataTransfer.setData("text/plain",
            (parseInt(style.getPropertyValue("left"),10) - e.clientX + 100) + ','

                + (parseInt(style.getPropertyValue("top"),10) - e.clientY + 100));
    };


    def.createDownSide = function() {
        var count = def.getRandom(),
            data = def.getData(count),
            downSide = document.createElement('div');

        downSide.setAttribute('id', 'downSide');

        if (data) {
            for (var i=0; i<data.position.length; i++) {
                var cycle = document.createElement('div');
                cycle.setAttribute('class', 'cycle');
                cycle.style.top = data.position[i].top;
                cycle.style.left = data.position[i].left;
                downSide.appendChild(cycle)
            }
        }
        return downSide;
    };

    def.createUpperSide = function() {
        var count = def.getRandom(),
            data = def.getData(count),
            upperSide = document.createElement('div');

        upperSide.setAttribute('id', 'upperSide');

        if (data) {
            for (var i=0; i<data.position.length; i++) {
                var cycle = document.createElement('div');
                cycle.setAttribute('class', 'cycle');
                cycle.style.top = data.position[i].top;
                cycle.style.left = data.position[i].left;
                upperSide.appendChild(cycle)
            }
        }
        return upperSide;
    };

    def.getData = function(count) {
        if (count) {
            for (var i=0; i<=data.length; i++) {
                if (count == data[i].key) {
                    return data[i];
                }
            }
        }
    };

    def.getRandom = function() {
        return Math.floor(Math.random() * 6);
    };

    def.getRotateValue = function() {
        var el = def.getEl('container'),
            st = window.getComputedStyle(el, null),
            tr = st.getPropertyValue("transform"),
            values = tr.split('(')[1].split(')')[0].split(','),
            a = values[0],
            b = values[1];

        return Math.round(Math.atan2(b, a) * (180/Math.PI));
    };

    def.moveToRight = function() {
        var rotate = def.getRotateValue(),
            el = def.getEl('container'),
            deg = rotate + 90;

        el.style.transform = "rotate(" + deg + "deg) ";
    };

    def.moveToLeft = function() {
        var rotate = def.getRotateValue(),
            el = def.getEl('container'),
            deg = rotate + 90;

        el.style.transform = "rotate(" + deg + "deg) ";
    };

    def.reset = function() {
        var container = def.getEl('container'),
            upperSide = def.getEl('upperSide'),
            downSide = def.getEl('downSide');

        container.removeChild(upperSide);
        container.removeChild(downSide);
        container.appendChild(def.createUpperSide());
        container.appendChild(def.createDownSide());
    };

    var domino = new Domino();

    window.onload = domino.createContainer();

})();


