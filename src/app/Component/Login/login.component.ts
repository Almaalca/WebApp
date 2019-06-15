import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class Login {
  
  title = 'WebApp';
  isError= false;
  current =false;
  error="";
  token="";

  constructor(private httpClient: HttpClient) {};


 sendRequestPost(email,password,app){

  var re =/@/gi;
  var eMail = email.replace(re,'%40');
  var apiURL = "https://dev.tuten.cl:443/TutenREST/rest/user/"+eMail;
  
   // Http Options
   var httpOptions = {
        headers: new HttpHeaders({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'password':password,
                    'app':app
                                })
    }  



  this.httpClient.put(apiURL,{},httpOptions).subscribe(
    data  => {
      console.log("POST Request is successful ", data);
      this.current =true;
      this.isError =false;
      this.token=data['sessionTokenBck'];

    }, error  => {//por seguridad no se especifica al usuario el error.
      this.error = "Usuario Incorrecto!"
      this.isError= true;
      this.current =false;
     
    }
  );
}


login(from){

  if(from.valid){
    this.sendRequestPost(from.value['email'],from.value['password'],from.value['app']);
  }else{
    this.error = "Verificar todos los campos"
    this.isError= true;
    this.current =false;
  }
  
}


}




