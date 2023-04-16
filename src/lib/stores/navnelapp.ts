import { browser } from '$app/environment';
import { writable } from 'svelte/store';

interface Inputs {
    firstInput: string;
    secondInput: string;
    thirdInput: string;
    showIcon: boolean;
}

const defaultValue:Inputs = {
    firstInput: '',
    secondInput: '',
    thirdInput: '',
    showIcon: true
}
const initialValue = browser ? JSON.parse(window.localStorage.getItem('navnelapp_inputs')) ?? defaultValue : defaultValue;

const navnelapp = writable<Inputs>(initialValue);

navnelapp.subscribe((value:Inputs) => {
    if (browser) {
        window.localStorage.setItem('navnelapp_inputs', JSON.stringify(value));
    }
});

export default navnelapp;