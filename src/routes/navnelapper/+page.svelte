<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import navnelapp from '$lib/stores/navnelapp';
  import { icons, selectedIcon } from '$lib/stores/icons';
  import { backgrounds, selectedBackground } from '$lib/stores/backgrounds';
  import { fonts, selectedFont, colors, selectedColor } from '$lib/stores/fonts';

  export let data: PageData;

  let firstInput = ''
  let secondInput = ''
  let thirdInput = ''
  let selectedModifier = 'icons'
  let showIcon = true

  onMount(() => {
      firstInput = $navnelapp.firstInput
      secondInput = $navnelapp.secondInput
      thirdInput = $navnelapp.thirdInput
      showIcon = $navnelapp.showIcon
  })

  $: inputsFilled = (firstInput.length > 0) + (secondInput.length > 0) + (thirdInput.length > 0)
  $: maxFontSize = 70 - ((inputsFilled - 1) * 3)
  $: firstFont = maxFontSize - firstInput.length * 2.4
  $: secondFont = maxFontSize - secondInput.length * 2.4
  $: thirdFont = maxFontSize - thirdInput.length * 2.4

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
        <div class="result-image" style="font-family: {$selectedFont.family};color:{$selectedColor}">
          {#if $selectedBackground}
            {#if $selectedBackground.category === 'solidColor'}
              <svg class="background-image" width="300" height="130" viewBox="0 0 300 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="130" fill={$selectedBackground.value}/>
              </svg>
            {:else}
              <img class="background-image" src={$selectedBackground.value} alt={$selectedBackground.name}>
            {/if}
          {/if}
          {#if showIcon && $selectedIcon}
            <img src={$selectedIcon.path} alt={$selectedIcon.name}>
          {/if}
          <div class="text">
            {#if firstInput.length}
              <div class="first" style="font-size: {firstFont}px;">{firstInput}</div>
            {/if}
            {#if secondInput.length}
              <div class="second" style="font-size: {secondFont}px;">{secondInput}</div>
            {/if}
            {#if thirdInput.length}
              <div class="third" style="font-size: {thirdFont}px;">{thirdInput}</div>
            {/if}
          </div>
        </div>
      </div>
    </div>
    <div class="order-actions">

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
              <div class="all">Alle</div>
              <div class="animals">Dyr</div>
              <div class="figures">Figurer</div>
              <div class="food">Mat</div>
              <div class="unicorns">Enhjørning</div>
            </div>
          </div>
          <div class="icons">
            {#each $icons as icon}
              <img class="{$selectedIcon.id === icon.id ? 'selected' : ''}" src={icon.path} alt={icon.name} on:click={() => selectIcon(icon)}>
            {/each}
          </div>
        </div>
      {/if}
      {#if selectedModifier === 'background'}
        <div class="backgrounds-section">
          <div class="section-filters">
            <div class="background-categories">
              <div class="all">Alle</div>
              <div class="animals">Dyr</div>
              <div class="figures">Figurer</div>
              <div class="food">Mat</div>
              <div class="unicorns">Enhjørning</div>
            </div>
          </div>
          <div class="backgrounds">
            {#each $backgrounds as background}
              {#if background.category === 'solidColor'}
                <svg
                        class="background-option {$selectedBackground.id === background.id ? 'selected' : ''}"
                        on:click={() => selectBackground(background)}
                        width="241" height="101" viewBox="0 0 241 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="241" height="101" rx="14" fill={background.value}/>
                </svg>
              {:else}
                <img
                        class="background-option {$selectedBackground.id === background.id ? 'selected' : ''}"
                        on:click={() => selectBackground(background)}
                        src={background.value} alt={background.name}>
              {/if}
            {/each}
          </div>
        </div>
      {/if}
      {#if selectedModifier === 'font'}
        <div class="fonts-section">
          <h2>Velg en font</h2>
          <div class="fonts">
            {#each $fonts as font}
              <div class="result-image" style="font-family:{font.family};color:{$selectedColor}" on:click={() => selectFont(font)}>
                {#if $selectedBackground}
                  {#if $selectedBackground.category === 'solidColor'}
                    <svg class="background-image" width="300" height="130" viewBox="0 0 300 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="300" height="130" fill={$selectedBackground.value}/>
                    </svg>
                  {:else}
                    <img class="background-image" src={$selectedBackground.value} alt={$selectedBackground.name}>
                  {/if}
                {/if}
                {#if showIcon && $selectedIcon}
                  <img src={$selectedIcon.path} alt={$selectedIcon.name}>
                {/if}
                <div class="text">
                  {#if firstInput.length}
                    <div class="first" style="font-size: {firstFont / 1.2}px;">{firstInput}</div>
                  {/if}
                  {#if secondInput.length}
                    <div class="second" style="font-size: {secondFont / 1.2}px;">{secondInput}</div>
                  {/if}
                  {#if thirdInput.length}
                    <div class="third" style="font-size: {thirdFont / 1.2}px;">{thirdInput}</div>
                  {/if}
                </div>
              </div>
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

  .result-image {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    width: 100%;
    height: 100%;
    background: tomato;
    border-radius: 14px;
    aspect-ratio: 30/13;
    position: relative;
    isolation: isolate;

    .text {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      position: relative;
      top: -2px;
      height: 100%;

      > div {
        line-height: 0.5;
        font-weight: 700;
        z-index: 1;
      }
    }

    img {
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .background-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 14px;
      z-index: 0;
    }
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
        padding: 0.5rem;
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
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));

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
        cursor: pointer;

        .all,
        .animals,
        .figures,
        .food,
        .unicorns {
          border: 1px solid red;
          padding: 0.3rem 1rem;
          border-radius: 0.3rem;

          &:hover {
            color: tomato;
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

      .result-image {
        cursor: pointer;

        &:hover,
        &.selected {
          outline: 3px solid lighten(tomato, 10%);
          border-radius: var(--media-border-radius);
        }
      }
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
</style>
