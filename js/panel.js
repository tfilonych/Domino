"use strict";

(function() {
    function Panel() {
        this.helper = new Helper();
        this.el = this.helper.createEl('div');
        this.createBtn();
    }

    Panel.prototype.createBtn = function() {
        var btn,
            buttons = [
                {id: 'moveToRightBtn', val: 'Rotate Right'},
                {id: 'moveToLeftBtn',  val: 'Rotate Left'},
                {id: 'addBtn',         val: 'Add Domino'}
            ];

        this.el.setAttribute('id', 'controls');

        for (var i=0; i<buttons.length; i++) {
            btn = this.helper.createEl('button');
            btn.setAttribute('id', buttons[i].id);
            btn.innerHTML = buttons[i].val;
            this.el.appendChild(btn);
        }
        document.body.appendChild(this.el);
        return this;
    };

    window.Panel = Panel;
})();
