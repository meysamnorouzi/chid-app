/**
 * Documentation Header Component
 * 
 * Header component for documentation section with search, notifications, and user profile
 * Designed with SEO, security, and modular structure in mind
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useDocumentationTheme } from '../../theme';
import { useDocumentationMode } from '../../theme/DocumentationModeContext';
import { profileService } from '../../api';
import type { Profile } from '../../api/types';
import ThemeToggle from './ThemeToggle';
import { Search } from '../shared/Search';
import { SegmentControl } from '../shared';
import { getIcons, formatIconName } from '../../utils/iconUtils';
import '../../icon/font/style.css';

interface ComponentItem {
  name: string;
  path: string;
  category: string;
  iconInfo?: {
    unicode: string;
    baseName: string;
  };
  colorInfo?: {
    value: string;
    path: string;
  };
}

interface ColorInfo {
  name: string;
  value: string;
  path: string;
}

const COMPONENTS_LIST: ComponentItem[] = [
  // Accordion
  { name: 'Accordion Basic Examples', path: '/documentation/accordion/basic-examples', category: 'Accordion' },
  { name: 'Accordion Variants', path: '/documentation/accordion/variants', category: 'Accordion' },
  { name: 'Accordion States', path: '/documentation/accordion/states', category: 'Accordion' },
  { name: 'Accordion Sizes', path: '/documentation/accordion/sizes', category: 'Accordion' },
  { name: 'Accordion Icons Badges', path: '/documentation/accordion/icons-badges', category: 'Accordion' },
  { name: 'Accordion Group', path: '/documentation/accordion/accordion-group', category: 'Accordion' },
  
  // Avatar
  { name: 'Avatar Basic Examples', path: '/documentation/avatar/basic-examples', category: 'Avatar' },
  { name: 'Avatar Variants', path: '/documentation/avatar/variants', category: 'Avatar' },
  { name: 'Avatar States', path: '/documentation/avatar/states', category: 'Avatar' },
  { name: 'Avatar Sizes', path: '/documentation/avatar/sizes', category: 'Avatar' },
  { name: 'Avatar Shapes', path: '/documentation/avatar/shapes', category: 'Avatar' },
  { name: 'Avatar Group', path: '/documentation/avatar/avatar-group', category: 'Avatar' },
  
  // Banner
  { name: 'Banner Basic Examples', path: '/documentation/banner/basic-examples', category: 'Banner' },
  { name: 'Banner Variants', path: '/documentation/banner/variants', category: 'Banner' },
  { name: 'Banner Types', path: '/documentation/banner/types', category: 'Banner' },
  { name: 'Banner States', path: '/documentation/banner/states', category: 'Banner' },
  { name: 'Banner Sizes', path: '/documentation/banner/sizes', category: 'Banner' },
  
  // Button
  { name: 'Button Basic Examples', path: '/documentation/button/basic-examples', category: 'Button' },
  { name: 'Button Variants', path: '/documentation/button/variants', category: 'Button' },
  { name: 'Button Sizes', path: '/documentation/button/sizes', category: 'Button' },
  { name: 'Button Shapes', path: '/documentation/button/shapes', category: 'Button' },
  { name: 'Button States', path: '/documentation/button/states', category: 'Button' },
  { name: 'Button With Icons', path: '/documentation/button/with-icons', category: 'Button' },
  
  // Bottom Navigation
  { name: 'Bottom Navigation Basic Examples', path: '/documentation/bottom-navigation/basic-examples', category: 'Bottom Navigation' },
  { name: 'Bottom Navigation With Badges', path: '/documentation/bottom-navigation/with-badges', category: 'Bottom Navigation' },
  { name: 'Bottom Navigation With Active Icons', path: '/documentation/bottom-navigation/with-active-icons', category: 'Bottom Navigation' },
  { name: 'Bottom Navigation States', path: '/documentation/bottom-navigation/states', category: 'Bottom Navigation' },
  
  // Breadcrumb
  { name: 'Breadcrumb Basic Examples', path: '/documentation/breadcrumb/basic-examples', category: 'Breadcrumb' },
  { name: 'Breadcrumb Separators', path: '/documentation/breadcrumb/separators', category: 'Breadcrumb' },
  { name: 'Breadcrumb With Icons', path: '/documentation/breadcrumb/with-icons', category: 'Breadcrumb' },
  { name: 'Breadcrumb States', path: '/documentation/breadcrumb/states', category: 'Breadcrumb' },
  
  // Carousel
  { name: 'Carousel Basic Examples', path: '/documentation/carousel/basic-examples', category: 'Carousel' },
  { name: 'Carousel Variants', path: '/documentation/carousel/variants', category: 'Carousel' },
  { name: 'Carousel States', path: '/documentation/carousel/states', category: 'Carousel' },
  
  // Checkbox
  { name: 'Checkbox Basic Examples', path: '/documentation/checkbox/basic-examples', category: 'Checkbox' },
  { name: 'Checkbox Variants', path: '/documentation/checkbox/variants', category: 'Checkbox' },
  { name: 'Checkbox Sizes', path: '/documentation/checkbox/sizes', category: 'Checkbox' },
  { name: 'Checkbox States', path: '/documentation/checkbox/states', category: 'Checkbox' },
  
  // Chips
  { name: 'Chips Basic Examples', path: '/documentation/chips/basic-examples', category: 'Chips' },
  { name: 'Chips Variants', path: '/documentation/chips/variants', category: 'Chips' },
  { name: 'Chips Sizes', path: '/documentation/chips/sizes', category: 'Chips' },
  { name: 'Chips Shapes', path: '/documentation/chips/shapes', category: 'Chips' },
  { name: 'Chips States', path: '/documentation/chips/states', category: 'Chips' },
  { name: 'Chips With Icons', path: '/documentation/chips/with-icons', category: 'Chips' },
  { name: 'Chips Deletable', path: '/documentation/chips/deletable', category: 'Chips' },
  
  // Date Picker
  { name: 'Date Picker Basic Examples', path: '/documentation/date-picker/basic-examples', category: 'Date Picker' },
  { name: 'Date Picker Variants', path: '/documentation/date-picker/variants', category: 'Date Picker' },
  { name: 'Date Picker Sizes', path: '/documentation/date-picker/sizes', category: 'Date Picker' },
  { name: 'Date Picker States', path: '/documentation/date-picker/states', category: 'Date Picker' },
  { name: 'Date Picker Formats', path: '/documentation/date-picker/formats', category: 'Date Picker' },
  { name: 'Date Picker With Min Max', path: '/documentation/date-picker/with-min-max', category: 'Date Picker' },
  
  // Drawer
  { name: 'Drawer Basic Examples', path: '/documentation/drawer/basic-examples', category: 'Drawer' },
  { name: 'Drawer Positions', path: '/documentation/drawer/positions', category: 'Drawer' },
  { name: 'Drawer Sizes', path: '/documentation/drawer/sizes', category: 'Drawer' },
  { name: 'Drawer States', path: '/documentation/drawer/states', category: 'Drawer' },
  { name: 'Drawer With Header Footer', path: '/documentation/drawer/with-header-footer', category: 'Drawer' },
  
  // Floating Toolbar
  { name: 'Floating Toolbar Basic Examples', path: '/documentation/floating-toolbar/basic-examples', category: 'Floating Toolbar' },
  { name: 'Floating Toolbar Variants', path: '/documentation/floating-toolbar/variants', category: 'Floating Toolbar' },
  { name: 'Floating Toolbar Positions', path: '/documentation/floating-toolbar/positions', category: 'Floating Toolbar' },
  { name: 'Floating Toolbar Sizes', path: '/documentation/floating-toolbar/sizes', category: 'Floating Toolbar' },
  { name: 'Floating Toolbar States', path: '/documentation/floating-toolbar/states', category: 'Floating Toolbar' },
  { name: 'Floating Toolbar With Actions', path: '/documentation/floating-toolbar/with-actions', category: 'Floating Toolbar' },
  
  // Tag
  { name: 'Tag Basic Examples', path: '/documentation/tag/basic-examples', category: 'Tag' },
  { name: 'Tag Variants', path: '/documentation/tag/variants', category: 'Tag' },
  { name: 'Tag Colors', path: '/documentation/tag/colors', category: 'Tag' },
  { name: 'Tag Sizes', path: '/documentation/tag/sizes', category: 'Tag' },
  { name: 'Tag States', path: '/documentation/tag/states', category: 'Tag' },
  
  // Loader
  { name: 'Loader Basic Examples', path: '/documentation/loader/basic-examples', category: 'Loader' },
  { name: 'Loader Variants', path: '/documentation/loader/variants', category: 'Loader' },
  { name: 'Loader Sizes', path: '/documentation/loader/sizes', category: 'Loader' },
  { name: 'Loader Colors', path: '/documentation/loader/colors', category: 'Loader' },
  { name: 'Loader Full Screen', path: '/documentation/loader/full-screen', category: 'Loader' },
  
  // Menu
  { name: 'Menu Basic Examples', path: '/documentation/menu/basic-examples', category: 'Menu' },
  { name: 'Menu Variants', path: '/documentation/menu/variants', category: 'Menu' },
  { name: 'Menu Sizes', path: '/documentation/menu/sizes', category: 'Menu' },
  { name: 'Menu States', path: '/documentation/menu/states', category: 'Menu' },
  
  // Pagination
  { name: 'Pagination Basic Examples', path: '/documentation/pagination/basic-examples', category: 'Pagination' },
  { name: 'Pagination Variants', path: '/documentation/pagination/variants', category: 'Pagination' },
  { name: 'Pagination Sizes', path: '/documentation/pagination/sizes', category: 'Pagination' },
  { name: 'Pagination Options', path: '/documentation/pagination/options', category: 'Pagination' },
  
  // Progress
  { name: 'Progress Basic Examples', path: '/documentation/progress/basic-examples', category: 'Progress' },
  { name: 'Progress Variants', path: '/documentation/progress/variants', category: 'Progress' },
  { name: 'Progress Sizes', path: '/documentation/progress/sizes', category: 'Progress' },
  { name: 'Progress Colors', path: '/documentation/progress/colors', category: 'Progress' },
  
  // Radio
  { name: 'Radio Basic Examples', path: '/documentation/radio/basic-examples', category: 'Radio' },
  { name: 'Radio Variants', path: '/documentation/radio/variants', category: 'Radio' },
  { name: 'Radio Sizes', path: '/documentation/radio/sizes', category: 'Radio' },
  { name: 'Radio States', path: '/documentation/radio/states', category: 'Radio' },
  
  // Range
  { name: 'Range Basic Examples', path: '/documentation/range/basic-examples', category: 'Range' },
  { name: 'Range Variants', path: '/documentation/range/variants', category: 'Range' },
  { name: 'Range Sizes', path: '/documentation/range/sizes', category: 'Range' },
  { name: 'Range With Marks', path: '/documentation/range/with-marks', category: 'Range' },
  { name: 'Range States', path: '/documentation/range/states', category: 'Range' },
  
  // Search
  { name: 'Search Basic Examples', path: '/documentation/search/basic-examples', category: 'Search' },
  { name: 'Search Variants', path: '/documentation/search/variants', category: 'Search' },
  { name: 'Search Sizes', path: '/documentation/search/sizes', category: 'Search' },
  { name: 'Search States', path: '/documentation/search/states', category: 'Search' },
  { name: 'Search With Icons', path: '/documentation/search/with-icons', category: 'Search' },
  
  // Segment Control
  { name: 'Segment Control Basic Examples', path: '/documentation/segment-control/basic-examples', category: 'Segment Control' },
  { name: 'Segment Control Variants', path: '/documentation/segment-control/variants', category: 'Segment Control' },
  { name: 'Segment Control Sizes', path: '/documentation/segment-control/sizes', category: 'Segment Control' },
  { name: 'Segment Control States', path: '/documentation/segment-control/states', category: 'Segment Control' },
  
  // Multi Select Area
  { name: 'Multi Select Area Basic Examples', path: '/documentation/multi-select-area/basic-examples', category: 'Multi Select Area' },
  { name: 'Multi Select Area Variants', path: '/documentation/multi-select-area/variants', category: 'Multi Select Area' },
  { name: 'Multi Select Area Sizes', path: '/documentation/multi-select-area/sizes', category: 'Multi Select Area' },
  { name: 'Multi Select Area States', path: '/documentation/multi-select-area/states', category: 'Multi Select Area' },
  
  // Snackbar
  { name: 'Snackbar Basic Examples', path: '/documentation/snackbar/basic-examples', category: 'Snackbar' },
  { name: 'Snackbar Variants', path: '/documentation/snackbar/variants', category: 'Snackbar' },
  { name: 'Snackbar Positions', path: '/documentation/snackbar/positions', category: 'Snackbar' },
  { name: 'Snackbar Sizes', path: '/documentation/snackbar/sizes', category: 'Snackbar' },
  { name: 'Snackbar States', path: '/documentation/snackbar/states', category: 'Snackbar' },
  
  // Switch
  { name: 'Switch Basic Examples', path: '/documentation/switch/basic-examples', category: 'Switch' },
  { name: 'Switch Variants', path: '/documentation/switch/variants', category: 'Switch' },
  { name: 'Switch Sizes', path: '/documentation/switch/sizes', category: 'Switch' },
  { name: 'Switch States', path: '/documentation/switch/states', category: 'Switch' },
  
  // Tabs
  { name: 'Tabs Basic Examples', path: '/documentation/tabs/basic-examples', category: 'Tabs' },
  { name: 'Tabs Variants', path: '/documentation/tabs/variants', category: 'Tabs' },
  { name: 'Tabs Sizes', path: '/documentation/tabs/sizes', category: 'Tabs' },
  { name: 'Tabs States', path: '/documentation/tabs/states', category: 'Tabs' },
  
  // Toast
  { name: 'Toast Basic Examples', path: '/documentation/toast/basic-examples', category: 'Toast' },
  { name: 'Toast Types', path: '/documentation/toast/types', category: 'Toast' },
  { name: 'Toast States', path: '/documentation/toast/states', category: 'Toast' },
  { name: 'Toast Provider', path: '/documentation/toast/toast-provider', category: 'Toast' },
  
  // Tooltip
  { name: 'Tooltip Basic Examples', path: '/documentation/tooltip/basic-examples', category: 'Tooltip' },
  { name: 'Tooltip Positions', path: '/documentation/tooltip/positions', category: 'Tooltip' },
  { name: 'Tooltip Sizes', path: '/documentation/tooltip/sizes', category: 'Tooltip' },
  { name: 'Tooltip States', path: '/documentation/tooltip/states', category: 'Tooltip' },
];

const CONFIG_LIST: ComponentItem[] = [
  { name: 'Icon', path: '/documentation/config/icon', category: 'Config' },
  { name: 'Colors', path: '/documentation/config/colors', category: 'Config' },
];

const Header = () => {
  const { theme, toggleTheme } = useDocumentationTheme();
  const { mode, setMode } = useDocumentationMode();
  const navigate = useNavigate();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchMode, setSearchMode] = useState<'components' | 'config'>('components');
  const [configFilter, setConfigFilter] = useState<'all' | 'icons' | 'colors' | 'icons-colors'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState<{ baseName: string; icons: typeof allIcons[0][] } | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorInfo | null>(null);
  const [userData, setUserData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Get all icons for config search
  const allIcons = useMemo(() => getIcons(), []);

  // Group icons by base name for detail view
  const iconGroups = useMemo(() => {
    const groups: { [key: string]: typeof allIcons[0][] } = {};
    allIcons.forEach(icon => {
      const baseName = icon.name.replace(/TypestrokeSize\d+px/gi, '');
      if (!groups[baseName]) {
        groups[baseName] = [];
      }
      groups[baseName].push(icon);
    });
    return groups;
  }, [allIcons]);

  // Extract all colors from theme
  const allColors = useMemo(() => {
    const colorGroups = [
      {
        name: 'Gray Scale',
        colors: Object.entries(theme.colors.gray).map(([key, value]) => ({
          name: `gray.${key}`,
          value,
          path: `theme.colors.gray.${key}`,
        })),
      },
      {
        name: 'Primary',
        colors: Object.entries(theme.colors.primary).map(([key, value]) => ({
          name: `primary.${key}`,
          value,
          path: `theme.colors.primary.${key}`,
        })),
      },
      {
        name: 'Success',
        colors: Object.entries(theme.colors.success).map(([key, value]) => ({
          name: `success.${key}`,
          value,
          path: `theme.colors.success.${key}`,
        })),
      },
      {
        name: 'Warning',
        colors: Object.entries(theme.colors.warning).map(([key, value]) => ({
          name: `warning.${key}`,
          value,
          path: `theme.colors.warning.${key}`,
        })),
      },
      {
        name: 'Danger',
        colors: Object.entries(theme.colors.danger).map(([key, value]) => ({
          name: `danger.${key}`,
          value,
          path: `theme.colors.danger.${key}`,
        })),
      },
      {
        name: 'Info',
        colors: Object.entries(theme.colors.info).map(([key, value]) => ({
          name: `info.${key}`,
          value,
          path: `theme.colors.info.${key}`,
        })),
      },
      {
        name: 'Dark',
        colors: Object.entries(theme.colors.dark).map(([key, value]) => ({
          name: `dark.${key}`,
          value,
          path: `theme.colors.dark.${key}`,
        })),
      },
      {
        name: 'Secondary',
        colors: Object.entries(theme.colors.secondary).map(([key, value]) => ({
          name: `secondary.${key}`,
          value,
          path: `theme.colors.secondary.${key}`,
        })),
      },
      {
        name: 'Light',
        colors: Object.entries(theme.colors.light).map(([key, value]) => ({
          name: `light.${key}`,
          value,
          path: `theme.colors.light.${key}`,
        })),
      },
      {
        name: 'Brand',
        colors: Object.entries(theme.colors.brand).map(([key, value]) => ({
          name: `brand.${key}`,
          value,
          path: `theme.colors.brand.${key}`,
        })),
      },
    ];
    
    return colorGroups.flatMap(group => group.colors);
  }, [theme]);

  // Helper to determine if color is light or dark
  const isLightColor = useCallback((color: string): boolean => {
    const rgbMatch = color.match(/\d+/g);
    if (!rgbMatch) return false;
    
    const r = parseInt(rgbMatch[0] || '0');
    const g = parseInt(rgbMatch[1] || '0');
    const b = parseInt(rgbMatch[2] || '0');
    
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  }, []);

  // Create config list with icons and colors when in config mode
  const configListWithIcons = useMemo(() => {
    const baseConfigList = [...CONFIG_LIST];
    const iconItems: ComponentItem[] = [];
    const colorItems: ComponentItem[] = [];
    
    // Group icons by base name (remove size suffix)
    const iconGroups: { [key: string]: typeof allIcons[0][] } = {};
    allIcons.forEach(icon => {
      const baseName = icon.name.replace(/TypestrokeSize\d+px/gi, '');
      if (!iconGroups[baseName]) {
        iconGroups[baseName] = [];
      }
      iconGroups[baseName].push(icon);
    });

    // Add grouped icons to icon items list
    Object.keys(iconGroups).forEach(baseName => {
      const displayName = formatIconName(baseName);
      const mainIcon = iconGroups[baseName][0]; // Use first icon as main
      iconItems.push({
        name: displayName,
        path: '/documentation/config/icon',
        category: 'Icon',
        iconInfo: {
          unicode: mainIcon.unicode,
          baseName: baseName,
        },
      });
    });

    // Add colors to color items list
    allColors.forEach(color => {
      colorItems.push({
        name: color.name,
        path: '/documentation/config/colors',
        category: 'Color',
        colorInfo: {
          value: color.value,
          path: color.path,
        },
      });
    });

    // Icons first, then colors, then other config items
    return [...iconItems, ...colorItems, ...baseConfigList];
  }, [allIcons, allColors]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await profileService.getProfile();
        if (response.success && response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        (e.target instanceof HTMLInputElement) ||
        (e.target instanceof HTMLTextAreaElement) ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) {
        return;
      }

      // Check for Ctrl+K (Windows/Linux) or Cmd+K (Mac) to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k' && !e.altKey && !e.shiftKey) {
        e.preventDefault();
        setIsSearchModalOpen(true);
        return;
      }
      
      // Check for Alt+Ctrl+T (Windows/Linux) or Option+Cmd+T (Mac) to toggle theme
      if ((e.ctrlKey || e.metaKey) && e.altKey && (e.key === 't' || e.key === 'T')) {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [toggleTheme]);

  // Lock body scroll when modal is open and sync search mode with current mode
  useEffect(() => {
    if (isSearchModalOpen) {
      document.body.style.overflow = 'hidden';
      // Sync search mode with current mode when modal opens
      setSearchMode(mode);
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isSearchModalOpen, mode]);

  // Filter components/config based on search value and mode
  const filteredComponents = useMemo(() => {
    if (!searchValue.trim()) {
      return [];
    }
    
    const query = searchValue.toLowerCase().trim();
    const listToSearch = searchMode === 'components' ? COMPONENTS_LIST : configListWithIcons;
    
    let filtered = listToSearch.filter((item) =>
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.path.toLowerCase().includes(query)
    );

    // Apply config filter
    if (searchMode === 'config') {
      if (configFilter === 'icons') {
        filtered = filtered.filter(item => item.iconInfo !== undefined);
      } else if (configFilter === 'colors') {
        filtered = filtered.filter(item => item.colorInfo !== undefined);
      } else if (configFilter === 'icons-colors') {
        filtered = filtered.filter(item => item.iconInfo !== undefined || item.colorInfo !== undefined);
      }
      // 'all' shows everything, no filtering needed

      // Sort: icons first, then colors, then other items
      return filtered.sort((a, b) => {
        const aIsIcon = a.iconInfo !== undefined;
        const bIsIcon = b.iconInfo !== undefined;
        const aIsColor = a.colorInfo !== undefined;
        const bIsColor = b.colorInfo !== undefined;
        
        if (aIsIcon && !bIsIcon && !bIsColor) return -1;
        if (!aIsIcon && !aIsColor && bIsIcon) return 1;
        if (aIsColor && !bIsColor && !bIsIcon) return -1;
        if (!aIsColor && !aIsIcon && bIsColor) return 1;
        return 0;
      });
    }

    return filtered;
  }, [searchValue, searchMode, configListWithIcons, configFilter]);

  // Group filtered results for config mode
  const groupedResults = useMemo(() => {
    if (searchMode !== 'config') {
      return { icons: [], colors: [], more: filteredComponents };
    }

    const icons: ComponentItem[] = [];
    const colors: ComponentItem[] = [];
    const more: ComponentItem[] = [];

    filteredComponents.forEach((item) => {
      if (item.iconInfo) {
        icons.push(item);
      } else if (item.colorInfo) {
        colors.push(item);
      } else {
        more.push(item);
      }
    });

    return { icons, colors, more };
  }, [filteredComponents, searchMode]);

  // Reset selected index when search changes, mode changes, or filter changes
  useEffect(() => {
    setSelectedIndex(0);
    setSelectedIcon(null);
    setSelectedColor(null);
  }, [searchValue, searchMode, configFilter]);

  const handleComponentClick = useCallback((path: string, component?: ComponentItem, index?: number) => {
    // If it's an icon, show detail box instead of navigating
    if (component?.iconInfo && searchMode === 'config') {
      const baseName = component.iconInfo.baseName;
      if (iconGroups[baseName]) {
        setSelectedIcon({ baseName, icons: iconGroups[baseName] });
        setSelectedColor(null); // Clear color selection
        // Set selected index to keep the icon highlighted
        if (index !== undefined) {
          setSelectedIndex(index);
        }
      }
      return;
    }

    // If it's a color, show detail box instead of navigating
    if (component?.colorInfo && searchMode === 'config') {
      setSelectedColor({
        name: component.name,
        value: component.colorInfo.value,
        path: component.colorInfo.path,
      });
      setSelectedIcon(null); // Clear icon selection
      // Set selected index to keep the color highlighted
      if (index !== undefined) {
        setSelectedIndex(index);
      }
      return;
    }
    
    navigate(path);
    setIsSearchModalOpen(false);
    setSearchValue('');
    setSelectedIcon(null);
    setSelectedColor(null);
  }, [navigate, searchMode, iconGroups]);

  // Get flat list for keyboard navigation
  const flatFilteredList = useMemo(() => {
    if (searchMode === 'config') {
      return [...groupedResults.icons, ...groupedResults.colors, ...groupedResults.more];
    }
    return filteredComponents;
  }, [searchMode, groupedResults, filteredComponents]);

  // Handle keyboard navigation and escape
  useEffect(() => {
    if (!isSearchModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsSearchModalOpen(false);
        setSearchValue('');
        return;
      }

      if (flatFilteredList.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % flatFilteredList.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + flatFilteredList.length) % flatFilteredList.length);
      } else if (e.key === 'Enter' && flatFilteredList[selectedIndex]) {
        e.preventDefault();
        handleComponentClick(flatFilteredList[selectedIndex].path, flatFilteredList[selectedIndex], selectedIndex);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, flatFilteredList, selectedIndex, handleComponentClick]);

  const handleSearchSubmit = (value: string) => {
    if (flatFilteredList.length > 0 && flatFilteredList[selectedIndex]) {
      handleComponentClick(flatFilteredList[selectedIndex].path, flatFilteredList[selectedIndex], selectedIndex);
    }
  };

  // Render a single icon item (for icons grid)
  const renderIconItem = useCallback((component: ComponentItem, globalIndex: number) => {
    const isSelected = globalIndex === selectedIndex;
    return (
      <button
        key={`${component.path}-${globalIndex}`}
        onClick={() => handleComponentClick(component.path, component, globalIndex)}
        className="rounded-lg transition-all flex flex-col items-center justify-center gap-2 p-2"
        style={{
          backgroundColor: isSelected 
            ? theme.colors.primary.clarity 
            : 'transparent',
          border: `2px solid ${isSelected ? theme.colors.primary.default : 'transparent'}`,
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = theme.colors.gray[100];
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        {component.iconInfo && (
          <div 
            className="w-full aspect-square rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: theme.colors.gray[100],
              border: `1px solid ${theme.colors.gray[300]}`,
            }}
          >
            <span 
              className="icon text-3xl"
              style={{ 
                fontFamily: 'Untitled',
                color: isSelected ? theme.colors.primary.default : theme.colors.gray[900],
              }}
            >
              {component.iconInfo.unicode}
            </span>
          </div>
        )}
        <p 
          className="text-xs text-center truncate w-full"
          style={{ 
            color: isSelected 
              ? theme.colors.primary.default 
              : theme.colors.gray[600] 
          }}
          title={component.name}
        >
          {component.name}
        </p>
      </button>
    );
  }, [selectedIndex, theme, handleComponentClick]);

  // Render a single color item (for colors grid)
  const renderColorItem = useCallback((component: ComponentItem, globalIndex: number) => {
    const isSelected = globalIndex === selectedIndex;
    
    return (
      <button
        key={`${component.path}-${globalIndex}`}
        onClick={() => handleComponentClick(component.path, component, globalIndex)}
        className="rounded-lg transition-all flex flex-col items-center justify-center gap-2 p-2"
        style={{
          backgroundColor: isSelected 
            ? theme.colors.primary.clarity 
            : 'transparent',
          border: `2px solid ${isSelected ? theme.colors.primary.default : 'transparent'}`,
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = theme.colors.gray[100];
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        {component.colorInfo && (
          <div 
            className="w-full aspect-square rounded-lg border"
            style={{
              backgroundColor: component.colorInfo.value,
              borderColor: theme.colors.gray[300],
            }}
          />
        )}
        <p 
          className="text-xs text-center truncate w-full"
          style={{ 
            color: isSelected 
              ? theme.colors.primary.default 
              : theme.colors.gray[600] 
          }}
          title={component.name}
        >
          {component.name}
        </p>
      </button>
    );
  }, [selectedIndex, theme, handleComponentClick]);

  // Render a single result item (for non-icon items)
  const renderResultItem = useCallback((component: ComponentItem, globalIndex: number) => {
    const isSelected = globalIndex === selectedIndex;
    return (
      <button
        key={`${component.path}-${globalIndex}`}
        onClick={() => handleComponentClick(component.path)}
        className="w-full text-left px-4 py-3 rounded-lg transition-all"
        style={{
          backgroundColor: isSelected 
            ? theme.colors.primary.clarity 
            : 'transparent',
          border: `1px solid ${isSelected ? theme.colors.primary.default : 'transparent'}`,
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = theme.colors.gray[100];
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <div 
                  className="font-medium truncate flex-1"
                  style={{ 
                    color: isSelected 
                      ? theme.colors.primary.default 
                      : (theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.dark.default)
                  }}
                >
                  {component.name}
                </div>
                <span
                  className="px-2 py-0.5 rounded-md text-xs font-medium shrink-0"
                  style={{
                    backgroundColor: isSelected 
                      ? theme.colors.primary.default 
                      : theme.colors.primary.clarity,
                    color: isSelected 
                      ? theme.background.card 
                      : theme.colors.primary.default,
                  }}
                >
                  {component.category}
                </span>
              </div>
              <div 
                className="text-xs truncate flex items-center gap-1"
                style={{ color: theme.colors.gray[500] }}
              >
                <svg 
                  className="w-3 h-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="truncate">{component.path}</span>
              </div>
            </div>
          </div>
          <svg 
            className="w-4 h-4 shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ color: theme.colors.gray[400] }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    );
  }, [selectedIndex, theme, handleComponentClick]);

  return (
    <header
      className="py-4 flex items-center justify-between px-6 rounded-xl border z-50"
      style={{
        backgroundColor: theme.background.card,
        borderColor: theme.colors.gray[300],
      }}
      role="banner"
    >
      {/* Mode Selector */}
      <div className="flex items-center gap-4">
        <SegmentControl
          items={[
            { 
              value: 'components', 
              label: 'Components',
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              )
            },
            { 
              value: 'config', 
              label: 'Config',
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )
            },
          ]}
          value={mode}
          onChange={(value) => setMode(value as 'components' | 'config')}
          size="md"
          variant="filled"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
      {/* Search Icon Button */}
      <button
        onClick={() => setIsSearchModalOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
        style={{
          border: `1px solid ${theme.colors.gray[300]}`,
          color: theme.colors.gray[600],
          backgroundColor: theme.background.body,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme.colors.gray[200];
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = theme.background.body;
        }}
        aria-label="Search"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <kbd
          className="px-1.5 py-0.5 text-xs font-medium rounded"
          style={{
            backgroundColor: theme.colors.gray[200],
            color: theme.colors.gray[700],
            border: `1px solid ${theme.colors.gray[300]}`,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {navigator.platform.toLowerCase().includes('mac') ? '⌘K' : 'Ctrl+K'}
        </kbd>
      </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Profile */}
        {loading ? (
          <div className="flex items-center gap-3 pl-4 border-l" style={{ borderColor: theme.colors.gray[300] }}>
            <div className="w-10 h-10 rounded-full animate-pulse" style={{ backgroundColor: theme.colors.gray[200] }} aria-label="Loading profile" />
            <div className="flex flex-col gap-1">
              <div className="w-24 h-4 rounded animate-pulse" style={{ backgroundColor: theme.colors.gray[200] }} />
              <div className="w-32 h-3 rounded animate-pulse" style={{ backgroundColor: theme.colors.gray[200] }} />
            </div>
          </div>
        ) : userData ? (
          <div className="flex items-center gap-3 pl-4 border-l" style={{ borderColor: theme.colors.gray[300] }}>
            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm"
              style={{
                backgroundColor: theme.colors.brand.light,
                color: theme.colors.brand.default,
              }}
            >
              {userData.avatar ? (
                <img 
                  src={userData.avatar} 
                  alt={`${userData.first_name} ${userData.last_name}`} 
                  className="w-full h-full rounded-full object-cover" 
                />
              ) : (
                getInitials(`${userData.first_name} ${userData.last_name}`)
              )}
            </div>

            {/* User Info */}
            <div className="flex flex-col">
              <span
                className="text-sm font-semibold"
                style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.dark.default }}
              >
                {userData.first_name} {userData.last_name}
              </span>
              <span className="text-xs" style={{ color: theme.colors.gray[600] }}>
                {userData.email}
              </span>
            </div>
          </div>
        ) : null}
      </div>

      {/* Search Modal */}
      {isSearchModalOpen && typeof window !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
          style={{
            animation: 'fadeIn 0.2s ease-out',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsSearchModalOpen(false);
            }
          }}
        >
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 bg-black/60"
            style={{
              animation: 'fadeIn 0.2s ease-out',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            onClick={() => setIsSearchModalOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <div
            className={`relative z-10 rounded-2xl shadow-2xl flex ${(selectedIcon || selectedColor) ? 'max-w-6xl' : 'w-full max-w-3xl'}`}
            style={{
              backgroundColor: theme.background.card,
              border: `1px solid ${theme.colors.gray[200]}`,
              boxShadow: theme.mode === 'dark' 
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
                : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              animation: 'modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transformOrigin: 'center top',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Search modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Section */}
            <div className={`${(selectedIcon || selectedColor) ? 'w-2/3' : 'w-full'}`}>
            {/* Header */}
            <div 
              className="flex items-center justify-between px-6 pt-6 pb-4 border-b"
              style={{
                borderColor: theme.colors.gray[200],
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: theme.colors.primary.clarity,
                  }}
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ color: theme.colors.primary.default }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 
                    className="text-lg font-semibold"
                    style={{ 
                      color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.dark.default 
                    }}
                  >
                    Search Documentation
                  </h2>
                  <p 
                    className="text-sm"
                    style={{ color: theme.colors.gray[600] }}
                  >
                    Find what you're looking for quickly
                  </p>
                </div>
              </div>
              
              {/* Mode Switch and Close Button */}
              <div className="flex items-center gap-3">
                <SegmentControl
                  items={[
                    { 
                      value: 'components', 
                      label: 'Components',
                      icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      )
                    },
                    { 
                      value: 'config', 
                      label: 'Config',
                      icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )
                    },
                  ]}
                  value={searchMode}
                  onChange={(value) => setSearchMode(value as 'components' | 'config')}
                  size="md"
                  variant="filled"
                />
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  color: theme.colors.gray[500],
                  backgroundColor: 'transparent',
                    border: `1px solid ${theme.colors.gray[300]}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.gray[200];
                  e.currentTarget.style.color = theme.colors.gray[700];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = theme.colors.gray[500];
                }}
                aria-label="Close search modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              </div>
            </div>

            {/* Search Input Container */}
            <div className="p-6">
              {/* Config Filter - Only show in config mode */}
              {searchMode === 'config' && (
                <div className="mb-4">
                  <SegmentControl
                    items={[
                      { 
                        value: 'all', 
                        label: 'All',
                      },
                      { 
                        value: 'icons', 
                        label: 'Icons',
                      },
                      { 
                        value: 'colors', 
                        label: 'Colors',
                      },
                      { 
                        value: 'icons-colors', 
                        label: 'Icons & Colors',
                      },
                    ]}
                    value={configFilter}
                    onChange={(value) => setConfigFilter(value as 'all' | 'icons' | 'colors' | 'icons-colors')}
                    size="sm"
                    variant="filled"
                  />
                </div>
              )}

              <Search
                value={searchValue}
                onChange={setSearchValue}
                onSearch={handleSearchSubmit}
                placeholder={searchMode === 'components' ? 'Search components...' : 'Search config...'}
                size="lg"
                className="w-full"
                autoFocus
              />
              
              {/* Search Results */}
              {searchValue.trim() && (
                <div className="mt-4 max-h-[550px] overflow-y-auto">
                  {flatFilteredList.length > 0 ? (
                    <div className="space-y-4">
                      {/* Icons Section */}
                      {searchMode === 'config' && groupedResults.icons.length > 0 && (
                        <div>
                          <div 
                            className="px-2 py-2 mb-2 text-sm font-semibold"
                            style={{ color: theme.colors.gray[600] }}
                          >
                            Icons
                                </div>
                          <div className="grid grid-cols-7 gap-2">
                            {groupedResults.icons.map((component, index) => 
                              renderIconItem(component, index)
                            )}
                              </div>
                        </div>
                      )}

                      {/* Colors Section */}
                      {searchMode === 'config' && groupedResults.colors.length > 0 && (
                        <div>
                          <div 
                            className="px-2 py-2 mb-2 text-sm font-semibold"
                            style={{ color: theme.colors.gray[600] }}
                          >
                            Colors
                              </div>
                          <div className="grid grid-cols-7 gap-2">
                            {groupedResults.colors.map((component, index) => 
                              renderColorItem(component, groupedResults.icons.length + index)
                            )}
                            </div>
                        </div>
                      )}

                      {/* More Section */}
                      {searchMode === 'config' && groupedResults.more.length > 0 && (
                        <div>
                          <div 
                            className="px-2 py-2 mb-2 text-sm font-semibold"
                            style={{ color: theme.colors.gray[600] }}
                          >
                            More
                          </div>
                          <div className="space-y-1">
                            {groupedResults.more.map((component, index) => 
                              renderResultItem(component, groupedResults.icons.length + groupedResults.colors.length + index)
                            )}
                          </div>
                        </div>
                      )}

                      {/* Components Mode - No grouping */}
                      {searchMode === 'components' && (
                        <div className="space-y-1">
                          {filteredComponents.map((component, index) => 
                            renderResultItem(component, index)
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div 
                      className="text-center py-8 px-4 rounded-lg"
                      style={{ 
                        backgroundColor: theme.colors.gray[100],
                        color: theme.colors.gray[600] 
                      }}
                    >
                      <svg 
                        className="w-12 h-12 mx-auto mb-3 opacity-50" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p className="font-medium">No results found</p>
                      <p className="text-sm mt-1">Try searching with different keywords</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Keyboard Shortcuts Hint */}
              {!searchValue.trim() && (
                <div className="mt-6 flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <kbd
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: theme.colors.gray[200],
                        color: theme.colors.gray[700],
                        border: `1px solid ${theme.colors.gray[300]}`,
                      }}
                    >
                      Esc
                    </kbd>
                    <span className="text-xs" style={{ color: theme.colors.gray[600] }}>
                      Close
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: theme.colors.gray[200],
                        color: theme.colors.gray[700],
                        border: `1px solid ${theme.colors.gray[300]}`,
                      }}
                    >
                      ↵
                    </kbd>
                    <span className="text-xs" style={{ color: theme.colors.gray[600] }}>
                      Select
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: theme.colors.gray[200],
                        color: theme.colors.gray[700],
                        border: `1px solid ${theme.colors.gray[300]}`,
                      }}
                    >
                      ↑↓
                    </kbd>
                    <span className="text-xs" style={{ color: theme.colors.gray[600] }}>
                      Navigate
                    </span>
                  </div>
                </div>
              )}
              
              {/* Results Count */}
              {searchValue.trim() && flatFilteredList.length > 0 && (
                <div 
                  className="mt-4 text-xs text-center"
                  style={{ color: theme.colors.gray[600] }}
                >
                  {flatFilteredList.length} {flatFilteredList.length === 1 ? 'result' : 'results'} found
                </div>
              )}
            </div>
            </div>

            {/* Icon Detail Box */}
            {selectedIcon && (
              <div 
                className="w-1/3 border-l p-6 overflow-y-auto rounded-r-2xl max-h-[750px]"
                style={{
                  borderColor: theme.colors.gray[300],
                  backgroundColor: theme.background.card,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 
                    className="text-xl font-semibold"
                    style={{ color: theme.colors.light.inverse }}
                  >
                    {formatIconName(selectedIcon.baseName)}
                  </h3>
                  <button
                    onClick={() => setSelectedIcon(null)}
                    className="p-1 rounded transition-colors border border-gray-300"
                    style={{ 
                      color: theme.colors.gray[600],
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme.colors.gray[200];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Icon Preview */}
                <div 
                  className="w-full h-32 rounded-lg flex items-center justify-center text-5xl mb-4"
                  style={{
                    backgroundColor: theme.colors.gray[100],
                    color: theme.colors.gray[900],
                    border: `1px solid ${theme.colors.gray[300]}`,
                  }}
                >
                  <span 
                    className="icon"
                    style={{ fontFamily: 'Untitled' }}
                  >
                    {selectedIcon.icons[0].unicode}
                  </span>
                </div>

                {/* Icon Info */}
                <div className="space-y-3 mb-4">
                  <div>
                    <span 
                      className="text-sm font-medium block mb-1"
                      style={{ color: theme.colors.gray[600] }}
                    >
                      Name:
                    </span>
                    <code 
                      className="block px-3 py-2 rounded text-sm break-all"
                      style={{
                        backgroundColor: theme.colors.gray[200],
                        color: theme.colors.gray[900],
                      }}
                    >
                      {selectedIcon.icons[0].name}
                    </code>
                  </div>

                  <div>
                    <span 
                      className="text-sm font-medium block mb-1"
                      style={{ color: theme.colors.gray[600] }}
                    >
                      Font Class:
                    </span>
                    <code 
                      className="block px-3 py-2 rounded text-sm"
                      style={{
                        backgroundColor: theme.colors.gray[200],
                        color: theme.colors.gray[900],
                      }}
                    >
                      .icon
                    </code>
                  </div>

                  <div>
                    <span 
                      className="text-sm font-medium block mb-1"
                      style={{ color: theme.colors.gray[600] }}
                    >
                      Unicode:
                    </span>
                    <code 
                      className="block px-3 py-2 rounded text-sm"
                      style={{
                        backgroundColor: theme.colors.gray[200],
                        color: theme.colors.gray[900],
                      }}
                    >
                      {selectedIcon.icons[0].unicode} (U+{selectedIcon.icons[0].codePoint.toString(16).toUpperCase()})
                    </code>
                  </div>

                  <div>
                    <span 
                      className="text-sm font-medium block mb-1"
                      style={{ color: theme.colors.gray[600] }}
                    >
                      Font Family:
                    </span>
                    <code 
                      className="block px-3 py-2 rounded text-sm"
                      style={{
                        backgroundColor: theme.colors.gray[200],
                        color: theme.colors.gray[900],
                      }}
                    >
                      "Untitled"
                    </code>
                  </div>
                </div>

                {/* Usage Example */}
                <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: theme.colors.gray[100] }}>
                  <p 
                    className="text-sm font-medium mb-2"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Usage:
                  </p>
                  <code 
                    className="block text-xs p-3 rounded break-all"
                    style={{
                      backgroundColor: theme.background.card,
                      color: theme.colors.gray[900],
                      fontFamily: 'monospace',
                    }}
                  >
                    {`<span class="icon" style="font-family: 'Untitled'">${selectedIcon.icons[0].unicode}</span>`}
                  </code>
                </div>

                {/* Available Sizes */}
                {selectedIcon.icons.length > 1 && (
                  <div>
                    <p 
                      className="text-sm font-medium mb-2"
                      style={{ color: theme.colors.gray[700] }}
                    >
                      Available Sizes:
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {selectedIcon.icons.map((icon) => {
                        const size = icon.name.match(/Size(\d+)px/)?.[1] || '16';
                        return (
                          <div 
                            key={icon.name}
                            className="flex items-center gap-2 px-3 py-2 rounded"
                            style={{ backgroundColor: theme.colors.gray[200] }}
                          >
                            <span 
                              className="icon"
                              style={{ fontFamily: 'Untitled', fontSize: `${size}px` }}
                            >
                              {icon.unicode}
                            </span>
                            <span 
                              className="text-xs"
                              style={{ color: theme.colors.gray[700] }}
                            >
                              {size}px
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Color Detail Box */}
            {selectedColor && (
              <div 
                className="w-1/3 border-l p-6 overflow-y-auto rounded-r-2xl max-h-[750px]"
                style={{
                  borderColor: theme.colors.gray[300],
                  backgroundColor: theme.background.card,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 
                    className="text-xl font-semibold"
                    style={{ color: theme.colors.light.inverse }}
                  >
                    {selectedColor.name}
                  </h3>
                  <button
                    onClick={() => setSelectedColor(null)}
                    className="p-1 rounded transition-colors border border-gray-300"
                    style={{ 
                      color: theme.colors.gray[600],
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme.colors.gray[200];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Color Preview */}
                <div 
                  className="w-full aspect-square rounded-lg mb-4 flex items-center justify-center border"
                  style={{ 
                    backgroundColor: selectedColor.value,
                    borderColor: theme.colors.gray[300],
                  }}
                >
                  <span 
                    className="text-lg font-semibold px-4 py-2 rounded"
                    style={{
                      backgroundColor: isLightColor(selectedColor.value) 
                        ? 'rgba(0,0,0,0.1)' 
                        : 'rgba(255,255,255,0.9)',
                      color: isLightColor(selectedColor.value) 
                        ? theme.colors.gray[900] 
                        : theme.colors.gray[100],
                    }}
                  >
                    {selectedColor.value}
                  </span>
                </div>

                {/* Color Info */}
                <div className="space-y-3">
                  <div>
                    <span 
                      className="text-sm font-medium block mb-1"
                      style={{ color: theme.colors.gray[600] }}
                    >
                      Color Name:
                    </span>
                    <code 
                      className="block px-3 py-2 rounded text-sm"
                      style={{
                        backgroundColor: theme.colors.gray[200],
                        color: theme.colors.gray[900],
                      }}
                    >
                      {selectedColor.name}
                    </code>
                  </div>

                  <div>
                    <span 
                      className="text-sm font-medium block mb-1"
                      style={{ color: theme.colors.gray[600] }}
                    >
                      Hex/RGBA Value:
                    </span>
                    <code 
                      className="block px-3 py-2 rounded text-sm break-all"
                      style={{
                        backgroundColor: theme.colors.gray[200],
                        color: theme.colors.gray[900],
                      }}
                    >
                      {selectedColor.value}
                    </code>
                  </div>

                  <div>
                    <span 
                      className="text-sm font-medium block mb-1"
                      style={{ color: theme.colors.gray[600] }}
                    >
                      Usage:
                    </span>
                    <code 
                      className="block px-3 py-2 rounded text-xs break-all"
                      style={{
                        backgroundColor: theme.colors.gray[200],
                        color: theme.colors.gray[900],
                        fontFamily: 'monospace',
                      }}
                    >
                      {selectedColor.path}
                    </code>
                  </div>

                  <div>
                    <span 
                      className="text-sm font-medium block mb-1"
                      style={{ color: theme.colors.gray[600] }}
                    >
                      CSS Usage:
                    </span>
                    <code 
                      className="block px-3 py-2 rounded text-xs break-all"
                      style={{
                        backgroundColor: theme.colors.gray[200],
                        color: theme.colors.gray[900],
                        fontFamily: 'monospace',
                      }}
                    >
                      {`style={{ color: '${selectedColor.value}' }}`}
                    </code>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* Modal Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;

