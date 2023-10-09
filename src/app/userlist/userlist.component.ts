import { Component, OnInit } from '@angular/core';
import { AgentService } from '../agent.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  agentList: any[] = [];
  showUserTable: boolean = false;
  icon = faTrash;
  icon1 = faEdit;
  constructor(private agentService: AgentService) {}

  ngOnInit() {
    this.agentService.getAgents().subscribe(
      (agents) => {
        this.showUserTable = true;
        this.agentList = agents;
      },
      (error) => {
        console.error('Error fetching agents:', error);
      }
    );
  }
}
