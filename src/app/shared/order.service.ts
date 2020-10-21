import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderItems: any;

  constructor(private http: HttpClient) { }

  getOrderList() {
    return this.http.get(environment.apiURL + '/enrollees').toPromise()
  }

  updateOrderById(data):any{
    var body = {
      "active": data.active,
      "name": data.name,
      "dateOfBirth": data.dateOfBirth
    }
    console.log("body - ",body)
    return this.http.put(environment.apiURL + '/enrollees/'+data.id, body).toPromise();
  }

}
