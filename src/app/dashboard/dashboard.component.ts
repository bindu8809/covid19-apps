import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private httpClient: HttpClient) {}

  countriesList: any = [];
  summary: any = [];
  countryChangeVal: string = 'all';
  specificCountryData: any = [];

  ngOnInit(): void {
    this.getCountries();
    this.getAPI('https://api.covid19api.com/summary')
      .then((result) => {
        this.summary = result;
      })
      .catch((err) => {
        alert('Something is wrong.');
      });
  }

  getCountries() {
    this.getAPI('https://api.covid19api.com/countries').then(
      (res: any) => {
        let obj = {
          Country: 'All',
          Slug: 'all',
          ISO2: '',
        };
        res.push(obj);
        this.countriesList = res;
      },
      () => {}
    );
  }

  onCountryChange(ev) {
    console.log(ev);
    this.countryChangeVal = ev.value;
    if (ev.value != 'all') {
      this.getAPI(
        'https://api.covid19api.com/live/country/' +
          ev.value +
          '/status/confirmed/date/2020-03-21T13:13:30Z'
      ).then(
        (res: any) => {
          let arr = res[res.length - 1];
          console.log(arr);
          this.specificCountryData = arr;
          console.log(this.specificCountryData);
        },
        () => {}
      );
    }
  }

  public getAPI(url) {
    return this.httpClient.get(url).toPromise();
  }
}
