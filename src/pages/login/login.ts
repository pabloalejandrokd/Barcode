import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  { LoginProvider }  from '../../providers/login';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
	user : any = {email: '',pass:''};
  public users : any = [];
  constructor(public alertCtrl: AlertController, public loginPro:LoginProvider, public navCtrl: NavController, public navParams: NavParams) {
    
    this.loginPro.getUsers().subscribe(data=>{
      if(data.status === 200) {
        this.users = data.results;
        console.log(this.users);
        
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Sin Usuarios',
          subTitle: 'No se encontró ningún usuario!',
          buttons: ['OK']
        });
        alert.present();
      }
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
  submit(user:any){
    console.log(user);
    
  	this.loginPro.validar(user).subscribe(data=>{
      if(data.status === 200) {
        this.navCtrl.push(HomePage);  

      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Datos incorrecto',
          subTitle: 'Por favor ingresa de nuevo tus datos!',
          buttons: ['OK']
        });
        alert.present();
      }
      
    });

  }
}
