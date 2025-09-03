import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApi } from '../../services/auth-api';
import { AuthUser } from '../../models/AuthUser';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  loading = signal(false);
  form;

  constructor(
    private fb: FormBuilder,
    private authService: AuthApi,
    private router: Router
  ) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.strongPassword()]],
      confirmPassword: [
        '',
        [Validators.required, this.matchControl('password')],
      ],
    });
  }

  passwordStrength(): number {
    const v = this.form.controls.password.value || '';
    let score = 0;
    if (v.length >= 8) score += 30;
    if (/[A-Z]/.test(v)) score += 30;
    if (/\d/.test(v)) score += 20;
    if (/[^\\w\\s]/.test(v)) score += 20;
    return score;
  }

  strengthLabel(): string {
    const s = this.passwordStrength();
    if (s < 50) return 'Weak password';
    if (s < 80) return 'Medium password';
    return 'Strong password';
  }

  strengthBarClass(): string {
    const s = this.passwordStrength();
    if (s < 40) return 'bg-red-500';
    if (s < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  }

  strengthTextClass(): string {
    const s = this.passwordStrength();
    if (s < 40) return 'text-red-600';
    if (s < 70) return 'text-yellow-600';
    return 'text-green-600';
  }

  matchControl(otherKey: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent as any;
      if (!parent) return null;
      const other = parent.get(otherKey);
      if (!other) return null;
      return other.value === control.value ? null : { mismatch: true };
    };
  }

  strongPassword() {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\\w\\s]).{8,}$/;
    return (control: AbstractControl): ValidationErrors | null => {
      const val = control.value as string;
      if (!val) return null;
      return regex.test(val) ? null : { weak: true };
    };
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);

    const formValue = this.form.getRawValue();
    let authUser: AuthUser = {
      fullname: formValue.fullName!,
      email: formValue.email!,
      password: formValue.password!,
    };

    this.authService.createUser(authUser).subscribe({
      next: (response) => {
        console.log('User created:', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
      },
      complete: () => {},
    });
    this.loading.set(false);
  }
}
