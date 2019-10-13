import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';


@Component({
  selector: 'ngx-confirm-account',
  templateUrl: './confirm-account.component.html',
})
export class NgxConfirmAccountComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  token: any;

  ngOnInit() {
    this.token = this.route.snapshot.params.token;
  }

  confirmAccount() {
    this.authService.confirmAccount(this.token).subscribe(
    (response) => {
      this.router.navigate(['login']);
    },
    (error) => {
    });
  }

}
