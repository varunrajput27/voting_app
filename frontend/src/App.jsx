import Login from './components/Login'
import Home from './Pages/Home'
import OnlineVotingInfo from './Pages/OnlineVotingInfo';
import Admin from './Pages/Admin'
import Election from './components/Election'
import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import Notification from './Pages/Notification'
import CandidateRegistration from './components/Candidateregistration';
import Livepolls from './Pages/Livepolls';
import FAQ from './components/FAQ';
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsConditions from './components/TermsConditions'




function App() {

  const  router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
   
  },
  {
    path: "/login",
    element:<Login/>
   
  }
  ,
  {
    path: "/votinginfo",
    element:<OnlineVotingInfo/>
   
  },
   {
    path: "/livepolls",
    element:<Livepolls/>
   
  },
   {
    path: "/admin",
    element:<Admin/>
   
  },
  {
    path: "/election",
    element:<Election/>
   
  },
    {
    path: "/notification",
    element:<Notification/>
   
  },
  {
    path:"/candidateregistration",
    element:<CandidateRegistration/>
  }
  ,
  {
    path:"/faq",
    element:<FAQ/>
  }
   ,
  {
    path:"/privacy",
    element:<PrivacyPolicy/>
  },
  {
    path:"/terms",
    element:<TermsConditions/>
  }
]);


  return (

    <>
     
        <RouterProvider router={router} />
    

    </>
  )
}

export default App
