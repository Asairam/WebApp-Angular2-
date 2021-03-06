import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../route.animation";
import {SortablejsOptions} from "angular-sortablejs";
import { leadsService } from "./leads.service";
import { Http , Response } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {Router} from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PagerService } from './pagination.service';
import * as _ from 'underscore';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from './pipe';
import {MdDialog,MdDialogConfig,MdDialogRef} from '@angular/material';


@Component({
  selector: 'leads',
  templateUrl: './leads.component.html',
  providers : [leadsService,PagerService]


  //moduleId: module.id
})

export class LeadsComponent implements OnInit {



  constructor(
private leadsservice: leadsService,private router: Router,
private http: Http, private pagerService: PagerService ,public dialog: MdDialog
  ) { }
 openDialog(item) {
   console.log(item);
    let dialogRef:MdDialogRef<DialogOverviewExampleDialog> = this.dialog.open(DialogOverviewExampleDialog);
    dialogRef.componentInstance.fname = item.firstname;
    dialogRef.componentInstance.surname = item.surname;
    dialogRef.componentInstance.sele = item.sex;
    dialogRef.componentInstance.phone = item.mobile;
    dialogRef.componentInstance.email = item.email;
    dialogRef.componentInstance.city = item.city;
    dialogRef.componentInstance.locality = item.area;
    dialogRef.componentInstance.remarks = item.remarks;
    dialogRef.componentInstance.group = item.leadsTags;
    dialogRef.componentInstance.date = item.birthday;
    dialogRef.componentInstance.department = item.department;

  }

   // array of all items to be paged
    private result: any[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];
  ngOnInit() {
    console.log(Cookie.get("username"));
  console.log(Cookie.get("password"));
  console.log(btoa(Cookie.get("password")));

     if(Cookie.get("username")==null){
              this.router.navigate(['/']);
          }

    this.leadsservice.getLeads().subscribe(res =>{ this.result = res.description;this.setPage(1);});

  }
  setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.result.length, page);

        // get current page of items
        this.pagedItems = this.result.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }





}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})
export class DialogOverviewExampleDialog {

fname:string;
surname:string;
sele:string;
phone:string;
email:string;
city:string;
locality:string;
remarks:string;
group:string;
date:string;
department:string;
  constructor(private http: Http){

  }

  fullview_sub(){
    //console.log("hello");
    //console.log(this.fname);
    console.log(this.sele);
    console.log(this.date);
    console.log(this.department);
     //var headers = new Headers({'Content-Type':'application/X-www-form-urlencoded'});
    // let body = new FormData();
    //       body.append('firstname',this.fname);
    //       body.append('surname',this.surname);
    //       body.append('type',this.department);
    //       body.append('mobile',this.phone);
    //       body.append('email',this.email);
    //       body.append('dob',this.date);
    //       body.append('sex',this.sele);
    //       body.append('area',this.locality);
    //       body.append('city',this.city);
    //       body.append('remarks',this.remarks);
    //       body.append('contactTags',this.group);
    //       body.append('tagflag','1');
    //       body.append('userid','180');
    //       body.append('age','24');
    //       console.log(body)

    // this.http
    //          .put('http://dashboard.getion.in/index.php/request/put/contacts/contacts?id=77173', body)
    //          .map(res => res.json());
    console.log('http://dashboard.getion.in/index.php/request/put/contacts/contacts?id=77173&type='+this.department+'&age=&firstname='+this.fname+'&surname='+this.surname+'&mobile='+this.phone+'&email='+this.email+'&dob='+this.date+'&sex='+this.sele+'&purpose=&image=&area='+this.locality+'&city='+this.city+'&pincode=&remarks='+this.remarks+'&userid=180&contactTags='+this.group+'&tagflag=1');
    this.http.put('http://dashboard.getion.in/index.php/request/put/contacts/contacts?id=77173&type='+this.department+'&age=&firstname='+this.fname+'&surname='+this.surname+'&mobile='+this.phone+'&email='+this.email+'&dob='+this.date+'&sex='+this.sele+'&purpose=&image=&area='+this.locality+'&city='+this.city+'&pincode=&remarks='+this.remarks+'&userid=180&contactTags='+this.group,+'&tagflag=1')
   .subscribe((data)=> {

     console.log('updated response');
    });
    // console.log('http://dashboard.getion.in/index.php/request/put/contacts/contacts?id=74366&type='+this.department+'&age=24&firstname='+this.fname+'&surname='+this.surname+'&mobile='+this.phone+'&email='+this.email+'&dob='+this.date+'&sex='+this.sele+'&image=&area='+this.locality+'&city='+this.city+'&remarks='+this.remarks+'&userid=180&contactTags='+this.group,+'&tagflag=1&username=ramesh&pwd=QFJhbWVzaDEyMyM=&encode=true');
    //  this.http.put('http://dashboard.getion.in/index.php/request/put/contacts/contacts?id=74366&type='+this.department+'&age=24&firstname='+this.fname+'&surname='+this.surname+'&mobile='+this.phone+'&email='+this.email+'&dob='+this.date+'&sex='+this.sele+'&image=&area='+this.locality+'&city='+this.city+'&remarks='+this.remarks+'&userid=180&contactTags='+this.group,+'&tagflag=1&username=ramesh&pwd=QFJhbWVzaDEyMyM=&encode=true')
    //   .subscribe((data)=> {

    //     console.log('received response');
    //   });
  }


}
