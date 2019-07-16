import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModelComponent } from './model/model.component';
import { Router } from '@angular/router';
import { FireConnectionService } from '../shared/fire-connection.service';
import { retry, catchError } from 'rxjs/operators';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
 name='';
 collection='';
 result;
 modelList=[];
 data=[];
  constructor(public dialog: MatDialog,
              private router:Router,
              private fire:FireConnectionService,
              private dataS:DataService) { 
    this.modelList=this.fire.returnModels();
    console.log(this.modelList);
  }

  ngOnInit() {
    
  }

  getModels(){
    console.log(this.modelList);
  }

  onClick(docId){
    //fields.unshift('ID');
    console.log(docId);
    //this.data=[docId,fields];
    //this.dataS.changeData(this.data);
    return this.router.navigate(['/model/data',docId]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModelComponent, {
      width: '350px',
      data: {name: this.name, collection: this.collection}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.result = result;
      console.log('The dialog was closed');
      console.log(result == null);
      if(!(result==null)){
        console.log(result.name);
        console.log(result.collection);
        return this.router.navigate(['/model-create']);
      }
    });
  }

}
