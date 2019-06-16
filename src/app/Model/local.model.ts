import { Injectable } from '@angular/core';

import { User } from './user.model';


@Injectable({providedIn: "root"})
export class LocalService{

    private isUserLoggedIn;
    public usserLogged:User;

    constructor() { 
        this.isUserLoggedIn = false;
    }

    updateUser(user:User){
        this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    }



    getUSer():User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

}