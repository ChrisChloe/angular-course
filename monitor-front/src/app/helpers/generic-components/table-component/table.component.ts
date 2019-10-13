import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { listObjShow } from '../../animations/animations';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [listObjShow]
})
export class TableComponent implements OnInit {

  @Input() resource: any;
  @Input() resourceFunction: any;

  @Input() filterCriteria: any = {};
  @Input() tableHeadings: any[];
  @Input() tableRowActions: any[];

  @Input() tableitems: any;

  @Input() receiveTableData: boolean;
  @Output() sendTableData: EventEmitter<any> = new EventEmitter<any>();

  @Output() actionButtonEmitter: EventEmitter<any> = new EventEmitter<any>();

  public tableData: any[] = [];
  public pagination: any;

  public headingValues;

  public sortedByHeader;
  public sortChanges: number = 0;

  constructor(private shareData: ShareDataService) { }

  ngOnInit() {

    this.filterCriteria.addListParams();

    this.headingValues = this.tableHeadings.map((heading) => { return heading.value })

    this.queryData();

  }

  /**
   * Verifica se o campo da tabela é uma data
   * @param obj 
   */
  public verifyIfItsTimestamp(obj) {
    return obj === 'created_at'
      || obj === 'updated_at'
      || obj === 'last_login'
      || obj === 'received_at';
  }

  /**
   * Verifica se o campo da tabela é um array
   * @param obj 
   */
  public verifyIfItsArray(obj) {
    return typeof obj !== 'string';

  }

  /**
   * Verifica o campo da tabela e define um tamanho para a coluna
   * 
   * @param field 
   * 
   */
  public tdWidth(field: string): string {
    let width: string = '20%';

    if (field === 'id') width = '7.5%';

    return width;
  }

  private queryData() {

    this.shareData.loadingScreen(true);

    this.resource[this.resourceFunction ? this.resourceFunction : 'query'](this.filterCriteria.params ? this.filterCriteria.params : {})
      .subscribe(
        (res) => {
          if (res.data && res.meta) this.tableData = res.data;
          else if (res.data[0]) this.tableData = res.data[0];
          else if (res.meta.pagination) this.pagination = res.meta.pagination;

          this.sendTableData.emit(this.tableData);
          this.shareData.loadingScreen(false);


          // this.pagination = res.meta.pagination;
        },
        () => {
          this.shareData.loadingScreen(false);

        });
  }



  public addFilters(search: string): void {
    this.filterCriteria.addParam('search', search);
    this.queryData();
  }

  public changeSort(tableHead): void {

    if (this.sortedByHeader && this.sortedByHeader.value !== tableHead.value) {
      this.sortedByHeader.sorted = null;
      this.sortChanges = 0;
    }

    if (this.sortedByHeader && this.sortedByHeader.value === tableHead.value || !tableHead.sorted) this.sortChanges += 1;

    this.sortedByHeader = tableHead;

    if (this.sortChanges === 3) {
      tableHead.sorted = null;
      this.filterCriteria.updateParam('orderBy', 'id')
      this.filterCriteria.updateParam('sortedBy', 'desc');
      this.sortChanges = 0;
    } else {
      tableHead.sorted = tableHead.sorted === 'asc' ? 'desc' : 'asc';
      this.filterCriteria.updateParam('orderBy', tableHead.value) //tableHead.value.toString().replace(',', '.')
      this.filterCriteria.updateParam('sortedBy', this.filterCriteria.params.sortedBy === 'asc' ? 'desc' : 'asc');
    }

    this.queryData();
  }


  /**
   * Recebe um paramêtro de ação e outro de id para enviar ao component pai
   * @param action 
   */
  public emitButtonAction(action: string, rowObjId: number, rowIndex: number): void {
    const emitActionAndId = { action, rowObjId };

    if (action === 'delete-action' && this.tableData[rowIndex]) {
      this.tableData = this.tableData.filter((data) => { return this.tableData.indexOf(data) !== rowIndex });
    }

    this.actionButtonEmitter.emit(emitActionAndId);

  }







  public paginationChange(newPage) {
    this.filterCriteria.params.page = newPage;
    this.queryData();
  }

  public limitChange(newLimit) {
    this.filterCriteria.params.limit = newLimit;
    this.queryData();
  }





}

