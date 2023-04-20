import { browser } from '$app/environment';
import { writable, readable } from 'svelte/store';

interface Icon {
    id: number;
    name: string;
    path: string;
    category: string;
}

const iconsArray:Icon[] = [
    {
        id: 1,
        name: 'Bear',
        path: 'icons/animals/bear.svg',
        category: 'animals'
    },
    {
        id: 2,
        name: 'rabbit',
        path: 'icons/animals/rabbit.svg',
        category: 'animals'
    },
    {
        id: 3,
        name: 'Viking kid',
        path: 'icons/figures/viking.svg',
        category: 'figures'
    },
    {
        id: 4,
        name: 'Skating girl',
        path: 'icons/figures/skating.svg',
        category: 'figures'
    },
    {
        id: 5,
        name: 'Cake',
        path: 'icons/food/cake.svg',
        category: 'food'
    },
    {
        id: 6,
        name: 'Diamond',
        path: 'icons/unicorn/diamond.svg',
        category: 'unicorn'
    },
    {
        id: 7,
        name: 'Muffins',
        path: 'icons/unicorn/muffins.svg',
        category: 'food'
    },
    {
        id: 8,
        name: 'Portrait',
        path: 'icons/unicorn/portrait.svg',
        category: 'unicorn'
    },
    {
        id: 9,
        name: 'Rainbow',
        path: 'icons/unicorn/rainbow.svg',
        category: 'unicorn'
    },
    {
        id: 10,
        name: 'Running',
        path: 'icons/unicorn/running.svg',
        category: 'unicorn'
    }
]
const defaultIcon:Icon = iconsArray[7]
const selected = browser ? JSON.parse(window.localStorage.getItem('selected_icon')) ?? defaultIcon : defaultIcon;
const selectedIcon = writable<Icon>(selected);
selectedIcon.subscribe((value:Icon) => {
    if (browser) {
        window.localStorage.setItem('selected_icon', JSON.stringify(value));
    }
});

const icons = readable<Icon[]>(iconsArray, set => {
    set(iconsArray);
});
export { icons, selectedIcon };