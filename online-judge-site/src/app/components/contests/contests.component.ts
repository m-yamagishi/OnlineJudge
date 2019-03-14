import { Component, OnInit } from '@angular/core';

import { Contest } from '../../models/contest';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.scss']
})
export class ContestsComponent implements OnInit {
  public gridApi;
  public gridColumnApi;
  public columnDefs;
  public rowSelection;

  contests: Contest[];

  rowData = [
    { id: 0, title: 'hello world!', question: 'xxxx', answerCodePath: '../xxx', testCodePath: '../yyy' },
    { id: 1, title: 'hello world2', question: 'xxxx', answerCodePath: '../xxx', testCodePath: '../yyy' },
    { id: 2, title: 'hello world3', question: 'xxxx', answerCodePath: '../xxx', testCodePath: '../yyy' },
    { id: 3, title: 'hello world4', question: 'xxxx', answerCodePath: '../xxx', testCodePath: '../yyy' },
    { id: 4, title: 'hello world5', question: 'xxxx', answerCodePath: '../xxx', testCodePath: '../yyy' },
    { id: 5, title: 'hello world!', question: 'xxxx', answerCodePath: '../xxx', testCodePath: '../yyy' },
    { id: 6, title: 'hello world2', question: 'xxxx', answerCodePath: '../xxx', testCodePath: '../yyy' },
    { id: 7, title: 'hello world3', question: 'xxxx', answerCodePath: '../xxx', testCodePath: '../yyy' },
    { id: 8, title: 'hello world4', question: 'xxxx', answerCodePath: '../xxx', testCodePath: '../yyy' },
    { id: 9, title: 'hello world5', question: 'xxxx', answerCodePath: '../xxx', testCodePath: '../yyy' },
    { id: 10, title: 'hello world!', question: 'xxxx', answerCodePath: '../xxx', testCodePath: '../yyy' },
    { id: 11, title: 'hello world2', question: 'xxxx', answerCodePath: '../xxx', testCodePath: '../yyy' },
    { id: 12, title: 'hello world3', question: 'xxxx', answerCodePath: '../xxx', testCodePath: '../yyy' },
    { id: 13, title: 'hello world4', question: 'xxxx', answerCodePath: '../xxx', testCodePath: '../yyy' },
    { id: 14, title: 'hello world5', question: 'xxxx', answerCodePath: '../xxx', testCodePath: '../yyy' },
  ];
  contestList = "問題一覧"

  constructor() {
    this.columnDefs = [
      { headerName: 'ID', field: 'id' },
      { headerName: 'タイトル', field: 'title' }
    ];
    this.rowSelection = 'single';
  }

  ngOnInit() {
    this.getContests();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getContests(): void {
    console.info('get contets')
  }

  onSelectionChanged(event): void {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.title;
    });
    document.querySelector("#selectedRows").innerHTML = selectedRowsString;
  }

}
