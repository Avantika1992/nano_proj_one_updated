import React from 'react';
import {Router,Route} from 'react-router';
import './App.css';
import {getAll,get,update,search} from './BooksAPI'
import Search from './search'
import {Link} from 'react-router-dom'

class BooksApp extends React.Component {
  render() {
    var allBooks = {
      "currentlyReading": this.props.currentlyReading,
      "wantToRead": this.props.wantToRead,
      "read": this.props.read
    }
    return (
      <div className="app">
        <div>
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {Object.keys(allBooks).map(key => (
              <div>
                <h2 className="bookshelf-title">{key}</h2>
                {allBooks[key].map(book => (
                <div key={book.id} className="bookshelf"><div className="bookshelf-books">
                    <ol className="books-grid">
                      <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail + ')' }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={this.props.handleSelectionChanged.bind(this, book, key)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="None">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    </ol>
                  </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
  // render() {
  //
  //   var allBooks={"currentlyReading":this.props.currentlyReading,
  //            "wantToRead":this.props.wantToRead,
  //            "read":this.props.read}
//     let output = [];
//      output.push(
//                <div className="list-books-title">
//               <h1>MyReads</h1>
//             </div>
//            )
//     for(var key in allBooks){
//       //console.log(allBooks[key])
//
//       output.push(<h2 className="bookshelf-title">{key}</h2>)
//       let placeBook=key
//       for(var i=0;i<(allBooks[key].length);i++){
//       let book=allBooks[key][i]
//
//       let thumbnail = book.imageLinks ? book.imageLinks.thumbnail : book.infoLink
//       console.log(book.title)
//       output.push(<div className="bookshelf"><div className="bookshelf-books">
//                     <ol className="books-grid">
//                     <li key={book.title}>
//                         <div className="book">
//                           <div className="book-top">
//                             <div className="book-cover" style={{ width: 128, height: 193,backgroundImage: 'url('+thumbnail+ ')'}}></div>
//                             <div className="book-shelf-changer">
//                               <select value={book.shelf} onChange={this.props.handleSelectionChanged.bind(this,book,placeBook)}>
//                                 <option value="move" disabled>Move to...</option>
//                                 <option value="defval" hidden></option>
//                                 <option value="currentlyReading">Currently Reading</option>
//                                 <option value="wantToRead">Want to Read</option>
//                                 <option value="read">Read</option>
//                                 <option value="None">None</option>
//                               </select>
//                             </div>
//                           </div>
//                           <div className="book-title">{allBooks[key][i].title}</div>
//                           <div className="book-authors">{allBooks[key][i].authors}</div>
//                         </div>
//                       </li>
//                    </ol>
//                   </div>
//                   </div>)
// }
// }
//     return (
//       <div className="app">
//         <div>
//           <div>
//               <Link to="/search"><h2>GO TO SEARCH PAGE</h2></Link>
//               {output}
//            </div>
//          </div>
//       </div>
// )
// }
// }


export default BooksApp
