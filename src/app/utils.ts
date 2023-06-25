import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";

export function handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);

    return of({ erreur : "Une erreur s'est produite. Veuillez réessayer plus tard."})
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.message);

      // return of(error.error);

      // return of({ erreur : error.message});
      return of({ erreur : "Une erreur s'est produite. Veuillez vérifier les données envoyées."});
  }
  // return throwError(() => new Error("Une erreur s'est produite. Veuillez réessayer plus tard."));
}

export function loadScript(dynamicScripts: string[] = []) {
  var isFound = false;
  var scripts: any = document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; ++i) {
    if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
      isFound = true;
    }
  }

  if (!isFound) {
    for (var i = 0; i < dynamicScripts.length; i++) {
      let node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      // node.charset = 'utf-8';
      document.getElementsByTagName('body')[0].appendChild(node);
    }

  }
}

export function loadJsonDataWithId(jsonData: any, id:string) {
  var isFound = false;
  var scripts: any = document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; ++i) {
    if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
      isFound = true;
    }
  }

  if (!isFound) {
    let node = document.createElement('script');
    node.textContent = jsonData;
    node.type = 'application/json';
    node.async = false;
    node.id = id;
    document.getElementsByTagName('body')[0].appendChild(node);
  }
}


export function isObject(val: any) {
  if (val === null) { return false;}
  return (typeof val === 'object');
}
