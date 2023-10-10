var initGallery,
  shiftMainImage,
  changeMainImage,
  initLightbox,
  unfade,
  fade,
  pcnVals,
  sizeMainHeight;

initGallery = function () {
  var main, next_img, next_btn, prev_img, prev_btn, gallery, active;

  main = document.getElementById("main_image");

  next_img = main.querySelector(".next_img");
  next_btn = main.querySelector("#next_button");
  next_btn.addEventListener("click", function () {
    shiftMainImage("next", next_img.dataset.img);
  });

  prev_img = main.querySelector(".prev_img");
  prev_btn = main.querySelector("#prev_button");
  prev_btn.addEventListener("click", function () {
    shiftMainImage("prev", prev_img.dataset.img);
  });

  gallery = document.getElementById("gallery");
  gallery.img_array = gallery.querySelectorAll("li img");
  gallery.img_count = gallery.img_array.length;
  gallery.img_array.forEach((element) => {
    element.addEventListener("click", function (event) {
      active = gallery.querySelector(".active");
      var d;
      event.target.dataset.img > parseInt(active.dataset.img)
        ? (d = "next")
        : (d = "prev");
      shiftMainImage(d, event.target.dataset.img);
    });
  });
  sizeMainHeight();
  initLightbox(gallery);
};

shiftMainImage = function (direction, i) {
  var main_wrap;
  main_wrap = document.querySelector(".main_wrapper");
  switch (direction) {
    case "prev":
      main_wrap.animate({ transform: "translateX(0%)" }, 300);
      break;
    case "next":
      main_wrap.animate({ transform: "translateX(-200%)" }, 300);
      break;
    default:
      i = 0;
      break;
  }
  setTimeout(() => changeMainImage(i), 100);
  unfade(main_wrap);
};

changeMainImage = function (i) {
  var main, gallery, current, prev, next, active, count, data, thumb;

  main = document.getElementById("main_image");
  gallery = document.getElementById("gallery");
  current = main.querySelector("#current_main");
  prev = main.querySelector(".prev_img");
  next = main.querySelector(".next_img");
  active = gallery.querySelector(".thumbnail.active");
  count = gallery.querySelectorAll("li").length;
  data = pcnVals(i, count);

  current.src = gallery.querySelector('[data-img="' + data.c + '"]').src;
  current.dataset.img = data.c;

  prev.src = gallery.querySelector('[data-img="' + data.p + '"]').src;
  prev.dataset.img = data.p;

  next.src = gallery.querySelector('[data-img="' + data.n + '"]').src;
  next.dataset.img = data.n;

  active.classList.remove("active");
  thumb = gallery.querySelector('[data-img="' + data.c + '"]');
  thumb.classList.add("active");

  return thumb.parentNode.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
};

