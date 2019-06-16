import { Component,HostListener, ViewChild } from '@angular/core';
import {User} from '../../Model/user.model';
import {DatagridModel} from '../../Model/datagrid.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LocalService} from '../../Model/local.model';
import { Router } from "@angular/router";


@Component({
  selector: 'datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css']
})

export class Datagrid{


  datagrids:DatagridModel[];
  searchText: string = '';
  previous: string;
  datagridsLocal:DatagridModel[];
  selectedValue:string;
  
  constructor(private httpClient: HttpClient,private localService:LocalService,private router: Router) {
    this.datagrids=[];
    this.datagridsLocal=[];
    this.selectedValue="1";

  };


  @HostListener('input') oninput() {
    this.filter();

  }

  ngOnInit(){
    let user:User =   this.localService.getUSer();
    if(user!=null && user.current){
      this.getData(user);   
    }else{
      this.routeToLogin();
    }

  
  }

  getData(user:User){
    var re =/@/gi;
    var eMail = user.email.replace(re,'%40');
    var apiURL = "https://dev.tuten.cl:443/TutenREST/rest/user/"+eMail+"/bookings?current="+user.current;

    // Http Options
   var httpOptions = {
        headers: new HttpHeaders({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'adminemail':user.adminemail,
                    'token':user.token,
                    'app':user.app
                                })
    }  

    this.httpClient.get(apiURL,httpOptions).subscribe((res)=>{    
        
          this.toDatagrid(res);
       }
    );

  }


  toDatagrid(res){
    for (var _i = 0; _i < res.length; _i++) {

      var item =res[_i];
      this.datagrids.push(new DatagridModel(
        res[_i]['bookingId'],res[_i]['locationId']['tutenUser']['firstName'],res[_i]['locationId']['tutenUser']['lastName'],
        res[_i]['bookingTime'],res[_i]['locationId']['streetAddress'],res[_i]['bookingPrice']
      ));    
  }
 
  this.datagridsLocal= this.datagrids;
 
  }


  filter(){
    this.datagrids=[];
    for (var _i = 0; _i < this.datagridsLocal.length; _i++) {
        let id = this.datagridsLocal[_i].bookingId+" ";
        let precio = this.datagridsLocal[_i].bookingPrice+" ";
        if(this.selectedValue=="1"){
          if(id.search(this.searchText)!=-1 || precio.search(this.searchText)!=-1){
            this.datagrids.push(this.datagridsLocal[_i]);
          }
  
        }else if(this.selectedValue=="2"){
          let  numSearch=+this.searchText;
          let numPrecio = +precio;
          if(id.search(this.searchText)!=-1 || numSearch>=numPrecio ){
            this.datagrids.push(this.datagridsLocal[_i]);
          }

        }else{
          let  numSearch=+this.searchText;
          let numPrecio = +precio;
          if(id.search(this.searchText)!=-1 ||numSearch<=numPrecio ){
            this.datagrids.push(this.datagridsLocal[_i]);
          }

        }
    }
  }

  signOff(){
   this.localService.updateUser(null);
   this.routeToLogin();
  }
  routeToLogin(){
    this.router.navigateByUrl("").then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }


  
}