import { redirect } from "next/navigation";
// import { Suspense } from "react";
// import { useAppStore } from "./store";
// import Authorization from "./widgets/Authorization";
// import PlaylistList from "./widgets/Playlist/PlaylistList";

// const App: React.FC = function App() {
//   const profile = useAppStore((store) => store.profile);
//   if (!profile) return <Authorization />;
//   return (
//     <div className="h-full flex">
//       <div>
//         <Suspense>
//           <div className="bg-surface-color scrollable flex flex-col h-full">
//             <div className="mx-2 relative h-full">
//               <PlaylistList />
//             </div>
//           </div>
//         </Suspense>
//       </div>
//       <div className="flex-1">{profile.username}</div>
//     </div>
//   );
// };
function MainPage() {
  // const [count, setCount] = useState(0);

  // console.log("render:", count);

  // return <button onClick={() => setCount(count + 1)}>Click</button>;
  return redirect("/dashboard");
}

export default MainPage;
