import { useNavigate } from "react-router-dom";
import { lineIconPaths } from "../../../utils/lineIcons";

type TabType = "money" | "saving" | "digit";

interface WalletTabsProps {
  activeTab: TabType;
  onTabChange?: (tab: TabType) => void;
  isParentInvited?: boolean;
}

function WalletTabs({ activeTab, onTabChange, isParentInvited = true }: WalletTabsProps) {
  const navigate = useNavigate();

  const tabs = [
    {
      id: "money" as TabType,
      label: "کیف پول",
      icon: lineIconPaths.wallet,
      activeColor: "indigo-700",
      path: "/wallet-money",
    },
    {
      id: "saving" as TabType,
      label: "پس‌انداز",
      icon: lineIconPaths.pasandaz,
      activeColor: "indigo-700",
      path: "/wallet-saving",
    },
    {
      id: "digit" as TabType,
      label: "دیجیت",
      icon: lineIconPaths.digit,
      activeColor: "indigo-700",
      path: "/wallet-digit",
    },
  ];

  const handleTabClick = (tab: TabType, path: string, disabled: boolean) => {
    if (disabled) return;
    if (onTabChange) {
      onTabChange(tab);
    }
    navigate(path);
  };

  return (
    <div className="grid grid-cols-3 items-center px-4 gap-2 bg-white py-2 sticky top-0 z-10">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isSavingTab = tab.id === "saving";
        const isDisabled = isSavingTab && !isParentInvited;

        return (
          <div
            key={tab.id}
            onClick={() => !isDisabled && handleTabClick(tab.id, tab.path, isDisabled)}
            className={`h-10 border gap-2 rounded-lg flex justify-center items-center transition-all ${
              isDisabled
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : "cursor-pointer hover:opacity-80"
            } ${
              isActive
                ? "border-[#7e4bd0]"
                : "border-gray-400"
            }`}
          >
            <img
              src={tab.icon}
              className={`w-5 h-5 ${
                isActive ? "" : "opacity-60"
              }`}
              alt={tab.label}
            />
            <p
              className={`text-xs font-medium ${
                isActive ? "text-[#7e4bd0]" : isDisabled ? "text-gray-400" : "text-black"
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

