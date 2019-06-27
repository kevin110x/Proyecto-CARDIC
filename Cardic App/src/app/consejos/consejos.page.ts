import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-consejos',
  templateUrl: './consejos.page.html'
})
export class ConsejosPage implements OnInit {

  slideOpts = {
    effect: 'flip'
  };
  
  users: any = [];
  userr = {};

  constructor(private usersService: UsersService, private navCtrl: NavController) { }

  ionViewWillEnter(){
    this.userr = this.usersService.user;
      console.log('user', this.userr);
      if(JSON.stringify(this.userr)=='{}'){
        this.navCtrl.navigateForward('home')
      };
      this.usersService.getUsers().subscribe(
        res => {
          this.users = res;
        },
        err => console.log(err)
      
      )
  }
  
  ngOnInit() {
  }

}
