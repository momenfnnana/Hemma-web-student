let i = 2;

$(document).ready(function() {
  var radius = 200;
  var fields = $(".item-dot");
  var container = $(".dotCircle");
  var width = container.width();
  radius = width / 2.5;

  var height = container.height();
  var angle = 0,
    step = (2 * Math.PI) / fields.length;
  fields.each(function() {
    var x = Math.round(
      width / 2 + radius * Math.cos(angle) - $(this).width() / 2
    );
    var y = Math.round(
      height / 2 + radius * Math.sin(angle) - $(this).height() / 2
    );
    if (window.console) {
      console.log($(this).text(), x, y);
    }

    $(this).css({
      left: x + "px",
      top: y + "px"
    });
    angle += step;
  });

  $(".item-dot").click(function() {
    var dataTab = $(this).data("tab");
    $(".item-dot").removeClass("active");
    $(this).addClass("active");
    $(".circle-item").removeClass("active");
    $(".circle-item" + dataTab).addClass("active");
    $(".circle-desc").removeClass("active");
    $(".circle-desc" + dataTab).addClass("active");
    i = dataTab;

    $(".dotCircle").css({
      transform: "rotate(" + (360 - (i - 1) * 36) + "deg)",
      transition: "2s"
    });
    $(".item-dot").css({
      transform: "rotate(" + (i - 1) * 36 + "deg)",
      transition: "1s"
    });
  });

  setInterval(function() {
    var dataTab = $(".item-dot.active").data("tab");
    if (dataTab > 8 || i > 8) {
      dataTab = 1;
      i = 1;
    }
    $(".item-dot").removeClass("active");
    $('[data-tab="' + i + '"]').addClass("active");
    $(".circle-item").removeClass("active");
    $(".circle-item" + i).addClass("active");
    $(".circle-desc").removeClass("active");
    $(".circle-desc" + i).addClass("active");
    i++;

    $(".dotCircle").css({
      transform: "rotate(" + (360 - (i - 2) * 36) + "deg)",
      transition: "2s"
    });
    $(".item-dot").css({
      transform: "rotate(" + (i - 2) * 36 + "deg)",
      transition: "1s"
    });
  }, 5000);
});

let curOpen;

$(document).ready(function() {
  curOpen = $(".step")[0];

  $(".next-btn").on("click", function() {
    let cur = $(this).closest(".step");
    let next = $(cur).next();
    $(cur).addClass("minimized");
    setTimeout(function() {
      $(next).removeClass("minimized");
      curOpen = $(next);
    }, 400);
  });

  $(".close-btn").on("click", function() {
    let cur = $(this).closest(".step");
    $(cur).addClass("minimized");
    curOpen = null;
  });

  $(".step .step-content").on("click", function(e) {
    e.stopPropagation();
  });

  $(".step").on("click", function() {
    if (!$(this).hasClass("minimized")) {
      curOpen = null;
      $(this).addClass("minimized");
    } else {
      let next = $(this);
      if (curOpen === null) {
        curOpen = next;
        $(curOpen).removeClass("minimized");
      } else {
        $(curOpen).addClass("minimized");
        setTimeout(function() {
          $(next).removeClass("minimized");
          curOpen = $(next);
        }, 300);
      }
    }
  });
});
