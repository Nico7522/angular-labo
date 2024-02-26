import { Component, OnInit } from '@angular/core';
import { User, UserInfo } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {
  userId!: number
  user!: User;
  constructor(private _tokenService: TokenService, private _userService: UserService){}
  ngOnInit(): void {
    this.userId = this._tokenService.decodeToken().id;
    this._userService.GetById(this.userId).subscribe({
      next: (user) => console.log(user),
      error: (err) => console.log(err)
      
      
    })
  }


}
