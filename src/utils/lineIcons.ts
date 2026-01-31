/**
 * Line icons path helper
 * Icons from public/icons/line icons/ - use these paths everywhere we have a matching icon.
 */
const LINE_ICONS_BASE = "/icons/line%20icons/";

/** Build line icon URL from filename (handles spaces in filename). */
export function lineIcon(filename: string): string {
  return LINE_ICONS_BASE + encodeURIComponent(filename);
}

/** Predefined line icon paths synced with public/icons/line icons/ file names */
export const lineIconPaths = {
  ahduff: lineIcon("ahduff.svg"),
  book: lineIcon("book.svg"),
  cafe: lineIcon("cafe.svg"),
  card: lineIcon("card.svg"),
  digit: lineIcon("digit.svg"),
  edit: lineIcon("edit.svg"),
  gift: lineIcon("gift.svg"),
  like: lineIcon("like.svg"),
  list: lineIcon("list.svg"),
  lock: lineIcon("lock.svg"),
  logout: lineIcon("logout.svg"),
  menu: lineIcon("menu.svg"),
  museum: lineIcon("museum.svg"),
  notif: lineIcon("notif.svg"),
  pasandaz: lineIcon("pasandaz.svg"),
  podcast: lineIcon("podcast.svg"),
  profile: lineIcon("profile.svg"),
  searchRiz: lineIcon("search riz.svg"),
  searchDorosht: lineIcon("search dorosht.svg"),
  sendToPasandaz: lineIcon("send to pasandaz.svg"),
  shahreFarang: lineIcon("shahre farang.svg"),
  share: lineIcon("share.svg"),
  store: lineIcon("store.svg"),
  tick: lineIcon("tick.svg"),
  wallet: lineIcon("wallet.svg"),
} as const;
