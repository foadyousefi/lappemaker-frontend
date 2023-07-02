<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import navnelapp from '$lib/stores/navnelapp';
  import CanvasNavnelapp from '$lib/CanvasNavnelapp.svelte';
  import { iconCategories, icons, selectedIcon } from '$lib/stores/icons';
  import { backgroundCategories, backgrounds, selectedBackground } from '$lib/stores/backgrounds';
  import { colors, fonts, selectedColor, selectedFont } from '$lib/stores/fonts';
  import { cartItems, minicartOpen } from '$lib/stores/cartItems';

  export let data: PageData;

  let firstInput = ''
  let secondInput = ''
  let thirdInput = ''
  let selectedModifier = 'icons'
  let showIcon = true
  let selectedIconCategory = 'all'
  let selectedBackgroundCategory = 'all'
  let price = 120

  onMount(() => {
      firstInput = $navnelapp.firstInput
      secondInput = $navnelapp.secondInput
      thirdInput = $navnelapp.thirdInput
      showIcon = $navnelapp.showIcon
      if (data && data.price) {
        price = data.price
      }
  })

  const inputStorage = () => {
    navnelapp.set({firstInput, secondInput, thirdInput, showIcon})
  }

  const selectIcon = (icon) => {
    selectedIcon.set(icon)
  }

  const selectBackground = (bg) => {
    selectedBackground.set(bg)
  }

  const selectFont = (font) => {
    selectedFont.set(font)
  }

  const selectColor = (color) => {
    selectedColor.set(color)
  }

  const selectIconCategory = (category) => {
    selectedIconCategory = category
  }

  const selectBackgroundCategory = (category) => {
    selectedBackgroundCategory = category
  }

  const stringId = (id) => {
    return id === 0 ? 'one' : id === 1 ? 'two' : id === 2 ? 'three' : 'four'
  }

  const uuid4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  const addToCart = async () => {
    const design = document.getElementById('resultImageCanvastop').toDataURL('image/png')
    const res = await fetch('/api/navnelapp/design', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({design})
    })
    const designStore = await res.json()
    const cartItem = {
      id: uuid4(),
      productId: data.id,
      title: data.name,
      fontFamily: $selectedFont.family,
      color: $selectedColor,
      background: $selectedBackground,
      icon: $selectedIcon,
      price: data.price,
      quantity: 1,
      firstInput,
      secondInput,
      thirdInput,
      designPath: designStore.url,
    }
    cartItems.update(items => items ? [cartItem, ...items] : [cartItem])
    minicartOpen.set(true)
  }

</script>

<svelte:head>
  <title>Navnelapper</title>
  <meta name="description" content="Klistrelapper til klær og eiendeler" />
</svelte:head>

