import { BASEURL, CLIENTKEY, CLIENTSECRET } from '$env/static/private';

export async function get( resource ) {
    return await fetch(`${BASEURL}/${resource}`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${btoa(`${CLIENTKEY}:${CLIENTSECRET}`)}`
        }
    });
}

export async function post(resource, data) {
    return fetch(`${BASEURL}/${resource}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Basic ${btoa(`${CLIENTKEY}:${CLIENTSECRET}`)}`
        },
        body: data && JSON.stringify(data)
    });
}