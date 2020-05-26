import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public loaded: boolean;
  public posts;
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loaded = false;
    this.getAll();
  }

  public getAll() {
    this.httpClient.get("https://restcountries.eu/rest/v2/all")
      .toPromise()
      .then((response: any) => {
        this.posts = response;
      });
    this.loaded = true;
  }
}
