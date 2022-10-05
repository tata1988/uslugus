export const showPassword = () => {
    const inputPassword = document.querySelectorAll('.form__input_password');
    const btnsEyePassword = document.querySelectorAll('.form__password-eye');

    btnsEyePassword.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('form__password-eye_show');
            inputPassword[i].type = btn.classList.contains('form__password-eye_show')
                ? 'text'
                : 'password';
        })
    })
}