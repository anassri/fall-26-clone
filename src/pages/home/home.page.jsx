import './home.css'
import {useState} from 'react';

const data = [
  {
    id: 1,
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
    id: 2,
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
  }
]
export const Home = () => {
  const [tweets, setTweets] = useState(data);
  const [newTweet, setNewTweet] = useState('');

  const handlePosting = ()=>{
    // const newTweetsArray = [...tweets];
    // newTweetsArray.push(newTweet);
    // setTweets(newTweetsArray);
    setTweets((prevState)=>[newTweet, ...prevState ]);
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
  return <div>
      <div className="composer-container">
          <textarea cols={50} rows={5} placeholder="What's on your mind" onChange={(event)=>setNewTweet(event.target.value)} />
          <button onClick={handlePosting}>Post</button>
      </div>
      <div className='tweet-container'>
        {tweets.map((tweet)=>
        <div key={tweet.id} className='tweet'>
            <div className='first-row'>
              <img src={tweet.authorPhotoUrl} width={50} height={50}  />
              <span>{tweet.authorName}</span>
            </div>
            <div>{tweet.text}</div>
            <button onClick={()=>handlePostLike(tweet.id)}>{tweet.likeCount} Like</button>
          </div>)}
      </div>
  </div>;
};
