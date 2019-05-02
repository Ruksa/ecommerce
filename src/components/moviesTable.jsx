import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';


class MoviesTable extends Component {
   state={
       columns:[
           {path:'title',label:'Title', content:movie=><Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
           {path:'genre.name',label:'Zoner'},
           {path:'numberInStock',label:'Stock'},
           {path:'dailyRentalRate',label:'Rating'},
           {
               key:'Like',
               content:movie=><Like onClick={() => this.props.onLike(movie)} /> },
           {
               key:'Delete',
               content:movie=><button onClick={() => this.props.onDelete(movie)} className="btn btn-danger btn-sm">Delete</button>
             }
    
    ]
   }
    render()
    {
    const{movies,onSort,sortColumn}=this.props;
    return (
        <div>
       
        <Table
        columns={this.state.columns}
        sortColumn={sortColumn}
        data={movies}
        onSort={onSort}
        />
        </div>
      
      );
}
}
 
export default MoviesTable;