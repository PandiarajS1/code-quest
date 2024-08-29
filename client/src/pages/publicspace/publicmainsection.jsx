import React,{ useState } from 'react'
import like from '../../assets/heart.svg'
import liked from '../../assets/heart-solid.svg'
import comment_icon from '../../assets/comment.svg'
import share from '../../assets/share.svg'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {uploadcomment} from '../../action/post'

const Mainsection = ({post}) => {

    var currentuser = useSelector((state)=>state.currentuserreducer)

    const dispatch = useDispatch();

    const filename = post.filepath
    const extension = filename.split('.').pop().toLowerCase()
    console.log(extension)
    const isimage = ['jpg','jpeg','png','gif','bmp','svg'].includes(extension)
    const isvideo = ['mp4','mov','avi','mkv','webm','flv'].includes(extension)

    const [comments,setcomments] =useState('')
    const [showcomments,setshowcomments] = useState(false)
    const[likes, setlikes] = useState(false)

    const dropcomment = {
        display : 'block',
        Transition : '0.3'
    }

    const hidecomment = {
        display : 'none'
    }

    const handleLikes = () => {
        setlikes(!likes)
        console.log(likes)
    }

    const handlecomment = () => {
        setshowcomments(!showcomments)
    }

    const handleComments = (e) => {
        e.preventDefault();
        if(comments === ''){
            alert('enter any value..')
        }else{
        dispatch(uploadcomment({postid:post._id,content:comments,usercommented:currentuser.result.name,userid:post.userid}))
        setcomments('')
        }
    }

  return (
   <div className='post-context'>
        { isimage &&
        <img src={require(`../../../../server/uploads/${post.filepath}`)} alt='photo'/>              
        }   
         {
            isvideo &&
            <video src={require(`../../../../server/uploads/${post.filepath}`)} 
            autoPlays
            controls
            alt='video'/>
        }
        <div className='post-description'>
            <div className='post-description-header'>
                <div className='post-user'>
                        <Link className='user-posted-logo'>
                          {  post?.userPosted?.charAt(0).toUpperCase()}
                        </Link>
                        <p>{post.userPosted}</p>
                </div>
                <div className='post-interactions'>
                    { likes &&
                        <img src={liked} alt='like' onClick={handleLikes}/>
                    }
                    {
                        !likes &&
                        <img src={like} alt='like' onClick={handleLikes}/>
                    }
                        <img src={comment_icon} alt='comment' onClick={handlecomment}/>
                     
                    <img src={share} alt='share'/>
                </div>
            </div>
            <div className='post-description-body'>
            <p><span>description:</span>{post.description}</p>
            <p><span>posted</span>{moment(post.postedon).fromNow()}</p>
            </div>
            <div className='post-comments'
            style={showcomments ? dropcomment : hidecomment}
            >
                    <div className='comment-input-container'>
                        <h4>Comment</h4>
                        <form onSubmit={(e)=>{
                            handleComments(e)
                        }} className='comment-input-submit'>
                        <textarea onChange={(e)=>{
                            setcomments(e.target.value)
                        }}
                        value={comments}
                        />
                        <input type='submit' className='commentbutton'/>
                        </form>
                    </div>
                    <div className='comment-section-container'>
                {post.comment.map((comment)=>(
                    <div className='comments'>
                    <Link className='user-posted-logo'>
                    {comment?.usercommented?.charAt(0).toUpperCase()}
                    </Link>
                        <div className='comment-content'>
                        <div className='comment-user-info'>
                        <h5>{comment.usercommented}</h5>
                        <p>commented {moment(comment.Commentedon).fromNow()}</p>
                        </div>
                        <p>{comment.content}</p>
                        </div>    
                    </div>
                    
                ))}
                </div>
            </div>
        </div>    
        </div>
 
  )

}

export default Mainsection