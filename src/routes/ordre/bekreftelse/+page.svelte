<script>
  import { onMount } from 'svelte';

  export let data

  onMount(async () => {
  })

  let customer = data.customer

  console.log('Data from Session: ', data)
</script>

<h1>Ordren motatt <u>{customer.name}</u></h1>
<h2></h2>
<pre>{JSON.stringify(customer)}</pre>