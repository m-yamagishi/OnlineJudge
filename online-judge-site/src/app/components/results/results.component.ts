import { Component, OnInit } from '@angular/core';

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

  constructor(private resultService: ResultService) {
    this.columnDefs = [
      {
        headerName: '問題',
        field: 'contest_name'
      }, {
        headerName: '解答者',
        field: 'answerer'
      }, {
        headerName: '提出日時',
        field: 'date_time'
      }, {
        headerName: '結果',
        field: 'test_std_out'
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
    console.info(selectedRows);
  }

}
