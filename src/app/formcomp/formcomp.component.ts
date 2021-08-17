import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserClass } from './userData';
import { FormserviceService } from '../shared/formservice.service';

@Component({
  selector: 'app-formcomp',
  templateUrl: './formcomp.component.html',
  styleUrls: ['./formcomp.component.css']
})
export class FormcompComponent implements OnInit {



  genders=["Male","Female","Others"];
  isEdit=false;
  selectedIndexEdit:number=-1;
  formData=new FormGroup({
firstname:new   FormControl(),
lastname:new   FormControl(),
email:new   FormControl(),
mobilenumber:new   FormControl(),
dateofbirth:new   FormControl(),
age:new   FormControl(),
place:new   FormControl(),
gender:new   FormControl(),
  });

  constructor(public formservice:FormserviceService) { }


  ngOnInit(): void {
this.loadData();
  }
  loadData(){
    this.formservice.getData().subscribe(res=>{
    Object.values(res).forEach(dataFromDb=>{
      this.listOfData.push(dataFromDb);
    });
    console.log(this.listOfData);
    });
  }
listOfData:UserClass[]=[];
  Onsubmit(){
    if(this.formData.value)
      {
        this.listOfData.push(this.formData.value);
        // console.log(this.formData.value);
        this.formservice.postData(this.formData.value).subscribe(res=>{
          console.log(res);
          this.formData.reset();
        });
      }
  }
  editSwaps()
  {
    this.isEdit=false;
    this.selectedIndexEdit=-1;
  }
  Oncancel(){

    this.formData.reset();
    if(this.isEdit)
    {
      this.editSwaps();
    }
  }

  Onedit(index:number){
  this.patchedData(this.listOfData[index]);
  this.selectedIndexEdit=index;
  this.isEdit=true;
  }
  Onsave()
  {
      if(this.isEdit && this.selectedIndexEdit>=0)
      {
        console.log(this.listOfData[this.selectedIndexEdit]);
        this.formservice.modifyData(this.formData.value,this.listOfData[this.selectedIndexEdit]['_id']).subscribe((res:any)=>{

          this.formData.value['_id']=res['_id'];
          this.listOfData.push(this.formData.value);
          this.listOfData.splice(this.selectedIndexEdit,1);
          this.isEdit=false;
          this.formData.reset();
        });


      }
  }
  patchedData(data:UserClass)
  {
    this.formData.patchValue(data);
  }
  Ondelete(data:any,index:number){
    this.listOfData.splice(index,1);
    this.formservice.deleteData(data._id).subscribe(res=>{
      console.log('Deleted ',res);
    });
    this.formData.reset();
  }

}
