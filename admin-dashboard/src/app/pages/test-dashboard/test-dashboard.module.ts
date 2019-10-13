import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { TestDashboardComponent } from './test-dashboard.component';
import { ChartModule } from 'angular2-chartjs';
import { ECommerceChartsPanelComponent } from './charts-panel/charts-panel.component';
import { OrdersChartComponent } from './charts-panel/charts/orders-chart.component';
import { ProfitChartComponent } from './charts-panel/charts/profit-chart.component';
import { ChartPanelHeaderComponent } from './charts-panel/chart-panel-header/chart-panel-header.component';
import { ChartPanelSummaryComponent } from './charts-panel/chart-panel-summary/chart-panel-summary.component';
import { TestUserActivityComponent } from './user-activity/user-activity.component';
import { ECommerceLegendChartComponent } from './legend-chart/legend-chart.component';
import { SlideOutComponent } from './slide-out/slide-out.component';



@NgModule({
  imports: [
    ThemeModule,
    ChartModule,
    NgxEchartsModule,
    NgxChartsModule,
  ],
  declarations: [
    TestDashboardComponent,
    ECommerceChartsPanelComponent,
    OrdersChartComponent,
    ProfitChartComponent,
    ChartPanelHeaderComponent,
    ChartPanelSummaryComponent,
    TestUserActivityComponent,
    ECommerceLegendChartComponent,
    SlideOutComponent,
  ],
  providers: [],
})
export class TestDashboardModule {}
