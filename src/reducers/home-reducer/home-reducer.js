

export const initialState = {
    tweets: [],
    isLoading: false,
    isError: false,
    errorMessage: null
  }
  
 export const tweetReducer = (state, action)=>{
    switch (action.type){
      case "LOADING":
        return {...state, isLoading: true};
      case "ERROR": 
        return {...state, isError: true, errorMessage: action.payload, isLoading: false};
      case "SUCCESS":
        return {isError: false, errorMessage: null, isLoading: false, tweets: action.payload};
      case "ADD_NEW_TWEET":
        return addNewTweet(state, action.payload);
      case "SEARCH_KEYWORD":
        return
      case "FILTER_TWEETS":
        return
    }
  }

  const addNewTweet = (state, newTweet)=>{
    const newTweetObject =  {
        id: state.tweets.length + 1,
        title: "john",
        body: newTweet,
        authorPhotoUrl: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
        likeCount: 0,
        comments: []
      }
    return {...state, tweets: [newTweetObject, ...state.tweets]}
  }

  