import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(public _cs: ChatService) { }

  ingresar( proovedor: string){
    console.log(proovedor);

    this._cs.login(proovedor);

  }

}
