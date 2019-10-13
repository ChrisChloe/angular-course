import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/entities/user.service';
import { FilterCriteria } from 'src/app/helpers/crud/filter-criteria';
import { ActivatedRoute } from '@angular/router';
import { ListComponent } from 'src/app/helpers/crud/list-components.helpers';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';

@Component({
  selector: 'app-logged-users-show',
  templateUrl: './logged-users-show.component.html',
  styleUrls: ['./logged-users-show.component.css']
})
export class LoggedUsersShowComponent extends ListComponent implements OnInit {

  public filterCriteria = new FilterCriteria();
  public tableDataReceived;
  public userId: number;

  public lat: number = 0;
  public lng: number = 0;
  public zoom: number = 2;

  constructor(private userService: UserService, private router: ActivatedRoute, private shareDataServ: ShareDataService) {
    super();
    this.resource = this.userService;
    this.resourceFunction = 'getLastLogins';
    this.filterCriteria = new FilterCriteria();
    this.tableHeaders = [
      { title: "#", value: "id" },
      { title: "Logado em", value: "created_at" },
      { title: "IP", value: 'ip' },
    ];
    this.shareDataService = this.shareDataServ;

  }

  ngOnInit() {
    this.router.params.subscribe(res => {
      this.userId = res.id
      this.filterCriteria.addParam('user_id', this.userId);
    });

    this.filterCriteria.addListParams(15, 1, 'desc', 'created_at');



    this.loadData().subscribe(
      res => {
        this.shareDataService.loadingScreen(false);
        this.tableData = res.data;

      },
      err => {
        this.shareDataService.loadingScreen(false);
        
      });

  }


}
