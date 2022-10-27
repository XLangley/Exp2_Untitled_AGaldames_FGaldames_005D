import { Component, OnInit } from '@angular/core';
import { MetroService, Line } from '../services/metro.service';
import { finalize } from 'rxjs/operators';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-metro',
  templateUrl: './metro.page.html',
  styleUrls: ['./metro.page.scss'],
})
export class MetroPage implements OnInit {

  apiMetro: Line[] = [];
  estado: string[] = ['Operativa','Temporalmente cerrada', 'No habilitada', 'Con accesos cerrados']

  constructor(private metro: MetroService, private app: AppComponent) { }

  ngOnInit(){
    this.app.loading('show');
  }
  
  ionViewWillEnter(){
    
    //load API
    this.metro.prepareDataRequest()
    .pipe(
      finalize(async () => {
        this.app.loading('hide');
      })
    )
    .subscribe(data => {
      this.apiMetro.push(...data.lines);
    });


    //load Style
    const header = document.getElementById('header-metro');

    if (localStorage.getItem('type') == 'true') {
      header?.classList.add('header-alumno');
    } else {
      header?.classList.add('header-docente');
    }

  }

}
