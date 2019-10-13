import { FilterCriteria } from 'src/app/helpers/crud/filter-criteria';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/entities/user.service';
import { Router } from '@angular/router';
import { ListComponent } from 'src/app/helpers/crud/list-components.helpers';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';

@Component({
  selector: 'app-logged-users-list',
  templateUrl: './logged-users-list.component.html',
  styleUrls: ['./logged-users-list.component.css'],
})
export class LoggedUsersComponent extends ListComponent implements OnInit {

  public selectedSize: number = 15;

  public tableHeaders = [
    { title: "#", value: "id" },
    { title: "Nome", value: "name" },
    { title: "Usuário do", value: "from" },
    { title: "Ultimo login", value: 'last_login' },
  ];


  constructor(private userService: UserService, private router: Router, private shareDataServ: ShareDataService) {
    super();
    this.resource = this.userService;
    this.filterCriteria = new FilterCriteria();
    this.shareDataService = this.shareDataServ;
    this.resourceFunction = 'getLoggedUsers';


  }

  ngOnInit() {

    this.filterCriteria.addListParams();

    this.loadDataFn();


  }

  private loadDataFn() {
    this.loadData().subscribe(
      (res) => {
        this.tableData = res.data;
        this.tableMetaData = res.meta.pagination;
        this.shareDataService.loadingScreen(false);

      },
      (err) => {
        this.shareDataService.loadingScreen(false);

      });
  }

  public limitChange(newLimit) {
    this.selectedSize = newLimit;
    this.filterCriteria.addParam('limit', newLimit);
    this.loadDataFn();

  }

  public paginationChange(newPage) {
    this.filterCriteria.addParam('page', newPage);
    this.loadDataFn();
  }

  public show (id) {
      this.router.navigate([`home/logged-users/${id}`]);
  }

}
