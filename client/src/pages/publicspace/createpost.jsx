import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import './createpost.css'

import { getpost, uploadmedia } from '../../action/post';

const Createpost = () => {

    const navigate = useNavigate();
    const dispatch=useDispatch();
    const user = useSelector((state)=>state.currentuserreducer)
    const [media, setmedia] = useState(null);
    const [postdescription, setpostdescription] = useState("");
    const [isliked,setisliked] = useState(true)
    

    const handlesubmit = (e) => {
        e.preventDefault();
        if (user) {
            if (media && postdescription) {

                const Formdata = new FormData();
                Formdata.append('media',media)
                Formdata.append('filepath',media.name)
                Formdata.append('description',postdescription)
                Formdata.append('userPosted',user.result.name)
                Formdata.append('isliked',isliked)
                dispatch(uploadmedia(Formdata,navigate))
                    setmedia('')
                    setpostdescription('')
                    
                  alert("you have successfuly posted")
                dispatch(getpost())
                dispatch()
                    

            }else {
             alert("Please enter all the fields")
         }
         } else {
             alert("Login to ask question")
        }
    }

  return (
    <div className="ask-question">
    <div className="ask-ques-container">
        <h1>Create New Post</h1>
        <form onSubmit={handlesubmit}>
            <div className="ask-form-container">
                <label htmlFor="ask-ques-title">
                    <h4>Post media</h4>
                    <p>share your photos or video toyour friends in public space(within 16mb)</p>
                    <input type="file" id="ask-ques-title" name='media' accept='image/*,video/*'
                        onChange={(e) => {
                            setmedia(e.target.files[0]);
                            
                        }} />
                </label>
                <label htmlFor="ask-ques-body">
                    <h4>Post Description</h4>
                    <p>express your thoughts on your post and emphazhise you in the public space</p>
                    <textarea id="ask-ques-body" value={postdescription} onChange={(e) => {
                        setpostdescription(e.target.value);

                    }}
                        cols="30"
                        rows="10"
                    ></textarea>
                </label>
            
            </div>
            <input type="submit"
                value="upload post"
                className='review-btn' />
        </form>
    </div>
</div>
)
  
}

export default Createpost