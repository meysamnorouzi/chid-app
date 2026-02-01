import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { lineIconPaths } from "../../utils/lineIcons";
import { InteractiveMap, type Hotspot, type ClickableBounds } from "../../components/InteractiveMap";
import { OnboardingDialogue } from "../../components/shared/OnboardingDialogue";

const ONBOARDING_STORAGE_KEY = "chid_onboarding_seen";
const FIRST_WELCOME_STORAGE_KEY = "child_first_welcome_seen";
const ONBOARDING_HOTSPOTS = ["wallet-shape", "shop-shape", "cafe-shape", "profile-shape", "saving-shape", "onboarding-only-shape", "cinema-onboarding-shape", "smartinez-onboarding-shape"] as const;
const HOTSPOT_LABELS: Record<string, string> = {
  "wallet-shape": "کیف پول",
  "shop-shape": "فروشگاه",
  "cafe-shape": "کافه",
  "profile-shape": "پروفایل",
  "saving-shape": "پس انداز",
  "onboarding-only-shape": "",
  "cinema-onboarding-shape": "",
  "smartinez-onboarding-shape": "",
};

/** Map viewBox (1576×903). Central town only; edges are clouds — no navigation there. */
const MAP_VIEWBOX = { width: 1576, height: 903 };
const EDGE_MARGIN = 0.15;
/** Only clicks inside this central rect (town) navigate; clicks on cloud edges do nothing. */
const HOME_CLICKABLE_BOUNDS: ClickableBounds = {
  x: MAP_VIEWBOX.width * EDGE_MARGIN,
  y: MAP_VIEWBOX.height * EDGE_MARGIN,
  width: MAP_VIEWBOX.width * (1 - 2 * EDGE_MARGIN),
  height: MAP_VIEWBOX.height * (1 - 2 * EDGE_MARGIN),
};

/** Wallet building path (d=" M 726.10 475.15 C ... Z") — bbox only, no buffer. */
const HOME_MAP_HOTSPOTS: Hotspot[] = [
  {
    id: "wallet-shape",
    type: "rect",
    x: 626,
    y: 469,
    width: 164,
    height: 163,
    path: "/wallet-money",
  },
  /** Beige path (fill #e2ddca) — پس انداز tab in wallet; bbox + larger buffer, extra at bottom. */
  {
    id: "saving-shape",
    type: "rect",
    x: 457,
    y: 313,
    width: 160,
    height: 178,
    path: "/wallet-saving",
  },
  { id: "wallet", type: "rect", x: 0, y: 0, width: 526, height: 301, path: "/wallet-money" },
  /** Shop building path (d=" M 850.26 476.92 C ... Z") — bbox only; only this shape goes to shop. */
  {
    id: "shop-shape",
    type: "rect",
    x: 822,
    y: 458,
    width: 139,
    height: 171,
    path: "/shop",
  },
  /** Digibook path (d=" M 632.42 693.31 C ... Z") — bbox + a little buffer. */
  {
    id: "digibook-shape",
    type: "rect",
    x: 608,
    y: 677,
    width: 63,
    height: 91,
    path: "/digibook",
  },
  { id: "digibook", type: "rect", x: 1051, y: 0, width: 525, height: 301, path: "/digibook" },
  /** Shahre farang path (d=" M 790.48 704.34 C ... Z") — bbox + a little buffer; only this shape goes to shahr-farang. */
  {
    id: "shahr-farang-shape",
    type: "rect",
    x: 777,
    y: 689,
    width: 55,
    height: 44,
    path: "/shahr-farang",
  },
  /** Radio teen path (d=" M 969.84 721.77 C ... Z") — bbox + a little buffer; only this shape goes to radioteen. */
  {
    id: "radioteen-shape",
    type: "rect",
    x: 883,
    y: 709,
    width: 115,
    height: 64,
    path: "/radioteen",
  },
  /** Digiteen/goals path (fill #010101, d=" M 1066.93 371.27 C ... Z") — bbox aligned to path; only this shape goes to digiteen/goals. */
  {
    id: "digiteen-shape",
    type: "rect",
    x: 1025,
    y: 368,
    width: 101,
    height: 116,
    path: "/digiteen/goals",
  },
  /** Cafe building path (d=" M 660.81 387.51 C ... Z") — bbox aligned to path; only this shape goes to cafe. */
  {
    id: "cafe-shape",
    type: "rect",
    x: 598,
    y: 387,
    width: 128,
    height: 116,
    path: "/friends",
  },
  /** Digit tab in wallet path (fill #962311, d=" M 791.00 631.03 C ... Z") — bbox + larger buffer. */
  {
    id: "wallet-digit-shape",
    type: "rect",
    x: 750,
    y: 596,
    width: 125,
    height: 102,
    path: "/wallet-digit",
  },
  /** Profile building path (fill #f38681, d=" M 791.12 355.31 C ... Z") — bbox only; only this shape goes to profile. */
  {
    id: "profile-shape",
    type: "rect",
    x: 772,
    y: 353,
    width: 46,
    height: 35,
    path: "/user-info",
  },
  /** Purple path (fill #ad3ac9) — onboarding only, no navigation; bbox + buffer for easier click. */
  {
    id: "onboarding-only-shape",
    type: "rect",
    x: 883,
    y: 362,
    width: 60,
    height: 81,
    path: "",
  },
  /** Cream path (fill #fef8d8) — cinema onboarding only, no navigation; bbox + buffer. */
  {
    id: "cinema-onboarding-shape",
    type: "rect",
    x: 959,
    y: 462,
    width: 198,
    height: 174,
    path: "",
  },
  /** Black path (fill #000000) — اسمارتینز onboarding only, no navigation; bbox + buffer. */
  {
    id: "smartinez-onboarding-shape",
    type: "rect",
    x: 371,
    y: 463,
    width: 246,
    height: 197,
    path: "",
  },
];

