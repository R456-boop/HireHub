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
      <div className="mx-auto max-w-3xl px-4 py-10">

        <h1 className="text-3xl font-bold">
          Company
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your company information.
        </p>

        {!company ? (
          <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-gray-500">
              No company information found.
            </p>
          </div>
        ) : (
          <form
            onSubmit={updateCompany}
            className="mt-8 rounded-xl border bg-white p-6 shadow-sm"
          >

            <div className="space-y-6">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Company Name
                </label>

                <Input
                  name="name"
                  value={company.name || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Website
                </label>

                <Input
                  name="website"
                  value={company.website || ""}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Location
                </label>

                <Input
                  name="location"
                  value={company.location || ""}
                  onChange={handleChange}
                  placeholder="Enter company location"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  name="description"
                  value={company.description || ""}
                  onChange={handleChange}
                  className="min-h-32 w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Tell us about your company..."
                />
              </div>

            </div>

            <Button
              type="submit"
              className="mt-6"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Company"}
            </Button>

          </form>
        )}

      </div>
    </Layout>
  );
}

export default Company;