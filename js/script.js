window.addEventListener('DOMContentLoaded', () => {
   const slider = tns({
      container: '.carousel__inner',
      items: 1,
      slideBy: 'page',
      autoplay: false,
      controls: false,
      navPosition: 'bottom'
   });

   const prev = document.querySelector('.prev'),
      next = document.querySelector('.next');

   prev.addEventListener('click', () => {
      slider.goTo('prev');
   });

   next.addEventListener('click', () => {
      slider.goTo('next');
   });

   // const link = document.querySelector('.catalog-item__link'),
   //    backLink = document.querySelector('.catalog-item__link_back'),
   //    content = document.querySelector('.catalog-item__content'),
   //    list = document.querySelector('.catalog-item__list');

   // link.addEventListener('click', (e) => {
   //    e.preventDefault();
   //    content.classList.remove('catalog-item__content_active');
   //    list.classList.add('catalog-item__list_active');
   // });

   // backLink.addEventListener('click', (e) => {
   //    e.preventDefault();
   //    content.classList.add('catalog-item__content_active');
   //    list.classList.remove('catalog-item__list_active');
   // });

   const links = document.querySelectorAll('.catalog-item__link'),
      backLinks = document.querySelectorAll('.catalog-item__link_back'),
      contents = document.querySelectorAll('.catalog-item__content'),
      lists = document.querySelectorAll('.catalog-item__list');

   links.forEach((link, i) =>
      link.addEventListener('click', (e) => {
         e.preventDefault();
         contents[i].classList.remove('catalog-item__content_active');
         lists[i].classList.add('catalog-item__list_active');
      })
   );

   backLinks.forEach((link, i) =>
      link.addEventListener('click', (e) => {
         e.preventDefault();
         contents[i].classList.add('catalog-item__content_active');
         lists[i].classList.remove('catalog-item__list_active');
      })
   );

   const parentTab = document.querySelector('.catalog__tabs'),
      catalogTabs = document.querySelectorAll('.catalog__tab'),
      catalogContents = document.querySelectorAll('.catalog__content');

   function showTab(i = 0) {
      catalogTabs.forEach((tab, i) => {
         tab.classList.remove('catalog__tab_active');
         catalogContents[i].classList.add('catalog__content_active');
         catalogContents[i].classList.remove('catalog__content_active');
      });

      catalogTabs[i].classList.add('catalog__tab_active');
      catalogContents[i].classList.remove('catalog__content_active');
      catalogContents[i].classList.add('catalog__content_active');
   }

   showTab();

   parentTab.addEventListener('click', ({ target }) => {
      catalogTabs.forEach((tab, i) => {
         if (target && target.parentElement === tab) {
            showTab(i);
         }
      });
   });

   ///
   ///Modal
   ///

   const modalBtns = document.querySelectorAll('[data-modal=consultation]'),
      overlay = document.querySelector('.overlay'),
      consultationModal = document.querySelector('#consultation'),
      closeBtns = document.querySelectorAll('.modal__close'),
      buyBtn = document.querySelectorAll('.button_mini'),
      catalogTitles = document.querySelectorAll('.catalog-item__subtitle'),
      orderModal = document.querySelector('#order');

   function showModal(modal) {
      document.body.style.overflow = 'hidden';
      overlay.style.display = 'block';
      modal.style.display = 'block';
   }

   function hideModal(modal) {
      document.body.style.overflow = 'auto';
      overlay.style.display = 'none';
      orderModal.style.display = 'none';
      consultationModal.style.display = 'none';
   }

   modalBtns.forEach((btn) =>
      btn.addEventListener('click', () => {
         showModal(consultationModal);
      })
   );

   closeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
         hideModal();
      });
   });

   overlay.addEventListener('click', ({ target }) => {
      if (target.classList.contains('overlay')) {
         hideModal(consultationModal);
      }
   });

   buyBtn.forEach((btn, i) => {
      btn.addEventListener('click', () => {
         document.querySelector('#order .modal__descr').textContent =
            catalogTitles[i].textContent;
         showModal(orderModal);
      });
   });

   const pageUp = document.querySelector('.pageup');
   pageUp.style.display = 'none';
   let y = 0;

   window.addEventListener('scroll', () => {

      if (
         window.pageYOffset >= 700 &&
         window.getComputedStyle(pageUp).getPropertyValue('display') === 'none'
      ) {
         fadeIn(pageUp);
      }
      if (
         window.pageYOffset < 700 &&
         window.getComputedStyle(pageUp).getPropertyValue('display') === 'block'
      ) {
         fadeOut(pageUp);
      }
   });

   function fadeOut(el) {
      var op = 1;
      var timer = setInterval(function () {
         if (op <= 0.1) {
            clearInterval(timer);
            el.style.display = 'none';
         }
         el.style.opacity = op;
         op -= op * 0.1;
      }, 20);
   }

   // fade in

   function fadeIn(el) {
      var op = 0;
      el.style.opacity = op;
      el.style.display = 'inline-block';

      var timer = setInterval(function () {
         if (op >= 1.0) {
            clearInterval(timer);
         }
         el.style.opacity = op;
         op = op + 0.1;
      }, 20);
   }

   //JQuery modal

   // $('[data-modal=consultation]').on('click', function () {
   //    $('.overlay, #consultation').fadeIn();
   // });

   // $('.modal__close').on('click', function () {
   //    $('.overlay, #consultation, #order, #thanks').fadeOut();
   // });

   // $('.button_mini').on('click', function () {
   //    $('.overlay, #order').fadeIn();
   // });

   new WOW().init();
});
