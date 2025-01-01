import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { PersonalInfoForm } from "@/components/profile/PersonalInfoForm";
import { BankDetailsForm } from "@/components/profile/BankDetailsForm";
import { User } from "@/types/user";
import { toast } from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [activeTab, setActiveTab] = React.useState<"personal" | "bank">(
    "personal"
  );

  const handleUpdateProfile = async (data: Partial<User>) => {
    try {
      await axios.post("/api/user/profile", data);
      toast.success("Profile updated successfully");
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || "An error occurred. Please try again.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto py-8 sm:px-4 mt-2">
      <h1 className="text-3xl font-bold text-primary dark:text-primarylight mb-8">
        Profile Settings
      </h1>

      <div className="bg-primarylight dark:bg-primary shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab("personal")}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === "personal"
                  ? "border-primary text-primary dark:border-primarylight dark:text-primarylight"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab("bank")}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === "bank"
                  ? "border-primary text-primary dark:border-primarylight dark:text-primarylight"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Bank Details
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "personal" ? (
            <PersonalInfoForm
              user={currentUser}
              onSubmit={handleUpdateProfile}
            />
          ) : (
            <BankDetailsForm
              bankDetails={currentUser.bankDetails}
              onSubmit={handleUpdateProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
