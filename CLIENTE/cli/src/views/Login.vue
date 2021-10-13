<template>
  <div class="home">
  
    <HelloWorld msg="Inicio de Sesión"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/CLogin.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
