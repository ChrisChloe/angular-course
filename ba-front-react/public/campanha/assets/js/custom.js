$(document).ready(function () {
    var circles = [],
        canvas = document.getElementById("canvas1"),
        context = canvas.getContext("2d"),

        // SETTINGS 
        opacity = 0.6,                                      // the opacity of the circles 0 to 1
        colors = ['rgba(34, 49, 63,' + opacity + ')',       // an array of rgb colors for the circles
        'rgba(189, 195, 199,' + opacity + ')',
        'rgba(241, 196, 15,' + opacity + ')',
        'rgba(231, 76, 60,' + opacity + ')',
        'rgba(231, 76, 60,' + opacity + ')'
        ],
        minSize = 1,                                        // the minimum size of the circles in px
        maxSize = 10,                                       // the maximum size of the circles in px
        numCircles = 300,                                   // the number of circles
        minSpeed = -2,                                     // the minimum speed, recommended: -maxspeed
        maxSpeed = 2,                                    // the maximum speed of the circles
        expandState = true;                                      // the direction of expansion


    function buildArray() {
        'use strict';

        for (var i = 0; i < numCircles; i++) {
            var color = Math.floor(Math.random() * (colors.length - 1 + 1)) + 1,
                left  = Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0,
                top   = Math.floor(Math.random() * (canvas.height - 0 + 1)) + 0,
                size  = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
                leftSpeed   = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10,
                topSpeed    = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10,
                expandState = expandState;

            while (leftSpeed == 0 || topSpeed == 0) {
                leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10,
                topSpeed  = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10;
            }
            var circle = { color: color, left: left, top: top, size: size, leftSpeed: leftSpeed, topSpeed: topSpeed, expandState: expandState };
            circles.push(circle);
        }
    }

    function build() {
        'use strict';

        for (var h = 0; h < circles.length; h++) {
            var curCircle = circles[h];
            context.fillStyle = colors[curCircle.color - 1];
            context.beginPath();
            if (curCircle.left > canvas.width + curCircle.size) {
                curCircle.left = 0 - curCircle.size;
                context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
            } else if (curCircle.left < 0 - curCircle.size) {
                curCircle.left = canvas.width + curCircle.size;
                context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
            } else {
                curCircle.left = curCircle.left + curCircle.leftSpeed;
                context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
            }

            if (curCircle.top > canvas.height + curCircle.size) {
                curCircle.top = 0 - curCircle.size;
                context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);

            } else if (curCircle.top < 0 - curCircle.size) {
                curCircle.top = canvas.height + curCircle.size;
                context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
            } else {
                curCircle.top = curCircle.top + curCircle.topSpeed;
                if (curCircle.size != maxSize && curCircle.size != minSize && curCircle.expandState == false) {
                    curCircle.size = curCircle.size - 0.1;
                }
                else if (curCircle.size != maxSize && curCircle.size != minSize && curCircle.expandState == true) {
                    curCircle.size = curCircle.size + 0.1;
                }
                else if (curCircle.size == maxSize && curCircle.expandState == true) {
                    curCircle.expandState = false;
                    curCircle.size = curCircle.size - 0.1;
                }
                else if (curCircle.size == minSize && curCircle.expandState == false) {
                    curCircle.expandState = true;
                    curCircle.size = curCircle.size + 0.1;
                }
                context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
            }

            context.closePath();
            context.fill();
            context.ellipse;
        }
    }

    var xVal = 0;

    window.requestAnimFrame = (function (callback) {
        'use strict';
        return window.requestAnimationFrame    ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function animate() {
        'use strict';
        var canvas = document.getElementById("canvas1"),
            context = canvas.getContext("2d");

        // clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);


        // draw the next frame
        xVal++;
        build();

        // request a new frame
        requestAnimFrame(function () {
            animate();
        });
    }

    window.onload = function () {
        'use strict';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        buildArray();
        animate();
    };

    window.onresize = function () {
        'use strict';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        animate();
    };


    // variables
    var $header_top = $('.header-top');
    var $nav = $('nav');


    // fullpage customization
    $('#fullpage').fullpage({
        sectionsColor    : ['#B8AE9C', '#fff', '#F2AE72', '#5C832F', '#B8B89F'],
        sectionSelector  : '.vertical-scrolling',
        slideSelector    : '.horizontal-scrolling',
        navigation       : true,
        slidesNavigation : true,
        controlArrows    : false,
        anchors          : ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection'],
        menu             : '#menu',

        afterLoad: function (anchorLink, index) {
            if (index == 2) {
                $(".dots").addClass("spin");

                $("#detail-pulse").addClass('pulse');
                setTimeout(function () {
                    $("#img1").addClass('pulse');
                    setTimeout(function () {
                        $("#img2").addClass('pulse');
                        setTimeout(function () {
                            $("#img3").addClass('pulse');

                        }, 1000)
                    }, 1000)
                }, 1000)
            }

            if (index != 2) {
                $(".dots").removeClass("spin");


                $("#detail-pulse").removeClass('pulse');
                $("#img1").removeClass('pulse');
                $("#img2").removeClass('pulse');
                $("#img3").removeClass('pulse');
            }

            if (index != 1) {
                $('#fp-nav ul li a span, .fp-slidesNav ul li a span').css({ 'background': '#374140', "transition": "0.3s all" });
                $("#fp-nav ul li span, #fp-nav ul li:hover a.active span, .fp-slidesNav ul li:hover a span").css({ "border": "1px solid #374140" })
            }

            if (index == 1) {
                $('#fp-nav ul li a span, .fp-slidesNav ul li a span').css({ 'background': '#fff', "transition": "0.3s all" });
                $("#fp-nav ul li span, #fp-nav ul li:hover a.active span, .fp-slidesNav ul li:hover a span").css({ "border": "1px solid #fff" })

            }
        },

        onLeave: function (index, nextIndex, direction) {
            if (index == 1) {
                $('#fp-nav').show();
            }
        },

        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
            if (anchorLink == 'secondSection') {
                $(this).css('background', '#374140');
                $(this).find('h2').css('color', 'white');
                $(this).find('h3').css('color', 'white');
                $nav.css('background', 'rgba(0, 47, 77, .25)');
                $(this).find('p').css(
                    {
                        'color': '#DC3522',
                        'opacity': 1,
                        'transform': 'translateY(0)'
                    }
                );
            }
        },

        onSlideLeave: function (anchorLink, index, slideIndex, direction) {
            if (anchorLink == 'fifthSection' && slideIndex == 1) {
                $.fn.fullpage.setAllowScrolling(true, 'up');
                $header_top.css('background', 'rgba(0, 47, 77, .3)');
                $nav.css('background', 'rgba(0, 47, 77, .25)');
            }
        }
    });

    $(".info-item .btn").click(function () {
        $("._container").toggleClass("log-in");
    });

    $(".container-form .btn").click(function () {
        $("._container").addClass("active");
    });

    function toogleCircle(){
        if ($('.circle_').hasClass('animate')) {
            $(".circle_").removeClass("animate");
            $(".to-move").removeClass("move");
            $("#separate").removeClass("move-separate");
            $('.toogle-circle').html('Clique aqui se você é uma agência indicada');

        } else {
            $(".circle_").addClass("animate");
            $(".to-move").addClass("move");
            $("#separate").addClass("move-separate");
            $('.toogle-circle').html('Clique aqui para indicar uma agência');
        }
    }

    function toogleMobile(){
        if(!$('.toogle-mobile').hasClass('disabled')){

            $(".toogle-mobile").addClass("disabled");
            if ($('#indicated-form').hasClass('front')) {
                $(".toogle-mobile").addClass('disabled');
                $("#indicated-form").addClass("animateMoveLeft");
                $("#indicate-form").addClass("animateMoveRight");
    
                setTimeout(function(){
                    $("#indicated-form").css({
                        "opacity":"0.3",
                        "transition":"0.7s all"
                    });
                    
                    $("#indicate-form").css({
                        "opacity":"1"
                    });
                },800);
                setTimeout(function(){
                    $("#indicated-form").removeClass("front");
                    $("#indicate-form").addClass("front");
                },1000);
                setTimeout(function(){
                    $("#indicated-form").removeClass("animateMoveLeft");
                    $("#indicate-form").removeClass("animateMoveRight");
                    $(".toogle-mobile").removeClass('disabled');
    
                },2000);
                
                $("#indicated-btn").addClass("disabled");
                $("#indicate-btn").removeClass("disabled");
    
                $('.toogle-mobile a').html('Clique aqui se você é uma agência indicada');
    
            } else {
                $(".toogle-mobile").addClass('disabled');
    
                $("#indicated-form").addClass("animateMoveLeft");
                $("#indicate-form").addClass("animateMoveRight");
    
                setTimeout(function(){
                    $("#indicated-form").css({
                        "opacity":"1"
                    });
                    $("#indicate-form").css({
                        "opacity":"0.3"
                    });
                },800);
                setTimeout(function(){
                    $("#indicate-form").removeClass("front");
                    $("#indicated-form").addClass("front");
                },1000);
                setTimeout(function(){
                    $("#indicated-form").removeClass("animateMoveLeft");
                    $("#indicate-form").removeClass("animateMoveRight");
                    $(".toogle-mobile").removeClass('disabled');
    
                },2000);
                $("#indicated-btn").removeClass("disabled");
                $("#indicate-btn").addClass("disabled");
    
                $('.toogle-mobile a').html('Clique aqui para indicar uma agência');
    
            }
            setTimeout(function(){$(".toogle-mobile").removeClass("disabled");},2050)
        };


    }

    $(".toogle-circle").click(function () {
        toogleCircle();
    });

    $("#contact_submit").click(function () {
       
        var name = $("#contact_name").val()
        var phone = $("#contact_phone").val()
        var email = $("#contact_email").val()

        var data = { "name": name, "phone": phone, "email": email }

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://10.1.1.81:8000/api/home/contact",
            "method": "POST",
            "mimeType": "multipart/form-data",
            "data": data
        }
        $(this).html('ENVIANDO');
        $(this).addClass('disabled');
        $(this).css({
            "transition":"0.5s all",
            "background":"#eee",
            "border-color":"#ccc",
        });

        $.ajax(settings).done(function (response) {

            if (response.type == 'error') {
            } else {

                var name = $("#contact_name").val(null);
                var phone = $("#contact_phone").val(null);
                var email = $("#contact_email").val(null);

                $('#contact_submit').html('ENVIADO');
                $('#contact_submit').css({
                    "transition":"0.5s all",
                    "background":"transparent",
                    "border-color":"#000",
                });

                setTimeout(function(){
                    toogleCircle();
                },500);

        
            }
        });

      
    })

    $(".toogle-mobile").click(function () {
        toogleMobile();
    });

    
})