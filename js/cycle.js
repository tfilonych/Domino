"use strict";

(function() {
    function Cycle(position) {
        this.position = position;
        this.el = document.createElement('div');
        this.create();
    }

    Cycle.prototype.create = function() {
        this.el.setAttribute('class', 'cycle');
        this.el.style.top = this.position.top;
        this.el.style.left = this.position.left;
    };

    window.Cycle = Cycle;
})();
