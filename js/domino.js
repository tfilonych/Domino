"use strict";

(function() {
    function Domino(data, event) {
        this.data = data.data;
        this.helper = new Helper(data.combinations);
        this.el = this.helper.createEl('div');
        this.active = false;
        this.event = event;
    }

    Domino.prototype.build = function(id) {
        var helper = this.helper,
            divider = helper.createEl('div'),
            random = helper.getRandom();

        if (random) {
            this.el.style.transform = "rotate(0deg)";
            this.el.setAttribute('draggable', true);
            this.el.setAttribute('class', 'container container_' + id);
            divider.setAttribute('class', 'divider');

            helper.appendChild(this.el, this.createUpperSide(random.x))
                .appendChild(this.el, divider)
                .appendChild(this.el, this.createDownSide(random.y));

            document.getElementById('wrapper').appendChild(this.el);
        } else {
            helper.getEl('addBtn').setAttribute('disabled', 'disabled');
        }
        this.addListeners();
    };

    Domino.prototype.addListeners = function() {
        this.el.addEventListener("dragstart", this.drag.bind(this), false);
        this.el.addEventListener("click", this.elClicked.bind(this), false);
        this.helper.getEl('moveToRightBtn').addEventListener("click", this.moveToRight.bind(this));
        this.helper.getEl('moveToLeftBtn').addEventListener("click", this.moveToLeft.bind(this));
        document.body.addEventListener("myEvent",this.myEventHandler.bind(this),false);
        document.body.addEventListener("drop", this.drop.bind(this, this));
        document.body.addEventListener("dragover", this.allowDrop.bind(this));
    };

    Domino.prototype.createDownSide = function(count) {
        var data = this.getData(count),
            downSide = this.helper.createEl('div');

        downSide.setAttribute('class', 'downSide');

        if (data) {
            for (var i=0; i<data.position.length; i++) {
                var cycle = new Cycle(data.position[i]);
                downSide.appendChild(cycle.el)
            }
        }
        return downSide;
    };
    Domino.prototype.getData = function(count) {
        if (count) {
            for (var i=0; i <= this.data.length; i++) {
                if (count == this.data[i].key) {
                    return this.data[i];
                }
            }
        } else {
            return false;
        }
    };

    Domino.prototype.createUpperSide = function(count) {
        var data = this.getData(count),
            upperSide = this.helper.createEl('div');

        upperSide.setAttribute('class', 'upperSide');

        if (data) {
            for (var i=0; i<data.position.length; i++) {
                var cycle = new Cycle(data.position[i]);
                upperSide.appendChild(cycle.el)
            }
        }
        return upperSide;
    };

    Domino.prototype.moveToRight = function() {
        if (this.active){
            var rotate = this.helper.getRotateValue(this.el),
                deg = rotate + 90;

            this.el.style.transform = "rotate(" + deg + "deg) ";
        }
    };

    Domino.prototype.moveToLeft = function() {
        if (this.active) {
            var rotate = this.helper.getRotateValue(this.el),
                deg = rotate - 90;

            this.el.style.transform = "rotate(" + deg + "deg) ";
        }
    };
    Domino.prototype.myEventHandler = function(e) {
        if (this.el !== e.target) {
            this.removeActive();
        } else {
            this.toggleActive();
        }
    };

    Domino.prototype.elClicked = function() {
        this.el.dispatchEvent(this.event);
    };

    Domino.prototype.removeActive = function(e) {
        var currentClass = this.el.getAttribute('class'),
            classes = currentClass.split(' '),
            index = classes.indexOf('active');

        if (classes.indexOf('active') !== -1){
            classes.splice(index, 1);
            this.el.setAttribute('class', classes.join(' '));
            this.active = false;
        }
    };

    Domino.prototype.toggleActive = function(e) {
        var currentClass = this.el.getAttribute('class'),
            classes = currentClass.split(' '),
            index = classes.indexOf('active');

        if (classes.indexOf('active') === -1){
            classes.push('active');
            this.el.setAttribute('class', classes.join(' '));
            this.active = true;
        } else {
            classes.splice(index, 1);
            this.el.setAttribute('class', classes.join(' '));
            this.active = false;
        }
    };

    Domino.prototype.drop = function(e) {
        var offset = e.dataTransfer.getData("text/plain").split(',');

        this.el.style.left = (e.clientX + parseInt(offset[0],10)) + 'px';
        this.el.style.top = (e.clientY + parseInt(offset[1],10)) + 'px';
        e.preventDefault();
        return false;
    };

    Domino.prototype.allowDrop = function(e) {
        e.preventDefault();
        return false;
    };
    Domino.prototype.drag = function(e) {
        var style = window.getComputedStyle(event.target, null);

        e.dataTransfer.setData("text/plain",
            (parseInt(style.getPropertyValue("left"),10) - e.clientX + 100) + ','

            + (parseInt(style.getPropertyValue("top"),10) - e.clientY + 100));
    };

    window.Domino = Domino;
})();
