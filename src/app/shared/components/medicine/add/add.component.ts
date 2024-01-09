import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon],
})
export class AddComponent {

  @Input() iconName: string = 'heart';
  @Input() color: string = 'dark';
  @Input() backgroundColor: string = '#ffc409';
  @Output() clickButton = new EventEmitter<void>();

  constructor() {}

  onButtonClick() {
    this.clickButton.emit();
  }

}
