(function () {
		function dropDownMenu(target, event) {
				target.preventDefault();
				target.stopPropagation();

				var menu = document.querySelector('div.menu');

				if(menu.style.display == '' || menu.style.display == 'none') {
						menu.style.display = 'block';
				} else if(menu.style.display == 'block') {
						menu.style.display = 'none';
				}
		}

		function hideMenu(target, event) {
				var menu = document.querySelector('div.menu');

				if(menu.style.display == '' || menu.style.display == 'none') {
						menu.style.display = 'block';
				} else if(menu.style.display == 'block') {
						menu.style.display = 'none';
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
			var homeLink = document.querySelector('div.menu ul a#home');
			var aboutLink = document.querySelector('div.menu ul a#about');
			var servicesLink = document.querySelector('div.menu ul a#services');
			var worksLink = document.querySelector('div.menu ul a#works');

      addEvent(homeLink, 'click', hideMenu);
			addEvent(aboutLink, 'click', hideMenu);
			addEvent(servicesLink, 'click', hideMenu);
			addEvent(worksLink, 'click', hideMenu);

			var dropDownBtn = document.querySelector('div.drop-button span a');

			addEvent(dropDownBtn, 'click', dropDownMenu);

		};

})(window);
