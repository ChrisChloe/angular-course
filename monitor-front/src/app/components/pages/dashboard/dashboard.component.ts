import { Component, OnInit, OnDestroy } from '@angular/core';
import { BuscaAereoService, CompaniesService, DashboardsService, UserService, LateOpsService } from 'src/app/services/entities';
import { FilterCriteria } from 'src/app/helpers/crud/filter-criteria';
import { Howl } from 'howler';
import * as moment from 'moment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    private sound: Howl;
    private filterCriteria = new FilterCriteria();

    private timeout;
    private timeoutMS: number = 5000;


    public buscaAereoStatus: string;
    public managerStatus: string;
    public crawlerStatus: string;
    public crmStatus: string;

    public opsCount: number;
    public opsCountUpdated: any;

    public lateOpsCount: number;
    public lateOpsCountUpdated: any;

    public lateOpsFinancialCount: number;
    public lateOpsFinancialCountUpdated: any;

    public searchCount: number;
    public searchCountUpdated: any;

    public loggedUsersCount: number;
    public loggedUsersCountUpdated: any;

    public companies;

    public currentTime: Date;



    constructor(
        private buscaAereoService: BuscaAereoService,
        private companiesService: CompaniesService,
        private dashboardsService: DashboardsService,
        private lateOpsService: LateOpsService,
        private userService: UserService) { }




    ngOnInit() {

        this.sound = new Howl({
            src: ['assets/sound/beep.mp3']
        });



        this.filterCriteria.addListParams(1, 1, 'asc', 'id');

        this.startCountersAndStatus();

        setInterval(() => {
            this.currentTime = new Date();
            return this.currentTime;
        }, 1000);

    }


    private startCountersAndStatus(): void {

        this.requestCounters();

        this.companiesService.get().subscribe(res => {
            this.companies = res.data;
            this.companies.map(company => {
                if (company.image === 'logotipo-tam-menor.png') return company.image = 'latam-logo-full.jpg';
                if (company.image === 'logo-avianca.png') return company.image = 'avianca-full-logo.png';
                if (company.image === 'logotipo-gol-menor.png') return company.image = 'gol-logo-full.jpg'
                if (company.image === 'logotipo-azul-menor.png') return company.image = 'azul-logo-full.jpg'
            });
            this.companies = this.companies.filter(company => {
                return company.name === 'Gol' || company.name === 'Azul' || company.name === 'Avianca' || company.name === 'TAM'
            });
        });

        this.updateStatus();
    }

    private updateStatus() {

        this.timeout = setTimeout(() => {
            this.requestCounters();
            this.updateStatus();
        }, this.timeoutMS);

    }


    private requestCounters() {


        this.buscaAereoService.getBuscaAereoStatus().toPromise()
            .then(res => { this.buscaAereoStatus = res.message })
            .catch(() => { this.buscaAereoStatus = 'Erro' });


        this.buscaAereoService.getManagerStatus().toPromise()
            .then(res => { this.managerStatus = res.message })
            .catch((err) => { this.managerStatus = 'Erro' });


        this.buscaAereoService.getCrawlerStatus().toPromise()
            .then(res => { this.crawlerStatus = res.message })
            .catch(() => { this.crawlerStatus = 'Erro' });

        this.buscaAereoService.getCrmStatus().toPromise()
            .then(res => { this.crmStatus = res.message })
            .catch(() => { this.crmStatus = 'Erro' });


        this.dashboardsService.getOpCount().toPromise()
            .then(res => {
                this.opsCount = res.data;
                this.opsCountUpdated = moment();
            })
            .catch(() => { });

        this.dashboardsService.getSearchCount().toPromise()
            .then(res => {
                this.searchCount = res.data;
                this.searchCountUpdated = moment();
            })
            .catch(() => { });

        this.lateOpsService.getLateOpsFinancial().toPromise()
            .then(res => {
                if (res.length > this.lateOpsFinancialCount) this.sound.play();
                this.lateOpsFinancialCount = res.length
                this.lateOpsFinancialCountUpdated = moment();
            })
            .catch(err => { });

        this.lateOpsService.getLateOps().toPromise()
            .then(res => {
                if (res.length > this.lateOpsCount) this.sound.play();
                this.lateOpsCount = res.length
                this.lateOpsCountUpdated = moment();

            })
            .catch(err => { });

        this.userService.getLoggedUsers(this.filterCriteria.params).toPromise()
            .then(res => {
                let totalLoggedUsers = res.meta.pagination.total;
                this.loggedUsersCount = totalLoggedUsers;
                this.loggedUsersCountUpdated = moment();
            })
            .catch(err => { });

    }


    ngOnDestroy() {
        clearTimeout(this.timeout);
    }

}