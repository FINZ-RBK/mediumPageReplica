import React from "react";
import Clap from "./Clap.jsx";
class CommentPart extends React.Component {
    constructor(props){
        super(props);
        this.state ={

        }
    }
    render(){
        return(
            <div className ="cardChromless">
            <div className="commentsCard">
               <div className="commentNav">
                   <img className="commentImg" src={this.props.comment.image}  alt="Go to the profile">
                   </img>
                <div className="commentBody">
                    <a className="commentUser">{this.props.comment.writerName}</a>
                <br></br>
                   <time className="commentTime" dateTime="2019-11-11"> {this.props.comment.date} </time>
                </div>
            </div>

            <p className="commentTitle"> {this.props.comment.Description}</p>
            <div className="postArticle">
              <a href=""> <button className="commentbtn"> Read more... </button></a>
            </div> 
            <Clap num={this.props.comment.NoOfClub}/>   
        </div>
    </div>  
        )
    }

}

export default CommentPart;