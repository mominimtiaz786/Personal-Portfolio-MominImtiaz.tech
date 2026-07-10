import { Routes } from '@angular/router';
import { adminAuthGuard } from './auth/admin-auth.guard';

export const adminRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/admin-login.component').then((m) => m.AdminLoginComponent),
    title: 'Admin Login',
  },
  {
    path: '',
    loadComponent: () => import('./layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
    canActivate: [adminAuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent),
        title: 'Dashboard — Admin',
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./projects/project-list/admin-project-list.component').then(
            (m) => m.AdminProjectListComponent
          ),
        title: 'Projects — Admin',
      },
      {
        path: 'projects/new',
        loadComponent: () =>
          import('./projects/project-form/admin-project-form.component').then(
            (m) => m.AdminProjectFormComponent
          ),
        title: 'New Project — Admin',
      },
      {
        path: 'projects/:id/edit',
        loadComponent: () =>
          import('./projects/project-form/admin-project-form.component').then(
            (m) => m.AdminProjectFormComponent
          ),
        title: 'Edit Project — Admin',
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('./blog/blog-list/admin-blog-list.component').then((m) => m.AdminBlogListComponent),
        title: 'Blog Posts — Admin',
      },
      {
        path: 'blog/new',
        loadComponent: () =>
          import('./blog/blog-form/admin-blog-form.component').then((m) => m.AdminBlogFormComponent),
        title: 'New Post — Admin',
      },
      {
        path: 'blog/:id/edit',
        loadComponent: () =>
          import('./blog/blog-form/admin-blog-form.component').then((m) => m.AdminBlogFormComponent),
        title: 'Edit Post — Admin',
      },
      {
        path: 'contacts',
        loadComponent: () =>
          import('./contacts/admin-contacts.component').then((m) => m.AdminContactsComponent),
        title: 'Contacts — Admin',
      },
      {
        path: 'subscribers',
        loadComponent: () =>
          import('./subscribers/admin-subscribers.component').then((m) => m.AdminSubscribersComponent),
        title: 'Subscribers — Admin',
      },
    ],
  },
];
