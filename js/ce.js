(function () {
    "use strict";

    /*Register the specified event to a target (element/document/window) and a hadler (callback function) to handle that event*/
    function addEvent(target, event, handler) {
        /* IE8<= doesn't support addEventListener*/
        /*Also target is passed as 'this' to the addEventListener's callback function but this is not true with attachEvent's callback. So pass the target and event explicitly*/
        if (target.addEventListener) {
            target.addEventListener(event, handler, false);
        } else {
            target.attachEvent("on" + event, function (event) {
                return handler.call(target, event);
            });
        }
    }



    function handleCollapseMenu(target, event) {
        /* Stop default event nature of hyperlink */
        target.preventDefault();
        target.stopPropagation();

        var rightMenu =  document.querySelector('ul.right-menu');
        var rightMenuItems = document.querySelectorAll('ul.right-menu li');

        if(rightMenu.className.indexOf(' responsive') == -1) {

            rightMenu.className += ' responsive';
            for(var i=0; i<rightMenuItems.length; i++)
            {
                rightMenuItems[i].className += ' responsive';
            }
        } else {
            rightMenu.className = rightMenu.className.substring(0, rightMenu.className.indexOf(' responsive'));

            for(var i=0; i<rightMenuItems.length; i++)
            {
                rightMenuItems[i].className = rightMenuItems[i].className.substring(0, rightMenuItems[i].className.indexOf(' responsive'));
            }
        }

    }

    window.onload = function () {
        var collapse_button = document.querySelector('div.collapse-button > a');
        addEvent(collapse_button, 'click', handleCollapseMenu);
    }

})(window);
