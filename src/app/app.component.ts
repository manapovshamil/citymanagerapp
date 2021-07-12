import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { City } from './city';
import { CityService} from './city.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public cities: City[];
  public editCity: City;
  public deleteCity: City;

  constructor(private cityService: CityService){}

  ngOnInit() {
    this.getCities();
  }

  public getCities(): void {
    this.cityService.getCities().subscribe(
      (response: City[]) => {
        this.cities = response;
        console.log(this.cities);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddCity(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.cityService.addCity(addForm.value).subscribe(
      (response: City) => {
        console.log(response);
        this.getCities();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCity(city: City): void {
    this.cityService.updateCity(city).subscribe(
      (response: City) => {
        console.log(response);
        this.getCities();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCity(cityId: number): void {
    this.cityService.deleteCity(cityId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCities();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(city: City, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCityModal');
    }
    if (mode === 'edit') {
      this.editCity = city;
      button.setAttribute('data-target', '#updateCityModal');
    }
    if (mode === 'delete') {
      this.deleteCity = city;
      button.setAttribute('data-target', '#deleteCityModal');
    }
    container.appendChild(button);
    button.click();
  }



}
