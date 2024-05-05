import { Component, OnInit } from '@angular/core';

import { Employee } from './models/employee';
import { EmployeeService } from './service/employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  Employeeary: Employee[]=[];

  Employeeformgroup: FormGroup;
   
    constructor (private empservice: EmployeeService, private fb: FormBuilder){
      this.Employeeformgroup = this.fb.group ({
        id:[""],
        customerName:[""],
        mobileNumber:[""],
        emailAddress:[""] 

      })
    }

    ngOnInit() : void
    {
      this.getemployees();
    
    }

    
    getemployees()
    {
      this.empservice.GetEmployee().subscribe(response => {
        console.log(response);
        this.Employeeary = response;
         
    })
  }
  

    Onsubmit() {
      console.log(this.Employeeformgroup.value);  
      if(this.Employeeformgroup.value.id != null && this.Employeeformgroup.value.id !=""){
        this.empservice.UpdateEmployee(this.Employeeformgroup.value).subscribe(response=> { 
          console.log(response);
          this.getemployees();  
          this.Employeeformgroup.setValue({
            id:"",
            customerName:"",
            mobileNumber:"",
            emailAddress:"",
          })
        })
       }
       else{
        this.empservice.CreateEmployee(this.Employeeformgroup.value).subscribe(response=> { 
          console.log(response);
          this.getemployees();  
          this.Employeeformgroup.setValue({
            id:"",
            customerName:"",
            mobileNumber:"",
            emailAddress:"",
          })
        })
      }      
          
  }

  Fillform(emp:Employee){
    this.Employeeformgroup.setValue({
      id: emp.id,
      customerName: emp.customerName,
      mobileNumber:emp.mobileNumber,
      emailAddress:emp.emailAddress,
    })

  }

  DeleteEmp(id:string)
  {
    this.empservice.DeleteEmp(id).subscribe(response=> { 
      console.log(response);
      this.getemployees();
    
    })
  }

  
  title = 'AngularCrud';
}
