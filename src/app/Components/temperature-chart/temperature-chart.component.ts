import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'temperatureChart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.scss']
})

export class TemperatureChartComponent {
  Highcharts: typeof Highcharts = Highcharts;
  @Input() hoursArr!: string[];
  updateFlag: boolean = false;
  defaultHours = ['14.35', '13.70', '13.20', '12.80', '14.75', '17.70', '19.65', '19.30', '19.35', '18.15', '16.60', '15.50'];
  constructor() { }

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'areaspline',
      backgroundColor: 'none',
    },
    title: {
      text: ''
    },
    plotOptions: {
      areaspline: {
        dataLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: '#fff',
            textOutline: 'none',
          },
        },
        marker: {
          enabled: false
        },
        states: {
          hover: {
            enabled: false
          }
        },
      },

    },
    legend: {
      enabled: false,
    },
    exporting: {
      buttons: {
        contextButton: {
          enabled: false
        }
      }
    },
    xAxis: {
      categories: ['00:00', '00:02', '00:04', '00:06', '00:08', '00:10', '00:12', '00:14', '00:16', '00:18', '00:20', '00:22'],
      lineColor: 'rgba(255, 255, 255, 0.8)',
      labels: {
        style: {
          color: '#fff',
          fontSize: '9px',
          fontWeight: 'bold'
        },
        align: 'center'
      },
    },
    yAxis: {
      visible: false
    },
    tooltip: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      data: this.defaultHours.map((el) => Number(el)),
      type: 'area',
      color: 'rgba(255, 255, 255, 0.8)',
      pointPlacement: 'on',
      marker: {
        enabled: false
      },
      dataLabels: {
        enabled: true,
        format: '{y}',
        style: {
          color: '#fff',
          textOutline: 'none'
        }
      },

    }]
  }
  updateChart() {
    this.chartOptions.series![0] = {
      type: 'area',
      data: this.hoursArr.map((el) => Number(el))
    };
    this.updateFlag = true;
  }

  ngOnChanges() {
    if (this.hoursArr) this.updateChart();
  }
}
