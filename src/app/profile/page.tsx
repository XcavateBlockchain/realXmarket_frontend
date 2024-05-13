"use client";
import ProfileBanner from "@/components/Profile-Banner";
import CompanyTab from "@/ui/profile-tabs/company-tab";
import DevelopmentLoanTab from "@/ui/profile-tabs/development-loan-tab";
import MessageTab from "@/ui/profile-tabs/message-tab";
import ProfileTab from "@/ui/profile-tabs/profile-tab";
import PropertiesTab from "@/ui/profile-tabs/properties-tab";
import TransactionsTab from "@/ui/profile-tabs/transactions-tab";
import WalletAccessTab from "@/ui/profile-tabs/wallet-access";
import { useState } from "react";
const tab_headings = [
  "Profile",
  "Company",
  "Properties",
  "Development Loan",
  "Transactions",
  "Wallet Access",
  "Message",
];
export default function Profile() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <>
      <div>
        <ProfileBanner />
        <div className="flex flex-col font-DM">
          <div className="flex justify-between"></div>

          <div className="w-full px-10 bg-white">
            <div className="flex justify-between mt-4">
              <div className="flex flex-col px-6">
                <h1 className="mt-10 text-2xl font-bold text-gray-900">
                  Nikku.Jr.Dev
                </h1>
                <p className="text-sm text-gray-400 ">
                  Account created May, 2024
                </p>
              </div>
              <div>
                <button className="mt-10 px-4 py-2 text-sm font-medium text-white bg-[#3B4F74] rounded-md">
                  Add Property
                </button>
              </div>
            </div>
            <div className="bg-white py-2 px-3 mt-10">
              <nav className="flex flex-wrap gap-8">
                {tab_headings.map((item, i) => {
                  return (
                    <span
                      key={i}
                      onClick={() => setTabIndex(i)}
                      className="inline-flex cursor-pointer whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-md font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
                    >
                      {" "}
                      {item}
                    </span>
                  );
                })}
              </nav>
            </div>
          </div>
          <div className="w-screen bg-white px-16">
            <div className="py-4">
              {tabIndex === 0 && <ProfileTab />}
              {tabIndex === 1 && <CompanyTab />}
              {tabIndex === 2 && <PropertiesTab />}

              {tabIndex === 3 && <DevelopmentLoanTab />}
              {tabIndex === 4 && <TransactionsTab />}
              {tabIndex === 5 && <WalletAccessTab />}
              {tabIndex === 6 && <MessageTab />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
