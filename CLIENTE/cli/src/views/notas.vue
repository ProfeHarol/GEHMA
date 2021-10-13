<template>
  <div class="container">
  <b-alert
    :show="dismissCountDown"
    dismissible
    :variant="mensaje.color"
    @dismissed="dismissCountDown=0"
    @dismiss-count-down="countDownChanged"
    >
    {{mensaje.texto}}
  </b-alert>



    <h1>Registrar Asistencia de Estudiantes</h1>
  <form @submit.prevent="editarNota(notaEditar)" v-if="editar">
  <h3 class="text-center">Edite Asistencia</h3>

    <input type="text" placeholder="Ingrese Nombres Completos" class="form-control my-2" v-model="notaEditar.nombre">
    <input type="text" placeholder="Ingrese Número de Documento de Identidad" class="form-control my-2" v-model="notaEditar.descripcion">
    <b-button class="btn btn-success my-2 mx-2" type="submit">Editar Asistencia</b-button>
    <b-button class="btn  my-2 mx-2"   type="submit" @click="editar=false">Cancelar</b-button>

  </form>

  <form @submit.prevent="agregarNota()" v-if="!editar">
  <h3 class="text-center">Agregue asistencia acontinuación</h3>

    <input type="text" placeholder="Ingrese Nombres Completos" class="form-control my-2" v-model="nota.nombre">
    <input type="text" placeholder="Ingrese Número de Documento de Identidad" class="form-control my-2" v-model="nota.descripcion">
    <b-button class="btn-sm btn-block btn-success"   type="submit">Registrar Asistencia</b-button>
  </form>

    <HelloWorld msg="Welcome to Your Vue.js App"/>
  <table class="table">
  <thead>
    <tr>
      <!-- <th scope="col">#</th> -->
      <th scope="col">Nombres Completos</th>
      <th scope="col">Documento de Identidad</th>
      <th scope="col">Fecha</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
  <tr v-for="(item, index) in notas" :key="index">
    <!-- <th scope="row">{{item._id}}</th> -->
      <td>{{item.nombre}}</td>
      <td>{{item.descripcion}}</td>
      <td>{{item.date}}</td>
      <td>
      <b-button class="btn-warning btn-sm mx-2" @click="activarEdicion(item._id)">Editar</b-button>
      <b-button class="btn-danger btn-sm mx-2"  @click="eliminarNota(item._id)">Eliminar</b-button>
      </td>
    </tr>
  </tbody>
</table>
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
  data() {
      return {
    notas: [],
    mensaje: {color: 'success', texto: ''},
    dismissSecs: 5,
    dismissCountDown: 0,

    nota:{nombre:"",descripcion:""},
    editar:false,
    notaEditar:{}

    }
  
  },

created(){
  this.listarNotas();
 },

methods:{
    cerrarSesion(){
      window.localStorage.removeItem('autenticacion')
      this.$router.push({path: '/login'});
    },

    listarNotas(){
        this.axios.get('nota')
        .then((response) => {
      // console.log(response.data)
        this.notas = response.data;
          })
          .catch((e)=>{
          console.log('error' + e);
          })
    },
        
    agregarNota(){
      this.axios.post('/nueva-nota', this.nota)
        .then(res => {
          // Agrega al inicio de nuestro array notas
          this.notas.push(res.data);
          this.nota.nombre="";
          this.nota.descripcion="";
          // Alerta de mensaje
          this.showAlert();
          this.mensaje.texto = 'Notas Agregada!'
          this.mensaje.color = 'success';
        })
       .catch( e => {
          console.log(e.response);
       })
      
    },
    eliminarNota(id){
         this.axios.delete(`nota/${id}`)
        .then(res => {
            const index = this.notas.findIndex(item=> item._id===res.data._id)
            this.notas.splice(index, 1);
            this.mensaje.texto = 'Nota Eliminada!'
            this.mensaje.color = 'success';
            this.showAlert();
        })
        .catch( e => {
          console.log(e.response);
       })
    },
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
        },
    showAlert() {
        this.dismissCountDown = this.dismissSecs
    },

    activarEdicion(id){
      this.editar = true;
      this.axios.get(`/nota/${id}`)
      .then(res => {
      this.notaEditar = res.data;
      })
      .catch(e => {
        console.log(e.response);
      })
    },
    editarNota(item){
      this.axios.put(`/nota/${item._id}`, item)
      .then(res => {
          const index = this.notas.findIndex(n=> n._id===res.data._id);   
          this.notas[index].nombre=res.data.nombre;
          this.notas[index].descripcion=res.data.descripcion;          
          this.mensaje.texto = 'Nota Editada!';
          this.mensaje.color = 'success';
          this.showAlert(); 
          this.editar=false;
          })
      .catch(e => {
        console.log(e.response);
      })
    },



  }
};
</script>

