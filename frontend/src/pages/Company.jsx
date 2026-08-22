import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosInstance from "../utils/axios";

function Company() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCompany = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/company/get"
        );

        setCompany(response.data.companies?.[0] || null);
      } catch (error) {
        console.log("Error getting company:", error);
      }
    };

    getCompany();
  }, []);

  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  const updateCompany = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axiosInstance.put(
        `/api/v1/company/update/${company._id}`,
        {
          name: company.name,
          website: company.website,
          location: company.location,
          description: company.description,
          logo: company.logo,
        }
      );

      alert(response.data.message);

      setCompany(response.data.company);
    } catch (error) {
      console.log("Error updating company:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update company"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#07030d] text-white">

        {/* HERO */}
        <section className="relative overflow-hidden px-6 py-20">

          {/* Purple glow */}
          <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[130px]" />

          <div className="relative mx-auto max-w-5xl text-center">

            <div className="mb-5 inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-medium tracking-wider text-purple-300">
              ✦ COMPANY PROFILE
            </div>

            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              Build Your Company
              <br />
              <span className="text-purple-400">
                Presence on HireHub
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
              Create a powerful company profile, showcase your
              organization and attract talented candidates to
              your team.
            </p>

          </div>
        </section>


        {/* MAIN CONTENT */}
        {!company ? (

          <div className="mx-auto max-w-5xl px-6 pb-20">

            <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-[#0d0715] p-10 shadow-2xl">

              <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-purple-600/20 blur-[90px]" />

              <div className="relative text-center">

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 text-2xl text-purple-400">
                  ✦
                </div>

                <h2 className="text-2xl font-semibold">
                  No Company Information
                </h2>

                <p className="mt-3 text-sm text-gray-500">
                  No company information was found for your account.
                </p>

              </div>

            </div>

          </div>

        ) : (

          <>
            {/* COMPANY OVERVIEW */}
            <section className="mx-auto max-w-6xl px-6 py-10">

              <div className="grid gap-8 md:grid-cols-2">

                {/* LEFT SIDE */}
                <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-[#0d0715] p-8">

                  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-600/20 blur-[100px]" />

                  <div className="relative">

                    <div className="mb-7 flex items-center gap-4">

                      <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-600/40 to-purple-900/20 text-2xl font-bold text-purple-300 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                        {company.name
                          ? company.name.charAt(0).toUpperCase()
                          : "C"}
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-purple-400">
                          Your Company
                        </p>

                        <h2 className="mt-1 text-2xl font-semibold">
                          {company.name || "Company Name"}
                        </h2>
                      </div>

                    </div>


                    <div className="space-y-5">

                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-600">
                          Website
                        </p>

                        <p className="mt-1 text-sm text-gray-300">
                          {company.website || "Not provided"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-600">
                          Location
                        </p>

                        <p className="mt-1 text-sm text-gray-300">
                          {company.location || "Not provided"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-600">
                          Description
                        </p>

                        <p className="mt-2 text-sm leading-7 text-gray-400">
                          {company.description ||
                            "No company description available."}
                        </p>
                      </div>

                    </div>

                  </div>
                </div>


                {/* RIGHT SIDE - STATS */}
                <div className="grid gap-5">

                  <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-[#0d0715] p-7">

                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-purple-600/20 blur-[80px]" />

                    <div className="relative">

                      <div className="mb-5 text-xs uppercase tracking-wider text-purple-400">
                        Company Presence
                      </div>

                      <div className="text-4xl font-bold">
                        {company.name ? "Active" : "—"}
                      </div>

                      <p className="mt-2 text-sm text-gray-500">
                        Your company profile is available on HireHub.
                      </p>

                    </div>

                  </div>


                  <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-[#0d0715] p-7">

                    <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-purple-600/20 blur-[70px]" />

                    <div className="relative">

                      <div className="mb-5 text-xs uppercase tracking-wider text-purple-400">
                        Profile Management
                      </div>

                      <p className="text-lg font-medium">
                        Keep your information updated
                      </p>

                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        Update your company details below so candidates
                        always see accurate information.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </section>


            {/* EDIT SECTION */}
            <section className="mx-auto max-w-5xl px-6 py-16">

              <div className="mb-10 text-center">

                <div className="mb-4 text-xs font-medium tracking-widest text-purple-400">
                  01 — COMPANY DETAILS
                </div>

                <h2 className="text-4xl font-bold md:text-5xl">
                  Manage Your
                  <span className="text-purple-400">
                    {" "}Company
                  </span>
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500">
                  Update your company information and make your
                  profile more attractive to potential candidates.
                </p>

              </div>


              {/* FORM */}
              <form
                onSubmit={updateCompany}
                className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-[#0d0715] p-6 shadow-2xl md:p-10"
              >

                {/* glow */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-600/10 blur-[100px]" />

                <div className="relative space-y-7">

                  {/* COMPANY NAME */}
                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Company Name
                    </label>

                    <Input
                      name="name"
                      value={company.name || ""}
                      onChange={handleChange}
                      className="h-12 border-purple-500/20 bg-[#09050e] text-white placeholder:text-gray-600 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Enter company name"
                    />

                  </div>


                  {/* WEBSITE */}
                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Website
                    </label>

                    <Input
                      name="website"
                      value={company.website || ""}
                      onChange={handleChange}
                      className="h-12 border-purple-500/20 bg-[#09050e] text-white placeholder:text-gray-600 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="https://example.com"
                    />

                  </div>


                  {/* LOCATION */}
                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Location
                    </label>

                    <Input
                      name="location"
                      value={company.location || ""}
                      onChange={handleChange}
                      className="h-12 border-purple-500/20 bg-[#09050e] text-white placeholder:text-gray-600 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Enter company location"
                    />

                  </div>


                  {/* DESCRIPTION */}
                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={company.description || ""}
                      onChange={handleChange}
                      className="min-h-36 w-full resize-none rounded-lg border border-purple-500/20 bg-[#09050e] px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                      placeholder="Tell us about your company..."
                    />

                  </div>


                  {/* BUTTON */}
                  <div className="border-t border-purple-500/10 pt-6">

                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-12 w-full bg-purple-600 font-semibold text-white shadow-[0_0_25px_rgba(139,92,246,0.25)] transition-all hover:bg-purple-500 hover:shadow-[0_0_35px_rgba(139,92,246,0.4)] md:w-auto md:px-8"
                    >
                      {loading
                        ? "Updating..."
                        : "Update Company ↗"}
                    </Button>

                  </div>

                </div>

              </form>

            </section>


            {/* BOTTOM CTA */}
            <section className="mx-auto max-w-5xl px-6 pb-28">

              <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-[#0b0611] px-6 py-20 text-center">

                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[110px]" />

                <div className="relative">

                  <div className="mb-4 text-xs tracking-widest text-purple-400">
                    ✦ HIRE GREAT PEOPLE
                  </div>

                  <h2 className="text-4xl font-bold md:text-6xl">
                    Build Your Team
                    <br />
                    <span className="text-purple-400">
                      With HireHub
                    </span>
                  </h2>

                  <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-gray-500">
                    Keep your company profile updated and connect
                    with talented people who can help your company grow.
                  </p>

                </div>

              </div>

            </section>
          </>

        )}

      </div>
    </Layout>
  );
}

export default Company;