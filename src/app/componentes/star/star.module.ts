import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [StarComponent],
  imports: [
    CommonModule,IonicModule
  ],
  exports:[StarComponent]
})
export class StarModule { }
