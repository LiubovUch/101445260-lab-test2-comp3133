import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpacexService } from '../../services/spacex.service';
import { Mission } from '../../models/mission.model'; 

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css'],
  imports: [CommonModule],
})
export class MissiondetailsComponent {
  mission!: Mission; 

  constructor(private route: ActivatedRoute, private spacexService: SpacexService) {}

  ngOnInit(): void {
    const flightNumber = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(flightNumber)) {
      this.spacexService.getMissionDetails(flightNumber).subscribe((data: Mission) => {
        this.mission = data;
      });
    }
  }
}
