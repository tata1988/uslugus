import { API_URL, directions } from "./const";
import { createElement } from "./createElement";
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
} 