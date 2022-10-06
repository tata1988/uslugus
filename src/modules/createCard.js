import { API_URL } from "./const";

export const createCard = (item) => {
    const { avatar, category, comments, direction, id, name, surname, price } = item;

    const serviceItem = document.createElement('li');
    serviceItem.classList.add('services__item');

    const service = document.createElement('article');
    service.classList.add('service');
    service.dataset.id = id;
    serviceItem.append(service);

    const serviceAvatar = new Image(50, 50);
    serviceAvatar.classList.add('service__avatar');
    serviceAvatar.src = `${API_URL}/${avatar}`;
    serviceAvatar.alt = `${category} ${surname} ${name}`;

    const servicePresent = document.createElement('div');
    servicePresent.classList.add('service__present');

    const serviceTitle = document.createElement('h3');
    serviceTitle.classList.add('service__title');
    serviceTitle.textContent = category;

    const serviceName = document.createElement('p');
    serviceName.classList.add('service__name');
    serviceName.textContent = `${name} ${surname[0]}.`;

    servicePresent.append(serviceTitle, serviceName);



    const servicePrice = document.createElement('p');
    servicePrice.classList.add('service__price');
    servicePrice.textContent = `${direction} ${price} ₽`;

    const serviceReview = document.createElement('div');
    serviceReview.classList.add('service__review');

    serviceReview.textContent = 'звезды';

    const serviceCountReview = document.createElement('p');
    serviceCountReview.classList.add('service__count-review');
    serviceCountReview.textContent = comments.length;

    serviceReview.append(serviceCountReview)
    service.append(serviceAvatar, servicePresent, servicePrice, serviceReview);
    return serviceItem;

}

`
<li class="services__item">
              <article class="service">
                <img src="img/photo.png" alt="avatar" class="service__avatar">
                <div class="service__present">
                  <h3 class="service__title">Фотограф</h3>
                  <p class="service__name">Иван П.</p>
                </div>
  
                <p class="service__price">от 4000 ₽</p>
                <div class="service__review">
                  <div class="service__stars stars">
                    <img src="img/star.svg" class="stars__item" alt="рейтинг специалиста 4 из 5">
                    <img src="img/star.svg" class="stars__item" alt="">
                    <img src="img/star.svg" class="stars__item" alt="">
                    <img src="img/star.svg" class="stars__item" alt="">
                    <img src="img/star-o.svg" class="stars__item" alt="">
                  </div>
                  <p class="service__count-review">4</p>
                </div>
              </article>
            </li>
`