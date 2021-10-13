<template>
  <div class="container">
    <h1>Hasta Pronto </h1>
    <img alt="Vue logo" src="../assets/img/adios.gif">
    <p></p>
     <b-button @click="cerrarSesion" variant="danger">Cerrar Sesión</b-button>
  </div>
</template>
<script>
export default {
  name: 'menu',
  beforeCreate(){
    var autenticacion = window.localStorage.getItem('autenticacion')
    if (autenticacion !== 'ok'){
      this.$router.push({path: '/login'});
   }
  },
  methods:{
    cerrarSesion(){
      window.localStorage.removeItem('autenticacion')
      this.$router.push({path: '/login'});
    }
  }
}
</script>