import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
  aboutInfo: any
  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this._userService.getAbout().subscribe(about => {
      this.aboutInfo = about;
      console.log(about)
    });
  }

}
