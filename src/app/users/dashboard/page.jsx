import { authUserSession } from "@/services/auth-service";
import prisma from "@/services/prisma";
import ProfileSection from "@/components/Dashboard/ProfileSection";
import CollectionSection from "@/components/Dashboard/CollectionSection";
import CommentSection from "@/components/Dashboard/CommentSection";
import { Archive, Chat } from "@phosphor-icons/react/dist/ssr";

const Page = async () => {
  const user = await authUserSession();
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">You must be logged in to view this page.</p>
      </div>
    );
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  const collection = await prisma.collection.findMany({
    where: { user_email: user.email },
  });
  const comments = await prisma.comment.findMany({
    where: { user_email: user.email },
  });

  return (
    <div className="flex items-center justify-center pt-10 pb-10">
      {/* Card Container */}
      <div className="w-[90%] max-w-[1200px] rounded-xl shadow-lg bg-slate-800 shadow-color-accent text-color-primary mt-14">
        {/* Gunakan flex-col untuk mobile (default) dan flex-row untuk desktop (md:) */}
        <div className="flex flex-col md:flex-row">
            {/* Bagian Profile */}
            <div className="flex flex-col items-center justify-center w-full p-6 border-b border-gray-700 md:w-3/12 md:border-b-0 md:border-r">
                <ProfileSection user={user} dbUser={dbUser} />
            </div>
            
            {/* Bagian Collection & Comments */}
            <div className="flex flex-col w-full p-6 space-y-6 md:w-9/12">
                <div id="collection">
                    <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold">
                    <   Archive size={24} />
                        Your Collection
                    </h2>
                    {/* Wrapper dengan scrollbar vertikal & sembunyikan scrollbar horizontal */}
                    <div className="md:max-h-[300px] max-h-[300px] overflow-y-auto overflow-x-hidden mb-4">
                        <CollectionSection collection={collection} />
                    </div>
                </div>
                <div id="comments">
                    <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold">
                        <Chat size={24} />
                        Your Comments
                    </h2>
                    <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
                        <CommentSection comments={comments} />
                    </div>
                </div>    
            </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
