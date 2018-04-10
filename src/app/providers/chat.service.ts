import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import  {Mensaje} from '../interface/mensaje.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {
private itemsCollection: AngularFirestoreCollection<any>;
public chats: Mensaje [] = [];
public usuario: any={};
constructor(private afs: AngularFirestore, public afAuth:AngularFireAuth) {


  this.afAuth.authState.subscribe(user=>{

    console.log("Estado del usuario", user);

    if(!user){
      return;
    }else{
      this.usuario.nombre = user.displayName;
      this.usuario.uid=user.uid;
    }
  })

 }

login(proveedor : string) {
  this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

}
logout() {
  this.afAuth.auth.signOut();

}
cargarMensajes(){
  this.itemsCollection = this.afs.collection<Mensaje>('chats', ref =>ref.orderBy('fecha', 'desc').limit(5));

  return this.itemsCollection.valueChanges().map((mensajes: Mensaje[])=>{
                                              console.log(mensajes);
                                              this.chats=[];
                                              for (let mensaje of mensajes){
                                                this.chats.unshift(mensaje);
                                              }
                                              //this.chats=mensajes;
                                            })
}

agregarMensaje(texto: string){

let mensaje : Mensaje ={
nombre: this.usuario.nombre,
mensaje: texto,
fecha: new Date().getTime(),
uid: this.usuario.uid
}

return this.itemsCollection.add(mensaje);



}
}
