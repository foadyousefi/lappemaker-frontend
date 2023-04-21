import { browser } from '$app/environment';
import { writable, readable } from 'svelte/store';

interface Background {
    id: number;
    name: string;
    value: string;
    category: string;
}

const backgroundsArray:Background[] = [
    {
        id: 1,
        name: 'Orange',
        value: 'tomato',
        category: 'solidColor'
    },
    {
        id: 2,
        name: 'Rød',
        value: 'red',
        category: 'solidColor'
    },
    {
        id: 3,
        name: 'Grønn',
        value: 'green',
        category: 'solidColor'
    },
    {
        id: 4,
        name: 'Blå',
        value: 'blue',
        category: 'solidColor'
    },
    {
        id: 5,
        name: 'Rosa',
        value: 'pink',
        category: 'solidColor'
    },
    {
        id: 6,
        name: 'Lilla',
        value: 'purple',
        category: 'solidColor'
    },
    {
        id: 7,
        name: 'Turkis',
        value: 'turquoise',
        category: 'solidColor'
    },
    {
        id: 8,
        name: 'Gul',
        value: 'yellow',
        category: 'solidColor'
    },
    {
        id: 9,
        name: 'Hvit',
        value: 'white',
        category: 'solidColor'
    },
    {
        id: 10,
        name: 'Pink cloud',
        value: 'backgrounds/pattern/pink-cloud.jpg',
        category: 'pattern'
    },
    {
        id: 11,
        name: 'Red color mix',
        value: 'backgrounds/pattern/red-color-mix.jpg',
        category: 'pattern'
    },
    {
        id: 12,
        name: 'Blue color mix',
        value: 'backgrounds/pattern/blue-color-mix.jpg',
        category: 'pattern'
    },
    {
        id: 13,
        name: 'Green bokeh',
        value: 'backgrounds/pattern/green-bokeh.jpg',
        category: 'pattern'
    },
    {
        id: 14,
        name: 'Green wall',
        value: 'backgrounds/pattern/green-wall.jpg',
        category: 'pattern'
    }
]
const defaultBackground:Background = backgroundsArray[1]
const selected = browser ? JSON.parse(window.localStorage.getItem('selected_background')) ?? defaultBackground : defaultBackground;
const selectedBackground = writable<Background>(selected);
selectedBackground.subscribe((value:Background) => {
    if (browser) {
        window.localStorage.setItem('selected_background', JSON.stringify(value));
    }
});

const backgrounds = readable<Background[]>(backgroundsArray, set => {
    set(backgroundsArray);
});
export { backgrounds, selectedBackground };