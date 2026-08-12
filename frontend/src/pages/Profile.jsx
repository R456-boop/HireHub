import { useSelector } from "react-redux";

import Layout from "../components/Layout";
import { Input } from "@/components/ui/input";

function Profile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 py-10">

        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="mt-2 text-gray-600">
     View your account information and role.
        </p>

        <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">

          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <Input
                value={user?.fullname || ""}
                readOnly
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <Input
                type="email"
                value={user?.email || ""}
                readOnly
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>

              <Input
                value={user?.contact || ""}
                readOnly
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Role
              </label>

             <div className="rounded-lg border bg-gray-50 px-3 py-2 text-sm capitalize">
  {user?.role || "User"}
</div>
            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Profile;