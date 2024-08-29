import './publicspace.css'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Mainsection from './publicmainsection'

const Postsection = () => {
    
    const userpost=useSelector((state)=>state.friendreducer.data)
    const currentuser=useSelector((state)=>state.currentuserreducer)
    const currentuserpost = useSelector((state)=>state.postreducer.data)

    const currentpost = currentuserpost.filter((userdetails)=>(
      userdetails._id === currentuser.result._id
    )).map((currentpost)=>currentpost.post)
    const allposts = []
    
    const elements =userpost.map((post)=>post.post.map((post)=>post))
    const friendspost = elements.flat(Infinity)
    const userpostflat = currentpost.flat(1)
    allposts.push(userpostflat)
    allposts.push(friendspost)

    const [data1,data2] =allposts
    const everypost = [...data1,...data2]
    const datesarray = userpostflat.map((post)=>(
      post.postedon
    ))
    function istoday(datestring){
      const date = new Date(datestring);
      const today = new Date();

      const todaydateonly = new Date(today.getFullYear(),today.getMonth(),today.getDate())
      const givendateonly = new Date(date.getFullYear(),date.getMonth(),date.getDate())

      return todaydateonly.getTime() === givendateonly.getTime();
    }

    const todaydates = datesarray.filter(datestring=>istoday(datestring))
    
    const todaypostcount = todaydates.length;
    const friendscountarray = currentuserpost.filter((userdetails)=>(
      userdetails._id === currentuser.result._id
    )).map((currentpost)=>currentpost.friends)

    const allfriends = friendscountarray.flat(1)
    const friendscount = allfriends.length
    
    let todaylimit = 0;

    if(friendscount >= 10){
      todaylimit = Infinity;
    }else if(friendscount >=2){
      todaylimit = 2;
    }else if(friendscount > 0){
      todaylimit = 1;
    }else{
      todaylimit = 0;
    }

  todaylimit = todaylimit - todaypostcount;
  return (
    <div>
    <div className='post-section'>
        
                <div className='create-post'>
                    <div className='create-post-header'>
                    <h4>Share Post</h4>
                    <p>share your photos to your friends in public space</p>
                    </div> 
                    <div>
                    { todaylimit > 0 ?(
                      <Link to={`/createpost`} className='create-post-link'>create post</Link>
                    ):<p className='exceed-button'>limit exceed</p> 
                    }
                    </div>
                    
                </div>
    </div>
    <h4 className='posts-title'>All Posts{todaylimit>0?<></>:<span className='alert-message'>(Today limit exceed ! you can only post if you have more friends )</span>}</h4>
    <section className='posts'>
    <div className='post'>
        {      
          everypost ? 
          everypost.map((post)=>(
                    <Mainsection post={post} />
        ))
        : <></>
     }
   </div>
    </section>

    </div>
  )
} 

export default Postsection