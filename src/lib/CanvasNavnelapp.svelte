<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { selectedIcon } from '$lib/stores/icons';
  import { selectedBackground } from '$lib/stores/backgrounds';
  import { selectedFont, selectedColor } from '$lib/stores/fonts';
  export let index
  export let showIcon
  export let firstInput
  export let secondInput
  export let thirdInput
  // export let firstFont
  // export let secondFont
  // export let thirdFont
  export let fontFamily
  export let isFonts = false
  let firstY = 100
  let secondY = 100
  let thirdY = 100
  let canImg = ''
  let canvasWidth = 900
  let canvasHeight = 390
  let canvasReady = false

  const dispatch = createEventDispatcher()
  const selectFont = (font) => {
    dispatch('selectFont', font)
  }

  $: inputsFilled = (firstInput.length > 0) + (secondInput.length > 0) + (thirdInput.length > 0)
  $: maxFontSize = canvasWidth / 6 - ((inputsFilled - 1) * 3)
  $: firstFont = maxFontSize - firstInput.length * 5.2
  $: secondFont = maxFontSize - secondInput.length * 5.2
  $: thirdFont = maxFontSize - thirdInput.length * 5.2
  $: firstY = inputsFilled === 1 ? canvasHeight / 2 : inputsFilled === 2 ? canvasHeight / 3 : canvasHeight / 4.4
  $: secondY = inputsFilled === 1 ? canvasHeight / 2 : inputsFilled === 2 && firstInput ? canvasHeight / 1.4 : inputsFilled === 2 && thirdInput ? canvasHeight / 3 : canvasHeight / 2
  $: thirdY = inputsFilled === 1 ? canvasHeight / 2 : inputsFilled === 2 ? canvasHeight / 1.4 : canvasHeight / 1.30

  $: firstInput, secondInput, thirdInput, fontFamily, $selectedIcon, $selectedBackground, $selectedColor, drawCanvas()

  onMount(() => {
    if (browser) {
      canvasReady = true
      setTimeout(() => {
        drawCanvas()
      }, 100)
    }
  })

  $: canvasReady, drawCanvas()

  const drawCanvas = () => {
    if (canvasReady) {
      const canvas = document.getElementById('resultImageCanvas' + index);
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      if ($selectedBackground.category === 'solidColor') {
        ctx.fillStyle = $selectedBackground.value;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = 'transparent';
      }
      ctx.fillStyle = $selectedColor;
      ctx.font = `bold ${firstFont}px ${fontFamily.family}`;
      ctx.fillText(firstInput, canvasWidth * 2 / 3, firstY);
      ctx.font = `bold ${secondFont}px ${fontFamily.family}`;
      ctx.fillText(secondInput, canvasWidth * 2 / 3, secondY);
      ctx.font = `bold ${thirdFont}px ${fontFamily.family}`;
      ctx.fillText(thirdInput, canvasWidth * 2 / 3, thirdY);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.save();
      const image = new Image();
      image.src = $selectedIcon.path;
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvasWidth / 3, canvasHeight);
      }
      ctx.globalCompositeOperation='destination-over'
      if ($selectedBackground.category === 'solidColor') {
        ctx.fillStyle = $selectedBackground.value;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.restore();
      } else {
        const bg = new Image();
        bg.src = $selectedBackground.value;
        bg.onload = () => {
          ctx.drawImage(bg, 0, 0, canvasWidth, canvasHeight);
          ctx.restore();
        }
      }
      setTimeout(() => {
        // canImg = document.getElementById('resultImageCanvas').toDataURL('image/png');
      }, 100)
    }
  }


</script>

<canvas id="{`resultImageCanvas` + index}" class="{isFonts ? 'is-fonts' : ''} {fontFamily.family === $selectedFont.family ? 'selected' : ''}" width="{canvasWidth}" height="{canvasHeight}" on:click={() => selectFont(fontFamily)}></canvas>
<!--<img src="{canImg}" alt="">-->
<style lang="scss">
  [id^="resultImageCanvas"] {
    max-width: 100%;
    border: 1px solid black;
    border-radius: 14px;
  }

  .is-fonts {
    cursor: pointer;

    &:hover,
    &.selected {
      outline: 3px solid lighten(tomato, 10%);
      border-radius: var(--media-border-radius);
    }
  }
</style>