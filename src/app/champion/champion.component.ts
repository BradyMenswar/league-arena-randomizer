import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-champion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.css']
})
export class ChampionComponent {
  @Input() champ_name : String = "Champion";

}
