import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerService } from '../../services/progress-spinner.service';

@Component({
	selector: 'app-progress-spinner',
	templateUrl: './progress-spinner.component.html',
	styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit {

	isLoading: boolean;
	constructor(private progressSpinnerSrv: ProgressSpinnerService) { }

	ngOnInit(): void {
		this.progressSpinnerSrv.getLoaderStatus().subscribe((res) => {
			this.isLoading = res;
		})

	}

}
