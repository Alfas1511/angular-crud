import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Empservice } from '../empservice';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
  providers: [Empservice],
})
export class Register implements OnInit {
  id: any = '';
  eno: any = '';
  ename: any = '';
  salary: any = '';
  employeeList: any = [];

  isCreateMode: boolean = true;
  isUpdateMode: boolean = false;

  empData: any;

  formData: any;

  constructor(private empservice: Empservice) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.empservice.getUsers().subscribe((reg) => {
      this.employeeList = reg;
    });
  }

  register() {
    const formData = { eno: this.eno, ename: this.ename, salary: this.salary };
    this.empservice.saveEmployee(formData).subscribe({
      next: () => {
        this.getEmployees();
        this.resetForm();
      },
      error: (err) => {
        console.error('Save failed:', err); // Check your console if it fails
      },
    });
  }

  view(id: any) {
    this.empservice.viewEmployee(id).subscribe((data: any) => {
      this.id = data.id;
      this.eno = data.eno;
      this.ename = data.ename;
      this.salary = data.salary;
      this.isUpdateMode = true; // Switch to update mode
    });
  }

  update() {
    const formData = { id:this.id, eno: this.eno, ename: this.ename, salary: this.salary };
    this.empservice.updateEmployee(this.id, formData).subscribe({
      next: () => {
        this.getEmployees();
        this.resetForm();
      },
      error: (err) => {
        console.error('Update failed:', err); // Check your console if it fails
      },
    });
  }

  delete(id: any) {
    this.empservice.deleteEmployee(id).subscribe({
      next: () => {
        this.getEmployees();
      },
      error: (err) => {
        console.error('Delete failed:', err); // Check your console if it fails
      },
    });
  }

  resetForm() {
    this.id = '';
    this.eno = '';
    this.ename = '';
    this.salary = '';
    this.isUpdateMode = false;
  }
}
