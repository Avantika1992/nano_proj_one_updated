import React from 'react';
import {Router,Route} from 'react-router';
import './App.css';
import {getAll,get,update,search} from './BooksAPI'
import {Link} from 'react-router-dom'


class Search extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
        searc:"",
        ser:'',
        displaySearch:[]
       };
     }

 searchHandler(event){
  event.preventDefault()
  var entered_value = event.target.value
  if(entered_value!==''){
  search(entered_value,5).then((result) =>{
  this.setState({displaySearch:result})
  })
 }

 if(entered_value===''){
   this.setState({displaySearch:[]})
 }
}
render(){
  var array2=this.props.currentlyReading.concat(this.props.wantToRead)
  array2=array2.concat(this.props.read)
  console.log(array2)
  let totalBooks = this.state.displaySearch
  console.log(totalBooks)
  totalBooks = totalBooks.filter(function(item) {
  return array2.indexOf(item) == -1
  })
  console.log(totalBooks)
  return(

  <div>
  <div className="search-books">
        <div className="search-books-bar">
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.searchHandler.bind(this)}/>
          </div>
        </div>
        <div className="search-books-results">
  <Link to="/"><h2>GO TO HOME PAGE</h2></Link>
  </div>
 </div>
 {totalBooks.map(bookSearch => (

 <div key={bookSearch.id} className="bookshelf"><div className="bookshelf-books">
 <ol className="books-grid">
                   <li key={bookSearch.title}>
                       <div className="book">
                         <div className="book-top">
                         {bookSearch.imageLinks.thumbnail &&
                           <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + bookSearch.imageLinks.thumbnail + ')' }}  ></div>
                         }
                           <div className="book-shelf-changer">
                             <select value={bookSearch.shelf} onChange={this.props.handleSelectionSearch.bind(this,bookSearch)}>
                               <option value="move" disabled>Move to...</option>
                               <option value="defval" hidden></option>
                               <option value="currentlyReading">Currently Reading</option>
                               <option value="wantToRead">Want to Read</option>
                               <option value="read">Read</option>
                               <option value="None">None</option>
                             </select>
                           </div>
                         </div>
                         <div className="book-title">{bookSearch.title}</div>
                         <div className="book-authors">{bookSearch.authors}</div>
                       </div>
                     </li>
                  </ol>
                 </div>
                 </div>)
               )
               }

               </div>
               )
               }
               }


//   var displaySearchBooks=[];
//   let totalBooks = this.state.displaySearch
//   for(var i in totalBooks){
//     let bookSearch=totalBooks[i]
//     if(bookSearch && bookSearch.length != 0 && typeof bookSearch != "string"){
//     let thumbnail = bookSearch.imageLinks ? bookSearch.imageLinks.thumbnail : bookSearch.infoLink
//
//     displaySearchBooks.push(<div className="bookshelf"><div className="bookshelf-books">
//                   <ol className="books-grid">
//                   <li key={bookSearch.title}>
//                       <div className="book">
//                         <div className="book-top">
//                           <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:'url('+ thumbnail + ')' }}></div>
//                           <div className="book-shelf-changer">
//                             <select value={bookSearch.shelf} onChange={this.props.handleSelectionSearch.bind(this,bookSearch)}>
//                               <option value="move" disabled>Move to...</option>
//                               <option value="defval" hidden></option>
//                               <option value="currentlyReading">Currently Reading</option>
//                               <option value="wantToRead">Want to Read</option>
//                               <option value="read">Read</option>
//                               <option value="None">None</option>
//                             </select>
//                           </div>
//                         </div>
//                         <div className="book-title">{bookSearch.title}</div>
//                         <div className="book-authors">{bookSearch.authors}</div>
//                       </div>
//                     </li>
//                  </ol>
//                 </div>
//                 </div>)
//               }
// }
//
//   return(
//
//     <div className="search-books">
//       <div className="search-books-bar">
//         <div className="search-books-input-wrapper">
//           <input type="text" placeholder="Search by title or author" onChange={this.searchHandler.bind(this)}/>
//         </div>
//       </div>
//       <div className="search-books-results">
//       <Link to="/"><h2>GO TO HOME PAGE</h2></Link>
//       {displaySearchBooks}
//       </div>
//     </div>
//   )
// }
// }


export default Search;
