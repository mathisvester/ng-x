import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthFormComponent } from '../ui/auth-form/auth-form.component';
import { AuthStore } from '../data-access/auth.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [AuthFormComponent, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  readonly authStore = inject(AuthStore);
}
