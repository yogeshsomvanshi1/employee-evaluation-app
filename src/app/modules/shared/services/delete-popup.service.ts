import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { DeletePopupComponent } from '../component/delete-popup/delete-popup.component';

@Injectable()
export class DeletePopupService {

  constructor(private modalService: BsModalService) { }

	showModal(): Observable<boolean> {
		const obs = new Subject<boolean>();
		const bsModalRef = this.modalService.show(DeletePopupComponent, {
			class: 'modal-dialog-centered'
		});
		bsModalRef.onHide.subscribe(() => {
			const isDelete = bsModalRef.content.isDelete;
			obs.next(isDelete);
			obs.complete();
		});
		return obs;
	}
}
