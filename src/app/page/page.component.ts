import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  public id: string;
  public post: Array<any> = [];
  public countryList: Array<any>;
  public country: any;
  public borderList: Array<any> = [];
  grouped: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getPost(this.id);
      this.countries();
    });
  }
  public getPost(id: string) {
    this.httpClient.get("https://api.covid19api.com/country/" + id)
      .toPromise()
      .then((response: any) => {
        var result = [];
        this.post = [];
        response.reduce(function (res, value) {
          if (!res[value.Date]) {
            res[value.Date] = { Date: value.Date, Active: 0, Confirmed: 0, Deaths: 0, Recovered: 0 };
            result.push(res[value.Date])
          }
          res[value.Date].Active += value.Active;
          res[value.Date].Confirmed += value.Confirmed;
          res[value.Date].Deaths += value.Deaths;
          res[value.Date].Recovered += value.Recovered;
          return res;
        }, {});
        response = result;
        response.forEach(element => {
          if (element.Confirmed > 0) {
            this.post.push(element);
          }
        });
        this.post.reverse();
      });
  }
  public countries() {
    this.httpClient.get("https://restcountries.eu/rest/v2/all")
      .toPromise()
      .then((response: any) => {
        this.countryList = response;
        this.country = this.countryList.filter(element => element.alpha2Code == this.id)[0];
        var borders = this.country.borders;
        this.countryInfo(borders);
      });
  }
  public countryInfo(id: Array<string>) {
    this.borderList = [];
    id.forEach(item => {
      var border = this.countryList.filter(element => element.alpha3Code == item)[0];
      this.borderList.push(border);
    });
  }
  public groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
}
