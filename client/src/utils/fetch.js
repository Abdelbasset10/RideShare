import { BASE_URL } from "./globals"

export const fetchFnc = (url,callbackFnc,errorFnc) => {

    url = `${BASE_URL}/${url}`;
    fetch(url).then(callbackFnc).catch(errorFnc);

}