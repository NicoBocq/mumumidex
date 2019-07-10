<template>
 <header>
  <h1 class="text-shadow-drop-center">
    MumUMidex Challenge
  </h1>
 </header>
</template>

<style>

h1 {
  font-size:1.6em;
  font-weight: 700;
  margin:1rem 0;
}

.text-shadow-drop-center {
	-webkit-animation: text-shadow-drop-center 0.6s both;
	        animation: text-shadow-drop-center 0.6s both;
}

@-webkit-keyframes text-shadow-drop-center {
  0% {
    text-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    text-shadow: 0 0 18px rgba(0, 0, 0, 0.35);
  }
}
@keyframes text-shadow-drop-center {
  0% {
    text-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    text-shadow: 0 0 18px rgba(0, 0, 0, 0.35);
  }
}

</style>

