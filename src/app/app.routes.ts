import { Routes } from '@angular/router';
import { CvComponent } from './components/cv/cv.component';
import { CertificatesComponent } from './components/certificates/certificates.component';

export const routes: Routes = [
  { path: '', component: CvComponent },
  { path: 'certificates', component: CertificatesComponent },
];
