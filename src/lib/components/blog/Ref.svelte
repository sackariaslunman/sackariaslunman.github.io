<script lang="ts">
    import { store } from "./references.ts";
    
    export let ref: string;

    let index = 0;
    let type = " ";

    store.subscribe((value) => {
        Object.keys(value).forEach((key) => {
            if (value[key].includes(ref)) {
                index = value[key].indexOf(ref) + 1;
                type = key.trim();
                type = type.charAt(0).toUpperCase() + type.slice(1) + " ";
            }
        });
    });
</script>

<a href={"#" + ref}>{type}{index}</a>