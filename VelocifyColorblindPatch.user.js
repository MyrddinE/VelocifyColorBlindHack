// ==UserScript==
// @name         Velocify Colorblind Patch
// @namespace    MyrddinE
// @version      0.1
// @description  Apply HTML edit to make Velocify buttons color-blind accessible.
// @author       Myrddin Emrys
// @match        https://lm.velocify.com/*
// @updateURL    https://raw.githubusercontent.com/MyrddinE/VelocifyColorBlindHack/master/VelocifyColorblindPatch.user.js
// @grant        none
// ==/UserScript==

(function() {
    function update(element, html) {
        'use strict';
        var ng, jqChild, domChild
        ng = angular.element(element);

        if (domChild=ng[0].querySelector('#hack_clrblnd')) {
            // If the button has a #hack_clrblnd character already, update it.
            jqChild = angular.element(domChild);
            jqChild.html(html);
        } else {
            // If the button has no appended character, add one.
            ng.append(' <span id="hack_clrblnd">' + html + '</span>');
        }
    }

    function redraw(delay) {
        'use strict';
        // set a default delay.
        if (!Number.isInteger(delay)) {
            delay = 100 // tenth of a second.
        }

        // delay value is used as the second parameter.
        window.setTimeout(function() {
            'use strict';
            const DISABLED = '&#x2718;'
            const ENABLED = '&#x2714;'
            var i;

            // Get all the disabled (red) buttons at the top of the page.
            var disabledButtons = document.querySelectorAll('span.agent-statuses label.btn-danger');
            for (i=0; i < disabledButtons.length; i++) {
                update(disabledButtons[i], DISABLED);
            }

            // Get all the enabled (green) buttons at the top of the page.
            var enabledButtons = document.querySelectorAll('span.agent-statuses label.btn-success');
            for (i=0; i < enabledButtons.length; i++) {
                update(enabledButtons[i], ENABLED);
            }

        }, delay);
    }

    redraw(3000);

    window.setTimeout(function() {
        'use strict';
        document.getElementById("receivingLeadsButton").addEventListener("click",redraw);
        document.getElementById("receivingCallsButton").addEventListener("click",redraw);
    }, 3000);
})();
