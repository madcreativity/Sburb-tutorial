/// Navigation bar
var header = document.getElementsByTagName("header")[0];

window.addEventListener('scroll', function(e) {
  if(window.scrollY === 0) {
    header.id = "";
  } else {
    header.id = "moving";
  }
});


/// Smooth scroll
$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      event.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 60 }, 1000, function() {
        var $target = $(target);
        $target.focus();
        if(!$target.is(":focus")) {
          $target.attr('tabindex','-1');
          $target.focus();
        } else {
          document.documentElement.scrollTop = target.offset().top - 60;
          return false;
        }
      });
    }
  }
});

/// Code highlights
addEventListener('load', () => {
  const code = document.querySelector('#code');

  try {
    const worker = new Worker('worker.js');
    worker.onmessage = (event) => { code.innerHTML = event.data; }
    worker.postMessage(code.textContent);
  }
  catch(exception) {
    console.log("Failed while setting up code highlighter");
  }
});