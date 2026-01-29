import { useNavigate, useLocation } from "react-router-dom";

type TabType = "goals" | "challenges" | "missions";

interface DigiteenTabsProps {
  activeTab?: TabType;
}

function DigiteenTabs({ activeTab }: DigiteenTabsProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // تشخیص activeTab از مسیر فعلی اگر prop داده نشده باشد
  const getActiveTabFromPath = (): TabType => {
    if (activeTab) return activeTab;
    if (location.pathname.includes("/goals")) return "goals";
    if (location.pathname.includes("/missions")) return "missions";
    return "challenges"; // default
  };

  const currentActiveTab = getActiveTabFromPath();

  const tabs = [
    {
      id: "goals" as TabType,
      label: "اهداف",
      path: "/digiteen/goals",
    },
    {
      id: "challenges" as TabType,
      label: "چالش‌ها",
      path: "/digiteen/challenges",
    },
    {
      id: "missions" as TabType,
      label: "ماموریت‌ها",
      path: "/digiteen/missions",
    },
  ];

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="grid grid-cols-3 items-center px-4 gap-2 bg-white py-2 sticky top-0 z-10">
      {tabs.map((tab) => {
        const isActive = currentActiveTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.path)}
            className={`h-10 border gap-2 rounded-lg flex justify-center items-center transition-all ${
              isActive
                ? "border-[#7e4bd0] bg-purple-50"
                : "border-gray-400 hover:border-gray-500"
            }`}
          >
            <p
              className={`text-xs font-medium ${
                isActive ? "text-[#7e4bd0]" : "text-black"
              }`}
            >
              {tab.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}

export default DigiteenTabs;

