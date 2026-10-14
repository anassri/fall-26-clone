import { useLocalStorage } from '../../hooks/local-storage.hooks';
import './home.css'
import {useEffect, useState} from 'react';

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

  return <div className='search-container'>
          <input placeholder='Search' value={keyword} onChange={(e)=>setKeyword(e.target.value)}></input>
          <div>
            <button onClick={handleSearch}>Search</button>
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

export const Home = () => {
  const [tweets, setTweets] = useState(data);
  const [newTweet, setNewTweet] = useState('');
  const [filteredTweets, setFilteredTweets] = useState(tweets);
  const [searchKeyword, setSearchKeyword] = useState('');
  
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
    setTweets((prevState)=>[newTweetObject, ...prevState ]);
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
  
  const handleSearch = ()=>{
    const results = tweets.filter((tweet)=>tweet.text.toLowerCase().includes(searchKeyword.toLowerCase()));
    setFilteredTweets(results);
  }
  
  const handleClear = ()=>{
    setFilteredTweets(tweets)
  }

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
       { tweets.map((tweet)=> 
          <Post 
            key={tweet.id} 
            id={tweet.id} 
            authorPhotoUrl={tweet.authorPhotoUrl} 
            authorName={tweet.authorName} 
            text={tweet.text} 
            likeCount={tweet.likeCount} 
            handlePostLike={handlePostLike}
            />
       )}
      </div>
  </div>);
};