function getOnboardingSeen(): Set<string> {
  try {
    const raw = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (raw) {
      const arr = JSON.parse(raw) as string[];
      return new Set(Array.isArray(arr) ? arr : []);
    }
  } catch {
    /* ignore */
  }
  return new Set();
}

function setOnboardingSeen(id: string) {
  const seen = getOnboardingSeen();
  seen.add(id);
  localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify([...seen]));
}

const Home = () => {
  const navigate = useNavigate();
  const [onboarding, setOnboarding] = useState<{
    hotspotId: string;
    path: string;
    label: string;
  } | null>(null);
  const [showFirstWelcome, setShowFirstWelcome] = useState(false);

  // Show first-time welcome on initial visit
  useEffect(() => {
    const seen = localStorage.getItem(FIRST_WELCOME_STORAGE_KEY);
    if (!seen) {
      setShowFirstWelcome(true);
    }
  }, []);

  const handleFirstWelcomeClose = useCallback(() => {
    localStorage.setItem(FIRST_WELCOME_STORAGE_KEY, "true");
    setShowFirstWelcome(false);
  }, []);

  const handleHotspotClick = useCallback(
    (hotspot: { id: string; path: string }) => {
      // Don't show hotspot onboarding while first welcome is visible
      if (showFirstWelcome) {
        if (hotspot.path) navigate(hotspot.path);
        return;
      }
      const isOnboardingHotspot = ONBOARDING_HOTSPOTS.includes(
        hotspot.id as (typeof ONBOARDING_HOTSPOTS)[number]
      );
      const seen = getOnboardingSeen();

      if (isOnboardingHotspot && !seen.has(hotspot.id)) {
        setOnboarding({
          hotspotId: hotspot.id,
          path: hotspot.path,
          label: HOTSPOT_LABELS[hotspot.id] ?? "این بخش",
        });
      } else if (hotspot.path) {
        navigate(hotspot.path);
      }
    },
    [navigate, showFirstWelcome]
  );

  const handleOnboardingClose = useCallback(() => {
    if (onboarding) {
      setOnboardingSeen(onboarding.hotspotId);
      setOnboarding(null);
    }
  }, [onboarding]);

  const getUserData = () => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) return JSON.parse(userStr);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
    return null;
  };

  const userData = getUserData();
  const userAvatar = userData?.avatar || "/logo/teens profiles/karagah.svg";

  return (
    <div className="w-full h-full min-h-0 flex flex-col overflow-hidden relative">
      {/* Header with Profile and Notification */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-white/95 to-transparent backdrop-blur-sm"
      >
        <div className="flex items-center justify-between p-4">
          {/* User Profile Section */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer"
              onClick={() => navigate('/user-info')}
            >
              <img
                src={userAvatar.startsWith('/') ? userAvatar : `/logo/teens profiles/${userAvatar}`}
                className="w-12 h-12 object-cover border-2 border-[#7e4bd0] object-top rounded-full shadow-md"
                alt="پروفایل کاربر"
              />
              <div className="w-3 h-3 rounded-full bg-green-500 absolute top-0.5 right-0.5 border-2 border-white shadow-sm"></div>
            </motion.div>
            <div>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-bold text-gray-800"
              >
                محمد مهرابی
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-gray-600"
              >
                @mohammad-mehrabi
              </motion.p>
            </div>
          </div>

          {/* Notification Icon */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative cursor-pointer"
            onClick={() => navigate('/messages')}
          >
            <div className="p-2.5 border-2 border-[#7e4bd0] rounded-full bg-white shadow-md hover:bg-purple-50 transition-colors">
              <img 
                src={lineIconPaths.notif} 
                className="w-6 h-6" 
                alt="اعلان‌ها" 
              />
            </div>
            {/* Notification Badge - Optional */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-[10px] font-bold text-white">3</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Map: full height, cover; zoom/pan; only central town is clickable (edges = clouds) */}
      <div className="flex-1 min-h-0 w-full relative flex flex-col">
        <InteractiveMap
          hotspots={HOME_MAP_HOTSPOTS}
          clickableBounds={HOME_CLICKABLE_BOUNDS}
          onHotspotClick={handleHotspotClick}
        />
      </div>

      {/* First-time welcome - only on first visit */}
      <AnimatePresence>
        {showFirstWelcome && (
          <OnboardingDialogue
            key="first-welcome"
            hotspotId="first-welcome"
            path=""
            label=""
            onClose={handleFirstWelcomeClose}
          />
        )}
      </AnimatePresence>
      {/* Onboarding dialogue - between Boz (bottom-left) and menu (bottom-right) */}
      <AnimatePresence>
        {onboarding && (
          <OnboardingDialogue
            key={onboarding.hotspotId}
            hotspotId={onboarding.hotspotId}
            path={onboarding.path}
            label={onboarding.label}
            onClose={handleOnboardingClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;

