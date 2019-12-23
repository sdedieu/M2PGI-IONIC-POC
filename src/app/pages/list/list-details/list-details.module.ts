import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDetailsPageRoutingModule } from './list-details-routing.module';

import { ListDetailsPage } from './list-details.page';
import { AddOwnerPage } from '../../modal/add-owner/add-owner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListDetailsPageRoutingModule
  ],
  declarations: [AddOwnerPage, ListDetailsPage],
  entryComponents: [AddOwnerPage]
})
export class ListDetailsPageModule {}
