<script>
  import { cartItems } from "$lib/stores/cartItems";

  $: cartCount = $cartItems ? $cartItems.length : 0;
</script>

<div class="header-cart">
  <svg class="cart" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.7381 20.6349C6.31944 20.6349 5.17163 21.7956 5.17163 23.2143C5.17163 24.6329 6.31944 25.7937 7.7381 25.7937C9.15675 25.7937 10.3175 24.6329 10.3175 23.2143C10.3175 21.7956 9.15675 20.6349 7.7381 20.6349ZM20.6349 20.6349C19.2163 20.6349 18.0685 21.7956 18.0685 23.2143C18.0685 24.6329 19.2163 25.7937 20.6349 25.7937C22.0536 25.7937 23.2143 24.6329 23.2143 23.2143C23.2143 21.7956 22.0536 20.6349 20.6349 20.6349ZM7.95734 16.4435L7.99603 16.2887L9.15675 14.1865H18.7649C19.7321 14.1865 20.5833 13.6577 21.0218 12.8581L26 3.81746L23.756 2.57937H23.7431L22.3244 5.15873L18.7649 11.6071H9.71131L9.54365 11.2589L6.65476 5.15873L5.42956 2.57937L4.21726 0H0V2.57937H2.57937L7.22222 12.3681L5.48115 15.5278C5.2748 15.8889 5.15873 16.3145 5.15873 16.7659C5.15873 18.1845 6.31944 19.3452 7.7381 19.3452H23.2143V16.7659H8.27976C8.1121 16.7659 7.95734 16.624 7.95734 16.4435Z" fill="black"/>
  </svg>
  <span class="cart-count">{cartCount}</span>
</div>

<style lang="scss">
  svg.cart {
    fill: #000;
    cursor: pointer;

    path {
      transition: fill 0.2s ease;
    }

    &:hover {
      path {
        fill: tomato;
      }
    }
  }

  .header-cart {
    position: relative;

    .cart-count {
      position: absolute;
      top: -7px;
      right: -7px;
      background: tomato;
      color: #fff;
      font-size: 12px;
      font-weight: 400;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
    }
  }
</style>