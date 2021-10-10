import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay} from 'rxjs/operators'
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { confirmDialog } from '../resources/alert';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver, private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    confirmDialog("¿Estás seguro de que deseas cerrar sesión?", "Cancelar", "Aceptar").then(result => {
      if (result.value) {
        this.authenticationService.logout().subscribe( res => {
          console.log("bye")
          return this.router.navigate(['/login']);
        }, error =>{
          console.log(error)
        })
      }
    })
  }

}
