import { Component, inject } from '@angular/core';
import { RightPartComponent } from '../right-part/right-part.component';
import { LeftPartComponent } from '../left-part/left-part.component';
import { LanguageToggleComponent } from '../left-part/language-toggle/language-toggle.component';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-cv',
  imports: [RightPartComponent, LeftPartComponent, LanguageToggleComponent],
  templateUrl: './cv.component.html'
})
export class CvComponent {
  readonly firebase = inject(FirebaseService);
}
