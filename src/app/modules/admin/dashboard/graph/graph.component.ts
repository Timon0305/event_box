import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { map } from 'rxjs/internal/operators/map';
import { getFilterDateRange } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';
import * as moment from 'moment';
import { Messages } from '@app/config/messages';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  providers: [DashboardService]
})
export class GraphComponent implements OnInit {
  graphAnalyticsPointst$;
  dateValue;
  graphType = Constants.API_DATE_FILTER_TYPE.month;
  public lineChartData: Array<any> = [
    { data: [] }
  ];
  totalGross = Constants.NUMBER.zero;
  totalOrders = Constants.NUMBER.zero;
  toolTipData = Constants.STATIC_TOOLTIP;
  public lineChartLegend = true;
  public lineChartType = Constants.CHART_TYPE;
  graphPoints;
  lineChartLabels: string[] = [];

  lineChartOptions = {
    legend: { display: false },
    responsive: true,
    aspectRatio: 3.5,
    tooltips:
    {
      rtl: false,
      callbacks: {
        beforeLabel: tooltipItem => this.getTooltip(tooltipItem, Constants.NUMBER.one),
        label: tooltipItem => this.getTooltip(tooltipItem, Constants.NUMBER.three),
        afterLabel: tooltipItem => this.getTooltip(tooltipItem, Constants.NUMBER.two)
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          userCallback: (label, index, labels) => {
            // when the floored value is the same as the value we have a whole number
            return Math.floor(label) === label ? label : '';
          },
        },
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true,
          userCallback: (label, index, labels) => {
            if (this.graphType === Constants.API_DATE_FILTER_TYPE.month && (index % Constants.X_AXIS_MONTHLY_INTERVAL === 0)) {
              return label;
            }
            return this.graphType !== Constants.API_DATE_FILTER_TYPE.month ? label : '';
          },
        },
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      }
    }
  };
  lineChartColors = Constants.LINE_CHART_COLORS;
  constructor(private readonly dashboardService: DashboardService) { }


  getTooltip(toolTip, type) {
    for (const elem of this.graphPoints) {
      if (elem) {
        const cond =
          (this.graphType === Constants.API_DATE_FILTER_TYPE.month)
            ?
            `${toolTip.label.substring(Number(toolTip.label.indexOf(' ')) + 1)}`
            : `${Constants.MONTHS_NAME.indexOf(`${toolTip.label}`) + 1}`;
        const toolTipFormCond = this.graphType === Constants.API_DATE_FILTER_TYPE.month
          ? elem._id.slice(-2) === cond : elem._id.includes(cond);
        if (toolTipFormCond) {
          this.setToolTipData(elem, type);
          break;
        } else {
          this.setToolTipData(elem, type, true);

        }
      }

    }
    return this.toolTipData;
  }


  setToolTipData(elem, type, zeroValue?) {
    if (type === Constants.NUMBER.one) {
      if (!zeroValue) {
        this.toolTipData = `Total Gross    : $${elem.grossSale}`;
      } else {
        this.toolTipData = `Total Gross    : 0`;
      }
    } else if (type === Constants.NUMBER.two) {
      if (!zeroValue) {
        this.toolTipData = `Total Orders   : ${elem.totalCount}`;
      } else {
        this.toolTipData = `Total Orders   : 0`;
      }
    } else if (type === Constants.NUMBER.three) {
      if (!zeroValue) {
        this.toolTipData = `Total Net        : $${elem.totalEB}`;
      } else {
        this.toolTipData = `Total Net        : 0`;
      }

    }
  }

  ngOnInit() {
    this.getDatesArray(moment().startOf('month').format(Constants.API_DATE_FILTER_FORMAT),
      moment().endOf('month').format(Constants.API_DATE_FILTER_FORMAT));
    this.getGraphPoints({ ...getFilterDateRange(Constants.API_DATE_FILTER_TYPE.month) });
  }


  getDatesArray(startDate, endDate) {
    const dateMove = new Date(startDate);
    let strDate = startDate;
    while (strDate < endDate) {
      strDate = dateMove.toISOString().slice(Constants.NUMBER.zero, Constants.NUMBER.ten);
      this.lineChartLabels.push(`${Messages.MONTH_NAMES[moment(strDate).format('M')].shrtName} ${moment(strDate).format('DD')}`);
      dateMove.setDate(dateMove.getDate() + Constants.NUMBER.one);
    }
  }

  getGraphPoints(params = {}) {
    this.dateValue = params;
    this.lineChartData[0].data = [];
    this.totalGross = Constants.NUMBER.zero;
    this.totalOrders = Constants.NUMBER.zero;
    this.graphAnalyticsPointst$ = this.dashboardService.getGraphAnalytics({ ...params }).pipe(map(res => {
      this.graphPoints = res.data;
      this.lineChartData[0].data = [];
      this.preFillIndex();
      res.data.forEach((point, index) => {
        this.totalGross = Number(this.totalGross) + Number(point.grossSale);
        this.totalOrders = Number(this.totalOrders) + Number(point.totalCount);
        if (this.graphType === Constants.API_DATE_FILTER_TYPE.year) {
          this.lineChartData[0].data[`${Number(point._id) - 1}`] = point.totalCount;
        } else if (this.graphType === Constants.API_DATE_FILTER_TYPE.quarter) {
          this.lineChartData[0].data[index] = point.totalCount;
        } else {
          this.lineChartData[0].data[`${Number(moment(point._id).format('D')) - 1}`] = point.totalCount;
        }
        if (index === (res.data.length - 1)) {
          while (this.lineChartData[0].data.length !== this.lineChartLabels.length) {
            this.lineChartData[0].data.push(0);
          }
        }
      });
    }));
  }

  preFillIndex() {
    this.lineChartLabels.forEach((element, index) => {
      this.lineChartData[0].data[index] = 0;
    });

  }

  quoteDateFilter(event) {
    const { dateFrom = null, dateTo = null } = event;
    if (moment().quarter(moment().quarter()).endOf('quarter').format(Constants.DISPLAY_DATE_FILTER_FORMAT) === dateTo && dateFrom ===
      moment().quarter(moment().quarter()).startOf('quarter').format(Constants.DISPLAY_DATE_FILTER_FORMAT)) {
      this.getDetailsWithQuarter(event);
    } else if (moment().endOf('year').format(Constants.DISPLAY_DATE_FILTER_FORMAT) === dateTo
      && moment().startOf('year').format(Constants.DISPLAY_DATE_FILTER_FORMAT) === dateFrom) {
      this.getDetailsYearly(event);
    } else {
      this.getMonthlyDetails(event);
    }
  }

  getMonthlyDetails(event) {
    const { dateFrom = null, dateTo = null } = event;
    this.graphType = Constants.API_DATE_FILTER_TYPE.month;
    this.clearLabels();
    this.getDatesArray(moment().startOf('month').format(Constants.API_DATE_FILTER_FORMAT),
      moment().endOf('month').format(Constants.API_DATE_FILTER_FORMAT));
    this.getGraphPoints({ dateFrom, dateTo });
  }


  getDetailsYearly(event) {
    this.graphType = Constants.API_DATE_FILTER_TYPE.year;
    this.clearLabels();
    this.lineChartLabels = Constants.MONTHS_NAME;
    this.addPointsByMnth(event);
  }

  getDetailsWithQuarter(event) {
    this.clearLabels();
    this.getQuarterMonths();
    this.graphType = Constants.API_DATE_FILTER_TYPE.quarter;
    this.addPointsByMnth(event);
  }

  clearLabels() {
    this.lineChartLabels = [];
  }

  getQuarterMonths() {
    let i = Constants.NUMBER.zero;
    while (i < Constants.NUMBER.three) {
      this.lineChartLabels.push(
        Messages.MONTH_NAMES[`${Number(moment().quarter(moment().quarter()).startOf('quarter').format('M')) + i}`].fullName);
      i = i + Constants.NUMBER.one;
    }
  }
  addPointsByMnth(event) {
    const { dateFrom = null, dateTo = null } = event;
    const groupBy = (this.graphType === Constants.API_DATE_FILTER_TYPE.year || this.graphType === Constants.API_DATE_FILTER_TYPE.quarter)
      ? Constants.GROUP_BY_MONTH : null;
    this.getGraphPoints({ dateFrom, dateTo, groupBy });
  }
}
