import { Component, OnInit } from '@angular/core';
import { FilterCriteria } from 'src/app/helpers/crud/filter-criteria';
import { LateOpsService } from 'src/app/services/entities/late-ops.service';
import { UserService } from 'src/app/services/entities/user.service';
import { TableComponent } from 'src/app/helpers/generic-components/table-component/table.component';
import { ListComponent } from 'src/app/helpers/crud/list-components.helpers';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { collapse } from 'src/app/helpers/animations/animations';

@Component({
  selector: 'app-late-ops',
  templateUrl: './late-ops.component.html',
  styleUrls: ['./late-ops.component.css'],
  animations: [collapse]
})
export class LateOpsComponent extends ListComponent implements OnInit {

  public filterCriteriaAll: FilterCriteria;

  public displayedColumns;

  public tableData;




  constructor(private lateOpsService: LateOpsService, private shareDataServ: ShareDataService) {
    super();
    this.resource = this.lateOpsService;
    this.filterCriteria = new FilterCriteria();
    this.shareDataService = this.shareDataServ;
  }

  ngOnInit() {
    this.filterCriteria.addListParams();
    this.displayedColumns = [
      { title: "#", value: "id" },
      { title: "Tipo de Pagamento", value: "payment_type_title" },
      { title: "Preço", value: 'price' },
      { title: "Status", value: "status_title" },
      { title: "Recebida em", value: "received_at" },
    ];

    this.loadData().subscribe(
      res => {
        this.shareDataServ.loadingScreen(false);
        this.tableData = res;


      },
      () => {
        this.shareDataServ.loadingScreen(false);
      });
  }

  public openOpInspectManager(id) {
    window.open(`https://manager.buscaaereo.com.br/#/op/${id}`, '_blank')
    
  }
}
