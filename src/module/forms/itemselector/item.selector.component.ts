/**
 * Created by pratik on 27/12/17.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";

@Component({
 selector: 'amexio-item-selector',
 template: `
  
   <div class="left-card">
     <amexio-card>
       <amexio-header><b>Available</b></amexio-header>
       <amexio-body>
         <div [style.height.px]="height" style="overflow: auto">
           <ul class="list">
             <div *ngFor="let data of availableData; let i = index" (click)="itemClick(data,i)">
               <li [ngClass]="data['isSelected'] ? 'list-item-active':''">{{data[displayField]}}</li>
             </div>
           </ul>
         </div>
       </amexio-body>
     </amexio-card>
   </div>
   
   <div class="icon-card-center">
     <div class="icon-bar">
        <div (click)="moveTop()">
          <!--<amexio-icon key="itemselector_caretup"></amexio-icon>-->
          <i class="fa fa-caret-up"></i>
        </div>
       <div (click)="upSwitch()">
         <!--<amexio-icon key="itemselector_arrowup"></amexio-icon>-->
         <i class="fa fa-arrow-up"></i>
       </div>
       <div (click)="leftSwitch()">
         <!--<amexio-icon key="itemselector_arrowleft"></amexio-icon>-->
         <i class="fa fa-arrow-left"></i>
       </div> 
       <div (click)="rightSwitch()">
         <!--<amexio-icon key="itemselector_arrowright"></amexio-icon>-->
         <i class="fa fa-arrow-right"></i>
       </div> 
       <div (click)="downSwitch()">
         <!--<amexio-icon key="itemselector_arrowdown"></amexio-icon>-->
         <i class="fa fa-arrow-down"></i>
       </div>
       <div (click)="moveDown()">
         <!--<amexio-icon key="itemselector_caretdown"></amexio-icon>-->
         <i class="fa fa-caret-down"></i>
       </div>
     </div>
     
   </div>
   
   <div class="right-card">
     <amexio-card>
       <amexio-header><b>Selected</b></amexio-header>
       <amexio-body>
         <div [style.height.px]="height" style="overflow: auto">
           <ul class="list">
             <div *ngFor="let data of selectedData; let i = index" (click)="itemClick(data,i)">
               <li [ngClass]="data['isSelected'] ? 'list-item-active':''">{{data[displayField]}}</li>
             </div>
           </ul>
         </div>
       </amexio-body>
     </amexio-card>
   </div>
 `
})

export class AmexioItemSelectorComponent implements OnInit {

  @Input()    data : any;

  @Input()    height : any;

  @Input()    dataReader : string;

  @Input()    httpMethod : string;

  @Input()    httpUrl : string;

  @Input()    displayField : string;

  @Input()    valueField : string;

  @Output() availableRecords: any = new EventEmitter<any>();

  @Output() selectedRecords: any = new EventEmitter<any>();

  availableData: any[];

  selectedData: any[] = [];

  switchingObject: any;

  objectIndex: any;

  itemSelectorWidth: any;

  itemSelectorHeight: any;

  smallScreen: boolean;

  response: any;

  previousValue: any;


   constructor(public itemSelectorService : CommonDataService) { }

   ngOnInit() {
     if (this.httpMethod && this.httpUrl) {
       this.itemSelectorService.fetchData(this.httpUrl, this.httpMethod).subscribe(response => {
         this.response = response.json();
       }, error => {
       }, () => {
         this.setData(this.response);
       });
     } else if (this.data) {
       this.previousValue = JSON.parse(JSON.stringify(this.data));
       this.setData(this.data);
     }
   }

  ngDoCheck() {
    if (JSON.stringify(this.previousValue) != JSON.stringify(this.data)) {
      this.previousValue = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }


  setData(httpResponse : any){
    let responsedata = httpResponse;
    if (this.dataReader != null) {
      const dr = this.dataReader.split('.');
      for (let ir = 0; ir < dr.length; ir++) {
        responsedata = responsedata[dr[ir]];
      }
      responsedata.forEach((option: any, index: any) => {
        option['isSelected'] = false;
      });
    } else {
      responsedata = httpResponse;
    }

    this.availableData = responsedata;
  }


  itemClick(data: any, index: any) {
    this.switchingObject = data;
    this.objectIndex = index;

    for (let ir = 0; ir < this.availableData.length; ir++) {
      if((this.availableData[ir])[this.valueField] === data[this.valueField]){
        this.availableData[ir]['isSelected'] = true;
      }else{
        this.availableData[ir]['isSelected'] = false;
      }


    }
  }

  rightSwitch() {
    if (this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected')) {
      if (this.switchingObject['isSelected']) {
        this.selectedData.push(this.switchingObject);
        this.switchingObject['isSelected'] = true;
        this.availableData.forEach((option, index) => {
          if (option['isSelected']) {
            this.availableData.splice(index, 1);
          }
        });
        this.switchingObject = null;
        this.dataEmitter();
      }
    }

  }

  leftSwitch() {
    let flag : boolean;

    for (let ir = 0; ir < this.availableData.length; ir++) {
      if((this.availableData[ir])[this.valueField] === this.switchingObject[this.valueField]){
        flag = true
      }
    }
    if(!flag){
      if (this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected')) {
        if (this.switchingObject['isSelected']) {
          this.availableData.push(this.switchingObject);
          this.switchingObject['isSelected'] = false;
          this.selectedData.forEach((option, index) => {
            if (!option['isSelected']) {
              this.selectedData.splice(index, 1);
            }
          });
          this.switchingObject = null;
          this.dataEmitter();
        }
      }
    }
  }

  upSwitch() {
    if (this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected')) {
      if (this.switchingObject['isSelected']) {
        const index = this.selectedData[this.objectIndex];
        this.selectedData[this.objectIndex] = this.selectedData[this.objectIndex - 1];
        this.selectedData[this.objectIndex - 1] = index;
        this.switchingObject = null;
        this.dataEmitter();
      }
    }
  }

  downSwitch() {
    if (this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected')) {
      if (this.switchingObject['isSelected']) {
        if (this.selectedData.length - 1 !== this.objectIndex) {
          const index = this.selectedData[this.objectIndex];
          this.selectedData[this.objectIndex] = this.selectedData[this.objectIndex + 1];
          this.selectedData[this.objectIndex + 1] = index;
          this.switchingObject = null;
          this.dataEmitter();
        }
      }
    }

  }

  moveTop() {
    const tempArray: any = [];
    if (this.switchingObject != null && this.switchingObject['isSelected']) {
      if (this.selectedData.length > 1) {
        tempArray[0] = this.selectedData[this.objectIndex];
        this.selectedData.splice(this.objectIndex, 1);
        this.selectedData.forEach((option) => {
          tempArray.push(option);
        });
        this.selectedData = tempArray;
        this.switchingObject = null;
        this.dataEmitter();
      }
    }
  }

  moveDown() {
    if (this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected')) {
      if (this.switchingObject['isSelected'] && this.selectedData.length > 1) {
        this.selectedData.splice(this.objectIndex, 1);
        this.selectedData[this.selectedData.length] = this.switchingObject;
      }
    }
    this.switchingObject = null;
    this.dataEmitter();
  }

  dataEmitter() {
    this.availableRecords.emit(this.availableData);
    this.selectedRecords.emit(this.selectedData);
  }

  onResize(event: any) {
    if (event.target.innerWidth < 768) {
      this.itemSelectorWidth = 100 + '%';
      this.smallScreen = true;
    } else {
      this.smallScreen = false;
      this.itemSelectorWidth = 46 + '%';
    }
  }
}