import { Component,Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import {User} from '../../Model/user.model'
import { Router } from "@angular/router";
import {LocalService} from '../../Model/local.model'




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
  user:User;


  constructor(private httpClient: HttpClient, private router: Router,private localService: LocalService) {};
  

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
      this.current =true;
      this.isError =false;
      var token=data['sessionTokenBck'];
      this.user = new User(email,"contacto%40tuten.cl",true,app,token);
      this.localService.updateUser(this.user);
      this.router.navigateByUrl("/datagrids").then(e => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });


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




