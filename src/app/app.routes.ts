import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { KarticaComponent} from './kartica/kartica.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { QuizComponent } from './quiz/quiz.component';
export const routes: Routes = [
 { path: '', component: LoginComponent },
 { path: 'home', component: HomeComponent },
 { path: 'about', component: AboutComponent },
 { path:'news',component: KarticaComponent},
 { path:'products',component: ProductsComponent},
 { path:'quiz',component: QuizComponent},
 { path: 'register', component: RegisterComponent},
 { path: 'admin-dashboard', loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },

];
@NgModule({
imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }
