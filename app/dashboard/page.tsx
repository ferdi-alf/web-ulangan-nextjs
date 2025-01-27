import { auth, signOut } from "@/auth";

const Dashboard = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div className="">
      <h1>Hello Word ini dashboard</h1>
      <p>Hello {session?.user?.username}</p>
      {session ? (
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="bg-red-400 rounded-md text-white px-4 py-4 hover:bg-red-500"
          >
            Sign Out
          </button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
