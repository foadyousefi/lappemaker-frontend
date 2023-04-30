<script>
  import { onMount } from 'svelte';

  export let data

  let isError = false

  onMount(async () => {
    isError = true
  })

</script>

<h1>This is checkout</h1>
<h2>If you are here, it means something is wrong!</h2>