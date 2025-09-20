import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { BasketService } from '../../services/basket.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('password') public txtPassword: TextBoxComponent;

  public users: User[];
  public userExist = false;
  public registerUser: User;

  public emailPattern = "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*";
  public registerForm: UntypedFormGroup = new UntypedFormGroup({
    'nom': new UntypedFormControl('', [Validators.required]),
    'prenom': new UntypedFormControl('', [Validators.required]),
    'email': new UntypedFormControl('', Validators.pattern(this.emailPattern)),
    'password': new UntypedFormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService, 
    private basketService: BasketService,
    private router: Router) { }

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

  register() {
    this.registerForm.markAllAsTouched();
    if (!this.registerForm.valid) return;

    this.userService.saveUsers(this.registerForm.value).subscribe(user => {
      if (user) {
        this.createBasket(user);
      }
    });
  }

  createBasket(user: User) {
    this.basketService.saveBasket(user).subscribe(basket => {
      if (basket) {
        this.router.navigate(["/login"], { state: { isPasswordExpired: true } });
      }
    });
  }
}
