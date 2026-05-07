import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector:    'app-users',
  standalone:  false,
  templateUrl: './users.html',
  styleUrl:    './users.css'
})
export class Users implements OnInit {
  
  titulo = 'Usuarios registrados';
  data: any = [];
  cargando: boolean = false;
  error: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.cargando = true;
    // El interceptor agrega el token automaticamente a esta peticion
    this.http.get('https://fakestoreapi.com/users').subscribe(
      (response) => { this.data = response; this.cargando = false; },
      (error)    => { 
        console.error('Error:', error); 
        this.cargando = false;
        this.error = 'No se pudieron cargar los usuarios.';
       }
    );

  }
}