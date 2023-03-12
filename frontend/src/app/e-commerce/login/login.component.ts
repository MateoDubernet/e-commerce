import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('password') public txtPassword: TextBoxComponent;

  public users: User[];
  public submitForm: boolean;
  public wrongInput: boolean;

  public emailPattern = "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*";
  public loginForm: UntypedFormGroup = new UntypedFormGroup({
    'email': new UntypedFormControl('', Validators.pattern(this.emailPattern)),
    'password': new UntypedFormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  ngAfterViewInit(){
    this.txtPassword.input.nativeElement.type = 'password';
  }

  removeTabindexOnCLearButton(value: string){
    if(value){
      setTimeout(()=>{
        document.querySelectorAll(".k-clear-value").forEach(e=>e.removeAttribute("tabindex"));
      });
    }
  }
  
  public signIn() {

    this.submitForm = true;

    this.loginForm.markAllAsTouched();
    if (!this.loginForm.valid) return;

    this.users.forEach(user => {
      if (user.email === this.loginForm.value.email && user.password === this.loginForm.value.password) {

        localStorage.setItem('userId', user.id.toLocaleString());

        this.router.navigate(["/home"], { state: { isPasswordExpired: true } })
      } else {
        this.wrongInput = true;
      }
    });
  }
}
