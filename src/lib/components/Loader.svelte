<div class="loader"></div>

<style lang="scss">
  .loader {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 5px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
      content: '';
      left: 0;
      width: 100%;
      height: 10px;
      background-color: tomato;
      animation: loader 1s linear infinite;
      transform: scaleX(0);
      transform-origin: left;
    }
  }

  @keyframes loader {
    0% {
      transform-origin: left;
      transform: scaleX(0);
    }
    49% {
      transform-origin: left;
      transform: scaleX(1);
    }
    55% {
      transform-origin: right;
      transform: scaleX(1);
    }
    100% {
      transform-origin: right;
      transform: scaleX(0);
    }
  }
</style>