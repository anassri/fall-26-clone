import { useLocalStorage } from '../../hooks/local-storage.hooks';
import './home.css'
import {useRef, useState, useEffect, useReducer,useCallback} from 'react';
import {tweetReducer, initialState} from '../../reducers/home-reducer/home-reducer'
import axios from 'axios'

const data = [
  {
    id: 0,
    authorName: "john",
    text: "first tweet",
    authorPhotoUrl: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
    likeCount: 0,
    comments: [{
      id: 1,
      commentAuthor: "Sarah",
      commentText: "Nice!",
      authorPhotoUrl: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
    }]
  },
  {
    id: 1,
    authorName: "john",
    text: "Second tweet",
    authorPhotoUrl: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
    likeCount: 0,
    comments: [{
      id: 1,
      commentAuthor: "Sarah",
      commentText: "Nice!",
      authorPhotoUrl: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
    }]
  }
]

const Post = ({id,authorPhotoUrl, authorName, text, likeCount, handlePostLike })=>{
  return  <div className='tweet'>
            <div className='first-row'>
              <img src={authorPhotoUrl} width={50} height={50}  />
              <span>{authorName}</span>
            </div>
            <div>{text}</div>
            <button onClick={()=>handlePostLike(id)}>{likeCount} Like</button>
          </div>
}


export const SearchComposer = ({searchKeyword,handleSearch, setSearchKeyword, handleClear })=>{
   const {keyword, setKeyword}= useLocalStorage('mostRecentKeyword');
   const inputRef = useRef("");
   const clearButtonRef = useRef();
  // document.getElementById('id').addEventListener('click', ()=>{
  //   if(keyword === ''){
  //     document.getElementById('input').focus();
  //   }
  // })
  
  const handleSearchFunc = ()=>{
    if(keyword.length === 0){
      inputRef.current.focus();
    } else {
      handleSearch(keyword);
    }
  }

  const handleClearSearch = ()=>{
    setKeyword('')
    handleClear()
  }

  // useEffect(()=>{
  //   if(keyword.length===0){
  //     clearButtonRef.current.style.background = "red";
  //   } else {
  //     clearButtonRef.current.disabled = false;
  //   }
  // },[keyword])
  
  return <div className='search-container'>
          <input 
            placeholder='Search' 
            value={keyword} 
            onChange={(e)=>setKeyword(e.target.value)} 
            ref={inputRef}
          ></input>
          <div>
            <button onClick={handleSearchFunc}>Search</button>
            <button 
              onClick={handleClearSearch} 
              ref={clearButtonRef}
              disabled={keyword.length===0}>Clear</button>
          </div>
        </div>
}

// component lifecylce
// componentDidMount => empty dependency array
// componentDidUpdate => items in dependency array
// componentDidUnmount

const PostComposer = ({setNewTweet, newTweet, handlePosting})=>{
  const {keyword, setKeyword}= useLocalStorage('mostRecentPost');

  const handleSubmit = (e)=>{
    e.preventDefault();
    handlePosting(keyword)
  }
  return <form className="composer-container" onSubmit={handleSubmit}>
            <textarea cols={50} rows={5} placeholder="What's on your mind" 
              onChange={(event)=>setKeyword(event.target.value)} 
              value={keyword} />
            <button type="submit" >Post</button>
          </form>
}

const BASE_URL = "https://jsonplaceholder.typicode.com";


export const Home = () => {
  const [tweets, setTweets] = useState(data);
  const [newTweet, setNewTweet] = useState('');
  const [filteredTweets, setFilteredTweets] = useState(tweets);
  const [searchKeyword, setSearchKeyword] = useState('');


  const [state, dispatch] = useReducer(tweetReducer, initialState);


  const handlePosting = (newPost)=>{
    dispatch({ type: "ADD_NEW_TWEET", payload: newPost})
    setNewTweet('')
  }

  const handlePostLike = (id)=>{
    const newTweetsArray = tweets.map((tweet)=>{
      if(tweet.id === id){
        return {...tweet, likeCount: tweet.likeCount+1}
      } 
      return tweet
    })
    setTweets(newTweetsArray)
  }
  
  const handleSearch = (value)=>{
    console.log(value)
    const results = tweets.filter((tweet)=>tweet.text.toLowerCase().includes(value.toLowerCase()));
    setFilteredTweets(results);
  }
  
  const handleClear = ()=>{
    setFilteredTweets(tweets)
  }

  const fetchPosts = useCallback(async ()=>{
    dispatch({type: "LOADING"});
    
    // Promise
    // axios.get(`${BASE_URL}/posts`)
    // .then((data)=>{
    //   if(data.status === 200){
    //     dispatch({type: 'SUCCESS', payload:data.data });
    //   } 
    // }).catch((e)=>{
    //   dispatch({type: 'ERROR', payload: e.message});
    // })

    setTimeout(async ()=>{
      // async/await
      try{
        const data = await axios.get(`${BASE_URL}/posts`);
        if(data.status === 200){
          dispatch({type: 'SUCCESS', payload:data.data });
        } 
      }catch(error){
        dispatch({type: 'ERROR', payload: error.message});
      }
      
    }, 1000)
  }, [])


  useEffect(()=>{
    fetchPosts();
  }, [])

  // if(condition){

  // } else if (condition 2){

  // } else {

  // }

  // condition ? value : condition 2 ? value 2 : value 3
   return (
  <div>
      <SearchComposer 
        searchKeyword={searchKeyword} 
        handleSearch={handleSearch} 
        setSearchKeyword={setSearchKeyword} 
        handleClear={handleClear}
      />
      <PostComposer 
        newTweet={newTweet}
        setNewTweet={setNewTweet}
        handlePosting={handlePosting}
        />

      <div className='tweet-container'>
       {/* { state.isLoading ? 
       <span>Fetching tweets...</span> 
       : state.tweets.map((tweet)=> 
          <Post 
            key={tweet.id} 
            id={tweet.id} 
            authorPhotoUrl={tweet.authorPhotoUrl} 
            authorName={tweet.title} 
            text={tweet.body} 
            likeCount={tweet.likeCount} 
            handlePostLike={handlePostLike}
            />
       )} */}
        { 
       <Content 
        isError={state.isError}
        isLoading={state.isLoading}  
        tweets={state.tweets}
        handlePostLike={handlePostLike}
        errorMessage={state.errorMessage}
       />
       } 
      </div>
  </div>);
};


const Content = ({isLoading, isError, errorMessage, tweets, handlePostLike})=>{
  
  if(isLoading){
    return <span>Fetching tweets...</span> 
  }  else if (isError && errorMessage) {
    return <span style={{color: 'red'}}>{errorMessage}</span> 
  }else { 
    return tweets.map((tweet)=> 
    <Post 
      key={tweet.id} 
      id={tweet.id} 
      authorPhotoUrl={tweet.authorPhotoUrl} 
      authorName={tweet.title} 
      text={tweet.body} 
      likeCount={tweet.likeCount} 
      handlePostLike={handlePostLike}
      />)
  }

}