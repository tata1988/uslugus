import { API_URL } from "./const";
import { createCard } from "./createCard";
import { getData } from "./getData";


export const renderList = async (url = `${API_URL}/api/service`) => {
    const serviceList = document.querySelector('.services__list');
    serviceList.textContent = '';

    //получение данных с сервера
    const data = await getData(url);

    // перебираю массив с данными и записываю в новый массив cards

    const cards = data.map((createCard));
    serviceList.append(...cards);
}