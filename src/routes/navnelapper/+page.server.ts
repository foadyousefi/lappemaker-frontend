import { get } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({fetch}) => {
    try {
        const response = await get('11');

        const res = await response.json();
        return { ...res };
    } catch (error) {
        console.log(error)
    }
}
