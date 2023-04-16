import { browser } from '$app/environment';
import { writable } from 'svelte/store';

interface Inputs {
    firstInput: string;
    secondInput: string;
    thirdInput: string;
}

const defaultValue:Inputs = {
    firstInput: '',
    secondInput: '',
    thirdInput: ''
}
const initialValue = browser ? JSON.parse(window.localStorage.getItem('navnelapp_inputs')) ?? defaultValue : defaultValue;

const navnelapp = writable<Inputs>(initialValue);

navnelapp.subscribe((value:Inputs) => {
    if (browser) {
        window.localStorage.setItem('navnelapp_inputs', JSON.stringify(value));
    }
});

export default navnelapp;