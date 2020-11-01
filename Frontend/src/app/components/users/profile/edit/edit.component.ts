import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../../../Services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  // Theme identifier
  id: string;

  // User informations
  user: any;

  // Form
  checkoutForm;

  constructor(
    private users: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {  }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {

      // Fetch the data
      this.users
      .profile(this.id)
      .subscribe((res: any) => {

        console.log("------------------- res");
        console.log(res);

        // Fill up the questions
        this.user = res;
        console.log(this.user);

        if(this.user) {

          this.checkoutForm = this.formBuilder.group({
            identifiant: this.user.identifiant,
            nom: this.user.nom,
            prenom: this.user.prenom,
            date_naissance: this.user.date_naissance,
            avatar: this.user.avatar,
            humeur: this.user.humeur,
          });
        }

      },
      err => {
        console.log('Error: ');
        console.log(err);
      });

    }
    else {
      console.log('No identifier!!!');
    }
  }

  onSubmit(customerData) {
    this.checkoutForm.reset();
  }

}
