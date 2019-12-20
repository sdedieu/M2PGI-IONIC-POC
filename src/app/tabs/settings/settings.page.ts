import { Component } from '@angular/core';
import { User } from 'firebase';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  
  private user: User;

  constructor() {}

}
