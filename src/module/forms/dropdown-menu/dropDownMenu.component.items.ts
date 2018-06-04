


/*
 Component Name : Amexio  Dropdown Menu
 Component Selector : <amexio-drop-down-menu-items>
 Component Description : Amexio Dropdown component with various modes and configurations .
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-drop-down-menu-item',
  template: `
<<<<<<< HEAD
    <div *ngIf="!(icon && label)" class="divider" >
      <ng-content></ng-content>
    </div>
    <a  *ngIf="icon && label" (click)="onItemClick($event)" [ngClass]="{'divider':separator}" >
=======
  
    <div *ngIf="!(icon && label)" class="divider" >
      <ng-content></ng-content>
    </div>
    <a  *ngIf=" (icon && label)" (click)="onItemClick($event)" [ngClass]="{'divider':separator}" >
>>>>>>> 249e870c09c4d283998375261e448d93bfcaf64c
      <i [style.float]="iconalign" [ngClass]="icon"></i>
      <span [style.float]="labelalign"   style="padding: 5px;">
        {{label}}
      </span>
    </a>

  `
})

export class AmexioDropDownitemsComponent implements OnInit{

<<<<<<< HEAD
=======
  toggle : boolean;
>>>>>>> 249e870c09c4d283998375261e448d93bfcaf64c

  /*
   Properties
   name : label
   datatype : string
   version : 4.2 onwards
   default :
   description : Label Dropdown
   */
  @Input() label: string;
  /*
   Properties
   name : icon
   datatype : string
   version : 4.2 onwards
   default :
   description : icon on DropDown Menu
   */
  @Input() icon: string;
  /*
   Properties
   name : label-align
   datatype : string
   version : 4.2 onwards
   default :
   description : Label-align for label right/left
   */
  @Input ('label-align') labelalign : string;
  /*
   Properties
   name : icon-align
   datatype : string
   version : 4.2 onwards
   default :
   description : icon-align for text field right/left
   */
  @Input ('icon-align') iconalign : string;
  /*
   Properties
   name : add-seperator
   datatype :  boolean
   version : 4.2 onwards
   default : false
   description : add divider to the dropdown menu list
   */
  @Input ('separator') separator : boolean;

  /*
   Properties
   name : add-seperator
   datatype :  boolean
   version : 4.2 onwards
   default : false
   description : add divider to the dropdown menu list
   */

<<<<<<< HEAD
=======
  @Output() onClick: any = new EventEmitter<any>();
   

>>>>>>> 249e870c09c4d283998375261e448d93bfcaf64c
  ngOnInit() {
    if(this.iconalign && this.labelalign
      && this.iconalign.toLowerCase() === this.labelalign.toLowerCase()){
      this.iconalign = null;
      this.labelalign = null;
    }
    else if(this.iconalign && this.iconalign == "left"){
      this.labelalign = "right";
      this.iconalign = null;
    }
    else if(this.iconalign && this.iconalign == "right"){
      this.labelalign = null;
    }
  }

<<<<<<< HEAD
  @Output() onClick: any = new EventEmitter<any>();

  onItemClick( event :any) {

=======
  onItemClick( event :any) {

  this.toggle = false;
>>>>>>> 249e870c09c4d283998375261e448d93bfcaf64c
    let e = {
      'event':event,
      'this':this
    };
    this.onClick.emit(e);
  }

}