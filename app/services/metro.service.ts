import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface apiMetro{
  status: string;
  time: string;
  lines: Line[];
}
export interface Line{
  name: string;
  id: string;
  stations: Station[];
}
export interface Station{
  name: string;
  id: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetroService {

  constructor(private http: HttpClient) { }

  prepareDataRequest(){
    // Define the data URL
    const dataUrl = 'https://api.xor.cl/red/metro-network';
    // Prepare the request
    return this.http.get<apiMetro>(dataUrl);
  }
}
