<script>
    import { onMount } from 'svelte';
    import navnelapp from '$lib/stores/navnelapp';
    import CanvasNavnelapp from '$lib/CanvasNavnelapp.svelte';
    import { selectedFont } from '$lib/stores/fonts';

    let firstInput = ''
    let secondInput = ''
    let thirdInput = ''
    let showIcon = true

    onMount(() => {
      firstInput = $navnelapp.firstInput
      secondInput = $navnelapp.secondInput
      thirdInput = $navnelapp.thirdInput
      showIcon = $navnelapp.showIcon
  })
</script>


<CanvasNavnelapp {showIcon} {firstInput} {secondInput} {thirdInput} index="top" fontFamily={$selectedFont} />