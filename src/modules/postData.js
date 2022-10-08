import { CustomError } from "./CustomError";

export const postData = async (url, data, method = 'POST') => {
    try {
        const respons = await fetch(url, {
            method,
            body: JSON.stringify(data),
        });
        if (respons.ok) {
            return await respons.json();
        } else {
            throw new CustomError(await respons.json());
        }
    } catch (e) {
        return e.data || e;
    }

}