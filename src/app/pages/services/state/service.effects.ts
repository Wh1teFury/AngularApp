import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { ServiceService } from "src/app/services/service.service";
import {
  loadServices,
  loadServicesSuccess,
  addServiceSuccess,
  addService,
  updateService,
  updateServiceSuccess,
  deleteService,
  deleteServiceSuccess
} from "./service.actions";

@Injectable()
export class ServicesEffects {
  constructor(private actions$: Actions, private serviceService: ServiceService) { }

  loadServices$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadServices),
        mergeMap((action) => {
          return this.serviceService.getServices().pipe(
            map((services) => {
              return loadServicesSuccess({ services })
            })
          )
        })
      )
    }
  )

  addService$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addService),
      mergeMap((action) => {
        return this.serviceService.addService(action.service).pipe(
          map((data) => {
            const service = { ...action.service, id: data.name };
            return addServiceSuccess({ service })
          })
        )
      }))
  });

  updateService$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateService),
      switchMap((action) => {
        return this.serviceService.updateService(action.service).pipe(
          map((data) => {
            return updateServiceSuccess({ service: action.service })
          })
        );
      })
    );
  });

  deleteService$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteService),
      switchMap((action) => {
        return this.serviceService.deleteService(action.id).pipe(
          map((data) => {
            return deleteServiceSuccess({ id: action.id })
          })
        );
      })
    );
  });
}