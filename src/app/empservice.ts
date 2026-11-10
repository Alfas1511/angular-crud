import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';

// @Service()
@Injectable({
  providedIn: 'root',
})
export class Empservice {
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.apiUrl);
  }

  viewEmployee(id: any) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  saveEmployee(formData: any) {
    return this.http.post(this.apiUrl, formData);
  }

  updateEmployee(id: any, formData: any) {
    // Crucial: Append ID to the URL for proper REST routing
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  deleteEmployee(eno: any) {
    return this.http.delete(`${this.apiUrl}/${eno}`);
  }
}

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class Empservice {
//   // Base URL for your JSON server / backend API
//   private apiUrl = 'http://localhost:3000/employees';

//   constructor(private http: HttpClient) {}

//   getUsers() {
//     return this.http.get(this.apiUrl);
//   }

//   saveEmployee(formData: any) {
//     return this.http.post(this.apiUrl, formData);
//   }
// }
