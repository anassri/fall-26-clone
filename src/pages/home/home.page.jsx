import { useLocalStorage } from '../../hooks/local-storage.hooks';
import './home.css'
import {useRef, useState, useEffect, useReducer} from 'react';

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

  return <div className="composer-container">
            <textarea cols={50} rows={5} placeholder="What's on your mind" 
            onChange={(event)=>setKeyword(event.target.value)} 
            value={keyword} />
            <button onClick={handlePosting}>Post</button>
          </div>
}

const initialState = {
  tweets: [],
  isLoading: false,
  isError: false,
}

const tweetReducer = (state, action)=>{
  switch (action.type){
    case "LOADING":
      return {...state, isLoading: true};
    case "ERROR": 
      return {...state, isError: true, isLoading: false};
    case "SUCCESS":
      return {isError: false, isLoading: false, tweets: action.payload};
    case "ADD_NEW_TWEET":
      return {...state, tweets: [action.payload, ...state.tweets]};
    case "SEARCH_KEYWORD":
      return
    case "FILTER_TWEETS":
      return
  }
}
export const Home = () => {
  const [tweets, setTweets] = useState(data);
  const [newTweet, setNewTweet] = useState('');
  const [filteredTweets, setFilteredTweets] = useState(tweets);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [state, dispatch] = useReducer(tweetReducer, initialState);

  console.log(state);

  const BASE_URL = "https://jsonplaceholder.typicode.com";

  const handlePosting = ()=>{
    // const newTweetsArray = [...tweets];
    // newTweetsArray.push(newTweet);
    // setTweets(newTweetsArray);
    const newTweetObject =  {
      id: tweets.length,
      authorName: "john",
      text: newTweet,
      authorPhotoUrl: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
      likeCount: 0,
      comments: []
    }
    dispatch({ type: "ADD_NEW_TWEET", payload: newTweetObject})
    // setTweets((prevState)=>[newTweetObject, ...prevState ]);
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




  const fetchPosts = async ()=>{
    // Promise
    // fetch(`${BASE_URL}/posts`).then((data)=>{
    //   setTweets(data)
    // }).catch((error)=>{
    //   console.error(error)
    // })
    // async/await
    dispatch({type: "LOADING"})
    const data = await fetch(`${BASE_URL}/posts`);
    if(data.status === 200){
      const body = await data.json();
      dispatch({type: "SUCCESS", payload: body})
    }

    // setTweets(body)
  }

  useEffect(()=>{
    fetchPosts();
  }, [])

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
       { state.tweets.map((tweet)=> 
          <Post 
            key={tweet.id} 
            id={tweet.id} 
            authorPhotoUrl={tweet.authorPhotoUrl} 
            authorName={tweet.title} 
            text={tweet.body} 
            likeCount={tweet.likeCount} 
            handlePostLike={handlePostLike}
            />
       )}
      </div>
  </div>);
};
