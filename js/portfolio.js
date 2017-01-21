(function () {

    "use strict";
    var links, mutax = false, dropDownBtn;
    function fadeIn(duration, element, complete) {
        
        var intervalId;
        
        function show() {
            element.style.opacity = parseFloat(element.style.opacity) + 0.1;
            
            if (element.className.indexOf(' hidden') !== -1) {
                var className = element.className;
                element.className = (className.substring(0, className.indexOf(' hidden')).trim() + ' ' + className.substring(className.indexOf('hidden') + 'hidden'.length).trim()).trim();
                
                element.className += ' visible';
            }
            if (element.style.opacity == 1) {
                clearInterval(intervalId);

                if (complete !== undefined) {
                    complete.call();
                }
                
                mutax = false;
                
                return;
            }
            /*console.log('opacity '+ element.style.opacity);*/
        }
        
        intervalId = window.setInterval(show, duration / 10);

        element.style.opacity = window.getComputedStyle(element, null).getPropertyValue('opacity');
    }
    
    function fadeOut(duration, element, complete) {
        
        if (!mutax) {
            mutax = true;
        } else {
            return;
        }
        
        var intervalId;
        
        function vanish() {
            
            if (element.style.opacity == 0) {
                clearInterval(intervalId);
                if (element.className.indexOf(' visible') !== -1) {
                    element.className = (element.className.substring(0, element.className.indexOf('visible')).trim() + '  ' + element.className.substring(element.className.indexOf('visible') + 'visible'.length).trim()).trim();
                }
                if (element.className.indexOf(' hidden') === -1) {
                    element.className += ' hidden';
                }
                
                if (complete !== undefined) {
                    complete.call();
                }
                return;
            }
            element.style.opacity -= 0.1;
        }
        
        element.style.opacity = window.getComputedStyle(element, null).getPropertyValue('opacity');
        
        intervalId = window.setInterval(vanish, duration / 10);
    }
    
    function turnPages(target, event) {
        
        target.preventDefault();
        target.stopPropagation();
        
        var menu = document.querySelector('div.menu'), element = this, sectionToHide, sectionToShow;
        
        if (menu.className.indexOf('responsive') !== -1) {
            menu.className = (menu.className.substring(0, menu.className.indexOf(' responsive')).trim() + ' ' + menu.className.substring(menu.className.indexOf('responsive') + 'responsive'.length).trim()).trim();
        }
        
        
        sectionToHide = document.querySelector('div.stack > div.stack-page.visible');
        sectionToShow = document.querySelector('div.stack > div.stack-page.hidden.' + element.firstChild.textContent.toLowerCase());
        
        if (sectionToHide !== null && sectionToShow !== null) {
            /* If the visible section is forced to show and hide -> Don't react! */
            if (sectionToHide === sectionToShow) {
                return;
            }
            
            fadeOut(100, sectionToHide, function () {
                fadeIn(100, sectionToShow);
            });
        } else {
            window.console.log('Some error in selecting a div , either visible or hidden');
        }
    }
    
    function dropDownMenu(target, event) {
        target.preventDefault();
        target.stopPropagation();
                
        var menu = document.querySelector('div.menu');
        if (menu.className.indexOf('responsive') === -1) {
            menu.className += ' responsive';
        } else {
            menu.className = (menu.className.substring(0, menu.className.indexOf(' responsive')).trim() + ' ' + menu.className.substring(menu.className.indexOf('responsive') + 'responsive'.length).trim()).trim();
        }
    }
    
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

    window.onload = function () {
        var i;
        links = document.querySelectorAll('div.menu ul a');
        dropDownBtn = document.querySelector('div.drop-button span a');
        
        for (i = 0; i < links.length; i = i + 1) {
            addEvent(links[i], 'click', turnPages);
        }
        
        addEvent(dropDownBtn, 'click', dropDownMenu);
    };
})(window);