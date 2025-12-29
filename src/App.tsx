import { Suspense } from "react"
import Router from "./routes"
import Loading from "./components/Loading"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataProvider from "./providers/DataPrivider";



function App() {


  return (
 <Suspense fallback={<Loading/>}>
   <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
<DataProvider>
  <Router/>
</DataProvider>
  
  </Suspense>

  )
}

export default App
