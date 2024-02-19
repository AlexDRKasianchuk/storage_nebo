/* LOCAL */
export const getDataFromLocalStorage = (field?: string) => {
    if (field) {
       const data = localStorage.getItem(field)
       if (data) {
            return '{' + field + ": " + data + '}';
        } else {  
            return 'Item with field = '+ field +' was not found';
        }
       
    }
    return 'Item was not found';
};
export const saveDataInLocalStorage = (value: string, field: string) => {
    localStorage.setItem(field, value);
};
export const removeDataFromLocalStorage = (field?: string) => {
    if (field) {
        return localStorage.removeItem(field);
     }
     return 'Item was not found';
};


/* SESSION */
export const getDataFromSessionStorage = (field?: string) => {
    if (field) {
        const data = sessionStorage.getItem(field)
        if (data) {
            return '{' +field+ ": " +data+'}';
        } else {  
            return 'Item with field = '+ field +' was not found';
        }
     }
     return 'Item was not found';
};
export const saveDataInSessionStorage = (value: string, field: string) => {
    sessionStorage.setItem(field, value);
};
export const removeFromSessionStorage = (field?: string) => {
    if (field) {
        return sessionStorage.removeItem(field);
     }
     return 'Item was not found';
};

/* COOKIE */
export const getDataFromCookie = (field?: string) => {
    if (field) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + field.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
          return matches ? '{' + field + " = " +  decodeURIComponent(matches[1]) + '}' : 'Item was not found';
     }
     return 'Item was not found';
};
export const saveCookie = (value: string, field: string, time?: string) => {
    document.cookie = field +'='+ value + '; max-age=' + time;
};
export const removeCookie = (field?: string) => {
    if (field) {
        document.cookie = field +'= ; max-age=0';
    }
};