/**
 * DocumentationSidebar Component
 * 
 * Sidebar navigation for documentation section
 * Designed with SEO, security, accessibility, and modular structure in mind
 */

import { useState, useEffect, useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useDocumentationTheme } from '../../theme';
import { useDocumentationMode } from '../../theme/DocumentationModeContext';
import { AccordionItem } from '../shared';

interface SidebarItem {
  id: string;
  title: string;
  path: string;
  icon?: React.ReactNode;
  badge?: number;
}

interface DocumentationSidebarProps {
  mainItems?: SidebarItem[];
  appName?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

const defaultMainItems: SidebarItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    path: '/documentation',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    id: 'accordion',
    title: 'Accordion',
    path: '/documentation/accordion',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
      </svg>
    ),
  },
  {
    id: 'avatar',
    title: 'Avatar',
    path: '/documentation/avatar',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: 'banner',
    title: 'Banner',
    path: '/documentation/banner',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'toast',
    title: 'Toast',
    path: '/documentation/toast',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    id: 'button',
    title: 'Button',
    path: '/documentation/button',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
  },
  {
    id: 'bottom-navigation',
    title: 'Bottom Navigation',
    path: '/documentation/bottom-navigation',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 'breadcrumb',
    title: 'Breadcrumb',
    path: '/documentation/breadcrumb',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    id: 'carousel',
    title: 'Carousel',
    path: '/documentation/carousel',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    id: 'checkbox',
    title: 'Checkbox',
    path: '/documentation/checkbox',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'chips',
    title: 'Chips',
    path: '/documentation/chips',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    id: 'date-picker',
    title: 'Date Picker',
    path: '/documentation/date-picker',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'drawer',
    title: 'Drawer',
    path: '/documentation/drawer',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    id: 'floating-toolbar',
    title: 'Floating Toolbar',
    path: '/documentation/floating-toolbar',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    id: 'tag',
    title: 'Tag',
    path: '/documentation/tag',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    id: 'loader',
    title: 'Loader',
    path: '/documentation/loader',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    id: 'menu',
    title: 'Menu',
    path: '/documentation/menu',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    id: 'pagination',
    title: 'Pagination',
    path: '/documentation/pagination',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
      </svg>
    ),
  },
  {
    id: 'progress',
    title: 'Progress',
    path: '/documentation/progress',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 'radio',
    title: 'Radio',
    path: '/documentation/radio',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'range',
    title: 'Range',
    path: '/documentation/range',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: 'search',
    title: 'Search',
    path: '/documentation/search',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: 'segment-control',
    title: 'Segment Control',
    path: '/documentation/segment-control',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    id: 'multi-select-area',
    title: 'Multi Select Area',
    path: '/documentation/multi-select-area',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    id: 'snackbar',
    title: 'Snackbar',
    path: '/documentation/snackbar',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    id: 'switch',
    title: 'Switch',
    path: '/documentation/switch',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    id: 'tabs',
    title: 'Tabs',
    path: '/documentation/tabs',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    id: 'tooltip',
    title: 'Tooltip',
    path: '/documentation/tooltip',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const configMainItems: SidebarItem[] = [
  {
    id: 'icon',
    title: 'Icon',
    path: '/documentation/config/icon',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: 'colors',
    title: 'Colors',
    path: '/documentation/config/colors',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const DocumentationSidebar = ({ 
  mainItems,
  appName = 'Doc Component',
  isOpen = true,
  onToggle 
}: DocumentationSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useDocumentationTheme();
  const { mode } = useDocumentationMode();
  
  // Select items based on mode
  const itemsToDisplay = useMemo(() => {
    if (mainItems) return mainItems;
    return mode === 'config' ? configMainItems : defaultMainItems;
  }, [mainItems, mode]);

  // Set app name based on mode
  const displayAppName = useMemo(() => {
    if (appName && appName !== 'Doc Component') return appName;
    return mode === 'config' ? 'Doc Config' : 'Doc Components';
  }, [appName, mode]);

  // Navigate when mode changes
  useEffect(() => {
    const isOnConfigPage = location.pathname.startsWith('/documentation/config');
    const isOnComponentPage = location.pathname.startsWith('/documentation/') && 
                              !location.pathname.startsWith('/documentation/config') &&
                              location.pathname !== '/documentation' &&
                              location.pathname !== '/documentation/login';
    const isOnMainDocPage = location.pathname === '/documentation';

    // When switching to config mode, navigate to first config item (icon)
    if (mode === 'config' && !isOnConfigPage && (isOnComponentPage || isOnMainDocPage)) {
      navigate('/documentation/config/icon', { replace: true });
    } else if (mode === 'components' && isOnConfigPage) {
      navigate('/documentation', { replace: true });
    }
  }, [mode, location.pathname, navigate]);
  const [, setDocAuthToken] = useLocalStorage<string | null>('docAuthToken', null);
  const [accordionMenuExpanded, setAccordionMenuExpanded] = useState(false);
  const [avatarMenuExpanded, setAvatarMenuExpanded] = useState(false);
  const [bannerMenuExpanded, setBannerMenuExpanded] = useState(false);
  const [toastMenuExpanded, setToastMenuExpanded] = useState(false);
  const [buttonMenuExpanded, setButtonMenuExpanded] = useState(false);
  const [bottomNavigationMenuExpanded, setBottomNavigationMenuExpanded] = useState(false);
  const [breadcrumbMenuExpanded, setBreadcrumbMenuExpanded] = useState(false);
  const [carouselMenuExpanded, setCarouselMenuExpanded] = useState(false);
  const [checkboxMenuExpanded, setCheckboxMenuExpanded] = useState(false);
  const [chipsMenuExpanded, setChipsMenuExpanded] = useState(false);
  const [datePickerMenuExpanded, setDatePickerMenuExpanded] = useState(false);
  const [drawerMenuExpanded, setDrawerMenuExpanded] = useState(false);
  const [floatingToolbarMenuExpanded, setFloatingToolbarMenuExpanded] = useState(false);
  const [tagMenuExpanded, setTagMenuExpanded] = useState(false);
  const [loaderMenuExpanded, setLoaderMenuExpanded] = useState(false);
  const [menuMenuExpanded, setMenuMenuExpanded] = useState(false);
  const [paginationMenuExpanded, setPaginationMenuExpanded] = useState(false);
  const [progressMenuExpanded, setProgressMenuExpanded] = useState(false);
  const [radioMenuExpanded, setRadioMenuExpanded] = useState(false);
  const [rangeMenuExpanded, setRangeMenuExpanded] = useState(false);
  const [searchMenuExpanded, setSearchMenuExpanded] = useState(false);
  const [segmentControlMenuExpanded, setSegmentControlMenuExpanded] = useState(false);
  const [multiSelectAreaMenuExpanded, setMultiSelectAreaMenuExpanded] = useState(false);
  const [snackbarMenuExpanded, setSnackbarMenuExpanded] = useState(false);
  const [switchMenuExpanded, setSwitchMenuExpanded] = useState(false);
  const [tabsMenuExpanded, setTabsMenuExpanded] = useState(false);
  const [tooltipMenuExpanded, setTooltipMenuExpanded] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isAccordionPage = location.pathname.startsWith('/documentation/accordion');
  const isAvatarPage = location.pathname.startsWith('/documentation/avatar');
  const isBannerPage = location.pathname.startsWith('/documentation/banner');
  const isToastPage = location.pathname.startsWith('/documentation/toast');
  const isButtonPage = location.pathname.startsWith('/documentation/button');
  const isBottomNavigationPage = location.pathname.startsWith('/documentation/bottom-navigation');
  const isBreadcrumbPage = location.pathname.startsWith('/documentation/breadcrumb');
  const isCarouselPage = location.pathname.startsWith('/documentation/carousel');
  const isCheckboxPage = location.pathname.startsWith('/documentation/checkbox');
  const isChipsPage = location.pathname.startsWith('/documentation/chips');
  const isDatePickerPage = location.pathname.startsWith('/documentation/date-picker');
  const isDrawerPage = location.pathname.startsWith('/documentation/drawer');
  const isFloatingToolbarPage = location.pathname.startsWith('/documentation/floating-toolbar');
  const isTagPage = location.pathname.startsWith('/documentation/tag');
  const isLoaderPage = location.pathname.startsWith('/documentation/loader');
  const isMenuPage = location.pathname.startsWith('/documentation/menu');
  const isPaginationPage = location.pathname.startsWith('/documentation/pagination');
  const isProgressPage = location.pathname.startsWith('/documentation/progress');
  const isRadioPage = location.pathname.startsWith('/documentation/radio');
  const isRangePage = location.pathname.startsWith('/documentation/range');
  const isSearchPage = location.pathname.startsWith('/documentation/search');
  const isSegmentControlPage = location.pathname.startsWith('/documentation/segment-control');
  const isMultiSelectAreaPage = location.pathname.startsWith('/documentation/multi-select-area');
  const isSnackbarPage = location.pathname.startsWith('/documentation/snackbar');
  const isSwitchPage = location.pathname.startsWith('/documentation/switch');
  const isTabsPage = location.pathname.startsWith('/documentation/tabs');
  const isTooltipPage = location.pathname.startsWith('/documentation/tooltip');
  
  // List of menu items that have submenus
  const itemsWithSubmenus = ['accordion', 'avatar', 'banner', 'toast', 'button', 'bottom-navigation', 'breadcrumb', 'carousel', 'checkbox', 'chips', 'date-picker', 'drawer', 'floating-toolbar', 'tag', 'loader', 'menu', 'multi-select-area', 'pagination', 'progress', 'radio', 'range', 'search', 'segment-control', 'snackbar', 'switch', 'tabs', 'tooltip'];
  
  // Check if an item has submenu
  const hasSubmenu = (itemId: string) => itemsWithSubmenus.includes(itemId);
  
  // Auto-expand accordion menu when on accordion page
  useEffect(() => {
    if (isAccordionPage) {
      setAccordionMenuExpanded(true);
    }
  }, [isAccordionPage]);

  // Auto-expand avatar menu when on avatar page
  useEffect(() => {
    if (isAvatarPage) {
      setAvatarMenuExpanded(true);
    }
  }, [isAvatarPage]);

  // Auto-expand banner menu when on banner page
  useEffect(() => {
    if (isBannerPage) {
      setBannerMenuExpanded(true);
    }
  }, [isBannerPage]);

  // Auto-expand toast menu when on toast page
  useEffect(() => {
    if (isToastPage) {
      setToastMenuExpanded(true);
    }
  }, [isToastPage]);

  // Auto-expand button menu when on button page
  useEffect(() => {
    if (isButtonPage) {
      setButtonMenuExpanded(true);
    }
  }, [isButtonPage]);

  // Auto-expand bottom-navigation menu when on bottom-navigation page
  useEffect(() => {
    if (isBottomNavigationPage) {
      setBottomNavigationMenuExpanded(true);
    }
  }, [isBottomNavigationPage]);

  // Auto-expand breadcrumb menu when on breadcrumb page
  useEffect(() => {
    if (isBreadcrumbPage) {
      setBreadcrumbMenuExpanded(true);
    }
  }, [isBreadcrumbPage]);

  // Auto-expand carousel menu when on carousel page
  useEffect(() => {
    if (isCarouselPage) {
      setCarouselMenuExpanded(true);
    }
  }, [isCarouselPage]);

  // Auto-expand checkbox menu when on checkbox page
  useEffect(() => {
    if (isCheckboxPage) {
      setCheckboxMenuExpanded(true);
    }
  }, [isCheckboxPage]);

  // Auto-expand chips menu when on chips page
  useEffect(() => {
    if (isChipsPage) {
      setChipsMenuExpanded(true);
    }
  }, [isChipsPage]);

  // Auto-expand date-picker menu when on date-picker page
  useEffect(() => {
    if (isDatePickerPage) {
      setDatePickerMenuExpanded(true);
    }
  }, [isDatePickerPage]);

  // Auto-expand drawer menu when on drawer page
  useEffect(() => {
    if (isDrawerPage) {
      setDrawerMenuExpanded(true);
    }
  }, [isDrawerPage]);

  // Auto-expand floating-toolbar menu when on floating-toolbar page
  useEffect(() => {
    if (isFloatingToolbarPage) {
      setFloatingToolbarMenuExpanded(true);
    }
  }, [isFloatingToolbarPage]);

  // Auto-expand tag menu when on tag page
  useEffect(() => {
    if (isTagPage) {
      setTagMenuExpanded(true);
    }
  }, [isTagPage]);

  // Auto-expand loader menu when on loader page
  useEffect(() => {
    if (isLoaderPage) {
      setLoaderMenuExpanded(true);
    }
  }, [isLoaderPage]);

  // Auto-expand menu menu when on menu page
  useEffect(() => {
    if (isMenuPage) {
      setMenuMenuExpanded(true);
    }
  }, [isMenuPage]);

  // Auto-expand pagination menu when on pagination page
  useEffect(() => {
    if (isPaginationPage) {
      setPaginationMenuExpanded(true);
    }
  }, [isPaginationPage]);

  // Auto-expand progress menu when on progress page
  useEffect(() => {
    if (isProgressPage) {
      setProgressMenuExpanded(true);
    }
  }, [isProgressPage]);

  // Auto-expand radio menu when on radio page
  useEffect(() => {
    if (isRadioPage) {
      setRadioMenuExpanded(true);
    }
  }, [isRadioPage]);

  // Auto-expand range menu when on range page
  useEffect(() => {
    if (isRangePage) {
      setRangeMenuExpanded(true);
    }
  }, [isRangePage]);

  // Auto-expand search menu when on search page
  useEffect(() => {
    if (isSearchPage) {
      setSearchMenuExpanded(true);
    }
  }, [isSearchPage]);

  // Auto-expand segment control menu when on segment control page
  useEffect(() => {
    if (isSegmentControlPage) {
      setSegmentControlMenuExpanded(true);
    }
  }, [isSegmentControlPage]);

  // Auto-expand multi select area menu when on multi select area page
  useEffect(() => {
    if (isMultiSelectAreaPage) {
      setMultiSelectAreaMenuExpanded(true);
    }
  }, [isMultiSelectAreaPage]);

  // Auto-expand snackbar menu when on snackbar page
  useEffect(() => {
    if (isSnackbarPage) {
      setSnackbarMenuExpanded(true);
    }
  }, [isSnackbarPage]);

  // Auto-expand switch menu when on switch page
  useEffect(() => {
    if (isSwitchPage) {
      setSwitchMenuExpanded(true);
    }
  }, [isSwitchPage]);

  // Auto-expand tabs menu when on tabs page
  useEffect(() => {
    if (isTabsPage) {
      setTabsMenuExpanded(true);
    }
  }, [isTabsPage]);

  // Auto-expand tooltip menu when on tooltip page
  useEffect(() => {
    if (isTooltipPage) {
      setTooltipMenuExpanded(true);
    }
  }, [isTooltipPage]);

  const handleLogout = () => {
    setDocAuthToken(null);
    // Use window.location.href to ensure state is properly updated
    window.location.href = '/documentation/login';
  };

  return (
    <aside
      className={`z-40 w-full transition-transform duration-300 lg:w-[350px] ease-in-out p-6 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
      role="navigation"
      aria-label="Documentation navigation"
    >
      <div 
        className="flex flex-col h-full w-full lg:border rounded-xl"
        style={{ borderColor: theme.colors.gray[300] }}
      >
        {/* App Name Header */}
        <div className="px-6 py-6 relative">
          <h1
            className="text-2xl font-bold"
            style={{ 
              color: theme.colors.light.inverse,
            }}
          >
            {displayAppName}
          </h1>
          {/* Divider */}
          <div 
            className="mt-6"
            style={{ 
              borderBottom: `1px solid ${theme.colors.gray[300]}`,
            }}
          />
          {onToggle && (
            <button
              onClick={onToggle}
              className="lg:hidden absolute top-4 right-4 p-2 rounded-lg transition-colors"
              aria-label="Close sidebar"
              style={{ 
                color: theme.colors.gray[700],
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.gray[500] + '1A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto px-4">
          <ul className="space-y-1" role="menubar">
            {itemsToDisplay.map((item) => {
              const active = isActive(item.path);
              const isAccordionItem = item.id === 'accordion';
              const isAvatarItem = item.id === 'avatar';
              const isBannerItem = item.id === 'banner';
              const isToastItem = item.id === 'toast';
              const isButtonItem = item.id === 'button';
              const isBottomNavigationItem = item.id === 'bottom-navigation';
              const isBreadcrumbItem = item.id === 'breadcrumb';
              const isCarouselItem = item.id === 'carousel';
              const isCheckboxItem = item.id === 'checkbox';
              const isChipsItem = item.id === 'chips';
              const isDatePickerItem = item.id === 'date-picker';
              const isDrawerItem = item.id === 'drawer';
              const isFloatingToolbarItem = item.id === 'floating-toolbar';
              const isTagItem = item.id === 'tag';
              const isLoaderItem = item.id === 'loader';
              const isMenuItem = item.id === 'menu';
              const isPaginationItem = item.id === 'pagination';
              const isProgressItem = item.id === 'progress';
              const isRadioItem = item.id === 'radio';
              const isRangeItem = item.id === 'range';
              const isSearchItem = item.id === 'search';
              const isSegmentControlItem = item.id === 'segment-control';
              const isMultiSelectAreaItem = item.id === 'multi-select-area';
              const isSnackbarItem = item.id === 'snackbar';
              const isSwitchItem = item.id === 'switch';
              const isTabsItem = item.id === 'tabs';
              const isTooltipItem = item.id === 'tooltip';
              
              // Render Accordion submenu for Accordion page
              if (isAccordionItem && isAccordionPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="accordion-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={accordionMenuExpanded}
                      onToggle={(expanded) => setAccordionMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/accordion/basic-examples"
                            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                              location.pathname === '/documentation/accordion/basic-examples' ? 'font-semibold' : ''
                            }`}
                            style={{
                              color: location.pathname === '/documentation/accordion/basic-examples'
                                ? theme.colors.dark.inverse
                                : theme.colors.gray[700],
                              backgroundColor: location.pathname === '/documentation/accordion/basic-examples'
                                ? theme.colors.dark.default
                                : 'transparent',
                            }}
                            onMouseEnter={(e) => {
                              if (location.pathname !== '/documentation/accordion/basic-examples') {
                                e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (location.pathname !== '/documentation/accordion/basic-examples') {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            Basic Examples
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documentation/accordion/variants"
                            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                              location.pathname === '/documentation/accordion/variants' ? 'font-semibold' : ''
                            }`}
                            style={{
                              color: location.pathname === '/documentation/accordion/variants'
                                ? theme.colors.dark.inverse
                                : theme.colors.gray[700],
                              backgroundColor: location.pathname === '/documentation/accordion/variants'
                                ? theme.colors.dark.default
                                : 'transparent',
                            }}
                            onMouseEnter={(e) => {
                              if (location.pathname !== '/documentation/accordion/variants') {
                                e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (location.pathname !== '/documentation/accordion/variants') {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            Variants
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documentation/accordion/states"
                            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                              location.pathname === '/documentation/accordion/states' ? 'font-semibold' : ''
                            }`}
                            style={{
                              color: location.pathname === '/documentation/accordion/states'
                                ? theme.colors.dark.inverse
                                : theme.colors.gray[700],
                              backgroundColor: location.pathname === '/documentation/accordion/states'
                                ? theme.colors.dark.default
                                : 'transparent',
                            }}
                            onMouseEnter={(e) => {
                              if (location.pathname !== '/documentation/accordion/states') {
                                e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (location.pathname !== '/documentation/accordion/states') {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            States
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documentation/accordion/sizes"
                            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                              location.pathname === '/documentation/accordion/sizes' ? 'font-semibold' : ''
                            }`}
                            style={{
                              color: location.pathname === '/documentation/accordion/sizes'
                                ? theme.colors.dark.inverse
                                : theme.colors.gray[700],
                              backgroundColor: location.pathname === '/documentation/accordion/sizes'
                                ? theme.colors.dark.default
                                : 'transparent',
                            }}
                            onMouseEnter={(e) => {
                              if (location.pathname !== '/documentation/accordion/sizes') {
                                e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (location.pathname !== '/documentation/accordion/sizes') {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            Sizes
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documentation/accordion/icons-badges"
                            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                              location.pathname === '/documentation/accordion/icons-badges' ? 'font-semibold' : ''
                            }`}
                            style={{
                              color: location.pathname === '/documentation/accordion/icons-badges'
                                ? theme.colors.dark.inverse
                                : theme.colors.gray[700],
                              backgroundColor: location.pathname === '/documentation/accordion/icons-badges'
                                ? theme.colors.dark.default
                                : 'transparent',
                            }}
                            onMouseEnter={(e) => {
                              if (location.pathname !== '/documentation/accordion/icons-badges') {
                                e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (location.pathname !== '/documentation/accordion/icons-badges') {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            Icons & Badges
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documentation/accordion/accordion-group"
                            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                              location.pathname === '/documentation/accordion/accordion-group' ? 'font-semibold' : ''
                            }`}
                            style={{
                              color: location.pathname === '/documentation/accordion/accordion-group'
                                ? theme.colors.dark.inverse
                                : theme.colors.gray[700],
                              backgroundColor: location.pathname === '/documentation/accordion/accordion-group'
                                ? theme.colors.dark.default
                                : 'transparent',
                            }}
                            onMouseEnter={(e) => {
                              if (location.pathname !== '/documentation/accordion/accordion-group') {
                                e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (location.pathname !== '/documentation/accordion/accordion-group') {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            Accordion Group
                          </Link>
                        </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Avatar submenu for Avatar page
              if (isAvatarItem && isAvatarPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="avatar-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={avatarMenuExpanded}
                      onToggle={(expanded) => setAvatarMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/avatar/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/avatar/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/avatar/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/avatar/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/avatar/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/avatar/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/avatar/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/avatar/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/avatar/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/avatar/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/avatar/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/avatar/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/avatar/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/avatar/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/avatar/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/avatar/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/avatar/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/avatar/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/avatar/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/avatar/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/avatar/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/avatar/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/avatar/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/avatar/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/avatar/shapes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/avatar/shapes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/avatar/shapes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/avatar/shapes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/avatar/shapes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/avatar/shapes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Shapes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/avatar/avatar-group"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/avatar/avatar-group' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/avatar/avatar-group'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/avatar/avatar-group'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/avatar/avatar-group') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/avatar/avatar-group') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Avatar Group
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Banner submenu for Banner page
              if (isBannerItem && isBannerPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="banner-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={bannerMenuExpanded}
                      onToggle={(expanded) => setBannerMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/banner/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/banner/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/banner/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/banner/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/banner/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/banner/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/banner/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/banner/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/banner/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/banner/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/banner/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/banner/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/banner/types"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/banner/types' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/banner/types'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/banner/types'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/banner/types') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/banner/types') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Types
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/banner/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/banner/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/banner/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/banner/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/banner/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/banner/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/banner/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/banner/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/banner/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/banner/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/banner/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/banner/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Toast submenu for Toast page
              if (isToastItem && isToastPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="toast-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={toastMenuExpanded}
                      onToggle={(expanded) => setToastMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/toast/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/toast/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/toast/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/toast/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/toast/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/toast/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/toast/types"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/toast/types' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/toast/types'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/toast/types'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/toast/types') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/toast/types') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Types
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/toast/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/toast/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/toast/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/toast/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/toast/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/toast/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/toast/toast-provider"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/toast/toast-provider' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/toast/toast-provider'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/toast/toast-provider'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/toast/toast-provider') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/toast/toast-provider') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              ToastProvider
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Button submenu for Button page
              if (isButtonItem && isButtonPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="button-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={buttonMenuExpanded}
                      onToggle={(expanded) => setButtonMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/button/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/button/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/button/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/button/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/button/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/button/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/button/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/button/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/button/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/button/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/button/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/button/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/button/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/button/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/button/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/button/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/button/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/button/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/button/shapes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/button/shapes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/button/shapes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/button/shapes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/button/shapes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/button/shapes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Shapes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/button/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/button/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/button/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/button/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/button/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/button/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/button/with-icons"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/button/with-icons' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/button/with-icons'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/button/with-icons'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/button/with-icons') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/button/with-icons') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              With Icons
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/button/icon-only"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/button/icon-only' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/button/icon-only'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/button/icon-only'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/button/icon-only') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/button/icon-only') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Icon Only
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render BottomNavigation submenu for BottomNavigation page
              if (isBottomNavigationItem && isBottomNavigationPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="bottom-navigation-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={bottomNavigationMenuExpanded}
                      onToggle={(expanded) => setBottomNavigationMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/bottom-navigation/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/bottom-navigation/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/bottom-navigation/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/bottom-navigation/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/bottom-navigation/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/bottom-navigation/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/bottom-navigation/with-badges"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/bottom-navigation/with-badges' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/bottom-navigation/with-badges'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/bottom-navigation/with-badges'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/bottom-navigation/with-badges') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/bottom-navigation/with-badges') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              With Badges
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/bottom-navigation/with-active-icons"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/bottom-navigation/with-active-icons' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/bottom-navigation/with-active-icons'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/bottom-navigation/with-active-icons'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/bottom-navigation/with-active-icons') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/bottom-navigation/with-active-icons') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              With Active Icons
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/bottom-navigation/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/bottom-navigation/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/bottom-navigation/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/bottom-navigation/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/bottom-navigation/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/bottom-navigation/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Breadcrumb submenu for Breadcrumb page
              if (isBreadcrumbItem && isBreadcrumbPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="breadcrumb-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={breadcrumbMenuExpanded}
                      onToggle={(expanded) => setBreadcrumbMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/breadcrumb/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/breadcrumb/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/breadcrumb/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/breadcrumb/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/breadcrumb/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/breadcrumb/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/breadcrumb/separators"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/breadcrumb/separators' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/breadcrumb/separators'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/breadcrumb/separators'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/breadcrumb/separators') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/breadcrumb/separators') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Separators
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/breadcrumb/with-icons"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/breadcrumb/with-icons' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/breadcrumb/with-icons'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/breadcrumb/with-icons'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/breadcrumb/with-icons') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/breadcrumb/with-icons') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              With Icons
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/breadcrumb/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/breadcrumb/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/breadcrumb/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/breadcrumb/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/breadcrumb/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/breadcrumb/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Carousel submenu for Carousel page
              if (isCarouselItem && isCarouselPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="carousel-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={carouselMenuExpanded}
                      onToggle={(expanded) => setCarouselMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/carousel/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/carousel/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/carousel/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/carousel/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/carousel/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/carousel/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/carousel/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/carousel/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/carousel/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/carousel/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/carousel/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/carousel/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/carousel/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/carousel/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/carousel/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/carousel/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/carousel/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/carousel/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Checkbox submenu for Checkbox page
              if (isCheckboxItem && isCheckboxPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="checkbox-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={checkboxMenuExpanded}
                      onToggle={(expanded) => setCheckboxMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/checkbox/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/checkbox/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/checkbox/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/checkbox/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/checkbox/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/checkbox/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/checkbox/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/checkbox/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/checkbox/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/checkbox/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/checkbox/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/checkbox/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/checkbox/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/checkbox/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/checkbox/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/checkbox/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/checkbox/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/checkbox/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/checkbox/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/checkbox/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/checkbox/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/checkbox/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/checkbox/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/checkbox/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Chips submenu for Chips page
              if (isChipsItem && isChipsPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="chips-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={chipsMenuExpanded}
                      onToggle={(expanded) => setChipsMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/chips/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/chips/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/chips/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/chips/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/chips/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/chips/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/chips/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/chips/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/chips/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/chips/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/chips/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/chips/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/chips/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/chips/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/chips/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/chips/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/chips/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/chips/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/chips/shapes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/chips/shapes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/chips/shapes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/chips/shapes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/chips/shapes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/chips/shapes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Shapes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/chips/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/chips/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/chips/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/chips/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/chips/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/chips/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/chips/with-icons"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/chips/with-icons' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/chips/with-icons'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/chips/with-icons'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/chips/with-icons') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/chips/with-icons') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              With Icons
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/chips/deletable"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/chips/deletable' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/chips/deletable'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/chips/deletable'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/chips/deletable') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/chips/deletable') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Deletable
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render DatePicker submenu for DatePicker page
              if (isDatePickerItem && isDatePickerPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="date-picker-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={datePickerMenuExpanded}
                      onToggle={(expanded) => setDatePickerMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/date-picker/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/date-picker/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/date-picker/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/date-picker/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/date-picker/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/date-picker/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/date-picker/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/date-picker/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/date-picker/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/date-picker/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/date-picker/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/date-picker/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/date-picker/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/date-picker/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/date-picker/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/date-picker/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/date-picker/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/date-picker/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/date-picker/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/date-picker/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/date-picker/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/date-picker/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/date-picker/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/date-picker/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/date-picker/formats"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/date-picker/formats' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/date-picker/formats'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/date-picker/formats'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/date-picker/formats') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/date-picker/formats') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Formats
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/date-picker/with-min-max"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/date-picker/with-min-max' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/date-picker/with-min-max'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/date-picker/with-min-max'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/date-picker/with-min-max') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/date-picker/with-min-max') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              With Min/Max
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Drawer submenu for Drawer page
              if (isDrawerItem && isDrawerPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="drawer-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={drawerMenuExpanded}
                      onToggle={(expanded) => setDrawerMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/drawer/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/drawer/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/drawer/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/drawer/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/drawer/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/drawer/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/drawer/positions"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/drawer/positions' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/drawer/positions'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/drawer/positions'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/drawer/positions') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/drawer/positions') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Positions
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/drawer/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/drawer/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/drawer/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/drawer/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/drawer/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/drawer/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/drawer/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/drawer/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/drawer/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/drawer/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/drawer/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/drawer/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/drawer/with-header-footer"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/drawer/with-header-footer' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/drawer/with-header-footer'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/drawer/with-header-footer'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/drawer/with-header-footer') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/drawer/with-header-footer') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              With Header & Footer
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render FloatingToolbar submenu for FloatingToolbar page
              if (isFloatingToolbarItem && isFloatingToolbarPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="floating-toolbar-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={floatingToolbarMenuExpanded}
                      onToggle={(expanded) => setFloatingToolbarMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/floating-toolbar/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/floating-toolbar/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/floating-toolbar/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/floating-toolbar/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/floating-toolbar/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/floating-toolbar/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/floating-toolbar/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/floating-toolbar/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/floating-toolbar/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/floating-toolbar/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/floating-toolbar/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/floating-toolbar/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/floating-toolbar/positions"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/floating-toolbar/positions' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/floating-toolbar/positions'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/floating-toolbar/positions'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/floating-toolbar/positions') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/floating-toolbar/positions') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Positions
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/floating-toolbar/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/floating-toolbar/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/floating-toolbar/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/floating-toolbar/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/floating-toolbar/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/floating-toolbar/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/floating-toolbar/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/floating-toolbar/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/floating-toolbar/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/floating-toolbar/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/floating-toolbar/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/floating-toolbar/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/floating-toolbar/with-actions"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/floating-toolbar/with-actions' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/floating-toolbar/with-actions'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/floating-toolbar/with-actions'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/floating-toolbar/with-actions') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/floating-toolbar/with-actions') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              With Actions
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Tag submenu for Tag page
              if (isTagItem && isTagPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="tag-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={tagMenuExpanded}
                      onToggle={(expanded) => setTagMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/tag/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/tag/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/tag/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/tag/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/tag/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/tag/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/tag/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/tag/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/tag/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/tag/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/tag/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/tag/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/tag/colors"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/tag/colors' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/tag/colors'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/tag/colors'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/tag/colors') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/tag/colors') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Colors
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/tag/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/tag/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/tag/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/tag/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/tag/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/tag/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/tag/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/tag/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/tag/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/tag/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/tag/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/tag/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Loader submenu for Loader page
              if (isLoaderItem && isLoaderPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="loader-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={loaderMenuExpanded}
                      onToggle={(expanded) => setLoaderMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/loader/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/loader/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/loader/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/loader/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/loader/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/loader/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/loader/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/loader/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/loader/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/loader/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/loader/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/loader/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/loader/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/loader/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/loader/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/loader/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/loader/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/loader/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/loader/colors"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/loader/colors' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/loader/colors'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/loader/colors'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/loader/colors') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/loader/colors') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Colors
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/loader/full-screen"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/loader/full-screen' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/loader/full-screen'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/loader/full-screen'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/loader/full-screen') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/loader/full-screen') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Full Screen
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Menu submenu for Menu page
              if (isMenuItem && isMenuPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="menu-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={menuMenuExpanded}
                      onToggle={(expanded) => setMenuMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/menu/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/menu/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/menu/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/menu/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/menu/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/menu/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/menu/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/menu/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/menu/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/menu/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/menu/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/menu/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/menu/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/menu/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/menu/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/menu/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/menu/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/menu/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/menu/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/menu/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/menu/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/menu/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/menu/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/menu/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Pagination submenu for Pagination page
              if (isPaginationItem && isPaginationPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="pagination-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={paginationMenuExpanded}
                      onToggle={(expanded) => setPaginationMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/pagination/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/pagination/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/pagination/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/pagination/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/pagination/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/pagination/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/pagination/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/pagination/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/pagination/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/pagination/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/pagination/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/pagination/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/pagination/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/pagination/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/pagination/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/pagination/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/pagination/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/pagination/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/pagination/options"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/pagination/options' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/pagination/options'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/pagination/options'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/pagination/options') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/pagination/options') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Options
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Progress submenu for Progress page
              if (isProgressItem && isProgressPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="progress-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={progressMenuExpanded}
                      onToggle={(expanded) => setProgressMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/progress/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/progress/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/progress/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/progress/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/progress/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/progress/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/progress/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/progress/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/progress/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/progress/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/progress/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/progress/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/progress/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/progress/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/progress/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/progress/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/progress/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/progress/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/progress/colors"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/progress/colors' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/progress/colors'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/progress/colors'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/progress/colors') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/progress/colors') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Colors
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Radio submenu for Radio page
              if (isRadioItem && isRadioPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="radio-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={radioMenuExpanded}
                      onToggle={(expanded) => setRadioMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/radio/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/radio/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/radio/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/radio/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/radio/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/radio/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/radio/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/radio/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/radio/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/radio/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/radio/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/radio/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/radio/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/radio/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/radio/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/radio/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/radio/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/radio/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/radio/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/radio/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/radio/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/radio/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/radio/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/radio/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Range submenu for Range page
              if (isRangeItem && isRangePage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="range-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={rangeMenuExpanded}
                      onToggle={(expanded) => setRangeMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/range/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/range/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/range/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/range/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/range/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/range/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/range/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/range/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/range/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/range/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/range/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/range/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/range/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/range/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/range/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/range/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/range/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/range/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/range/with-marks"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/range/with-marks' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/range/with-marks'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/range/with-marks'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/range/with-marks') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/range/with-marks') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              With Marks
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/range/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/range/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/range/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/range/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/range/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/range/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Search submenu for Search page
              if (isSearchItem && isSearchPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="search-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={searchMenuExpanded}
                      onToggle={(expanded) => setSearchMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/search/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/search/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/search/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/search/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/search/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/search/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/search/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/search/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/search/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/search/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/search/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/search/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/search/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/search/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/search/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/search/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/search/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/search/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/search/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/search/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/search/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/search/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/search/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/search/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/search/with-icons"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/search/with-icons' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/search/with-icons'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/search/with-icons'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/search/with-icons') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/search/with-icons') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              With Icons
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Segment Control submenu for Segment Control page
              if (isSegmentControlItem && isSegmentControlPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="segment-control-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={segmentControlMenuExpanded}
                      onToggle={(expanded) => setSegmentControlMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/segment-control/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/segment-control/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/segment-control/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/segment-control/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/segment-control/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/segment-control/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/segment-control/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/segment-control/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/segment-control/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/segment-control/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/segment-control/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/segment-control/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/segment-control/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/segment-control/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/segment-control/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/segment-control/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/segment-control/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/segment-control/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/segment-control/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/segment-control/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/segment-control/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/segment-control/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/segment-control/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/segment-control/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Multi Select Area submenu for Multi Select Area page
              if (isMultiSelectAreaItem && isMultiSelectAreaPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="multi-select-area-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={multiSelectAreaMenuExpanded}
                      onToggle={(expanded) => setMultiSelectAreaMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/multi-select-area/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/multi-select-area/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/multi-select-area/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/multi-select-area/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/multi-select-area/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/multi-select-area/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/multi-select-area/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/multi-select-area/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/multi-select-area/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/multi-select-area/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/multi-select-area/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/multi-select-area/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/multi-select-area/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/multi-select-area/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/multi-select-area/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/multi-select-area/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/multi-select-area/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/multi-select-area/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/multi-select-area/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/multi-select-area/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/multi-select-area/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/multi-select-area/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/multi-select-area/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/multi-select-area/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Snackbar submenu for Snackbar page
              if (isSnackbarItem && isSnackbarPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="snackbar-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={snackbarMenuExpanded}
                      onToggle={(expanded) => setSnackbarMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/snackbar/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/snackbar/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/snackbar/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/snackbar/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/snackbar/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/snackbar/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/snackbar/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/snackbar/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/snackbar/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/snackbar/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/snackbar/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/snackbar/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/snackbar/positions"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/snackbar/positions' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/snackbar/positions'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/snackbar/positions'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/snackbar/positions') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/snackbar/positions') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Positions
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/snackbar/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/snackbar/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/snackbar/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/snackbar/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/snackbar/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/snackbar/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/snackbar/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/snackbar/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/snackbar/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/snackbar/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/snackbar/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/snackbar/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Switch submenu for Switch page
              if (isSwitchItem && isSwitchPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="switch-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={switchMenuExpanded}
                      onToggle={(expanded) => setSwitchMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/switch/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/switch/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/switch/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/switch/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/switch/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/switch/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/switch/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/switch/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/switch/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/switch/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/switch/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/switch/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/switch/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/switch/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/switch/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/switch/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/switch/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/switch/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/switch/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/switch/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/switch/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/switch/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/switch/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/switch/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Tabs submenu for Tabs page
              if (isTabsItem && isTabsPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="tabs-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={tabsMenuExpanded}
                      onToggle={(expanded) => setTabsMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/tabs/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/tabs/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/tabs/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/tabs/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/tabs/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/tabs/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/tabs/variants"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/tabs/variants' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/tabs/variants'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/tabs/variants'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/tabs/variants') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/tabs/variants') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Variants
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/tabs/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/tabs/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/tabs/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/tabs/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/tabs/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/tabs/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/tabs/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/tabs/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/tabs/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/tabs/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/tabs/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/tabs/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Render Tooltip submenu for Tooltip page
              if (isTooltipItem && isTooltipPage) {
                return (
                  <li key={item.id} className="mb-2">
                    <AccordionItem
                      id="tooltip-submenu"
                      title={item.title}
                      icon={item.icon}
                      expanded={tooltipMenuExpanded}
                      onToggle={(expanded) => setTooltipMenuExpanded(expanded)}
                      variant="ghost"
                      size="sm"
                      className="mb-2"
                    >
                      <div 
                        className="relative pl-4 ml-2"
                        style={{
                          borderLeft: `1px solid ${theme.colors.gray[300]}`,
                        }}
                      >
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/documentation/tooltip/basic-examples"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/tooltip/basic-examples' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/tooltip/basic-examples'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/tooltip/basic-examples'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/tooltip/basic-examples') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/tooltip/basic-examples') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Basic Examples
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/tooltip/positions"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/tooltip/positions' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/tooltip/positions'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/tooltip/positions'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/tooltip/positions') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/tooltip/positions') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Positions
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/tooltip/sizes"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/tooltip/sizes' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/tooltip/sizes'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/tooltip/sizes'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/tooltip/sizes') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/tooltip/sizes') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Sizes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/documentation/tooltip/states"
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === '/documentation/tooltip/states' ? 'font-semibold' : ''
                              }`}
                              style={{
                                color: location.pathname === '/documentation/tooltip/states'
                                  ? theme.colors.dark.inverse
                                  : theme.colors.gray[700],
                                backgroundColor: location.pathname === '/documentation/tooltip/states'
                                  ? theme.colors.dark.default
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== '/documentation/tooltip/states') {
                                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== '/documentation/tooltip/states') {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              States
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </AccordionItem>
                  </li>
                );
              }
              
              // Regular menu item
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      active ? 'font-semibold' : 'font-medium'
                    }`}
                    style={{
                      color: active ? theme.colors.dark.inverse : theme.colors.gray[700],
                      backgroundColor: active ? theme.colors.dark.default : 'transparent',
                    }}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span style={{ color: active ? theme.colors.dark.inverse : 'inherit' }}>
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: theme.colors.success.default,
                          color: theme.colors.success.inverse,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    {hasSubmenu(item.id) && !isAccordionPage && !isAvatarPage && !isBannerPage && !isToastPage && !isButtonPage && !isBottomNavigationPage && !isBreadcrumbPage && !isCarouselPage && !isCheckboxPage && !isChipsPage && !isDatePickerPage && !isDrawerPage && !isFloatingToolbarPage && !isTagPage && !isLoaderPage && !isMenuPage && !isPaginationPage && !isProgressPage && !isRadioPage && (
                      <svg
                        className="w-4 h-4 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: theme.colors.gray[500] }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="px-4 py-4 border-t" style={{ borderColor: theme.colors.gray[300] }}>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-center"
            style={{ 
              backgroundColor: theme.colors.dark.default,
              color: theme.colors.dark.inverse,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.dark.active;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.dark.default;
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DocumentationSidebar;
