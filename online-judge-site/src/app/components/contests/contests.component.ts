import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Contest } from '../../models/contest';
import { ContestService } from '../../services/contest.service';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.scss']
})
export class ContestsComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private rowSelection;
  private rowData;

  contestListLabel = '問題一覧'
  addLabel = '問題を追加する'

  constructor(
    private contestService: ContestService,
    private router: Router) {
    this.columnDefs = [
      {
        headerName: 'ID',
        field: '_id',
      },
      {
        headerName: 'タイトル',
        field: 'title',
        // cellRenderer: function (params) {
        //   return '<a href="/contest/' + params.data._id + '">' + params.value + '</a>'
        //   return '<a routerLink="../contest/' + params.data._id + '" routerLinkActive="active">' + params.value + '</a>'
        // }
      },
      {
        headerName: '出題者',
        field: 'questioner'
      },
      // {
      //   headerName: '内容',
      //   field: 'question',
      //   width: 500
      // }
    ];
    this.rowSelection = 'single';
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getContests();

    this.gridApi.sizeColumnsToFit();
    window.addEventListener('resize', function() {
      setTimeout(function() {
        params.api.sizeColumnsToFit();
      })
    })
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
    this.router.navigateByUrl('/contest/' + selectedRows[0]['_id']);
    // var selectedRowsString = "";
    // selectedRows.forEach(function (selectedRow, index) {
    //   if (index !== 0) {
    //     selectedRowsString += ", ";
    //   }
    //   selectedRowsString += selectedRow.title;
    // });
  }

  add(){
    console.info('add')
    this.router.navigateByUrl('addcontest');
  }
}
