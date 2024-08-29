import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login-page.service";
import { map, Observable, take, tap } from "rxjs";
import { Role } from "./user";

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        return this.loginService.user.pipe(
            take(1),
            map(user => {
                if(!user){
                    return false;
                }
                return user.role === Role.Admin;
            }),
            tap(isAuth => {
                if(!isAuth) {
                    this.router.navigate(['']);
                }
            })
        )
    }
}
