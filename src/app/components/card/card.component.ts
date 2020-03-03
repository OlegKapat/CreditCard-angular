import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { trigger, state, style,transition,animate } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormvalidService } from '../shared/formvalid.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations:[
    trigger('card',[
      state('initial',style({})),
      state('end',style({transform: 'rotateY(-180deg)'})),
      transition('*<=>end',animate(1000)),
    ]),
    trigger('card1',[
      state('end',style({})),
      state('initial',style({transform: 'rotateY(180deg)'})),
      transition('*<=>end',animate(1000)),
    ]),
  ]
})
export class CardComponent implements OnInit,AfterViewInit,OnDestroy {
  form:FormGroup;
  cardstate="initial";
  formvalid:boolean;
  alarm:boolean=false;
  imagePath:string;
  unseb:Subscription;
  constructor(private router:ActivatedRoute, private route:Router) { }
  ngOnInit() {
      this.formvalid=false;
  }
  ahead(){
     this.cardstate=this.cardstate==='initial' ? 'end': '';
     this.alarm=true;
  }
  back(){
    this.cardstate=this.cardstate==='end' ? 'initial': '';
    this.route.navigate([''],{})
  }
  ngAfterViewInit(){
  this.unseb= this.router.queryParams.subscribe(x=>{this.formvalid=x.valid
    if(x.number==4){
      this.imagePath='../../../assets/visa-logo-png-clip-art.png'
    }
    else if(x.number==5){
      this.imagePath='../../../assets/mastercard-visa.png'
    }
  })
  }
  ngOnDestroy(){
    if(this.unseb){
      this.unseb.unsubscribe();
    }
  }
}
