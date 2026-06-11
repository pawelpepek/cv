import { Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, RouterOutlet } from '@angular/router';
import { BoldService } from './services/bold.service';
import { FirebaseService } from './services/firebase.service';
import { LanguageService } from './services/language.service';
import { Language, Languages } from './models/language';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private readonly firebase = inject(FirebaseService);
  private readonly route = inject(ActivatedRoute);
  private readonly boldService = inject(BoldService);
  private readonly languageService = inject(LanguageService);
  private readonly destroyed = takeUntilDestroyed<Params>();

  ngOnInit(): void {
    this.route.queryParams.pipe(this.destroyed).subscribe(params => {
      const key = params['key'] || null;
      // Conscious limitation: highlight/exclude are comma-separated, so the
      // terms themselves cannot contain commas. Acceptable for CV keywords —
      // do not invent an escaping scheme for this.
      const highlight = params['highlight'] ? params['highlight'].split(',') : [];
      const exclude = params['exclude'] ? params['exclude'].split(',') : [];
      const language = Languages[params['lang'] as keyof typeof Languages];

      this.boldService.bold.set(highlight);
      this.boldService.exclude.set(exclude);

      if (key) {
        void this.firebase.loadPhone(key);
      }

      this.languageService.language.set(language ?? Language.polish);
    });
  }
}
