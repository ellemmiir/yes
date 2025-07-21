//swiper
document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    autoHeight: true,
    freeMode: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    mousewheel: true,
    keyboard: true,
  });
});


//animation
// const svgContainer = document.getElementById('svgAnimationContainer');
// const animItem = bodymovin.loadAnimation({
//   wrapper: svgContainer,
//   animType: 'svg',
//   loop: true,
//   path: 'images/stickers.json'
// });

document.addEventListener("DOMContentLoaded", function () {
  const galleryContainer = document.getElementById("galleryContainer");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  // Массив путей к фото
  const photoSources = [
    "images/photos/1.jpg",
    "images/photos/2.jpg",
    "images/photos/3.jpg",
    "images/photos/4.jpg",
    "images/photos/5.jpg",
    "images/photos/6.jpg",
    "images/photos/7.jpg",
    "images/photos/8.jpg",
    "images/photos/9.jpg",
    "images/photos/10.jpg",
    "images/photos/11.jpg",
    "images/photos/12.jpg",
    "images/photos/13.jpg",
    "images/photos/14.jpg",
    "images/photos/15.jpg",
    "images/photos/16.jpg",
    "images/photos/17.jpg",
    "images/photos/18.jpg",
    "images/photos/19.jpg",
    "images/photos/20.jpg",
    "images/photos/21.jpg",
  ];

  let photosPerPage = 9;
  let currentIndex = 0;

  function loadPhotos() {
    const slice = photoSources.slice(
      currentIndex,
      currentIndex + photosPerPage
    );
    slice.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Фото галереи";
      img.loading = "lazy";
      img.classList.add("photos__item");
      galleryContainer.appendChild(img);
    });

    currentIndex += photosPerPage;

    if (currentIndex >= photoSources.length) {
      loadMoreBtn.style.display = "none"; 
    }
  }

  loadMoreBtn.addEventListener("click", loadPhotos);

  loadPhotos();
});

document.addEventListener("DOMContentLoaded", function () {
  const svgContainer = document.getElementById("svgAnimationContainer");
  const animItem = bodymovin.loadAnimation({
    container: svgContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "images/stickers.json",
  });
});


//tabs
const filterTabs = document.querySelector(".services__tabs");
const filterButtons = document.querySelectorAll(".services__tab-btn");
const contents = document.querySelectorAll(".services__tab-content");

filterTabs.addEventListener("click", (event) => {
  const root = document.documentElement;

  if (event.target.classList.contains("services__tab-btn")) {
    const targetTranslateValue = event.target.dataset.translateValue;
    const contentId = event.target.dataset.content;

    root.style.setProperty("--translate-filters-slider", targetTranslateValue);
    handleActiveTab(filterButtons, event, "services-active");
    switchTabContent(contentId);
  }
});

const handleActiveTab = (tabs, event, className) => {
  tabs.forEach((tab) => {
    tab.classList.remove(className);
  });

  if (!event.target.classList.contains(className)) {
    event.target.classList.add(className);
  }
};

const switchTabContent = (id) => {
  contents.forEach((content) => {
    if (content.dataset.content === id) {
      content.classList.add("active");
    } else {
      content.classList.remove("active");
    }
  });
};


//btn
const btnUp = {
  el: document.querySelector(".btn-up"),
  show() {
    this.el.classList.remove("btn-up_hide");
  },
  hide() {
    this.el.classList.add("btn-up_hide");
  },
  addEventListener() {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      scrollY > 400 ? this.show() : this.hide();
    });
    document.querySelector(".btn-up").onclick = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };
  },
};

btnUp.addEventListener();
