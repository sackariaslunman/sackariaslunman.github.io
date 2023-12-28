import {writable} from 'svelte/store';

const {subscribe, update} = writable<{[key: string]: string[]}>({})

export const store = {
	subscribe, 
    // add ref to list
    clear: () => update(s => ({})),
    add: (ref: string, type: string) => update(s => {
        if (!s.hasOwnProperty(type)) {
            s[type] = [];
        }
        if (!s[type].includes(ref)) {
            s[type].push(ref);
        }
        return s
    }),
}