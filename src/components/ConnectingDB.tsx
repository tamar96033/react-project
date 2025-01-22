// import { useEffect, useState } from "react";

// const ConnectingDB = () => {
//     const [data, setData] = useState([]);

//     const [users, setUsers] = useState([])

//     useEffect(() => {
//         fetch('http://localhost:3000/api/recipes') // כתובת ה-API שלך
//             .then(response => response.json())
//             .then(data => setData(data))
//             .catch(error => console.error('Error fetching data:', error));
//     }, []);

//     return (
//         <div>
//             <h1>Recipes</h1>
//             <ul>
//                 {data.map(recipe => (
//                     <li key={recipe.id}>{recipe.description}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
// export default ConnectingDB