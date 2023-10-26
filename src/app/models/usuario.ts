export interface Usuario {
    uid:string | any; //id para auth de firebase
    nombre:string;
    contrasena:string;
    email:string;
    rol:string;
}