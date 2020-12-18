import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from './../../Services/users.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-defi',
  templateUrl: './defi.component.html',
  styleUrls: ['./defi.component.scss']
})
export class DefiComponent implements OnInit {

  users = [];

  form: FormGroup;
  defiant: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<DefiComponent>,
    private fb: FormBuilder,
    private usersService: UsersService,
  ) {
    this.defiant = data.defiant;
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      defiant: [this.defiant, []],
    });

    this.usersService
    .users()
    .subscribe((res: any) => {
      this.users = res;
    });
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
