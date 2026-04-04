import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient){}

    getUsers():Observable<User[]>{
       return this.http.get<User[]>("http://localhost:8000/users");
    }

    getUserById(id: number):Observable<User[]>{
        return this.http.get<User[]>(`http://localhost:8000/users/${id}`);
    }

    saveUsers(newUser: User):Observable<User>{
        return this.http.post<User>("http://localhost:8000/users", newUser);
    }
}