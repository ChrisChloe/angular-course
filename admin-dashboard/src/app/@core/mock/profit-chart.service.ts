import { Injectable } from '@angular/core';
import { PeriodsService } from './periods.service';
import { ProfitChart, ProfitChartData } from '../data/profit-chart';

@Injectable()
export class ProfitChartService extends ProfitChartData {

  private ano = [
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
  ];

  private data = { };

  constructor(private period: PeriodsService) {
    super();
    this.data = {
      semana: this.getDataForWeekPeriod(),
      mês: this.getDataForMonthPeriod(),
      ano: this.getDataForYearPeriod(),
    };
  }

  private getDataForWeekPeriod(): ProfitChart {
    const nPoint = this.period.getWeeks().length;

    return {
      chartLabel: this.period.getWeeks(),
      data: [
        this.getRandomWeekData(nPoint),
        this.getRandomWeekDataCancelled(nPoint),
      ],
    };
  }

  private getDataForMonthPeriod(): ProfitChart {
    const nPoint = this.period.getMonths().length;

    return {
      chartLabel: this.period.getMonths(),
      data: [
        this.getRandomMonthData(nPoint),
        this.getRandomMonthDataCancelled(nPoint),
      ],
    };
  }

  private getDataForYearPeriod(): ProfitChart {
    const nPoint = this.ano.length;

    return {
      chartLabel: this.ano,
      data: [
        this.getRandomYearData(nPoint),
        this.getRandomYearDataCancelled(nPoint),
      ],
    };
  }

  private getRandomYearData(nPoints: number): number[] {
    return Array.from(Array(nPoints)).map(() => {
      return Math.round(Math.random() * 700);
    });
  }

  private getRandomYearDataCancelled(nPoints: number): number[] {
    return Array.from(Array(nPoints)).map(() => {
      return Math.round(Math.random() * 300);
    });
  }

  private getRandomMonthData(nPoints: number): number[] {
    return Array.from(Array(nPoints)).map(() => {
      return Math.round(Math.random() * 300);
    });
  }

  private getRandomMonthDataCancelled(nPoints: number): number[] {
    return Array.from(Array(nPoints)).map(() => {
      return Math.round(Math.random() * 100);
    });
  }

  private getRandomWeekData(nPoints: number): number[] {
    return Array.from(Array(nPoints)).map(() => {
      return Math.round(Math.random() * 50);
    });
  }

  private getRandomWeekDataCancelled(nPoints: number): number[] {
    return Array.from(Array(nPoints)).map(() => {
      return Math.round(Math.random() * 20);
    });
  }

  getProfitChartData(period: string): ProfitChart {
    return this.data[period];
  }
}
