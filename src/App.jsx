import "./App.css";
import { Navigation } from "./components/navigation/navigation.component";
import { Routes, Route } from 'react-router';
import { Home } from './pages/home/home.page';
import { Explore } from "./pages/explore/explore.page";
import { Notifications } from "./pages/notifications/notifications.page";
import { Bookmarks } from "./pages/bookmarks/bookmarks.page";
import { Profile } from "./pages/profile/profile.page";
// import DefaultNavigation from "./components/navigation/navigation.component";
import { useState } from "react";
import { SearchComposer } from "./pages/home/home.page";
function App() {
  const [searchKeyword, setSearchKeyword] = useState('');
    
  const handleSearch = ()=>{
      
      window.alert('search is clicked')
  }
  
  const handleClear = ()=>{
      setSearchKeyword('')
  }
  return <div className="main">
      <Navigation />
        <SearchComposer 
          searchKeyword={searchKeyword} 
          handleSearch={handleSearch} 
          setSearchKeyword={setSearchKeyword} 
          handleClear={handleClear}
          />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
}

export default App;
