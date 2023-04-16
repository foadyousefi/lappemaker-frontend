<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import navnelapp from '$lib/stores/navnelapp';

  export let data: PageData;

  let firstInput = ''
  let secondInput = ''
  let thirdInput = ''

  onMount(() => {
      firstInput = $navnelapp.firstInput
      secondInput = $navnelapp.secondInput
      thirdInput = $navnelapp.thirdInput
  })

  $: inputsFilled = (firstInput.length > 0) + (secondInput.length > 0) + (thirdInput.length > 0)
  $: maxFontSize = 70 - ((inputsFilled - 1) * 3)
  $: firstFont = maxFontSize - firstInput.length * 2.2
  $: firstPosition = (secondInput.length && thirdInput.length) ? '25%' : ((secondInput.length && !thirdInput.length) || (!secondInput.length && thirdInput.length)) ? '35%' : '50%'
  $: secondFont = maxFontSize - secondInput.length * 2.2
  $: secondPosition = (firstInput.length && thirdInput.length) ? '50%' : ((firstInput.length && !thirdInput.length) || (!firstInput.length && thirdInput.length)) ? '65%' : '50%'
  $: thirdFont = maxFontSize - thirdInput.length * 2.2
  $: thirdPosition = (firstInput.length && secondInput.length) ? '75%' : ((firstInput.length && !secondInput.length) || (!firstInput.length && secondInput.length)) ? '65%' : '50%'

  const inputStorage = () => {
    navnelapp.set({firstInput, secondInput, thirdInput})
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
        <div class="image">
          <div class="text">
            <div class="first" style="font-size: {firstFont}px;line-height:{firstFont > 50 ? 0.9 : 1.1}">{firstInput}</div>
            <div class="second" style="font-size: {secondFont}px;line-height:{secondFont > 50 ? 0.9 : 1.1}">{secondInput}</div>
            <div class="third" style="font-size: {thirdFont}px;line-height:{thirdFont > 50 ? 0.9 : 1.1}">{thirdInput}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="actions">

    </div>
  </div>
</section>

<style lang="scss">
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

  .image {
    width: 100%;
    height: 100%;
    background: tomato;
    border-radius: 14px;

    .text {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      aspect-ratio: 30/13;

      > div {
        line-height: 1.1;
        font-weight: 700;
      }
    }
  }
</style>
