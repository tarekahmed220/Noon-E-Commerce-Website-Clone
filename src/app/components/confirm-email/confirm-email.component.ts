import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css',
})
export class ConfirmEmailComponent implements OnInit {
  token: string = '';
  errorMsg: string = '';
  constructor(private _auth: AuthService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') as string;
    this._auth.confirmEmail(this.token).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        this.errorMsg = error.error.message;
      }
    );
  }
}
