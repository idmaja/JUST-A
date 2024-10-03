import { authUserSession } from "@/services/auth-service"
import prisma from "@/services/prisma"
import { Archive, Chat } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import Link from "next/link"

const Page = async() => {
    const user = await authUserSession()
    const userDb = await prisma.user.findUnique({
        where: { email: user.email },
      });
    // console.log('username: ', userDb.username)

    return (
        <div className="flex items-center justify-center pt-16">
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded shadow-lg text-color-primary">
                <h5 className="pb-1 text-2xl font-bold">Welcome, {userDb?.username}!</h5>
                <h6 className="mb-6 text-sm text-color-secondary">{userDb?.email}</h6>
                <Image src={user?.image} alt="..." width={150} height={150} className="mb-3 rounded-full" />
                <div className="flex flex-wrap gap-4 py-4">
                    <Link 
                        href="/users/dashboard/collection"
                        className="px-4 py-3 text-xl font-bold transition-all bg-white border rounded text-color-blue focus:outline-none border-color-secondary hover:bg-color-secondary hover:text-color-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        <div className="flex items-center gap-2">
                            Collection
                            <Archive size={24}/>
                        </div>
                    </Link>
                    <Link 
                        href="/users/dashboard/comment"
                        className="px-4 py-3 text-xl font-bold transition-all bg-white border rounded text-color-blue focus:outline-none border-color-secondary hover:bg-color-secondary hover:text-color-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        <div className="flex items-center gap-2">
                            Comment
                            <Chat size={24}/>
                        </div>
                    </Link>
                </div>
                    <Link 
                        href="/users/profile"
                        className="underline transition-all hover:text-color-secondary">
                        Change Username?
                    </Link>
            </div>
        </div>
    )
}

export default Page

// "use client"; // Enables client-side rendering

// import { useState } from "react";

// import ProfileForm from "@/components/Dashboard/ProfileForm";
// import { authUserSession } from "@/services/auth-service";

// const ProfilePage = async() => {
//     const [activeTab, setActiveTab] = useState("Profile");
//     const user = await authUserSession(); 
//     console.log(user)

//     if (!user) {
//         return <p>Please log in to access your profile.</p>;
//     }

//     // Different content for each tab
//     const renderContent = () => {
//         switch (activeTab) {
//         case "Profile":
//             return (
//                 <div>
//                     <h1 className="text-2xl font-bold">Profile</h1>
//                     <ProfileForm user={user} />
//                 </div>
//             );
//         case "Collection":
//             return (
//             );
//         case "Comment History":
//             return (
//             );
//         default:
//             return null;
//         }
//     };

//     return (
//         <div className="flex min-h-screen text-white bg-gray-900">
//             <aside className="w-1/4 p-6 bg-gray-800">
//                 <div className="flex items-center space-x-4">
//                     <div
//                         className="bg-center bg-cover rounded-full w-14 h-14"
//                         style={{ backgroundImage: "url('/path-to-avatar.jpg')" }}
//                     >
//                     </div>
//                     <div>
//                         <h2 className="text-lg font-semibold">{user.name}</h2>
//                         <p className="text-sm text-gray-400">{user.email}</p>
//                     </div>
//                 </div>

//                 <nav className="mt-8">
//                 <ul className="space-y-4">
//                     <li>
//                     <button
//                         onClick={() => setActiveTab("Profile")}
//                         className={`flex items-center ${
//                         activeTab === "Profile" ? "text-red-500" : "text-gray-400"
//                         } hover:text-red-500 transition duration-300`}
//                     >
//                         <span className="mr-2">•</span> Profile
//                     </button>
//                     </li>
//                     <li>
//                     <button
//                         onClick={() => setActiveTab("Collection")}
//                         className={`flex items-center ${
//                         activeTab === "Collection" ? "text-red-500" : "text-gray-400"
//                         } hover:text-red-500 transition duration-300`}
//                     >
//                         <span className="mr-2">•</span> Collection
//                     </button>
//                     </li>
//                     <li>
//                     <button
//                         onClick={() => setActiveTab("Comment History")}
//                         className={`flex items-center ${
//                         activeTab === "Comment History" ? "text-red-500" : "text-gray-400"
//                         } hover:text-red-500 transition duration-300`}
//                     >
//                         <span className="mr-2">•</span> Comment History
//                     </button>
//                     </li>
//                 </ul>
//                 </nav>
//             </aside>

//             <section className="w-3/4 p-8 bg-gray-900">
//                 {renderContent()}
//             </section>
//         </div>
//     );
// };

// export default ProfilePage;
