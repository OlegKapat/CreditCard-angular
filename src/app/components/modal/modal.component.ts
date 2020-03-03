import { Component, OnInit, Output, AfterViewInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit,AfterViewInit {
   @Output() inserts=new EventEmitter<any>();
   arr:number[]=[];
   cvv:number;
  constructor() { }

  ngOnInit() {
   let number =range(0,10)
   number.subscribe(x=>this.arr.push(x));
  }
  newvalue(event) {
  this.cvv= event.target.value;
  this.inserts.emit(this.cvv);
  this.shuffleArray(this.arr);
  }
  ngAfterViewInit(){

  }
   shuffleArray(array) {
    for (var i = this.arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
}
