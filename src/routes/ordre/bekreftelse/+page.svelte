<script>
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { cartItems } from "$lib/stores/cartItems";

  export let data
  let sessionId
  onMount(async () => {
    let searchParams = new URLSearchParams(window.location.search)
    sessionId = searchParams.get('session_id')
  })

  let customer = data.customer

  console.log('Data from Session: ', data)
</script>

<h1>Ordren motatt <u>{customer.name}</u></h1>

<form
        action="?/create_order"
        method="post"
        use:enhance={() => {
          // prevent default callback from resetting the form
          return ({ update }) => {
            update({ reset: false });
          };
        }}
>
  <input type="hidden" name="cart_items" value={JSON.stringify($cartItems)} />
  <input type="hidden" name="session_id" value={sessionId} />
  <button class="btn" type="submit">Pay now</button>
</form>
<pre>{JSON.stringify(customer)}</pre>