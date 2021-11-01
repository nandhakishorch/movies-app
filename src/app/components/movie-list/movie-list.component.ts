import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { ToastrService } from 'ngx-toastr';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';
import { MovieService } from 'src/app/Services/movie.service';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnChanges {

  @Input()
  moviesSource: Movie[];

  @Input()
  searchText: string;

  movies: Movie[];
  index: number = -1;
  selectedMovie: Movie;
  newMovie: Movie;
  isNewRecord = false;
  currentPage = 0;
  itemsPerPage = 10;
  genres: string[];
  selectedGenre: string = 'select';
  totalRecords: number;

  constructor(public toasterService: ToastrService, public movieService: MovieService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.searchText.firstChange) {
      setTimeout(() => {
        this.totalRecords = this.moviesSource.length;
      }, 0);
      this.movies = this.moviesSource.slice(0, this.itemsPerPage);
      this.currentPage = 1;
    }
  }


  ngOnInit(): void {
    this.movies = this.moviesSource.slice(0, this.itemsPerPage);
    this.totalRecords = this.moviesSource.length;
    this.getMovieGenreTypes();
  }

  getMovieGenreTypes() {
    this.genres = this.moviesSource.map(movie => movie.Major_Genre)
      .filter((genre, index, genrs) => genre && genrs.indexOf(genre) === index);
  }

  selectedValue() {
    this.newMovie.Major_Genre = this.selectedGenre;
  }

  addNewMovieRecord() {
    this.isNewRecord = true;
    this.newMovie = new Movie();
    this.newMovie.Release_Date = new Date();
    this.selectedGenre = 'select';
    this.filterMoviesBySearchText();
    this.addRecordToSelectedPage();
  }

  private addRecordToSelectedPage() {
    let _newPage = this.moviesSource.length % this.itemsPerPage === 0 ? 1 : 0;
    let _pageNumber = Math.ceil((this.moviesSource.length + _newPage) / this.itemsPerPage);
    this.goToSelectedPage({ page: _pageNumber, itemsPerPage: this.itemsPerPage });
    this.totalRecords = this.moviesSource.length + _newPage;
    setTimeout(() => {
      this.currentPage = _pageNumber;
    }, 0);
  }

  private filterMoviesBySearchText() {
    if (this.searchText?.length) {
      this.moviesSource = this.movieService.getMovies.filter(movie => {
        if (typeof movie.Title === 'string') {
          return movie.Title.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
        }
        return String(movie.Title).indexOf(this.searchText) > -1;
      });
    }
  }

  private addToSelectedPage() {
    let _pageNumber = Math.ceil(this.moviesSource.length / this.itemsPerPage);
    this.goToSelectedPage({ page: _pageNumber, itemsPerPage: this.itemsPerPage });
    this.currentPage = _pageNumber;
  }

  saveMovie() {
    if (!this.newMovie.Title || !this.newMovie.Title.trim()) {
      this.toasterService.warning('Plese enter Title');
      return;
    }

    if (this.filterMovieByTitle(this.newMovie.Title).length > 0) {
      this.toasterService.warning('This Title already exists');
      return;
    }

    if (this.selectedGenre === 'select') {
      this.toasterService.warning('Please select Major genre');
      return;
    }
    this.movieService.getMovies.push(this.newMovie);
    this.moviesSource.push(this.newMovie);
    this.isNewRecord = false;
    this.filterMoviesBySearchText();
    this.addToSelectedPage();
  }

  cancelNewMovie() {
    this.isNewRecord = false;
  }

  editMovie(movie: Movie, index: number) {
    this.index = index;
    this.selectedMovie = Object.assign({}, this.movies[index]);
    movie.Release_Date = new Date(movie.Release_Date);
    this.selectedGenre = this.selectedMovie.Major_Genre || 'select';
  }

  cancelMovie(movie: Movie, index: number) {
    this.movies[index] = this.selectedMovie;
    this.index = -1
  }

  updateMovie(movie: Movie, index: number) {
    if (!movie.Title || !movie.Title.trim()) {
      this.toasterService.warning('Plese enter team name');
      return;
    }

    if (this.filterMovieByTitle(movie.Title).length > 1) {
      this.toasterService.warning('This Title already exists');
      return;
    }
    this.index = -1
    movie.Major_Genre = this.selectedGenre;
  }

  deleteMovie(movie: Movie, index: number) {
    if (confirm('Are you sure to delete movie " ' + movie.Title + ' "')) {
      this.moviesSource = this.moviesSource.filter(_movie => _movie.Title !== movie.Title);
      this.movieService.setMovies = this.movieService.getMovies.filter(_movie => _movie.Title !== movie.Title);
      this.goToSelectedDeleteItemPage({ page: this.currentPage, itemsPerPage: this.itemsPerPage });
    }
  }

  private goToSelectedDeleteItemPage(event: PageChangedEvent) {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.movies = this.moviesSource.slice(startItem, endItem);
    if (this.movies.length === 0) {
      this.goToSelectedDeleteItemPage({ page: event.page - 1, itemsPerPage: this.itemsPerPage });
      this.currentPage = Math.ceil(startItem / this.itemsPerPage);
      setTimeout(() => {
        this.totalRecords = this.moviesSource.length;
      }, 0);
    }
  }

  filterMovieByTitle(movieTitle: string) {
    return this.movieService.getMovies.filter(movie =>
      String(movie.Title).trim().toLowerCase() === String(movieTitle).trim().toLowerCase());
  }

  pageChanged(event: PageChangedEvent): void {
    this.goToSelectedPage(event);
  }

  private goToSelectedPage(event: PageChangedEvent) {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.movies = this.moviesSource.slice(startItem, endItem);
  }

  displayDate(releaseDate: Date): string {
    if (typeof releaseDate !== 'string') {
      let _date = releaseDate?.toDateString().split(' ');
      _date.shift();
      return _date.join(' ');
    }
    return releaseDate;
  }
}
