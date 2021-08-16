import { useContext, useState } from "react";
import firebase from "firebase/app"
import UserContext from "../../context/user";
//button peh function -focus on text box -passing the comment to firebase Arrayunion to photos.comments
export default function AddComment({DocId ,comments,setComments,commentInput}){
    //photo.userid,loggedinUserid,
    const [comment,setComment]=useState('');
    const {
        user:{displayName}
    }=useContext(UserContext);

    const handleSubmitComment=(event)=>{
        event.preventDefault();
        setComments([{displayName,comment},...comments])
        setComment("")
        return firebase.firestore().collection('photos').doc(DocId)
        .update({
            comments: firebase.firestore.FieldValue.arrayUnion({displayName,comment})
        });
         
    };
    return (
        <div className=" rounded-sm border-t border-gray-primary">
            <form className="flex justify-between pl-0 pr-5"
            method="POST"
            onSubmit={(event)=>
            comment.length >=1? handleSubmitComment(event) :event.preventDefault()}
            >
                <input aria-label="Add a comment"
                    autoComplete="off"
                    className=" rounded-md text-sm text-gray-base w-full mr-3 py-5 px-4"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({target})=>setComment(target.value)}
                    ref={commentInput}
                />
                <button 
                    className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25 cursor-default'}`}
                    type="button"
                    disabled={comment.length<1}
                    onClick={handleSubmitComment}
                >Post</button>
            </form>
        </div>
    )
}