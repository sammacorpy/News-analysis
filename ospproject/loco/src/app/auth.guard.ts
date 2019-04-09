import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import { auth } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.auth.user$.map(user=>{
      if (user) {
        return true;
      }
      this.router.navigate(['/login'], {queryParams: { returnUrl: state.url}});
      return false;
    })
    
  }


}
