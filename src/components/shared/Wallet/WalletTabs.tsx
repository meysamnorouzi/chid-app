import { WalletIcon, HeartIcon } from "@heroicons/react/24/outline";
import { IoShuffle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type TabType = "money" | "saving" | "digit";

interface WalletTabsProps {
  activeTab: TabType;
  onTabChange?: (tab: TabType) => void;
}

function WalletTabs({ activeTab, onTabChange }: WalletTabsProps) {
  const navigate = useNavigate();

  const tabs = [
    {
      id: "money" as TabType,
      label: "کیف پول",
      icon: WalletIcon,
      activeColor: "indigo-700",
      path: "/wallet-money",
    },
    {
      id: "saving" as TabType,
      label: "پس‌انداز",
      icon: IoShuffle,
      activeColor: "indigo-700",
      path: "/wallet-saving",
    },
    {
      id: "digit" as TabType,
      label: "دیجیت",
      icon: HeartIcon,
      activeColor: "indigo-700",
      path: "/wallet-digit",
    },
  ];

  const handleTabClick = (tab: TabType, path: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
    navigate(path);
  };

  return (
    <div className="grid grid-cols-3 items-center px-4 gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.id, tab.path)}
            className={`h-10 border gap-2 rounded-lg flex justify-center items-center transition-all cursor-pointer hover:opacity-80 ${
              isActive
                ? "border-[#7e4bd0]"
                : "border-gray-400"
            }`}
          >
            <Icon
              className={`w-5 h-5 ${
                isActive ? "text-[#7e4bd0]" : "text-black"
              }`}
            />
            <p
              className={`text-xs font-medium ${
                isActive ? "text-[#7e4bd0]" : "text-black"
              }`}
            >
              {tab.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default WalletTabs;

