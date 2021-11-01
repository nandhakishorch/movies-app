import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { ModalService } from 'src/app/Services/modal.service';
import { MovieService } from 'src/app/Services/movie.service';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  isShow = false;
  @ViewChild(MovieListComponent) movieList: MovieListComponent;
  searchText;
  movies: Movie[];
  isShowReport = false;

  constructor(private modalService: ModalService, public movieService: MovieService) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  generateReport() {
    this.isShowReport = true;
    this.modalService.show.next('block');
  }

  getAllMovies() {
    this.movieService.GetAllMovies().subscribe(response => {
      this.movies = response.sort((a: Movie, b: Movie) => {
        return new Date(a.Release_Date).getTime() - new Date(b.Release_Date).getTime()
      });
      this.movieService.setMovies = Object.assign([], this.movies);
    });
  }

  onSearchChange(data: string) {
    this.movies = this.movieService.getMovies.filter(movie => {
      if (typeof movie.Title === 'string') {
        return movie.Title.toLowerCase().indexOf(data.toLowerCase()) > -1;
      }
      return String(movie.Title).indexOf(data) > -1;
    });
  }
}
