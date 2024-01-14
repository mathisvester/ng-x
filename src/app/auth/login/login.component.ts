import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthFormComponent } from '../ui/auth-form/auth-form.component';
import { AuthStore } from '../data-access/auth.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly authStore = inject(AuthStore);
}
