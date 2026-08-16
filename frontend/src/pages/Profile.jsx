import { useSelector } from "react-redux";
import Layout from "../components/Layout";

function Profile() {

  const user = useSelector((state) => state.auth.user);

  return (
    <Layout>

      <div className="min-h-screen bg-[#0b0b0b] px-6 py-12 text-white">

        <div className="mx-auto max-w-6xl">

          {/* HEADING */}

          <h1 className="text-4xl font-bold tracking-tight text-[#9b5cff]">
            My Profile
          </h1>

          <p className="mt-2 text-lg text-[#dfff4f]">
            View your account information and role.
          </p>


          {/* PROFILE CARD */}

          <div className="mt-10 rounded-2xl border border-[#292929] bg-[#111111] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">

            <div className="grid gap-7 md:grid-cols-2">


              {/* FULL NAME */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-white">
                  Full Name
                </label>

                <div className="rounded-xl border border-[#333333] bg-[#181818] px-4 py-3 text-gray-200">
                  {user?.fullname || "Not available"}
                </div>

              </div>


              {/* EMAIL */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-white">
                  Email
                </label>

                <div className="rounded-xl border border-[#333333] bg-[#181818] px-4 py-3 text-gray-200">
                  {user?.email || "Not available"}
                </div>

              </div>


              {/* PHONE */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-white">
                  Phone Number
                </label>

                <div className="rounded-xl border border-[#333333] bg-[#181818] px-4 py-3 text-gray-200">
                  {user?.contact || "Not available"}
                </div>

              </div>


              {/* ROLE */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-white">
                  Role
                </label>

                <div className="rounded-xl border border-[#333333] bg-[#181818] px-4 py-3 font-medium text-[#dfff4f]">
                  {user?.role || "Not available"}
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Profile;