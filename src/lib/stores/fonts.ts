import { browser } from '$app/environment';
import { writable, readable } from 'svelte/store';

interface Font {
    id: number;
    family: string;
}

const fontsArray:Font[] = [
    {
        id: 1,
        family: 'Quicksand'
    },
    {
        id: 2,
        family: 'RedHatDisplay'
    },
    {
        id: 3,
        family: 'IndieFlower'
    },
    {
        id: 4,
        family: 'Ubuntu'
    }
]

const colorsArray:string[] = [
    'black',
    'tomato',
    'red',
    'green',
    'blue',
    'pink',
    'purple',
    'turquoise',
    'yellow',
    'white'
]

const defaultFont:Font = fontsArray[0]
const selected = browser ? JSON.parse(window.localStorage.getItem('selected_font')) ?? defaultFont : defaultFont;
const selectedFont = writable<Font>(selected);
selectedFont.subscribe((value:Font) => {
    if (browser) {
        window.localStorage.setItem('selected_font', JSON.stringify(value));
    }
});

const fonts = readable<Font[]>(fontsArray, set => {
    set(fontsArray);
});

const defaultColor:string = colorsArray[0]
const selectedColorDefault = browser ? JSON.parse(window.localStorage.getItem('selected_color')) ?? defaultColor : defaultColor;
const selectedColor = writable<string>(selectedColorDefault);
selectedColor.subscribe((value:string) => {
    if (browser) {
        window.localStorage.setItem('selected_color', JSON.stringify(value));
    }
});
const colors = readable<string[]>(colorsArray, set => {
    set(colorsArray);
});

export { fonts, selectedFont, colors, selectedColor };