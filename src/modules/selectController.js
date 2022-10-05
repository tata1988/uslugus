export const selectController = ({
    openBtn,
    openBlock,
    closeBtn,
    handlerChange = () => { },
}) => {
    const btn = document.querySelector(openBtn);
    const selectBlock = document.querySelector(openBlock);

    const data = {
        handlerChange,
        onChange: (handlerChange) => {
            data.handlerChange = handlerChange;
        },
        value: '',
    }

    const openSelectBlock = () => {
        selectBlock.style.display = 'block';
    };

    const closeSelectBlock = () => {
        selectBlock.style.display = '';
    };

    const toggleSelectBlock = () => {
        selectBlock.style.display = selectBlock.style.display === 'block' ? '' : 'block';
    };

    btn.addEventListener('click', toggleSelectBlock);

    //ф-я чтобы при клике на li список с категориями закрывался
    selectBlock.addEventListener('click', ({ target }) => {
        const option = target.closest(closeBtn);
        if (option) {
            closeSelectBlock();
            data.value = option.dataset.value
                ? option.dataset.value
                : option.textContent;

            data.handlerChange(data.value);

        }
    })

    return data;
}