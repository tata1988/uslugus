import { comment } from "postcss";
import { createElement } from "./createElement";
import { createStars } from "./createStars";

export const createReview = comments => {
    const reviewList = createElement('ul', {
        class: 'review__list',
    });

    comments.forEach(comment => {
        const reviewItem = createElement('li', {
            class: 'review__item',
        }, reviewList);

        createElement('h4', {
            class: 'review__name',
            textContent: comment.name
        }, reviewItem);

        const stars = createStars(comment.stars);
        stars.classList.add('review__stars');
        reviewItem.append(stars);

        createElement('p', {
            class: 'review__text',
            textContent: comment.text
        }, reviewItem);
    });

    return reviewList;
}