import logo from './logo.svg';
import './App.css';
import Execute from './pages/execute/execute';
import PeriodHistory from './pages/periodHistory/periodHistory';
import SetParameters from './pages/setParameters/setParameters';
import SpecificPeriod from './pages/specificPeriod/specificPeriod';
import { Route,Routes,Link } from 'react-router-dom';
import { useState,useEffect } from 'react';

function App() {

    const createLinkSet = (pages) => {
        // intake array
        // possible values = execute, tradehistory, setparameter, periodhistory
        const links = []; 
        pages.forEach(page=>{
            const to = page;
            const changelinks = page;
            let displayName = null;
            if(page === 'tradehistory'){
                displayName = 'Trade History';
            }
            if(page === 'setparameter'){
                displayName = 'Trade Parameter';
            }
            if(page === 'periodhistory'){
                displayName = 'Period History';
            }
            if(page === 'execute'){
                displayName = 'execute';
            }
            if(page === 'specificperiod'){
                displayName = 'Specific Period'
            }
            links.push(<Link to={to} onClick={()=>{changeLinks(changelinks)}}>{displayName}</Link>)
        })
        return links
    }

    const displayPageUponRefresh = () => {
        console.log("DIsplaying page upon refreshing...")
        const currentPage = localStorage.getItem('currentPage')
        let displayLinks = []
        if(currentPage !== null){
            
            if(currentPage === 'setparameter'){ 
                displayLinks = createLinkSet(['execute','periodhistory'])
            }
            if(currentPage === 'execute'){
                displayLinks = createLinkSet(['setparameter','periodhistory'])
            }
            if(currentPage === 'periodhistory'){
                displayLinks = createLinkSet(['setparameter','specificperiod'])
            }
            if(currentPage === 'specificperiod'){
                displayLinks = createLinkSet(['periodhistory'])
            }
            localStorage.setItem('currentPage',currentPage);
            return displayLinks;
        }else{
            displayLinks = createLinkSet(['execute','periodhistory']);
            return displayLinks;
        }
    }

    const [links,setLinks] = useState(displayPageUponRefresh()); 

    
    
    const changeLinks = (currentPage) => {

          // If app just started,
          console.log("Running change links....: ",currentPage)
          let displayLinks = []
          if(currentPage === 'setparameter'){ 
              displayLinks = createLinkSet(['execute','periodhistory'])
          }
          if(currentPage === 'execute'){
              displayLinks = createLinkSet(['setparameter','periodhistory'])
          }
          if(currentPage === 'periodhistory'){
              displayLinks = createLinkSet(['setparameter','specificperiod'])
          }
          if(currentPage === 'specificperiod'){
              displayLinks = createLinkSet(['periodhistory'])
          }
          setLinks(displayLinks);
          localStorage.setItem('currentPage',currentPage);

    }

    return (
      
      <div className="App">
          
          <nav>
              {links}
          </nav>
          
          <Routes>
              <Route exact path='/' element={<SetParameters/>}/>
              <Route exact path='/setparameter' element={<SetParameters/>}/>
              <Route path='/execute' element={<Execute/>}/>
              <Route path='/periodhistory' element={<PeriodHistory/>}/>
              <Route path='/specificperiod' element={<SpecificPeriod/>}/>
          </Routes>

        
        
      </div>

    );
}

export default App;
