<script>
  import { cartItems, minicartOpen } from "$lib/stores/cartItems";

  $: cartCount = $cartItems ? $cartItems.length : 0;
  $: cartTotal = $cartItems ? $cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;

  const removeProduct = (id) => {
    cartItems.update(items => items.filter(item => item.id !== id));
  }

  const increaseQuantity = (id) => {
    cartItems.update(items => items.map(item => {
      if (item.id === id) {
        item.quantity++
      }
      return item
    }));
  }

  const reduceQuantity = (id) => {
    cartItems.update(items => items.map(item => {
      if (item.id === id) {
        item.quantity--
      }
      return item
    }));
  }

  const onKeyDown = (e) => {
    if ($minicartOpen && e.key === 'Escape') {
      minicartOpen.set(false);
    }
  }

</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />
<div class="header-cart">
  <svg class="cart" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => minicartOpen.set(true)}>
    <path d="M7.7381 20.6349C6.31944 20.6349 5.17163 21.7956 5.17163 23.2143C5.17163 24.6329 6.31944 25.7937 7.7381 25.7937C9.15675 25.7937 10.3175 24.6329 10.3175 23.2143C10.3175 21.7956 9.15675 20.6349 7.7381 20.6349ZM20.6349 20.6349C19.2163 20.6349 18.0685 21.7956 18.0685 23.2143C18.0685 24.6329 19.2163 25.7937 20.6349 25.7937C22.0536 25.7937 23.2143 24.6329 23.2143 23.2143C23.2143 21.7956 22.0536 20.6349 20.6349 20.6349ZM7.95734 16.4435L7.99603 16.2887L9.15675 14.1865H18.7649C19.7321 14.1865 20.5833 13.6577 21.0218 12.8581L26 3.81746L23.756 2.57937H23.7431L22.3244 5.15873L18.7649 11.6071H9.71131L9.54365 11.2589L6.65476 5.15873L5.42956 2.57937L4.21726 0H0V2.57937H2.57937L7.22222 12.3681L5.48115 15.5278C5.2748 15.8889 5.15873 16.3145 5.15873 16.7659C5.15873 18.1845 6.31944 19.3452 7.7381 19.3452H23.2143V16.7659H8.27976C8.1121 16.7659 7.95734 16.624 7.95734 16.4435Z" fill="black"/>
  </svg>
  <span class="cart-count">{cartCount}</span>
