'use strict';
import { default as galleryItems } from './gallery-items.js';

// Обьект путей
const refs = {
  gallery: document.querySelector('.gallery'),
  lightbox: document.querySelector('.lightbox'),
  lightbox___image: document.querySelector('.lightbox___image'),
};

//Функция для добавления в галерею елементов из масива обьектов
function collectGalleryItem(items) {
  return items.reduce((acc, item) => {
    acc += `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${item.original}"
      >
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
        <span class="gallery__icon">
          <i class="material-icons">zoom_out_map</i>
        </span>
      </a>
    </li>
      `;
    return acc;
  }, '');
}
//Функция для добавления в HTML элементы галереи
function addGallery(domElement, htmlString) {
  domElement.insertAdjacentHTML('beforeend', `${htmlString}`);
}

//вызываем функцию добавления елементов галереи

addGallery(refs.gallery, collectGalleryItem(galleryItems));

//Функция закрытия модального окна

function cancellLightbox() {
  refs.lightbox.classList.remove('is-open');
  refs.lightbox___image.src = '';
  refs.lightbox___image.alt = '';
}

// Открываем модальное окно

refs.gallery.addEventListener('click', elem => {
  event.preventDefault();
  if (elem.target === elem.currentTarget) {
    return;
  }
  refs.lightbox___image.src = elem.target.dataset.source;
  refs.lightbox___image.alt = elem.target.alt;
  refs.lightbox.classList.add('is-open');
});

// Закрываем модальное окно

refs.lightbox.addEventListener('click', elem => {
  if (elem.target.nodeName !== 'IMG') {
    cancellLightbox();
  }
});
document.addEventListener('keydown', event => {
  if (event.which !== 27) {
    return;
  }
  cancellLightbox();
});