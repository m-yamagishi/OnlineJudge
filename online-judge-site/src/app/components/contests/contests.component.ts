import { Component, OnInit } from '@angular/core';

import { Contest } from '../../models/contest';
import { ContestService } from '../../services/contest.service';

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
  public rowData;

  contestListLabel = '問題一覧'
  addLabel = '問題を追加する'

  constructor(private contestService: ContestService) {
    this.columnDefs = [
      {
        headerName: 'ID',
        field: '_id',
        width: 200
      },{ 
        headerName: 'タイトル',
        field: 'title',
        cellRenderer: function (params) {
          return '<a href="/contest/' + params.data._id + '">' + params.value + '</a>'
        }
      },{
        headerName: '内容',
        field: 'question',
        width: 500
      }
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
    this.contestService.getContests().subscribe(
      (data) => {
        this.gridApi.setRowData(data);
      },
      (error) => {
      });
  };

  onSelectionChanged(event): void {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.title;
    });
  }

}
