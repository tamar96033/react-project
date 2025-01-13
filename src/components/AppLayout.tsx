// import { Outlet } from "react-router-dom"
// import NavBar from "./NavBar"

// const AppLayout = () => {

//     // return (<>
//     //     <div style={{ border: '1px solid black' }}>
//     //         <div>app layout</div>
//     //         {/* <Outlet /> */}
//     //         <div style={{ border: '1px solid red' }}>
//     //             <NavBar/>
//     //         </div>
//     //         _______________________________________
//     //         <div style={{ border: '1px solid blue' }}>
//     //             <Outlet/>
//     //         </div>
//     //         ************
//     //     </div>
//     // </>)

//     return(<NavBar/>)
// }

// export default AppLayout


import { Outlet } from "react-router-dom"
import NavBar from "./NavBar";

const AppLayout = () => {
  return (
    <div>
      <NavBar /> {/* Render NavBar within AppLayout */}
      <main>
        <Outlet /> 
      </main>
    </div>
  );
}

export default AppLayout;