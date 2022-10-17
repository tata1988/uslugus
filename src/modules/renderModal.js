import { API_URL, directions } from "./const";
import { createElement } from "./createElement";
import { createReview } from "./createReview";
import { createStars } from "./createStars";
import { ratingController } from "./ratingController";
import { store } from "./store";

export const renderModal = ({ parent, data }) => {
    parent.textContent = '';
    console.log(data);

    const body = createElement('div', {
        class: 'modal__body',
    }, parent);

    const container = createElement('div', {
        class: 'modal__container person',
    }, body);

    //service
    const service = createElement('div', {
        class: 'person__service service service_person',
    }, container);

    createElement('img', {
        src: `${API_URL}/${data.avatar}`,
        class: 'service__avatar',
        alt: `avatar ${data.name}`,
    }, service);

    const servicePresent = createElement('div', {
        class: 'service__present',
    }, service);

    createElement('h3', {
        class: 'service__title',
        textContent: store.category.find(item => item.title === data.category).rus
    }, servicePresent);

    createElement('p', {
        class: 'service__name',
        textContent: `${data.name} ${data.surname[0]}.`
    }, servicePresent);

    createElement('p', {
        class: 'service__price',
        textContent: `${directions[data.direction]} ${data.price} ₽`
    }, service);

    const serviceContacts = createElement('div', {
        class: 'service__contacts',
    }, service);

    createElement('a', {
        class: 'service__link service__link_phone',
        textContent: data.phone,
        href: `tel:${data.phone}`
    }, serviceContacts);

    createElement('a', {
        class: 'service__link service__link_email',
        textContent: data.email,
        href: `mailto:${data.email}`
    }, serviceContacts);

    const serviceReview = createElement('div', {
        class: 'service__review',
    }, service);

    const stars = createStars(data.comments);
    stars.classList.add('service__stars');
    serviceReview.append(stars);

    createElement('p', {
        class: 'service__count-review',
        textContent: data.comments.length,
    }, serviceReview);

    //about

    const about = createElement('div', {
        class: 'person__about about',
    }, container);

    createElement('h3', {
        class: 'about__title',
        textContent: 'О себе',
    }, about);

    createElement('p', {
        class: 'about__text',
        textContent: data.about,
        style: 'white-speace: pre-line'
    }, about);

    //review

    const review = createElement('div', {
        class: 'person__review review',
    }, container);

    createElement('h3', {
        class: 'review__title',
        textContent: 'Отзывы',
    }, review);

    if (data.comments.length) {
        review.append(createReview(data.comments));
        if (data.comments.length > 3) {
            const btn = createElement('button', {
                class: 'review__open review__open_list',
                textContent: 'Все отзывы',
            }, review);
            btn.addEventListener('click', () => {
                review.classList.add('review_show-all');
                btn.remove();
            })
        }
    } else {
        createElement('p', {
            class: 'review__no-reviews',
            textContent: 'Отзывов еще нет',
        }, review);
    }

    //formReview
    const formReview = createElement('form', {
        class: 'person__form form form_add-review',
    }, container);

    const fieldset = createElement('fieldset', {
        class: 'form__fieldset form__fieldset_review',
    }, formReview);

    const labelName = createElement('label', {
        class: 'form__label',
    }, fieldset);

    createElement('span', {
        class: 'form__text',
        textContent: 'Имя'
    }, labelName);

    createElement('input', {
        class: 'form__input',
    }, labelName);

    const labelPhone = createElement('label', {
        class: 'form__label',
    }, fieldset);

    createElement('span', {
        class: 'form__text',
        textContent: 'Телефон'
    }, labelPhone);

    createElement('input', {
        class: 'form__input',
    }, labelPhone);

    const labelComment = createElement('label', {
        class: 'form__label',
    }, fieldset);

    createElement('span', {
        class: 'form__text',
        textContent: 'Комментарий',
    }, labelComment);

    createElement('textarea', {
        class: 'form__textarea',
    }, labelComment);

    const wrapperSendReview = createElement('div', {
        class: 'form__wrapper-rating',
    }, formReview);

    const rating = createElement('div', {
        class: 'form__rating rating',
    }, wrapperSendReview);
    rating.dataset.stars = '3';

    for (let i = 1; i <= 5; i++) {
        rating.innerHTML += `
        <svg class="rating__star" width="18" height="18" viewBox="0 0 18 18" data-rating="${i}"  fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.3401 7.00099L16.34 7.001L16.3419 7.0065C16.3844 7.13479 16.3872 7.27292 16.3502 7.40288C16.3131 7.53281 16.2377 7.64857 16.1339 7.73509C16.1339 7.73511 16.1339 7.73513 16.1338 7.73515L12.9535 10.3821L12.7128 10.5824L12.788 10.8864L13.7976 14.97L13.7976 14.9701L13.7991 14.9758C13.8331 15.1065 13.8268 15.2444 13.7811 15.3715C13.7354 15.4985 13.6524 15.6088 13.543 15.6879L13.5412 15.6892C13.4379 15.7646 13.3144 15.807 13.1866 15.8109C13.0589 15.8149 12.9329 15.7802 12.8252 15.7113L12.8236 15.7103L9.27718 13.4636L9.26501 13.4559L9.25241 13.4489C9.20104 13.4204 9.09336 13.3714 8.95079 13.3849C8.83541 13.3959 8.75188 13.4438 8.71258 13.4704L5.42744 15.5516L5.4266 15.5521C5.29892 15.6333 5.14975 15.6743 4.99849 15.6696C4.84724 15.6648 4.7009 15.6147 4.57853 15.5257L4.57737 15.5248C4.44813 15.4314 4.35012 15.3011 4.29617 15.151C4.24221 15.0009 4.23483 14.838 4.27499 14.6837L4.27567 14.681L5.22599 10.9429L5.30306 10.6398L5.06418 10.4378L1.86935 7.7374L1.86936 7.73739L1.86667 7.73515C1.76284 7.64862 1.68746 7.53284 1.65036 7.40288C1.61326 7.27292 1.61615 7.13479 1.65866 7.0065L1.65869 7.00651L1.66045 7.00099C1.70017 6.87628 1.77656 6.76644 1.87965 6.6858C1.98274 6.60515 2.10774 6.55746 2.23835 6.54893L6.391 6.27922L6.70549 6.25879L6.82272 5.96626L8.39486 2.04304L8.39488 2.04305L8.39682 2.03808C8.44402 1.91654 8.5268 1.81208 8.63432 1.73835C8.74174 1.66469 8.86887 1.62513 8.99911 1.62482H8.99962C8.99965 1.62482 8.99968 1.62482 8.99971 1.62482C9.1303 1.62486 9.25784 1.66434 9.36562 1.73809C9.47342 1.81186 9.55642 1.91647 9.60375 2.03822L9.60374 2.03822L9.60508 2.0416L11.1542 5.9423L11.2702 6.23458L11.5839 6.25653L15.7598 6.54877L15.7622 6.54893C15.8928 6.55746 16.0178 6.60515 16.1209 6.6858C16.2239 6.76644 16.3003 6.87628 16.3401 7.00099Z" stroke="#FFD600"/>
        </svg>
    `;
    }
    const ratingInput = createElement('input', {
        type: 'hidden',
        name: 'rating',
        class: 'rating__input',
    }, rating);

    ratingController(rating, ratingInput);

    createElement('button', {
        class: 'form__submit',
        textContent: 'Опубликовать отзыв',
    }, wrapperSendReview);


    const closeBtn = createElement('button', {
        class: 'modal__close',
    }, container);
    closeBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.75 5.25L5.25 18.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18.75 18.75L5.25 5.25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;

} 
