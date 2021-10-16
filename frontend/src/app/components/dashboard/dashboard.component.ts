import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  statusRequests: Boolean
  statusUsers: Boolean
  statusMaintenances: Boolean
  statusCalendar: Boolean
  user: any
  name: string
  constructor(private breakpointObserver: BreakpointObserver, private authenticationService: AuthenticationService,
    private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getData()
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

  getData(){
    this.user = JSON.parse(this.authService.getData())
    this.name = this.user.name
    this.statusRequests = !!this.user.pageFaculties.find(i => i.page.name === 'Solicitudes' && i.faculty.name === 'ver')
    this.statusUsers = !!this.user.pageFaculties.find(i => i.page.name === 'Usuarios' && i.faculty.name === 'ver')
    this.statusMaintenances = !!this.user.pageFaculties.find(i => i.page.name === 'Mantenimiento' && i.faculty.name === 'ver')
    this.statusCalendar = !!this.user.pageFaculties.find(i => i.page.name === 'Calendario' && i.faculty.name === 'ver')
  }
}
