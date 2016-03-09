"use strict";

(function() {
    function Helper(combinations) {
        this.combinations = combinations;
    }

    Helper.prototype.appendChild = function(el, child) {
        el.appendChild(child);

        return this;
    };

    Helper.prototype.getEl = function(id) {
        return document.getElementById(id);
    };

    Helper.prototype.createEl = function(el) {
        return document.createElement(el);
    };

    Helper.prototype.getRandom = function(e) {
        if(this.combinations.length) {
            var random = this.combinations[Math.floor(Math.random() * this.combinations.length)],
                index = this.combinations.indexOf(random);

            this.combinations.splice(index, 1);
            return random;
        } else {
            return false;
        }
    };

    Helper.prototype.getRotateValue = function(el) {
        var st = window.getComputedStyle(el, null),
            tr = st.getPropertyValue("transform"),
            values = tr.split('(')[1].split(')')[0].split(','),
            a = values[0],
            b = values[1];

        return Math.round(Math.atan2(b, a) * (180/Math.PI));
    };

    window.Helper = Helper;
})();
