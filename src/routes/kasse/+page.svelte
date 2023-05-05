<script>
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { cartItems } from "$lib/stores/cartItems";

  export let data
console.log('data', data)
  let isError = false

  onMount(async () => {
    isError = true
  })

  const doPayment = async () => {

    console.log('Do payment')
  }
</script>

<h1>This is checkout</h1>
<h2>If you are here, it means something is wrong!</h2>

<form
        action="?/payment"
        method="post"
        on:submit|preventDefault={doPayment}
        use:enhance={() => {
          // prevent default callback from resetting the form
          return ({ update }) => {
            update({ reset: false });
          };
        }}
>
  <input type="hidden" name="cart_items" value={JSON.stringify($cartItems)} />
  <button class="btn" type="submit">Pay now</button>
</form>