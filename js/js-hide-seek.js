window.onload = function(){

    var currentVisibleSection = document.querySelector('section.home-section');

    /*--- FUnction to add events to the elements ---*/
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

    /*---- Showing the home section ----*/

    var homeSectionLink = document.querySelector('a#home-section');

    addEvent(homeSectionLink, 'click', showHome);

    function showHome(target, event){

        var homeSection = document.querySelector( 'section.home-section');

        currentVisibleSection.style.display = 'none';

        currentVisibleSection = homeSection;

        currentVisibleSection.style.display = 'block';
    }

    /*---- Showing the submission form ----*/

    var formSectionLink = document.querySelector('a#form-section');

    addEvent(formSectionLink, 'click', showForm);

    function showForm(target, event){

        var formSection = document.querySelector( 'section.submission-section');

        currentVisibleSection.style.display = 'none';

        currentVisibleSection = formSection;

        currentVisibleSection.style.display = 'block';
    }

    /*---- Showing the text spark ----*/

    var textSparkSectionLink = document.querySelector('a#text-spark');

    addEvent(textSparkSectionLink, 'click', showTextSpark);

    function showTextSpark(target, event){

        var textSection = document.querySelector( 'section.text-section');

        currentVisibleSection.style.display = 'none';

        currentVisibleSection = textSection;

        sparkTheText();

        currentVisibleSection.style.display = 'block';
    }



    /*---- Form validation ----*/

    var submitButton = document.querySelector('form div button');

    addEvent(submitButton, 'click', validateForm);

    function validateForm(target, event) {

        target.preventDefault();
        target.stopPropagation();

        var userName = document.querySelector('form div input#user-name').value;

        var email = document.querySelector('form div input#email').value;

        var password = document.querySelector('form div input#password').value;

        var confirmPassword = document.querySelector('form div input#confirm-password').value;

        var userNamePattern = /^([a-zA-Z0-9_-]{3,})$/;

        var userNameError = !userNamePattern.test(userName);

        var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        var emailError = !emailPattern.test(email);

        var passwordPattern = /^([a-zA-Z0-9\.\!@#\$%\^&\*\(\)\-_\+=\{\}\[\]\|\\;:"',<>\?\/~`]+)$/;

        var passwordError = !passwordPattern.test(password);

        var confirmPasswordError = !passwordPattern.test(confirmPassword);

        var passwordNotMatchedError = password !== confirmPassword;

        if(userNameError){
            alert("wrong user name");
        } else if(emailError){
            alert("wrong email");
        } else if(passwordError){
            alert("wrong user password");
        } else if(confirmPasswordError){
            alert("wrong confirm password");
        } else if(passwordNotMatchedError) {
            alert("Password not matched in form");
        } else {
            alert("Correct data entered in form");
            document.getElementById('validation-form').submit();
        }

    }

    /*--- Text Spark ----*/

    function sparkTheText() {
        var object = {
            knoldus : ['K', 'N', 'O', 'L', 'D', 'U', 'S'],
            a : ['a'],
            team : ['t','e','a','m'],
            of : ['o','f'],
            passionate : ['p','a','s','s','i','o','n','a','t','e'],
            technologist : ['t','e','c','h','n','o','l','o','g','i','s','t','s']
        };

        var textSection = document.querySelector('section.text-section');
        var para;

        for (var charArray in object) {
            para = document.createElement('p');

            for(var char in charArray) {
               var span = document.createElement('span');
               span.appendChild(document.createTextNode(charArray[char]));
               para.appendChild(span);
            }

            textSection.appendChild(para);
        }
    }

    /*---Magic bar implementation---*/

    var magicBar = document.getElementById("magic-bar")
    magicBar.style.display = 'block';
    magicBarWidth = 0;
    magicBar.style.width= magicBarWidth + 'px';

    var increaseFlag = true;
    window.setInterval(function(){slideWidth(magicBar)}, 1)

    function slideWidth(element) {

        var currentWidth = parseInt(element.style.width)
        var bodyWidth = document.body.clientWidth

        if(increaseFlag) {
            if(currentWidth < bodyWidth) {
                magicBarWidth += 5;
                element.style.width = magicBarWidth+'px';
            } else if(currentWidth >= bodyWidth){
                increaseFlag = false;
            }
        } else {
            if(currentWidth > 0) {
                magicBarWidth -= 5;
                element.style.width = magicBarWidth+'px';
            } else {
                increaseFlag = true;
            }
        }
    }

}
