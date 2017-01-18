import { Component, OnInit } from '@angular/core';
import { SenseService } from './sense.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SenseService]
})
export class AppComponent implements OnInit {
  title = 'Branch Project List';
  qixSchema;
  projects: Array<any> = [];

  constructor(private senseService: SenseService) {

  }

  ngOnInit() {
    this.senseService.connect()
      .then(() => {
      this.senseService.getProjects()
        .then(projects => {
          this.projects = projects
        })
      })
  }

}
