import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public gridApi;
  public gridColumnApi;
  public columnDefs;
  public rowSelection;
  public rowData;

  resultListLabel = '成績一覧';

  constructor(
    private resultService: ResultService,
    private router: Router) {
    this.columnDefs = [
      {
        headerName: '問題',
        field: 'contest_name'
      }, {
        headerName: '解答者',
        field: 'answerer'
      }, {
        headerName: '提出日時',
        field: 'date_time',
        cellRenderer: function(params) {
          return moment(params.value).format('YYYY/MM/DD HH:mm:ss');
        },
      },{
        headerName: '結果①',
        field: 'test_exit_code',
        width: 125
      },{
        headerName: '結果②',
        field: 'test_stdout'
      }
    ];
    this.rowSelection = 'single';
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getResults();

    this.gridApi.sizeColumnsToFit();
    window.addEventListener('resize', function() {
      setTimeout(function() {
        params.api.sizeColumnsToFit();
      })
    })
  }

  getResults() {
    this.resultService.getResults().subscribe(
      (data) => {
        console.info(data)
        this.gridApi.setRowData(data)
      },
      (error) => {
        console.log("error")
        console.log(error)
      }
    )
  }

  onSelectionChanged(event): void {
    var selectedRows = this.gridApi.getSelectedRows();
    this.router.navigateByUrl('/result/' + selectedRows[0]['_id'])
  }
}
