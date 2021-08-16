
import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./post";
export default function Timeline(){
    
    
    const {photos}=usePhotos();
    return(
        <div className=" container  col-span-2">
            {!photos ? (
                <>
                    <Skeleton  count={4} width={320} height={400} />
                </>
            ): photos.length>0 ? (
                photos?.map((content)=>
                    <Post key={content.DocId} content={content}/>
                )
            ) : (
                <p className="text-center text-2xl"> follow people to see photos!</p>
            )
            }

        </div>
    );
}
//posts
//comments
