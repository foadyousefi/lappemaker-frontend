<script>
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { cartItems } from "$lib/stores/cartItems";

  export let data
  export let form

  let sessionId
  onMount(async () => {
    let searchParams = new URLSearchParams(window.location.search)
    sessionId = searchParams.get('session_id')

    const res = await fetch(`/api/order/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: 'the path'
      })
    })
    const data = await res.json()
    console.log('Data from API: ', data)
  })
$: form, console.log('Form: ', form)
  let customer = data.customer

  console.log('Data from Session: ', data)
</script>

<pre>
  {JSON.stringify(form?.order, null, 2)}
</pre>
<h1>Ordren motatt <u>{customer.name}</u></h1>
<form
        action="?/new_order"
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