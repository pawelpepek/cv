import { Component, inject, OnInit } from '@angular/core';
import { RightPartComponent } from "./components/right-part/right-part.component";
import { LeftPartComponent } from "./components/left-part/left-part.component";
import { ActivatedRoute } from '@angular/router';
import { BoldService } from './services/bold.service';
import { FirebaseService } from './services/firebase.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LanguageService } from './services/language.service';
import { Languages } from './models/language';
import { LanguageToggleComponent } from './components/left-part/language-toggle/language-toggle.component';

@Component({
    selector: 'app-root',
    imports: [
        RightPartComponent,
        LeftPartComponent,
        LanguageToggleComponent,
        AngularFireAuthModule
    ],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  readonly firebase = inject(FirebaseService);

  private readonly route = inject(ActivatedRoute);
  private readonly boldService = inject(BoldService);
  private readonly languageService = inject(LanguageService);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const c1 = params['c1'] || null;
      const c2 = params['c2'] || null;
      const highlight = params['highlight'] ? params['highlight'].split(',') : [];
      const language = params['lang'] as keyof typeof Languages;

      this.boldService.bold.set(highlight);

      if (c1 && c1) {
        this.firebase.login(c1, c2);
      }

      if (language) {
        this.languageService.language.set(Languages[language])
      }
    });
  }
}
