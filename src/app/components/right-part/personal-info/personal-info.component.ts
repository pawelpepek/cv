import { Component, inject } from '@angular/core';
import { ListComponent } from '../../shared/list/list.component';
import { FirebaseService } from '../../../services/firebase.service';
import { IconLinkComponent } from '../../shared/icon-link/icon-link.component';

@Component({
    selector: 'app-personal-info',
    imports: [ListComponent, IconLinkComponent],
    templateUrl: './personal-info.component.html'
})
export class PersonalInfoComponent {
  readonly firebase = inject(FirebaseService);
}
