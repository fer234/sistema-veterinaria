import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar todos los componentes para los que se debe activar el servicio de navegación
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from "./guard/auth.guard";
import {PacientesComponent} from './components/pacientes/pacientes.component';
import { PacienteListComponent } from './components/pacientes/paciente-list/paciente-list.component';
import { PacienteTablaComponent } from './components/pacientes/paciente-tabla/paciente-tabla.component';


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'pacientes', component: PacientesComponent, canActivate: [AuthGuard] },
  { path: 'paciente-list', component: PacienteListComponent, canActivate: [AuthGuard] },
  { path: 'paciente-tabla', component: PacienteTablaComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