</div>
{#if $minicartOpen}
  <div class="mini-cart-open-overlay" on:click={() => minicartOpen.set(false)}></div>
{/if}
<aside class="sidebar-minicart {$minicartOpen ? 'open' : ''}">
  <header>
    <button class="close-minicart" on:click={() => minicartOpen.set(false)}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C4.47656 0 0 4.47656 0 10C0 15.5234 4.47656 20 10 20C15.5234 20 20 15.5234 20 10C20 4.47656 15.5234 0 10 0ZM14.0078 10.8828L9.63281 15.2578C9.14453 15.7461 8.35352 15.7461 7.86523 15.2578C7.37695 14.7695 7.37695 13.9785 7.86523 13.4902L11.3594 10L7.86719 6.50781C7.37891 6.01953 7.37891 5.22852 7.86719 4.74023C8.35547 4.25195 9.14648 4.25195 9.63476 4.74023L14.0098 9.11523C14.2539 9.35938 14.375 9.67969 14.375 10C14.375 10.3203 14.2539 10.6406 14.0078 10.8828Z" fill="#abc"/>
      </svg>
    </button>
    <h2>Handlekurv</h2>
  </header>
  <div class="minicart-items">
    {#each $cartItems as item}
      <article>
        <img class="designed-file" src="{item.design}" alt="" loading="lazy">
        <div class="product-body">
          <div class="product-header">
            <h3>{item.title}</h3>
            <button class="remove-product" on:click={() => removeProduct(item.id)}>
              <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.08929 1.86711L5.41071 2.89474H10.5893L9.91071 1.86711C9.85714 1.7875 9.76786 1.73684 9.67143 1.73684H6.325C6.22857 1.73684 6.13929 1.78388 6.08571 1.86711H6.08929ZM11.3393 0.904605L12.65 2.89474H13.1429H14.8571H15.1429C15.6179 2.89474 16 3.28191 16 3.76316C16 4.24441 15.6179 4.63158 15.1429 4.63158H14.8571V15.6316C14.8571 17.2309 13.5786 18.5263 12 18.5263H4C2.42143 18.5263 1.14286 17.2309 1.14286 15.6316V4.63158H0.857143C0.382143 4.63158 0 4.24441 0 3.76316C0 3.28191 0.382143 2.89474 0.857143 2.89474H1.14286H2.85714H3.35L4.66071 0.900987C5.03214 0.340132 5.65714 0 6.325 0H9.67143C10.3393 0 10.9643 0.340132 11.3357 0.900987L11.3393 0.904605ZM2.85714 4.63158V15.6316C2.85714 16.272 3.36786 16.7895 4 16.7895H12C12.6321 16.7895 13.1429 16.272 13.1429 15.6316V4.63158H2.85714ZM5.71429 6.94737V14.4737C5.71429 14.7921 5.45714 15.0526 5.14286 15.0526C4.82857 15.0526 4.57143 14.7921 4.57143 14.4737V6.94737C4.57143 6.62895 4.82857 6.36842 5.14286 6.36842C5.45714 6.36842 5.71429 6.62895 5.71429 6.94737ZM8.57143 6.94737V14.4737C8.57143 14.7921 8.31429 15.0526 8 15.0526C7.68571 15.0526 7.42857 14.7921 7.42857 14.4737V6.94737C7.42857 6.62895 7.68571 6.36842 8 6.36842C8.31429 6.36842 8.57143 6.62895 8.57143 6.94737ZM11.4286 6.94737V14.4737C11.4286 14.7921 11.1714 15.0526 10.8571 15.0526C10.5429 15.0526 10.2857 14.7921 10.2857 14.4737V6.94737C10.2857 6.62895 10.5429 6.36842 10.8571 6.36842C11.1714 6.36842 11.4286 6.62895 11.4286 6.94737Z" fill="black"/>
              </svg>
            </button>
          </div>
          <div class="product-details">
            <div class="edit-amount">
              <button disabled="{item.quantity === 1}" class="reduce" on:click={() => reduceQuantity(item.id)}>
                <svg width="15" height="4" viewBox="0 0 15 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.9286 0H1.07143C0.479799 0 0 0.479799 0 1.07143V2.14286C0 2.73449 0.479799 3.21429 1.07143 3.21429H13.9286C14.5202 3.21429 15 2.73449 15 2.14286V1.07143C15 0.479799 14.5202 0 13.9286 0Z" fill="black"/>
                </svg>
              </button>
              <input type="number" aria-label="Antall produkter" bind:value={item.quantity}>
              <button aria-label="Øk antall" class="increase" on:click={() => increaseQuantity(item.id)}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.9286 5.89286H9.10714V1.07143C9.10714 0.479799 8.62734 0 8.03571 0H6.96429C6.37266 0 5.89286 0.479799 5.89286 1.07143V5.89286H1.07143C0.479799 5.89286 0 6.37266 0 6.96429V8.03571C0 8.62734 0.479799 9.10714 1.07143 9.10714H5.89286V13.9286C5.89286 14.5202 6.37266 15 6.96429 15H8.03571C8.62734 15 9.10714 14.5202 9.10714 13.9286V9.10714H13.9286C14.5202 9.10714 15 8.62734 15 8.03571V6.96429C15 6.37266 14.5202 5.89286 13.9286 5.89286Z" fill="black"/>
                </svg>
              </button>
            </div>
            <strong>
              <span>kr&nbsp;{item.price * item.quantity},00</span>
            </strong>
          </div>
        </div>
      </article>
    {/each}
  </div>
  <footer>
    <div class="price-details">
        <strong>Delsum:</strong>
        kr {cartTotal},00 (inkl. mva)
    </div>
    <a href="/handlekurv" class="btn">Til kasse</a>
  </footer>
</aside>

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

  .mini-cart-open-overlay {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .sidebar-minicart {
    --minicart-background: #FFF;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    background-color: var(--minicart-background);
    padding: 1rem;
    z-index: 2;
    transition: transform .9s cubic-bezier(.55,0,.1,1),box-shadow .5s ease;
    transform: translate(400px);

    &.open {
      transform: translate(0);
    }

    header {
      h2 {
        font-size: 1.7rem;
        font-weight: 400;
        margin-bottom: 0;
      }

      .close-minicart {
        position: absolute;
        top: 31px;
        left: -30px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        line-height: 1;
        padding: 7px;
        background-color: var(--minicart-background);
        transition: transform 0.2s ease;

        &:hover {
          transform: translateX(3px);
        }
      }
    }

    .minicart-items {
      max-height: calc(100vh - 170px);
      overflow-y: scroll;
    }

    .designed-file {
      border-radius: 9px;
    }

    article {
      margin-block: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #EEE;

      .product-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;
      }

      .remove-product {
        background-color: transparent;

        &:hover {
          svg path {
            fill: tomato;
          }
        }
      }

      .product-details {
        display: flex;
        justify-content: space-between;
      }

      .edit-amount {
        display: flex;
        align-items: center;
        background-color: #EEE;
        border-radius: 8px;

        button {
          display: flex;
          align-items: center;
          height: 100%;
          cursor: pointer;
          transition: transform 0.2s ease;

          &.reduce {
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
          }

          &.increase {
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
          }

          &:not([disabled]):hover {
            background-color: rgb(0 0 0 / .1);

            svg path {
              fill: tomato;
            }
          }
        }

        input {
          max-width: 30px;
          text-align: center;
          border-block: 1px solid #EEE;
          border-inline: none;

          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          &[type=number] {
            -moz-appearance: textfield;
          }
        }
      }
    }

    footer {
      .price-details {
        margin-block: 1rem;
        text-align: center;
      }
    }

  }
</style>