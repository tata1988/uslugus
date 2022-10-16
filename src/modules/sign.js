import { auth } from './auth';
import { avatarController } from './avatarController';
import { API_URL } from './const';
import { createCard } from './createCard';
import { postData } from './postData';

export const signInController = (callback) => {

    const form = document.querySelector('.form-auth');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        const dataResponse = await postData(`${API_URL}/api/service/signin`, data);

        if (dataResponse.errors) {
            console.log(dataResponse.errors) // todo обработка ошибки
            return;
        }

        callback(e);

        auth(dataResponse);
    });
};

export const signUpController = (callback) => {

    const form = document.querySelector('.form-sign-up');

    const crp = avatarController({
        inputFile: '.avatar__input',
        uploadResult: '.avatar__result',
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();

        if (form.password[0].value !== form.password[1].value) {
            console.log('пароли не совп') // todo обработка ошибки
            return;
        }

        //создание объекта с данными, к-ые вводит пользователь при рег-ции
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        data.avatar = await crp.result({
            type: 'base64',
            size: 'viewport',
        });

        // ф-я для отправки данных пользователя после рег-ции на сервер
        const dataResponse = await postData(`${API_URL}/api/service/signup`, data);
        if (dataResponse.errors) {
            console.log(dataResponse.errors) // todo обработка ошибки
            return;
        }

        const servicesList = document.querySelector('.services__list');
        servicesList.append(createCard(dataResponse));

        auth(dataResponse);
        form.reset();
        crp.hideAvatar();
        callback(e);

    })
}