<template>
  <div id="app">
    <link rel="icon" type="image/ico" href="./assets/img/logogehma.png" />
    <img class="fondoimg" src="./assets/img/fondo.jpg">
    <div id="nav">
      <router-link to="/"><button type="button" class="btn btn-info">Inicio</button></router-link> |
      <router-link to="/about"><button type="button" class="btn btn-info">¿Quienes Somos?</button></router-link> |
      <router-link to="/notas"><button type="button" class="btn btn-info">Registrar Asistencia</button></router-link> |
      <router-link to="/login"><button type="button" class="btn btn-success">Ingresar</button></router-link> |
      <router-link to="/menu"><button type="button" class="btn btn-danger">Cerrar Sesión</button></router-link> 

    </div>
    
    <router-view/>
  </div>
  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

  .fondovideo {
    position: fixed;
    object-fit: contain;
    z-index: -1;
    }

img.fondoimg {
    position: absolute;
    z-index: -99;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    filter: blur(34px);
}
</style>
