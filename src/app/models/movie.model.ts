export class Movie {
    Id: number;
    Title: string;
    US_Gross: number;
    Worldwide_Gross: number;
    US_DVD_Sales?: number;
    Production_Budget: number;
    Release_Date: Date;
    MPAA_Rating: string;
    Running_Time_min?: number;
    Distributor: string;
    Source?: string;
    Major_Genre?: string;
    Creative_Type?: string;
    Director?: string;
    Rotten_Tomatoes_Rating?: number;
    IMDB_Rating: string;
    IMDB_Votes: number;
}