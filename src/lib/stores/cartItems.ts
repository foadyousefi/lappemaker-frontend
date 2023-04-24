import { browser } from '$app/environment';
import { writable, readable } from 'svelte/store';
import { isJsonString } from "$lib/functions";

interface Item {
    id: string;
    productId: number;
    title: string;
    fontFamily: string;
    color: string;
    background: object;
    icon: object;
    price: number;
    quantity: number;
    firstInput: string;
    secondInput: string;
    thirdInput: string;
    design: string;
}

const storeCart = browser ? window.localStorage.getItem('cart_items') : null;
const items:Item[] = browser && isJsonString(storeCart) ? JSON.parse(storeCart) : [];

const cartItems = writable<Item[]>(items);
cartItems.subscribe((value:Item[]) => {
    if (browser) {
        window.localStorage.setItem('cart_items', JSON.stringify(value));
    }
});

const minicartOpen = writable<boolean>(false);
minicartOpen.subscribe((value:boolean) => value);

export { cartItems, minicartOpen };