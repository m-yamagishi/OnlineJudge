import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public gridApi;
  public gridColumnApi;
  public columnDefs;
  public rowSelection;
  public rowMultiSelectWithClick = true;
  public rowData;

  userListLabel = 'ユーザ一覧';

  constructor(private userService: UserService) {
    this.columnDefs = [
      {
        headerName: 'ID',
        field: '_id'
      },
      {
        headerName: '名前',
        field: 'name'
      }, {
        headerName: 'パスワード',
        field: 'password'
      }, {
        headerName: 'ロール',
        field: 'role',
        // editable: true,
      },
    ];
    // this.rowSelection = 'multiple';
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getUsers();

    this.gridApi.sizeColumnsToFit();
    window.addEventListener('resize', function() {
      setTimeout(function() {
        params.api.sizeColumnsToFit();
      })
    })
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        console.info(data)
        this.gridApi.setRowData(data);
      },
      (error) => {
        console.log('error')
        console.log(error)
      }
    )
  }

  onSelectionChanged(event): void {
    var selectedRows = this.gridApi.getSelectedRows();
    console.info(selectedRows);
  }
}
