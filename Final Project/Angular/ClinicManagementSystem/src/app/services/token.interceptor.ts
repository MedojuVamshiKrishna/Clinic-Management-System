import { HttpInterceptorFn } from '@angular/common/http';
import { LoginServiceService } from './login-service.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let token=(inject(LoginServiceService).getToken())
  // console.log(token)
  const authReq=req.clone({
    headers: req.headers.set('Authorization','Bearer '+token)
  })
  return next(authReq);
};
