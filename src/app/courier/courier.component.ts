import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.css', '/src/styles.css']
})
export class CourierComponent {
  @Input() companyId: number;
}
