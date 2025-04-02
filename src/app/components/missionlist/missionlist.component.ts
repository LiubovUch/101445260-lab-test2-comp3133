import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpacexService } from '../../services/spacex.service';
import { Mission } from '../../models/mission.model';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-missionlist',
  standalone: true,
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css'],
  imports: [CommonModule, RouterModule, FormsModule], 
})
export class MissionlistComponent {
  missions: Mission[] = []; 
  filteredMissions: Mission[] = []; 
  year: string = ''; 

  constructor(private spacexService: SpacexService) {}

  ngOnInit(): void {
    this.spacexService.getMissions().subscribe((data: Mission[]) => {
      this.missions = data;
      this.filteredMissions = data; 
    });
  }

  onYearChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.year = input.value;
  }

  filterMissions(): void {
    if (this.year) {
      this.filteredMissions = this.missions.filter((mission) =>
        mission.launch_year.includes(this.year)
      );
    } else {
      this.filteredMissions = this.missions; 
    }
  }
}
