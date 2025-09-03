import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthUser } from '../../models/AuthUser';
import { AuthApi } from '../../services/auth-api';
import { User } from '../../models/User';
import { SessionService } from '../../services/session-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loading = signal(false);
  form;
  constructor(
    private fb: FormBuilder,
    private authService: AuthApi,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);

    const formValue = this.form.getRawValue();
    let authUser: User = {
      email: formValue.email!,
      password: formValue.password!,
    };

    this.authService.loginUser(authUser).subscribe({
      next: (user) => {
        console.log('User created:', user);
        if (user.token) {
          this.sessionService.setUserSession(user);
          this.router.navigate(['/products']);
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login failed');
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
