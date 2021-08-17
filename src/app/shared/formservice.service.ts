import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from '../../environments/environment';
import { UserClass } from '../formcomp/userData';
@Injectable({
  providedIn: 'root'
})
export class FormserviceService {


  constructor(public http:HttpClient) { }
  private url: string = environment.url;

  getData(){
    return this.http.get(this.url+'getdata');
  }


  postData(obj:any){
    console.log("Service\n");
    console.log(obj);
    let bodydata = JSON.stringify(obj);
    let header = new HttpHeaders().set(environment.header1, environment.header2);

    return this.http.post(this.url+'postdata',bodydata,{headers:header});
  }

deleteData(id:any){

  let header = new HttpHeaders().set(environment.header1, environment.header2);
    return this.http.delete(this.url+'deletedata/'+id,{headers:header});
  }
  modifyData(data:any,id:any){
    console.log(data)
    console.log(id)
  let header = new HttpHeaders().set(environment.header1, environment.header2);
   return this.http.put(this.url+'updatedata/'+id,data,{headers:header});
  }
}

