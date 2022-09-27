import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/models/auth/role-response';
import { User } from 'src/app/models/user';
import { UserDataService } from 'src/app/services/user-data/user-data.service';
import { PasswordConfirmValidator } from 'src/app/validators/password-confirm.validator';

@Component({
  selector: 'app-rg-user-management',
  templateUrl: './rg-user-management.component.html',
  styleUrls: ['./rg-user-management.component.scss']
})
export class RgUserManagementComponent {

  userList: User[] = [];

  createUserForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl("", [Validators.required, Validators.minLength(8)]),
    role: new FormControl("", [Validators.required, Validators.minLength(8)]),
  });

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  displayedColumns: string[] = ['Email', 'Nombre Usuario', 'Rol', 'Editar', 'Eliminar'];
  dataSource: MatTableDataSource<User>;

  roles: Role[]=[];

  showPasswordIcon: string = 'visibility_off';
  showPasswordConfirmIcon: string = 'visibility_off';

  constructor(private userDataService: UserDataService, private route: ActivatedRoute) {
    this.userList = this.route.snapshot.data['response'];
    this.roles = this.route.snapshot.data['roles'];
    console.log(this.roles);
    
    this.dataSource = new MatTableDataSource(this.userList);
  }

  ngOnInit(): void {

  }

  createUserSubmit() {

  }

  isInvalidField(field: string) {
    return this.createUserForm.get(field)?.invalid && (this.createUserForm.get(field)?.dirty || this.createUserForm.get(field)?.touched);
  }

  hasError(field: string, validation: string) {
    console.log(this.createUserForm.get(field)?.errors);
    return this.createUserForm.get(field)?.hasError(validation);
  }

  toogleShowPasswordIcon() {
    if (this.showPasswordIcon == 'visibility_off') {
      this.showPasswordIcon = 'visibility';
    } else {
      this.showPasswordIcon = 'visibility_off';
    }
  }

  toogleShowPasswordConfirmIcon() {
    if (this.showPasswordConfirmIcon == 'visibility_off') {
      this.showPasswordConfirmIcon = 'visibility';
    } else {
      this.showPasswordConfirmIcon = 'visibility_off';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  startEdit(id: string) {
    alert(`vas a editar el elemento con el id: ${id}`)
  }

  startDeletion(id: string) {
    alert(`vas a eliminar el elemento con el id: ${id}`)
  }

}
