import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieComponent } from './components/movie/movie.component';
import { HttpClientModule } from '@angular/common/http';
import { TitleFilterPipe } from './Pipes/titleFilter.pipe';
import { ModalTemplateComponent } from './components/modal/modal-template.component';
import { MovieByGroupComponent } from './components/movies-by-group/movies-by-group.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MovieReportListComponent } from './components/movie-report-list/movie-report-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OrderByPipe } from './Pipes/order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieComponent,
    TitleFilterPipe,
    ModalTemplateComponent,
    MovieByGroupComponent,
    MovieReportListComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
