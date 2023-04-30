import { BASEURL, CLIENTKEY, CLIENTSECRET } from '$env/static/private';

export async function get( resource ) {
    return await fetch(`${BASEURL}/products/${resource}`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${Buffer.from(`${CLIENTKEY}:${CLIENTSECRET}`, 'utf-8').toString('base64')}`
        }
    });
}

export async function post(resource, data) {
    return fetch(`${BASEURL}/${resource}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${CLIENTKEY}:${CLIENTSECRET}`, 'utf-8').toString('base64')}`
        },
        body: data && JSON.stringify(data)
    });
}

export async function put(resource, data) {
    return fetch(`${BASEURL}/${resource}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${CLIENTKEY}:${CLIENTSECRET}`, 'utf-8').toString('base64')}`
        },
        body: data && JSON.stringify(data)
    });
}