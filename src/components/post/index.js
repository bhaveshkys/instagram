import Header from "./header"
import Image from "./image"
import Actions from "./actions"
import { useRef } from "react"
import Footer from "./footer"
import Comments from "./comments"
export default function Post({content}){
    //header image actions footer comments
    const commentInput = useRef(null);
    const handleFocus =()=>commentInput.current.focus();
    return (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-16">
            <Header username={content.username} />
            <Image  src={content.imageSrc} caption={content.caption}/>
            <Actions 
                DocId={content.DocId}
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhotos}
                handleFocus={handleFocus}
            />
            <Footer caption={content.caption} username={content.username} />
            <Comments DocId={content.DocId} comments={content.comments}
            posted={content.dateCreated} commentInput={commentInput} />
        </div>
    )

}