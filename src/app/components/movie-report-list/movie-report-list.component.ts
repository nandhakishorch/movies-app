import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';

@Component({
    selector: 'movie-report-list',
    templateUrl: './movie-report-list.component.html',
    styleUrls: ['./movie-report-list.component.scss']
})
export class MovieReportListComponent implements OnInit {

    @Input()
    movies: Movie[];

    titleSearch: string;

    constructor() { }

    ngOnInit(): void { }

    displayDate(releaseDate: Date): string {
        if (typeof releaseDate !== 'string') {
            let _date = releaseDate?.toDateString().split(' ');
            _date.shift();
            return _date.join(' ');
        }
        return releaseDate;
    }
}
