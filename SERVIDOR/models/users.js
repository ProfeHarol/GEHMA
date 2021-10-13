import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
 username: {type: String, required: [true, 'Nombre de Usuario']},
 password: String,
 date:{type: Date, default: Date.now},
 activo: {type: Boolean, default: true}
});
// Convertir a modelo
const Usuario = mongoose.model('Users', usuarioSchema);
export default Usuario;