initLightbox = function (gallery) {
  var main, current, icon, showLightbox;
  main = document.getElementById("main_image");
  current = document.getElementById("current_main");
  current.addEventListener("click", showLightbox);

  icon = document.createElement("span");
  icon.id = "expand_icon";
  icon.innerHTML =
    '<svg version="1.1" class="outward_arrows" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 26.8 25.7" style="enable-background:new 0 0 26.8 25.7;" xml:space="preserve"><polygon class="nw" points="10.4,0 0,0 0,10.4 3.9,6.5 7.6,10.2 10.4,7.3 6.7,3.7 "/><polygon class="ne" points="10.4,25.7 0,25.7 0,15.4 3.9,19.2 7.6,15.5 10.4,18.4 6.7,22.1 "/><polygon class="se" points="16.4,0 26.8,0 26.8,10.4 22.9,6.5 19.2,10.2 16.4,7.3 20.1,3.7 "/><polygon class="sw" points="16.4,25.7 26.8,25.7 26.8,15.4 22.9,19.2 19.2,15.5 16.4,18.4 20.1,22.1 "/></svg>';
  main.insertBefore(icon, main.lastElementChild);

  showLightbox = function (event) {
    var modal, current, current_src, prev_btn, next_btn;

    modal = document.querySelector("#modal");

    if (!modal) {
      modal = document.createElement("div");
      modal.id = "modal";
      modal.style.opacity = 0;
      modal.innerHTML = `<p id="close_x">
          <svg version="1.1" class="inward_arrows" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 26.8 25.7" xml:space="preserve"><g> <polygon class="nw" points="26.8,15.4 16.4,15.4 16.4,25.7 20.2,21.9 24,25.5 26.8,22.7 23.1,19 " /> <polygon class="ne" points="26.8,10.4 16.4,10.4 16.4,0 20.2,3.9 24,0.2 26.8,3 23.1,6.7" /> <polygon class="se" points="0,15.4 10.4,15.4 10.4,25.7 6.5,21.9 2.8,25.5 0,22.7 3.7,19" /> <polygon class="sw" points="0,10.4 10.4,10.4 10.4,0 6.5,3.9 2.8,0.2 0,3 3.7,6.7" /></g></svg> 
        </p>
      <section>
        <span id="prev_button" data-img="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 72"><g id="Layer_1-2" data-name="Layer 1"><path class="left_arrow" d="M21,72V61H31V12H21V0L0,36Z" /></g></svg>
        </span>
        <div id="current_image"><img data-img="" src="" /></div>
        <span id="next_button" data-img="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 72"><g id="Layer_1-2" data-name="Layer 1"><path class="right_arrow" d="M10,72V61H0V12H10V0L31,36Z" /></g></svg>
        </span>
      </section>
      `;

      current = document.querySelector("#gallery li img.active").dataset.img;
      current_src = gallery.querySelector(".active").src;
      /*Upscaling image with S3 lambda - remove if not available */
      current_src = current_src.replace("980x980", "1600x1600");
      main.parentNode.insertBefore(modal, main.parentNode.firstElementChild);
      unfade(modal);
    } else {
      current = parseInt(event.target.dataset.img);
      current_src = gallery.querySelector(
        'li img[data-img="' + current + '"]'
      ).src;
      /*Upscaling image with S3 lambda - remove if not available */
      current_src = current_src.replace("980x980", "1600x1600");
      unfade(modal.querySelector("#current_image"));
    }

    let data = pcnVals(current, gallery.img_array.length);

    modal.querySelector("#prev_button").dataset.img = data.p;
    modal.querySelector("#next_button").dataset.img = data.n;
    modal.querySelector("#current_image img").dataset.img = data.c;
    modal.querySelector("#current_image img").src = current_src;

    prev_btn = document.getElementById("prev_button");
    prev_btn.addEventListener("click", showLightbox);

    var next_btn = document.getElementById("next_button");
    next_btn.addEventListener("click", showLightbox);

    var swiper = function () {
      var swipeTarget, touch;
      swipeTargets = modal.getElementsByClassName("swipeable");
      Array.from(swipeTargets).forEach(function (element) {
        console.log(swipeTargets);
        touch = new Hammer(swipeTarget);
        touch.on("swipeleft", function (event) {
          console.log("swipeleft");
          prev_btn.click();
        });
        return touch.on("swiperight", function (event) {
          console.log("swiperight");
          next_btn.click();
        });
      });
    };
    document.addEventListener("DOMContentLoaded", swiper);

    var trackKey = function (e) {
      if (e.keyCode == 27) close.click();
      if (e.keyCode == 39) next_btn.click();
      if (e.keyCode == 37) prev_btn.click();
    };
    document.addEventListener("keydown", trackKey);

    var close = document.getElementById("close_x");
    close.addEventListener("click", function () {
      fade(modal);
      document.removeEventListener("keydown", trackKey);
    });
  };
  icon.addEventListener("click", showLightbox);
};

unfade = function (element) {
  var op = 0.1; // initial opacity
  element.style.display = "flex";
  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op += op * 0.1;
  }, 20);
};

fade = function (element) {
  var op = 1; // initial opacity
  var timer = setInterval(function () {
    if (op <= 0.1) {
      clearInterval(timer);
      element.remove();
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 10 + ")";
    op -= op * 0.1;
  }, 20);
};

pcnVals = function (i, count) {
  if (count == 1) return;
  var c = parseInt(i);
  var p = 0;
  var n = 0;

  if (c == 0) c++;
  if (c == 1) {
    p = count;
    n = c + 1;
  } else if (c == count) {
    p = c - 1;
    n = 1;
  } else {
    p = c - 1;
    n = c + 1;
  }
  return (img = { p: p, c: c, n: n });
};

sizeMainHeight = function () {
  /* Adjust height of main and gallery to height/max-height of current img */
  setTimeout(() => {
    var main = document.querySelector("#main_image");
    var h = main.querySelector("#current_main").clientHeight + "px";
    main.style.height = h;
    main.nextElementSibling.style.maxHeight = h;
  }, 200);
};

document.addEventListener("DOMContentLoaded", function (event) {
  initGallery();

  window.addEventListener("resize", function (event) {
    sizeMainHeight();
  });
});
