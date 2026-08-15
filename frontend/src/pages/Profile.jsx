import Layout from "../components/Layout";
import {
  Mail,
  Phone,
  Globe,
  FileText,
  Briefcase,
  ExternalLink,
} from "lucide-react";

function Profile() {
  // Keep your existing user logic here
  // This assumes your user variable is called "user"

  return (
    <Layout>
      <div className="min-h-screen bg-[#070617] px-4 py-10 text-white">

        {/* ================= MAIN PROFILE CONTAINER ================= */}

        <div className="mx-auto max-w-5xl">

          <div
            className="
              relative overflow-hidden rounded-[40px]
              border border-white/10
              bg-gradient-to-br
              from-[#17103d]
              via-[#100b29]
              to-[#070617]
              p-6 shadow-[0_0_80px_rgba(124,58,237,0.20)]
              sm:p-10
            "
          >

            {/* ================= GLOW EFFECTS ================= */}

            <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-purple-600/30 blur-[100px]" />

            <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-pink-500/20 blur-[100px]" />

            <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[100px]" />


            {/* ================= PROFILE ================= */}

            <div className="relative z-10 flex flex-col items-center text-center">

              {/* PROFILE IMAGE */}

              <div
                className="
                  relative mb-6 h-36 w-36 rounded-full
                  bg-gradient-to-br from-pink-400
                  via-purple-500 to-blue-500
                  p-[4px]
                  shadow-[0_0_40px_rgba(139,92,246,0.45)]
                "
              >

                <div className="h-full w-full overflow-hidden rounded-full bg-[#171329]">

                  {/* You can replace this image with your own profile image */}
                  <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />

                </div>

              </div>


              {/* NAME */}

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">

                {user?.fullname || "Your Name"}

              </h1>


              {/* ROLE */}

              <p className="mt-2 text-lg font-medium text-purple-400">

                {user?.role || "Job Seeker"}

              </p>


              {/* BIO */}

              <p className="mt-4 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">

                I am looking for exciting opportunities where I can
                learn, grow and build meaningful solutions.

              </p>


              {/* ================= SOCIAL BUTTONS ================= */}

              <div className="mt-6 flex items-center gap-3">

                <button
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-full border border-white/10
                    bg-white/5 text-gray-300
                    transition hover:bg-purple-500
                    hover:text-white
                  "
                >
                  <Github size={19} />
                </button>

                <button
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-full border border-white/10
                    bg-white/5 text-gray-300
                    transition hover:bg-purple-500
                    hover:text-white
                  "
                >
                  <Linkedin size={19} />
                </button>

                <button
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-full border border-white/10
                    bg-white/5 text-gray-300
                    transition hover:bg-pink-500
                    hover:text-white
                  "
                >
                  <Instagram size={19} />
                </button>

                <button
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-full border border-white/10
                    bg-white/5 text-gray-300
                    transition hover:bg-blue-500
                    hover:text-white
                  "
                >
                  <Globe size={19} />
                </button>

              </div>

            </div>


            {/* ================= INFORMATION CARDS ================= */}

            <div className="relative z-10 mx-auto mt-10 max-w-2xl space-y-4">


              {/* EMAIL */}

              <div
                className="
                  group flex items-center gap-4
                  rounded-2xl border border-white/10
                  bg-gradient-to-r from-purple-600
                  to-pink-500 p-4
                  transition duration-300
                  hover:scale-[1.02]
                  hover:shadow-[0_0_30px_rgba(168,85,247,0.30)]
                "
              >

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">

                  <Mail size={22} />

                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-xs text-white/70">
                    Email
                  </p>

                  <p className="truncate text-sm font-semibold">
                    {user?.email || "your@email.com"}
                  </p>

                </div>

                <ExternalLink size={18} />

              </div>


              {/* PHONE */}

              <div
                className="
                  group flex items-center gap-4
                  rounded-2xl border border-white/10
                  bg-[#15132c] p-4
                  transition duration-300
                  hover:border-purple-500/50
                  hover:bg-[#1c1838]
                "
              >

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400">

                  <Phone size={22} />

                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-xs text-gray-400">
                    Contact me
                  </p>

                  <p className="truncate text-sm font-semibold text-white">
                    {user?.contact || "Your phone number"}
                  </p>

                </div>

                <ExternalLink
                  size={18}
                  className="text-gray-500"
                />

              </div>


              {/* APPLICATIONS */}

              <div
                className="
                  group flex items-center gap-4
                  rounded-2xl border border-white/10
                  bg-[#15132c] p-4
                  transition duration-300
                  hover:border-purple-500/50
                  hover:bg-[#1c1838]
                "
              >

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">

                  <Briefcase size={22} />

                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-xs text-gray-400">
                    My Applications
                  </p>

                  <p className="text-sm font-semibold text-white">
                    View jobs you have applied for
                  </p>

                </div>

                <ExternalLink
                  size={18}
                  className="text-gray-500"
                />

              </div>


              {/* RESUME */}

              <div
                className="
                  group flex items-center gap-4
                  rounded-2xl border border-white/10
                  bg-[#15132c] p-4
                  transition duration-300
                  hover:border-purple-500/50
                  hover:bg-[#1c1838]
                "
              >

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-500/20 text-pink-400">

                  <FileText size={22} />

                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-xs text-gray-400">
                    Resume
                  </p>

                  <p className="text-sm font-semibold text-white">
                    Upload or manage your resume
                  </p>

                </div>

                <ExternalLink
                  size={18}
                  className="text-gray-500"
                />

              </div>

            </div>


            {/* ================= ACCOUNT INFORMATION ================= */}

            <div className="relative z-10 mx-auto mt-10 max-w-2xl">

              <div className="mb-4 flex items-center justify-between">

                <h2 className="text-lg font-bold text-white">
                  Account Information
                </h2>

                <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs font-semibold text-lime-400">
                  Active
                </span>

              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                  <p className="text-xs text-gray-500">
                    Full Name
                  </p>

                  <p className="mt-2 font-semibold text-white">
                    {user?.fullname || "Your Name"}
                  </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                  <p className="text-xs text-gray-500">
                    Role
                  </p>

                  <p className="mt-2 font-semibold text-purple-400">
                    {user?.role || "Job Seeker"}
                  </p>

                </div>

              </div>

            </div>


            {/* ================= FOOTER ================= */}

            <div className="relative z-10 mt-10 text-center">

              <p className="text-xs text-gray-500">
                Made with ❤️ for HireHub
              </p>

              <p className="mt-1 text-xs text-gray-600">
                © 2026 HireHub. All rights reserved.
              </p>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Profile;