import React, { Component } from 'react';
import toast from 'react-toastify';
import {Link } from 'react-router-dom';
import  { getMovies ,deleteMovie } from '../services/movieService';
import {  getGenres } from '../services/genreService';

import Pagination from './common/pagination';
import Paginate from './utils/paginate';
import ListGroup from './common/listGroup';
import SearchBox from './common/searchBox';
import MoviesTable from './moviesTable';
import _ from 'lodash';



class Movies extends Component {
    state = { 
        movies:[],
        genres:[],
        pageSize:4,
        currentPage:1,
        selectedGenre:null,
        searchQuery:"",
        sortColumn:{path:'title',order:'asc'}
      
       
     }
     async componentDidMount(){
         const {data} =await getGenres();
        const genres= [{_id:'',name:'All Genres'},...data];

        const {data:movies}=await getMovies();

        this.setState({movies,genres});
     }
     onHandleDelete = async movie =>
     {
        const originalMovies=this.state.movies;
        const movies=originalMovies.filter(m => m._id!==movie._id);
        this.setState({movies});
        try{
            await deleteMovie(movie._id);

        }
        catch(ex){

            if(ex.response&&ex.response.status===404)
            {
                toast.error("This movie already been deleted.");
                
            }
            this.setState({movies:originalMovies});

        }  
     }
     handlePageChange = page =>
     {
        
         this.setState({currentPage:page});
     }
     handleGenreSelect= genre => {
        
         this.setState({selectedGenre:genre,searchQuery:"", currentPage:1});
        
     }
     handleSearch=query=>{
         this.setState({searchQuery:query,selectedGenre:null,currentPage:1});
     }
     handleSort = sortColumn => {
         
         this.setState({sortColumn});
     }
     handleLike = movie => {
         console.log("Like clicked"+movie);
     }
     getPageData = () => {
        const {
            currentPage,
            selectedGenre,
            searchQuery,
            sortColumn,
            pageSize,
            movies:allMovies,
            genres
        }=this.state;
        let filtered=allMovies;

        if(searchQuery)
            filtered=allMovies.filter(m=>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
                );
        else if(selectedGenre&&selectedGenre._id)
        filtered=selectedGenre && selectedGenre._id?allMovies.filter(m =>m.genre._id===selectedGenre._id):allMovies;

        const sorted=_.orderBy(filtered,[sortColumn.path],[sortColumn.order]);

       
        const movies=Paginate(sorted,currentPage,pageSize);

        return {totalCount:filtered.length,data:movies};

     };

     addNewMovie=()=>{
        this.props.history.push(`/movies/new`);

     }
    render() { 
        const {length:count}=this.state.movies;
        const {currentPage,sortColumn,pageSize,genres,searchQuery}=this.state;
        const {user}=this.props;

        if(count===0) return <p>There are no movies in the database</p>

       
        const { totalCount, data:movies}=this.getPageData();
    
       
        return (

           <div>
               <div className="row">
               <div className="col-2">
            
                    <ListGroup 
                     items={genres} 
                     selectedItem={this.state.selectedGenre}
                    onItemSelect={this.handleGenreSelect}/>
               </div>
               <div className="col">

                {user&&
                 <Link to="/movies/new" className="btn btn-primary m-2" style={{marginBottom:20}}>New Movie</Link>
                }
              
              
             
               
               <p> showing {totalCount} movies in the database</p>
               <SearchBox value={searchQuery} onChange={this.handleSearch} />
                     <MoviesTable
                     movies={movies}
                     sortColumn={sortColumn}
                     onDelete={this.onHandleDelete}
                     onSort={this.handleSort}
                     onLike={this.handleLike}/>
               
             <Pagination 
                 itemsCount={totalCount} 
                 pageSize={pageSize}
                 currentPage={currentPage}
                  onPageChange={this.handlePageChange}/>
               
               </div>
               </div>
               
      
       </div> 
        );
    }
}
 
export default Movies;