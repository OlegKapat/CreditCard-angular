import { TypeCard } from './../../validators/typecard.validator';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { RefDirective } from '../directives/ref.directive';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router'
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-carfform',
  templateUrl: './carfform.component.html',
  styleUrls: ['./carfform.component.css']
})
export class CarfformComponent implements OnInit,AfterViewInit,OnDestroy{
   form:FormGroup;
   @ViewChild(RefDirective,{static:false}) refDir:RefDirective;
   digit:number[]=[];
   formstatus:string;
   card:number;
   unsub1:Subscription;
   unsub2:Subscription;
  constructor(private resolver:ComponentFactoryResolver, private router:Router) {}

  ngOnInit() {
    this.form=new FormGroup({
      name:new FormControl('',Validators.required),
      number:new FormControl('',[Validators.required,Validators.pattern(/^5[1-5][0-9]{14}|4[0-9]{13}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/)]) ,
      date:new FormControl('',[Validators.required,Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4})$/),TypeCard.termValidator()]),
      cvv:new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{3}$/)])
   })
  }
  ngAfterViewInit(){
   this.unsub1= this.form.get('date').valueChanges.subscribe(v=>v);
   this.unsub2= this.form.statusChanges.subscribe(x=>{this.formstatus=x
      if(this.formstatus==='VALID'){
       this.router.navigate(['/'],{
         queryParams:{
           valid:true,
           number:this.card
         }
       })
       }
      }
    )
    this.form.controls['number'].valueChanges.subscribe((num)=>{
      if(num){
        var array=[...num]
        this.card=array[0]
      }

    })
  }
  clickForInsert(){
     const modalwindow= this.resolver.resolveComponentFactory(ModalComponent);
     const component=this.refDir.container.createComponent(modalwindow);
     component.instance.inserts.pipe(map((z)=>{
      this.digit.push(z)
     })).subscribe(()=>{
       if(this.digit.length<=3){
        this.form.controls['cvv'].setValue(this.digit.join(""))
       }
       }
     )
  }
  ngOnDestroy(){
    if(this.unsub1){
      this.unsub1.unsubscribe()
    }
    else if(this.unsub2){
      this.unsub2.unsubscribe()
    }
  }
  close(){
    this.refDir.container.clear();
  }
}

