import { Component, OnInit } from '@angular/core';
import { ListComponent } from 'src/app/helpers/crud/list-components.helpers';
import { IssuesService } from 'src/app/services/entities/issues.service';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { FilterCriteria } from 'src/app/helpers/crud/filter-criteria';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.css']
})
export class IssuesListComponent extends ListComponent implements OnInit {

  public filterCriteriaAll: FilterCriteria;

  public tableData;

  constructor(private issuesService: IssuesService, private shareDataServ: ShareDataService) {
    super();
    this.resource = this.issuesService;
    this.filterCriteria = new FilterCriteria();
    this.shareDataService = this.shareDataServ;
  }

  ngOnInit() {
    this.loadData().subscribe(
      res => {
        this.shareDataService.loadingScreen(false);
        this.tableData = res.data;


      },
      () => {
        this.shareDataService.loadingScreen(false);
      });
  }

}
