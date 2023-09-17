import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from '../agent.service';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username: string = '';
  email: string = '';
  role: string = '';
  showUserTable: boolean = false;
  agentList: any[] = [];
  icon = faMessage;
  icon1 = faList;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService
  ) {}

  ngOnInit() {
    const usernameParam = this.route.snapshot.queryParamMap.get('username');
    const emailParam = this.route.snapshot.queryParamMap.get('email');
    const roleParam = this.route.snapshot.queryParamMap.get('role');

    if (emailParam && roleParam && usernameParam) {
      this.username = usernameParam;
      this.email = emailParam;
      this.role = roleParam;
    }
  }

  isAgent(): boolean {
    return this.role === 'agent';
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  startChat() {
    this.router.navigate(['/chat']).then((nav) => {
      if (nav) {
        console.log('Going to the ChatApps');
      }
    });
  }

  showUserList() {
    this.router.navigate(['/userlist']).then((nav) => {
      if (nav) {
        console.log('Navigation to User List succeeded');
      } else {
        console.error('Navigation to User List failed');
      }
    });
  }
}
