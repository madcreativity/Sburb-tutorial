/// Smooth scroll
$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      event.preventDefault();
      var o =  target.offset();   
      var sT = o.top - $("header").outerHeight(true);
      $('html, body').animate({ scrollTop: sT }, 500, function() {
        var $target = $(target);
        if ($target.is(":focus")) {
          return false;
        } else {
          $target.attr('tabindex','-1');
        };
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