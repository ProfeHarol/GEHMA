<template>
  <div class="row justify-content-md-center  ">
 
   <div class="fondovideo ratio  ratio-16x9">
    <video autoplay muted loop>
      <source src="../assets/video/video1.mp4" type="video/mp4">
    </video>
  </div>

    <b-form class="card col-md-4" style="border-radius: 1.25rem !important;background-color: #ffffff80;"@submit.prevent="buscarUsuario()"  v-if="show">
        <img alt="Vue logo" src="../assets/img/logogehma.png">
      <b-form-group id="input-group-1"
        label="Nombre de Usuario"
        label-for="input-1"
        description="Ingrese el nombre de usuario"
      >
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="text"
          placeholder="Ingrese su nombre de Usuario"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Contraseña" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="Ingrese Contraseña"
          required
        ></b-form-input>
        <p></p>
      </b-form-group>


      <b-button type="submit" variant="primary">Acceder</b-button>
    </b-form>

  </div>
</template>

<script>
export default {
  data(){
    return{
      users: [],
      form:{
        username: '',
        password: ''
        },
      show: true,
    }
  },
    methods: {
      buscarUsuario() {
        console.log("Revision"); 
        this.axios.get('users')
        .then(res =>{
          console.log(res.data);
          this.users = res.data;
          console.log( this.users);
          this.users.forEach((value, index) => {
            console.log(value.username);
            console.log(value.password);
            if(this.form.username === value.username){
              console.log("Usuario existente")
              if(this.form.password === value.password){
                console.log("Contraseña Correcta");
                window.localStorage.setItem('autenticacion','ok');
                this.$router.push({path: '/notas'});
              }
            }
          });
        })
      }
    
    },
      beforeCreate(){
      var autenticacion = window.localStorage.getItem('autenticacion')
        if (autenticacion == 'ok'){
          this.$router.push({path: '/notas'});
      }
    }
}
</script>
  <style type="text/css">
  .fondovideo {
    position: fixed;
    object-fit: contain;
    z-index: -1;
    }
  </style>