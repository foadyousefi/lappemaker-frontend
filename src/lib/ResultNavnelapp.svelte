<script>
  import { icons, selectedIcon } from '$lib/stores/icons';
  import { backgrounds, selectedBackground } from '$lib/stores/backgrounds';
  import { fonts, selectedFont, colors, selectedColor } from '$lib/stores/fonts';
  export let showIcon
  export let firstInput
  export let secondInput
  export let thirdInput
  export let firstFont
  export let secondFont
  export let thirdFont

</script>

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

<style lang="scss">

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
</style>