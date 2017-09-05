import {Component, OnInit, AfterViewInit} from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {
  lineChartInterpolatedDemoDataGenerator, discreteBarDemoDataGenerator,
  lineChartDemoDataGenerator, serverLoadDemoData, recentSalesDemoDataGenerator, pieChartDemoData, trafficSourcesDemoData
} from "../data/widgetDemoData.data";
import {fadeInAnimation} from "../../route.animation";
import {Router} from "@angular/router";
import {UserService} from "./query.service";




@Component({
  selector: 'ms-querydash',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
   providers: [UserService] ,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class QueryComponent implements OnInit, AfterViewInit {

  discreteBarDemoData;
  lineChartDemoData;
  lineChartInterpolatedDemoData;
  serverLoadDemoData;
  allQueries;
  pieChartDemoData;
  recentSalesProductsDemoData;
  recentSalesDemoData;
  trafficSourcesDemoData;
  private router: Router;
   
  constructor(private userService: UserService) {
       
   }

  ngOnInit() {
// if(Cookie.get("username")==null){
//     this.router.navigate(['/']);
// }
    this.userService.getQueries().subscribe(data => {this.allQueries = data.posts;console.log(data.posts)});
    //this.discreteBarDemoData = discreteBarDemoDataGenerator();
    //this.lineChartDemoData = lineChartDemoDataGenerator();
    //this.lineChartInterpolatedDemoData = lineChartInterpolatedDemoDataGenerator();

    // this.activityFeedsDemoData = [
    //   {
    //     image: 'assets/img/avatars/10.png',
    //     name: 'Sophie',
    //     subject: 'Dinner?',
    //     content: 'Are we still going out tonight?'
    //   },
    //   {
    //     image: 'assets/img/avatars/11.png',
    //     name: 'Jack',
    //     subject: 'Golf weekend',
    //     content: 'Hey! You wanted to go play Golf?'
    //   },
    //   {
    //     image: 'assets/img/avatars/12.png',
    //     name: 'Cody',
    //     subject: 'Code Quality',
    //     content: 'Love your newest theme, so clean and slick!'
    //   },
    //   {
    //     image: 'assets/img/avatars/13.png',
    //     name: 'James',
    //     subject: 'Party?',
    //     content: 'You wanna throw a party this weekend?'
    //   },
    //   {
    //     image: 'assets/img/avatars/14.png',
    //     name: 'Jessica',
    //     subject: 'Love you...',
    //     content: 'Hope we can see us again soon :)'
    //   }
    // ];

    this.serverLoadDemoData = serverLoadDemoData;

    this.pieChartDemoData = pieChartDemoData;

    this.recentSalesDemoData = recentSalesDemoDataGenerator();
    this.recentSalesProductsDemoData = [
      {
        image: 'assets/img/avatars/1.png',
        itemName: 'Design Lamp',
        value: 39.54,
        timeAgo: '2 minutes ago'
      },
      {
        image: 'assets/img/avatars/2.png',
        itemName: 'Apple MacBook',
        value: 699,
        timeAgo: '19 minutes ago'
      },
      {
        image: 'assets/img/avatars/3.png',
        itemName: 'Apple iPhone 8',
        value: 3113.12,
        timeAgo: '2 hours ago'
      },
      {
        image: 'assets/img/avatars/4.png',
        itemName: 'USB-C Cable',
        value: 87.58,
        timeAgo: '6 hours ago'
      },
      {
        image: 'assets/img/avatars/5.png',
        itemName: 'Lighting Cable',
        value: 24.99,
        timeAgo: '13 hours ago'
      }
    ];

    this.trafficSourcesDemoData = trafficSourcesDemoData;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

}