import React from 'react';
import CommentPart from "./commentPart.jsx";

class List extends React.Component{
    constructor(props){
        super(props);
        this.state ={
        }
    }
    render(){
           return this.props.comments.map((comment,key)  => {
                return <CommentPart  key={key} comment={comment} /> 
    }) 
    }
}
export default List;