<section>
  {#if data.images.length}
    <img src={data.images[0].src} alt={data.images[0].alt}>
  {/if}
  <h1>Navnelapper til klær og eiendeler</h1>
  <div class="designer">
    <div class="design">
      <div class="designer-form">
        <div class="input">
          <input typeof="text" on:keyup={inputStorage} bind:value={firstInput} placeholder="Skriv noe her, for eks fornavn" aria-label="Skriv noe her, for eksempel fornavn" maxlength="17">
          <div class="indicator">{firstInput.length} / 17</div>
        </div>
        <div class="input">
          <input typeof="text" on:keyup={inputStorage} bind:value={secondInput} placeholder="Skriv noe her, for eks etternavn" aria-label="Skriv noe her, for eksempel etternavn" maxlength="17">
          <div class="indicator">{secondInput.length} / 17</div>
        </div>
        <div class="input">
          <input typeof="text" on:keyup={inputStorage} bind:value={thirdInput} placeholder="Skriv noe her, for eks mobilnummer" aria-label="Skriv noe her, for eksempel mobilnummer" maxlength="17">
          <div class="indicator">{thirdInput.length} / 17</div>
        </div>
      </div>
      <div class="preview">
        <CanvasNavnelapp {showIcon} {firstInput} {secondInput} {thirdInput} index="top" fontFamily={$selectedFont} />
      </div>
    </div>
    <div class="order-actions">
      <p>Navnelapper som klistres enkelt på klær, sko og utstyr. Tåler 60 graders vask, tørketrommel og oppvaskmaskin.</p>
      <p>kr {price} per sett 120 stk, 30x13mm</p>
      <div class="actions">
        <button class="add-to-cart" on:click={addToCart}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.95238 15.873C4.86111 15.873 3.97817 16.7659 3.97817 17.8571C3.97817 18.9484 4.86111 19.8413 5.95238 19.8413C7.04365 19.8413 7.93651 18.9484 7.93651 17.8571C7.93651 16.7659 7.04365 15.873 5.95238 15.873ZM15.873 15.873C14.7817 15.873 13.8988 16.7659 13.8988 17.8571C13.8988 18.9484 14.7817 19.8413 15.873 19.8413C16.9643 19.8413 17.8571 18.9484 17.8571 17.8571C17.8571 16.7659 16.9643 15.873 15.873 15.873ZM6.12103 12.6488L6.15079 12.5298L7.04365 10.9127H14.4345C15.1786 10.9127 15.8333 10.506 16.1706 9.89087L20 2.93651L18.2738 1.98413H18.2639L17.1726 3.96825L14.4345 8.92857H7.47024L7.34127 8.66071L5.11905 3.96825L4.17659 1.98413L3.24405 0H0V1.98413H1.98413L5.55556 9.51389L4.21627 11.9444C4.05754 12.2222 3.96825 12.5496 3.96825 12.8968C3.96825 13.9881 4.86111 14.881 5.95238 14.881H17.8571V12.8968H6.36905C6.24008 12.8968 6.12103 12.7877 6.12103 12.6488Z" fill="white"/>
          </svg>
          <span>Legg i handlekurv</span>
        </button>
        <button class="show-preview" on:click={addToCart}>
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.11138 8.58242C6.11138 5.87359 8.30002 3.67818 11.0005 3.67818C13.7009 3.67818 15.8896 5.87359 15.8896 8.58242C15.8896 11.2912 13.7009 13.4867 11.0005 13.4867C8.30002 13.4867 6.11138 11.2912 6.11138 8.58242ZM11.0005 11.6476C12.6887 11.6476 14.0562 10.2759 14.0562 8.58242C14.0562 6.88892 12.6887 5.51727 11.0005 5.51727C10.9737 5.51727 10.9508 5.51727 10.8897 5.51727C10.9737 5.71267 11.0005 5.91957 11.0005 6.1303C11.0005 7.4828 9.90425 8.58242 8.55593 8.58242C8.34585 8.58242 8.13959 8.5556 7.94479 8.47131C7.94479 8.53261 7.94479 8.5556 7.94479 8.54794C7.94479 10.2759 9.31221 11.6476 11.0005 11.6476ZM3.64468 3.08814C5.44295 1.4115 7.91424 0 11.0005 0C14.0867 0 16.558 1.4115 18.357 3.08814C20.1446 4.75098 21.3402 6.70885 21.9055 8.11115C22.0315 8.41383 22.0315 8.751 21.9055 9.05368C21.3402 10.4215 20.1446 12.3794 18.357 14.0767C16.558 15.7549 14.0867 17.1648 11.0005 17.1648C7.91424 17.1648 5.44295 15.7549 3.64468 14.0767C1.8571 12.3794 0.662325 10.4215 0.0940054 9.05368C-0.0313351 8.751 -0.0313351 8.41383 0.0940054 8.11115C0.662325 6.70885 1.8571 4.75098 3.64468 3.08814ZM11.0005 1.83909C8.51009 1.83909 6.46278 2.97319 4.89292 4.43297C3.42237 5.80463 2.40712 7.3985 1.88842 8.58242C2.40712 9.73185 3.42237 11.3602 4.89292 12.7319C6.46278 14.1916 8.51009 15.3257 11.0005 15.3257C13.4909 15.3257 15.5382 14.1916 17.108 12.7319C18.5786 11.3602 19.5602 9.73185 20.1141 8.58242C19.5602 7.3985 18.5786 5.80463 17.108 4.43297C15.5382 2.97319 13.4909 1.83909 11.0005 1.83909Z" fill="white"/>
          </svg>            
          <span>Vis</span>
        </button>
      </div>
    </div>
  </div>
  <div class="modifiers">
    <div class="modifier-selectors">
      <div class="icon-selector {selectedModifier === 'icons' ? 'active' : ''}">
        <button on:click={() => selectedModifier = 'icons'}>Motiv</button>
      </div>
      <div class="background-selector {selectedModifier === 'background' ? 'active' : ''}">
        <button on:click={() => selectedModifier = 'background'}>Bakgrunn</button>
      </div>
      <div class="font-selector {selectedModifier === 'font' ? 'active' : ''}">
        <button on:click={() => selectedModifier = 'font'}>Tekst</button>
      </div>
    </div>
    <div class="modifier-options">
      {#if selectedModifier === 'icons'}
        <div class="icons-section">
          <div class="section-filters">
            <label class="switch">
              <input type="checkbox" bind:checked={showIcon} on:change={inputStorage}>
              <span class="slider">
                <span class="slide"></span>
              </span>
              <span class="switch-text">Motiv av og på</span>
            </label>
            <div class="icon-categories">
              {#each $iconCategories as cat}
                <button class="{selectedIconCategory === cat.id ? 'selected' : ''}" on:click={() => selectIconCategory(cat.id)}>{cat.name}</button>
              {/each}
            </div>
          </div>
          <div class="icons">
            {#each $icons as icon}
              {#if selectedIconCategory === 'all' || icon.category === selectedIconCategory}
                <img class="{$selectedIcon.id === icon.id ? 'selected' : ''}" src={icon.path} alt={icon.name} on:click={() => selectIcon(icon)}>
              {/if}
            {/each}
          </div>
        </div>
      {/if}
      {#if selectedModifier === 'background'}
        <div class="backgrounds-section">
          <div class="section-filters">
            <div class="background-categories">
              {#each $backgroundCategories as bgCat}
                <button
                        class="{selectedBackgroundCategory === bgCat.id ? 'selected' : ''}"
                        on:click={() => selectBackgroundCategory(bgCat.id)}>{bgCat.name}</button>
              {/each}
            </div>
          </div>
          <div class="backgrounds">
            {#each $backgrounds as background}
              {#if selectedBackgroundCategory === 'all' || background.category === selectedBackgroundCategory}
                {#if background.category === 'solidColor'}
                  <svg
                          class="background-option {$selectedBackground.id === background.id ? 'selected' : ''}"
                          on:click={() => selectBackground(background)}
                          width="190" height="82.13" viewBox="0 0 190 82.13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="190" height="82.13" rx="9" fill={background.value}/>
                  </svg>
                {:else}
                  <img
                          class="background-option {$selectedBackground.id === background.id ? 'selected' : ''}"
                          on:click={() => selectBackground(background)}
                          src={background.value} alt={background.name}>
                {/if}
              {/if}
            {/each}
          </div>
        </div>
      {/if}
      {#if selectedModifier === 'font'}
        <div class="fonts-section">
          <h2>Velg skrift type</h2>
          <div class="fonts">
            {#each $fonts as font, i}
              <CanvasNavnelapp {showIcon} {firstInput} {secondInput} {thirdInput} index={stringId(i)} fontFamily={font} isFonts on:selectFont={() => selectFont(font)} />
            {/each}
          </div>
          <h2>Velg tekst farge</h2>
          <div class="font-colors">
            {#each $colors as color}
              <div class="color-option {$selectedColor === color ? 'selected' : ''}" style="background-color: {color}" on:click={() => selectColor(color)}></div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<style lang="scss">
  section {
    --media-border-radius: 10px;
  }

  h1 {
    margin-top: 1rem;
  }

  .designer {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;

    .design {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr 1fr;
    }
  }

  .designer-form {
    display: flex;
    flex-direction: column;
    place-content: center;
    gap: 0.25rem;

    .input {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      input {
        padding: 0.7rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        font-size: 1rem;
      }

      .indicator {
        position: absolute;
        bottom: 0.5rem;
        right: 0.5rem;
        font-size: 0.75rem;
      }
    }
  }

  .preview {
    display: flex;
    align-items: center;
    justify-content: center;
  }


  .modifiers {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    .modifier-selectors {
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      .icon-selector,
      .background-selector,
      .font-selector {
        button {
          width: 100%;
          padding: 0.7rem;
          border: 1px solid #ccc;
          font-size: 1.2rem;
          cursor: pointer;
          text-align: center;

          &:hover {
            background-color: #ddd;
          }
        }

        &.active button {
          background-color: #ddd;
        }
      }
    }

    .modifier-options {
      .icons-section,
      .backgrounds-section,
      .fonts-section {
        padding: 1rem;
        border: 1px solid #ccc;
      }
    }

    .icons {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 0.5rem;
      margin-top: 1rem;

      img {
        width: 100%;
        height: 100%;
        aspect-ratio: 1/1;
        object-fit: contain;
        cursor: pointer;
        border: 1px solid #ccc;
        border-radius: var(--media-border-radius);
        background-color: #eee;

        &:hover,
        &.selected {
          border: 1px solid tomato;
          background-color: lighten(tomato, 30%);
        }
      }
    }

    .backgrounds {
      display: grid;
      gap: 0.7rem;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));

      > svg,
      > img {
        cursor: pointer;

        &:hover,
        &.selected {
          outline: 3px solid lighten(tomato, 10%);
          border-radius: var(--media-border-radius);
        }
      }
      
      .background-option {
        max-width: 160px;
        height: auto;
        aspect-ratio: 30/13;
        border-radius: var(--media-border-radius);
      }
    }
  }

  .icons-section,
  .backgrounds-section {
    .section-filters {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;

      .icon-categories,
      .background-categories {
        display: flex;
        gap: 1rem;

        button {
          cursor: pointer;
          border: 1px solid #aaa;
          padding: 0.3rem 1rem;
          border-radius: 0.3rem;

          &:hover,
          &.selected {
            color: tomato;
            border: 1px solid tomato;
          }
        }
      }

    }
  }

  .backgrounds-section {
      .section-filters {
        justify-content: flex-end;
      }
  }

  .fonts-section {
    .fonts {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }

    .font-colors {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
      flex-wrap: wrap;

      .color-option {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;

        &:hover,
        &.selected {
          outline: 3px solid lighten(tomato, 10%);
        }
      }
    }
  }

  .switch {
    display: flex;
    align-items: center;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: relative;
      display: inline-block;
      width: 53px;
      height: 26px;
      margin-right: .4rem;

      .slide {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 34px;

        &:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 4px;
          bottom: 3px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
      }
    }

    input:checked + .slider .slide {
      background-color: #2196F3;
    }

    input:focus + .slider .slide {
      box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider .slide:before {
      transform: translateX(26px);
    }
  }

  .order-actions {
    .actions {
      display: flex;
      gap: 1rem;
    }
  }
</style>
