import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route} from 'react-router';
import {BrowserRouter,Link} from 'react-router-dom'
import App from './App'
import Search from './search'
import './index.css'
import {getAll,get,update,search} from './BooksAPI'



class Index extends React.Component{
  constructor(props) {
        super(props);

        this.state = {
        currentlyReading:[],
        wantToRead:[],
        read:[],
        availableBooks:[],
        buks:[],
        value: "",

       };



       getAll().then((result) =>{
       this.setState({buks:result})
       var curr = [];
       var want = [];
       var toread= [];


         result.forEach(function(book){

         if(book.shelf==="currentlyReading")
         {
           curr.push(book)
         }
         if(book.shelf==="wantToRead")
         {
           want.push(book)
         }
         if(book.shelf==="read")
         {
           toread.push(book)
         }
       }

       );
       this.setState({currentlyReading:curr})
       this.setState({wantToRead:want})
       this.setState({read:toread})


     }
     )

     }


       handleSelectionChanged(book,placeBook,event) {
         event.preventDefault()
         if(event.target.value==="currentlyReading"){
           update(book,"currentlyReading").then((result) =>{
           console.log(result)
         })
             book.shelf="currentlyReading"
             var a = this.state.currentlyReading
           	a.push(book)
              this.setState({currentlyReading: a});
         }
         if(event.target.value==="wantToRead"){
           update(book,"wantToRead").then((result) =>{
           console.log(result)
         })
             book.shelf="wantToRead"
             var e = this.state.wantToRead
           	e.push(book)
                 this.setState({wantToRead: e});
         }
         if(event.target.value==="read"){
           update(book,"read").then((result) =>{
           console.log(result)
         })
             book.shelf="read"
             var f = this.state.read
           	f.push(book)
             this.setState({read: f});
         }
          if(event.target.value==="None"){
            update(book,"None").then((result) =>{
            console.log(result)
          })
              book.shelf="None"
              this.setState({availableBooks: this.state.availableBooks.push(book)});
         }
          if(placeBook==="currentlyReading"){
              for( var m = 0; m < this.state.currentlyReading.length; m++){
              if ( this.state.currentlyReading[m].title === book.title) {
                var g=this.state.currentlyReading
                g.splice(m, 1)
                this.setState({currentlyReading:g});

             }
           }
         }
           if(placeBook==="wantToRead"){
              for( var n = 0; n < this.state.wantToRead.length; n++){
              if ( this.state.wantToRead[n].title === book.title) {
              const h=this.state.wantToRead
              h.splice(n, 1)
              this.setState({wantToRead:h});
             }
           }
         }
           if(placeBook==="read"){
              for( var o = 0; o < this.state.read.length; o++){
              if ( this.state.read[o].title === book.title) {
              const z=this.state.read
              z.splice(o, 1)
              this.setState({read:z});
             }
           }
         }
          if(placeBook===this.state.availableBooks){
              for( var i = 0; i < this.state.availableBooks.length; i++){
              if ( this.state.availableBooks[i] === book.title) {
              this.state.availableBooks.splice(i, 1);

             }
           }
         }
       }

       handleSelectionSearch(bookSearch,event) {
       event.preventDefault()
       if(event.target.value==="currentlyReading"){
         update(bookSearch,"currentlyReading").then((result) =>{
         console.log(result)
       })
           bookSearch.shelf="currentlyReading"
           var d = this.state.currentlyReading
          d.push(bookSearch)
            this.setState({currentlyReading: d});
       }
       if(event.target.value==="wantToRead"){
         update(bookSearch,"wantToRead").then((result) =>{
         console.log(result)
       })
           bookSearch.shelf="wantToRead"
           var e = this.state.wantToRead
          e.push(bookSearch)
               this.setState({wantToRead: e});
       }
       if(event.target.value==="read"){
         update(bookSearch,"read").then((result) =>{
         console.log(result)
       })
           bookSearch.shelf="read"
           var f = this.state.read
          f.push(bookSearch)
               this.setState({read: f});
       }
       if(event.target.value==="None"){
         update(bookSearch,"None").then((result) =>{
         console.log(result)
       })
         bookSearch.shelf="None"
         for( var i = 0; i <= this.state.buks.length; i++){
         if ( this.state.buks[i] === bookSearch.title) {
         this.state.buks.splice(i, 1);
       }
      }
    }
  }



  render(){
    return (
      <div>
      <BrowserRouter>
      <div>


        <Route path={"/"} exact render={()=><App
           currentlyReading={this.state.currentlyReading}
           wantToRead={this.state.wantToRead}
           read={this.state.read}
           handleSelectionChanged={this.handleSelectionChanged.bind(this)}/>}/>

        <Route path={"/search"} exact render={()=><Search
           currentlyReading={this.state.currentlyReading}
           wantToRead={this.state.wantToRead}
           read={this.state.read}
           buks={this.state.buks}
           ser={this.state.ser}
           handleSelectionSearch={this.handleSelectionSearch.bind(this)}/>}/>



      </div>
      </BrowserRouter>
      </div>
    )
  }
}


ReactDOM.render(<Index />, document.getElementById('root'))
