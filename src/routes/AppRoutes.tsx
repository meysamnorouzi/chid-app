import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout, MainLayout } from '../layouts';
import DocumentationLayout from '../layouts/DocumentationLayout';
import DevLayout from '../layouts/DevLayout';
import Home from '../pages/app/Home';
import Onboarding from '../pages/Onboarding';
import Documentation from '../pages/Documentation/Documentation';
import DocumentationLogin from '../pages/Documentation/DocumentationLogin';
import { Icon, Colors } from '../pages/Documentation/config';
import {
  BasicExamples,
  Variants,
  States,
  Sizes,
  IconsBadges,
  AccordionGroupPage,
} from '../pages/Documentation/accordion';
import {
  BasicExamples as AvatarBasicExamples,
  Variants as AvatarVariants,
  States as AvatarStates,
  Sizes as AvatarSizes,
  Shapes,
  AvatarGroupPage,
} from '../pages/Documentation/avatar';
import {
  BasicExamples as BannerBasicExamples,
  Variants as BannerVariants,
  Types as BannerTypes,
  States as BannerStates,
  Sizes as BannerSizes,
} from '../pages/Documentation/banner';
import {
  BasicExamples as ToastBasicExamples,
  Types as ToastTypes,
  States as ToastStates,
  ToastProviderPage,
} from '../pages/Documentation/toast';
import {
  BasicExamples as ButtonBasicExamples,
  Variants as ButtonVariants,
  Sizes as ButtonSizes,
  Shapes as ButtonShapes,
  States as ButtonStates,
  WithIcons as ButtonWithIcons,
  IconOnly as ButtonIconOnly,
} from '../pages/Documentation/button';
import {
  BasicExamples as BottomNavigationBasicExamples,
  WithBadges,
  WithActiveIcons,
  States as BottomNavigationStates,
} from '../pages/Documentation/bottom-navigation';
import {
  BasicExamples as BreadcrumbBasicExamples,
  Separators,
  WithIcons as BreadcrumbWithIcons,
  States as BreadcrumbStates,
} from '../pages/Documentation/breadcrumb';
import {
  BasicExamples as CarouselBasicExamples,
  Variants as CarouselVariants,
  States as CarouselStates,
} from '../pages/Documentation/carousel';
import {
  BasicExamples as CheckboxBasicExamples,
  Variants as CheckboxVariants,
  Sizes as CheckboxSizes,
  States as CheckboxStates,
} from '../pages/Documentation/checkbox';
import {
  BasicExamples as ChipsBasicExamples,
  Variants as ChipsVariants,
  Sizes as ChipsSizes,
  Shapes as ChipsShapes,
  States as ChipsStates,
  WithIcons as ChipsWithIcons,
  Deletable as ChipsDeletable,
} from '../pages/Documentation/chips';
import {
  BasicExamples as DatePickerBasicExamples,
  Variants as DatePickerVariants,
  Sizes as DatePickerSizes,
  States as DatePickerStates,
  Formats as DatePickerFormats,
  WithMinMax as DatePickerWithMinMax,
} from '../pages/Documentation/date-picker';
import {
  BasicExamples as DrawerBasicExamples,
  Positions as DrawerPositions,
  Sizes as DrawerSizes,
  States as DrawerStates,
  WithHeaderFooter as DrawerWithHeaderFooter,
} from '../pages/Documentation/drawer';
import {
  BasicExamples as FloatingToolbarBasicExamples,
  Variants as FloatingToolbarVariants,
  Positions as FloatingToolbarPositions,
  Sizes as FloatingToolbarSizes,
  States as FloatingToolbarStates,
  WithActions as FloatingToolbarWithActions,
} from '../pages/Documentation/floating-toolbar';
import {
  BasicExamples as TagBasicExamples,
  Variants as TagVariants,
  Colors as TagColors,
  Sizes as TagSizes,
  States as TagStates,
} from '../pages/Documentation/tag';
import {
  BasicExamples as LoaderBasicExamples,
  Variants as LoaderVariants,
  Sizes as LoaderSizes,
  Colors as LoaderColors,
  FullScreen as LoaderFullScreen,
} from '../pages/Documentation/loader';
import {
  BasicExamples as MenuBasicExamples,
  Variants as MenuVariants,
  Sizes as MenuSizes,
  States as MenuStates,
} from '../pages/Documentation/menu';
import {
  BasicExamples as PaginationBasicExamples,
  Variants as PaginationVariants,
  Sizes as PaginationSizes,
  Options as PaginationOptions,
} from '../pages/Documentation/pagination';
import {
  BasicExamples as ProgressBasicExamples,
  Variants as ProgressVariants,
  Sizes as ProgressSizes,
  Colors as ProgressColors,
} from '../pages/Documentation/progress';
import {
  BasicExamples as RadioBasicExamples,
  Variants as RadioVariants,
  Sizes as RadioSizes,
  States as RadioStates,
} from '../pages/Documentation/radio';
import {
  BasicExamples as RangeBasicExamples,
  Variants as RangeVariants,
  Sizes as RangeSizes,
  WithMarks as RangeWithMarks,
  States as RangeStates,
} from '../pages/Documentation/range';
import {
  BasicExamples as SearchBasicExamples,
  Variants as SearchVariants,
  Sizes as SearchSizes,
  States as SearchStates,
  WithIcons as SearchWithIcons,
} from '../pages/Documentation/search';
import {
  BasicExamples as SegmentControlBasicExamples,
  Variants as SegmentControlVariants,
  Sizes as SegmentControlSizes,
  States as SegmentControlStates,
} from '../pages/Documentation/segment-control';
import {
  BasicExamples as MultiSelectAreaBasicExamples,
  Variants as MultiSelectAreaVariants,
  Sizes as MultiSelectAreaSizes,
  States as MultiSelectAreaStates,
} from '../pages/Documentation/multi-select-area';
import {
  BasicExamples as SnackbarBasicExamples,
  Variants as SnackbarVariants,
  Positions as SnackbarPositions,
  Sizes as SnackbarSizes,
  States as SnackbarStates,
} from '../pages/Documentation/snackbar';
import {
  BasicExamples as SwitchBasicExamples,
  Variants as SwitchVariants,
  Sizes as SwitchSizes,
  States as SwitchStates,
} from '../pages/Documentation/switch';
import {
  BasicExamples as TabsBasicExamples,
  Variants as TabsVariants,
  Sizes as TabsSizes,
  States as TabsStates,
} from '../pages/Documentation/tabs';
import {
  BasicExamples as TooltipBasicExamples,
  Positions as TooltipPositions,
  Sizes as TooltipSizes,
  States as TooltipStates,
} from '../pages/Documentation/tooltip';
import Login from '../pages/app/auth/Login';
import Register from '../pages/app/auth/Register';
import QrCode from '../pages/app/auth/QrCode';
import Password from '../pages/app/auth/Password';
import PasswordNot from '../pages/app/auth/PasswordNot';
import Friends from '../pages/app/friends/Friends';
import Shop from '../pages/app/shop/Shop';
import ProductDetail from '../pages/app/shop/ProductDetail';
import WalletMoney from '../pages/app/wallet/WalletMoney';
import WalletDigit from '../pages/app/wallet/WalletDigit';
import WalletSaving from '../pages/app/wallet/WalletSaving';
import MessagesPage from '../pages/app/messages/Messages';
import Digifun from '../pages/app/digifun/Digifun';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      {/* auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password" element={<Password />} />
        <Route path="/password-not" element={<PasswordNot />} />
        <Route path="/qrcode" element={<QrCode />} />
      </Route>
      {/* App Page */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductDetail />} />
        <Route path="/wallet-money" element={<WalletMoney />} />
        <Route path="/wallet-digit" element={<WalletDigit />} />
        <Route path="/wallet-saving" element={<WalletSaving />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/digifun">
          <Route index element={<Digifun />} />
          <Route path="video" element={<Digifun />} />
          <Route path="audio" element={<Digifun />} />
          <Route path="read" element={<Digifun />} />
        </Route>
      </Route>
      {/* Documentation Page */}
      <Route element={<DocumentationLayout />}>
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/documentation/login" element={<DocumentationLogin />} />
        <Route path="/documentation/accordion">
          <Route index element={<Navigate to="/documentation/accordion/basic-examples" replace />} />
          <Route path="basic-examples" element={<BasicExamples />} />
          <Route path="variants" element={<Variants />} />
          <Route path="states" element={<States />} />
          <Route path="sizes" element={<Sizes />} />
          <Route path="icons-badges" element={<IconsBadges />} />
          <Route path="accordion-group" element={<AccordionGroupPage />} />
        </Route>
        <Route path="/documentation/avatar">
          <Route index element={<Navigate to="/documentation/avatar/basic-examples" replace />} />
          <Route path="basic-examples" element={<AvatarBasicExamples />} />
          <Route path="variants" element={<AvatarVariants />} />
          <Route path="states" element={<AvatarStates />} />
          <Route path="sizes" element={<AvatarSizes />} />
          <Route path="shapes" element={<Shapes />} />
          <Route path="avatar-group" element={<AvatarGroupPage />} />
        </Route>
        <Route path="/documentation/banner">
          <Route index element={<Navigate to="/documentation/banner/basic-examples" replace />} />
          <Route path="basic-examples" element={<BannerBasicExamples />} />
          <Route path="variants" element={<BannerVariants />} />
          <Route path="types" element={<BannerTypes />} />
          <Route path="states" element={<BannerStates />} />
          <Route path="sizes" element={<BannerSizes />} />
        </Route>
        <Route path="/documentation/toast">
          <Route index element={<Navigate to="/documentation/toast/basic-examples" replace />} />
          <Route path="basic-examples" element={<ToastBasicExamples />} />
          <Route path="types" element={<ToastTypes />} />
          <Route path="states" element={<ToastStates />} />
          <Route path="toast-provider" element={<ToastProviderPage />} />
        </Route>
        <Route path="/documentation/button">
          <Route index element={<Navigate to="/documentation/button/basic-examples" replace />} />
          <Route path="basic-examples" element={<ButtonBasicExamples />} />
          <Route path="variants" element={<ButtonVariants />} />
          <Route path="sizes" element={<ButtonSizes />} />
          <Route path="shapes" element={<ButtonShapes />} />
          <Route path="states" element={<ButtonStates />} />
          <Route path="with-icons" element={<ButtonWithIcons />} />
          <Route path="icon-only" element={<ButtonIconOnly />} />
        </Route>
        <Route path="/documentation/bottom-navigation">
          <Route index element={<Navigate to="/documentation/bottom-navigation/basic-examples" replace />} />
          <Route path="basic-examples" element={<BottomNavigationBasicExamples />} />
          <Route path="with-badges" element={<WithBadges />} />
          <Route path="with-active-icons" element={<WithActiveIcons />} />
          <Route path="states" element={<BottomNavigationStates />} />
        </Route>
        <Route path="/documentation/breadcrumb">
          <Route index element={<Navigate to="/documentation/breadcrumb/basic-examples" replace />} />
          <Route path="basic-examples" element={<BreadcrumbBasicExamples />} />
          <Route path="separators" element={<Separators />} />
          <Route path="with-icons" element={<BreadcrumbWithIcons />} />
          <Route path="states" element={<BreadcrumbStates />} />
        </Route>
        <Route path="/documentation/carousel">
          <Route index element={<Navigate to="/documentation/carousel/basic-examples" replace />} />
          <Route path="basic-examples" element={<CarouselBasicExamples />} />
          <Route path="variants" element={<CarouselVariants />} />
          <Route path="states" element={<CarouselStates />} />
        </Route>
        <Route path="/documentation/checkbox">
          <Route index element={<Navigate to="/documentation/checkbox/basic-examples" replace />} />
          <Route path="basic-examples" element={<CheckboxBasicExamples />} />
          <Route path="variants" element={<CheckboxVariants />} />
          <Route path="sizes" element={<CheckboxSizes />} />
          <Route path="states" element={<CheckboxStates />} />
        </Route>
        <Route path="/documentation/chips">
          <Route index element={<Navigate to="/documentation/chips/basic-examples" replace />} />
          <Route path="basic-examples" element={<ChipsBasicExamples />} />
          <Route path="variants" element={<ChipsVariants />} />
          <Route path="sizes" element={<ChipsSizes />} />
          <Route path="shapes" element={<ChipsShapes />} />
          <Route path="states" element={<ChipsStates />} />
          <Route path="with-icons" element={<ChipsWithIcons />} />
          <Route path="deletable" element={<ChipsDeletable />} />
        </Route>
        <Route path="/documentation/date-picker">
          <Route index element={<Navigate to="/documentation/date-picker/basic-examples" replace />} />
          <Route path="basic-examples" element={<DatePickerBasicExamples />} />
          <Route path="variants" element={<DatePickerVariants />} />
          <Route path="sizes" element={<DatePickerSizes />} />
          <Route path="states" element={<DatePickerStates />} />
          <Route path="formats" element={<DatePickerFormats />} />
          <Route path="with-min-max" element={<DatePickerWithMinMax />} />
        </Route>
        <Route path="/documentation/drawer">
          <Route index element={<Navigate to="/documentation/drawer/basic-examples" replace />} />
          <Route path="basic-examples" element={<DrawerBasicExamples />} />
          <Route path="positions" element={<DrawerPositions />} />
          <Route path="sizes" element={<DrawerSizes />} />
          <Route path="states" element={<DrawerStates />} />
          <Route path="with-header-footer" element={<DrawerWithHeaderFooter />} />
        </Route>
        <Route path="/documentation/floating-toolbar">
          <Route index element={<Navigate to="/documentation/floating-toolbar/basic-examples" replace />} />
          <Route path="basic-examples" element={<FloatingToolbarBasicExamples />} />
          <Route path="variants" element={<FloatingToolbarVariants />} />
          <Route path="positions" element={<FloatingToolbarPositions />} />
          <Route path="sizes" element={<FloatingToolbarSizes />} />
          <Route path="states" element={<FloatingToolbarStates />} />
          <Route path="with-actions" element={<FloatingToolbarWithActions />} />
        </Route>
        <Route path="/documentation/tag">
          <Route index element={<Navigate to="/documentation/tag/basic-examples" replace />} />
          <Route path="basic-examples" element={<TagBasicExamples />} />
          <Route path="variants" element={<TagVariants />} />
          <Route path="colors" element={<TagColors />} />
          <Route path="sizes" element={<TagSizes />} />
          <Route path="states" element={<TagStates />} />
        </Route>
        <Route path="/documentation/loader">
          <Route index element={<Navigate to="/documentation/loader/basic-examples" replace />} />
          <Route path="basic-examples" element={<LoaderBasicExamples />} />
          <Route path="variants" element={<LoaderVariants />} />
          <Route path="sizes" element={<LoaderSizes />} />
          <Route path="colors" element={<LoaderColors />} />
          <Route path="full-screen" element={<LoaderFullScreen />} />
        </Route>
        <Route path="/documentation/menu">
          <Route index element={<Navigate to="/documentation/menu/basic-examples" replace />} />
          <Route path="basic-examples" element={<MenuBasicExamples />} />
          <Route path="variants" element={<MenuVariants />} />
          <Route path="sizes" element={<MenuSizes />} />
          <Route path="states" element={<MenuStates />} />
        </Route>
        <Route path="/documentation/pagination">
          <Route index element={<Navigate to="/documentation/pagination/basic-examples" replace />} />
          <Route path="basic-examples" element={<PaginationBasicExamples />} />
          <Route path="variants" element={<PaginationVariants />} />
          <Route path="sizes" element={<PaginationSizes />} />
          <Route path="options" element={<PaginationOptions />} />
        </Route>
        <Route path="/documentation/progress">
          <Route index element={<Navigate to="/documentation/progress/basic-examples" replace />} />
          <Route path="basic-examples" element={<ProgressBasicExamples />} />
          <Route path="variants" element={<ProgressVariants />} />
          <Route path="sizes" element={<ProgressSizes />} />
          <Route path="colors" element={<ProgressColors />} />
        </Route>
        <Route path="/documentation/radio">
          <Route index element={<Navigate to="/documentation/radio/basic-examples" replace />} />
          <Route path="basic-examples" element={<RadioBasicExamples />} />
          <Route path="variants" element={<RadioVariants />} />
          <Route path="sizes" element={<RadioSizes />} />
          <Route path="states" element={<RadioStates />} />
        </Route>
        <Route path="/documentation/range">
          <Route index element={<Navigate to="/documentation/range/basic-examples" replace />} />
          <Route path="basic-examples" element={<RangeBasicExamples />} />
          <Route path="variants" element={<RangeVariants />} />
          <Route path="sizes" element={<RangeSizes />} />
          <Route path="with-marks" element={<RangeWithMarks />} />
          <Route path="states" element={<RangeStates />} />
        </Route>
        <Route path="/documentation/search">
          <Route index element={<Navigate to="/documentation/search/basic-examples" replace />} />
          <Route path="basic-examples" element={<SearchBasicExamples />} />
          <Route path="variants" element={<SearchVariants />} />
          <Route path="sizes" element={<SearchSizes />} />
          <Route path="states" element={<SearchStates />} />
          <Route path="with-icons" element={<SearchWithIcons />} />
        </Route>
        <Route path="/documentation/segment-control">
          <Route index element={<Navigate to="/documentation/segment-control/basic-examples" replace />} />
          <Route path="basic-examples" element={<SegmentControlBasicExamples />} />
          <Route path="variants" element={<SegmentControlVariants />} />
          <Route path="sizes" element={<SegmentControlSizes />} />
          <Route path="states" element={<SegmentControlStates />} />
        </Route>
        <Route path="/documentation/multi-select-area">
          <Route index element={<Navigate to="/documentation/multi-select-area/basic-examples" replace />} />
          <Route path="basic-examples" element={<MultiSelectAreaBasicExamples />} />
          <Route path="variants" element={<MultiSelectAreaVariants />} />
          <Route path="sizes" element={<MultiSelectAreaSizes />} />
          <Route path="states" element={<MultiSelectAreaStates />} />
        </Route>
        <Route path="/documentation/snackbar">
          <Route index element={<Navigate to="/documentation/snackbar/basic-examples" replace />} />
          <Route path="basic-examples" element={<SnackbarBasicExamples />} />
          <Route path="variants" element={<SnackbarVariants />} />
          <Route path="positions" element={<SnackbarPositions />} />
          <Route path="sizes" element={<SnackbarSizes />} />
          <Route path="states" element={<SnackbarStates />} />
        </Route>
        <Route path="/documentation/switch">
          <Route index element={<Navigate to="/documentation/switch/basic-examples" replace />} />
          <Route path="basic-examples" element={<SwitchBasicExamples />} />
          <Route path="variants" element={<SwitchVariants />} />
          <Route path="sizes" element={<SwitchSizes />} />
          <Route path="states" element={<SwitchStates />} />
        </Route>
        <Route path="/documentation/tabs">
          <Route index element={<Navigate to="/documentation/tabs/basic-examples" replace />} />
          <Route path="basic-examples" element={<TabsBasicExamples />} />
          <Route path="variants" element={<TabsVariants />} />
          <Route path="sizes" element={<TabsSizes />} />
          <Route path="states" element={<TabsStates />} />
        </Route>
        <Route path="/documentation/tooltip">
          <Route index element={<Navigate to="/documentation/tooltip/basic-examples" replace />} />
          <Route path="basic-examples" element={<TooltipBasicExamples />} />
          <Route path="positions" element={<TooltipPositions />} />
          <Route path="sizes" element={<TooltipSizes />} />
          <Route path="states" element={<TooltipStates />} />
        </Route>
        <Route path="/documentation/config">
          <Route index element={<Navigate to="/documentation/config/icon" replace />} />
          <Route path="icon" element={<Icon />} />
          <Route path="colors" element={<Colors />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;

