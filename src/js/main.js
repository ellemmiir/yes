document.addEventListener("DOMContentLoaded", () => {

  //Swiper
  // (() => {
    const swiper = new Swiper(".mySwiper", {
      // slidesPerView: 3,
      spaceBetween: 20,
      autoHeight: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  // })();

  //Menu btn
  (() => {
    const menuBtn = document.querySelector(".menu__btn");
    const menuList = document.querySelector(".menu__list");

    if (menuBtn && menuList) {
      menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("active");
        menuList.classList.toggle("active");
      });
    }
  })();


  //Main page svg
  (() => {
    const svgContainer = document.getElementById("svgAnimationContainer");
    if (svgContainer) {
      bodymovin.loadAnimation({
        container: svgContainer,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "images/stickers.json",
      });
    }
  })();


  //Btn up
  (() => {
    const el = document.querySelector(".btn-up");
    if (!el) return;

    const show = () => el.classList.remove("btn-up_hide");
    const hide = () => el.classList.add("btn-up_hide");

    window.addEventListener("scroll", () => {
      window.scrollY > 400 ? show() : hide();
    });

    el.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  })();


  // Desktop (Programs)
  function initDesktopTabs() {
    const filterTabs = document.querySelector(".programs__tabs");
    const filterButtons = document.querySelectorAll(".programs__tab-btn");
    const contents = document.querySelectorAll(".programs__tab-content");
    const tabColors = ["#cdf195", "#feffa5", "#ffd093", "#ef89c3"];

    if (!filterTabs || getComputedStyle(filterTabs).display === "none") return;

    filterTabs.addEventListener("click", (event) => {
      if (event.target.classList.contains("programs__tab-btn")) {
        const target = event.target;
        const contentId = target.dataset.content;
        const targetTranslateValue = target.dataset.translateValue;
        const tabIndex = [...filterButtons].indexOf(target);

        if (tabIndex !== -1) {
          filterTabs.style.backgroundColor = tabColors[tabIndex];
        }

        document.documentElement.style.setProperty(
          "--translate-filters-slider",
          targetTranslateValue
        );

        filterButtons.forEach((btn) => btn.classList.remove("programs-active"));
        target.classList.add("programs-active");

        contents.forEach((content) => {
          content.classList.toggle(
            "active",
            content.dataset.content === contentId
          );
        });
      }
    });
  }

  // Mobile tabs (Programs)
  function initMobileTabs() {
    const tabButtons = document.querySelectorAll(".programs-a__tab-btn");
    const tabContents = document.querySelectorAll(".programs-a__tab-content");

    if (
      !tabButtons.length ||
      getComputedStyle(tabButtons[0]).display === "none"
    )
      return;

    let activeTabId = null;

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const contentId = btn.dataset.content;
        const contentBlock = document.querySelector(
          `.programs-a__tab-content[data-content="${contentId}"]`
        );

        const isActive = activeTabId === contentId;

        if (isActive) {
          btn.classList.remove("active");
          contentBlock.classList.remove("active");
          activeTabId = null;
          return;
        }

        tabButtons.forEach((b) => b.classList.remove("active"));
        tabContents.forEach((c) => c.classList.remove("active"));

        btn.classList.add("active");
        contentBlock.classList.add("active");

        activeTabId = contentId;
      });
    });
  }

    initDesktopTabs();
    initMobileTabs();


  //Gallery
  (() => {
    const galleryContainer = document.getElementById("galleryContainer");
    const loadMoreBtn = document.getElementById("loadMoreBtn");

    if (!galleryContainer || !loadMoreBtn) return;

    const photoSources = Array.from(
      { length: 21 },
      (_, i) => `images/photos/${i + 1}.jpg`
    );
    const photosPerPage = 9;
    let currentIndex = 0;

    function loadPhotos() {
      photoSources
        .slice(currentIndex, currentIndex + photosPerPage)
        .forEach((src) => {
          // Создаём <a>
          const link = document.createElement("a");
          link.href = src;
          link.setAttribute("data-fancybox", "gallery");

          // Создаём <img>
          const img = document.createElement("img");
          img.src = src;
          img.alt = "Фото галереи";
          img.loading = "lazy";
          img.classList.add("photos__item");

          // Вкладываем <img> в <a>, и <a> в контейнер
          link.appendChild(img);
          galleryContainer.appendChild(link);
        });

      currentIndex += photosPerPage;

      if (currentIndex >= photoSources.length) {
        loadMoreBtn.style.display = "none";
      }
    }

    loadMoreBtn.addEventListener("click", loadPhotos);
    loadPhotos();
  })();

  (() => {
    Fancybox.bind("[data-fancybox]", {});
  })();

   
});