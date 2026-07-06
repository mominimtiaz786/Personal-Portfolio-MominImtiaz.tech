import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WorkComponent } from './pages/work/work.component';
import { WorkDetailComponent } from './pages/work-detail/work-detail.component';
import { AboutComponent } from './pages/about/about.component';
import { HireMeComponent } from './pages/hire-me/hire-me.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Momin Imtiaz — Senior Software Engineer' },
  { path: 'work', component: WorkComponent, title: 'Work — Momin Imtiaz' },
  { path: 'work/:slug', component: WorkDetailComponent, title: 'Project — Momin Imtiaz' },
  { path: 'about', component: AboutComponent, title: 'About — Momin Imtiaz' },
  { path: 'hire-me', component: HireMeComponent, title: 'Hire Me — Momin Imtiaz' },
  { path: 'blog', component: BlogComponent, title: 'Blog — Momin Imtiaz' },
  { path: 'blog/:slug', component: BlogDetailComponent, title: 'Blog — Momin Imtiaz' },
  { path: '**', redirectTo: '' },
];
