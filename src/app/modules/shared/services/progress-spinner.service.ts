import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProgressSpinnerService {

	private readonly _loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private readonly _loader$: Observable<boolean> = this._loader.asObservable();

	constructor() { }

	start(): void {
		this._loader.next(true)
	}

	stop(): void {
		this._loader.next(false)
	}

	getLoaderStatus(): Observable<boolean> {
		return this._loader$;
	}

}
