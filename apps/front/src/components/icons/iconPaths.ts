export const ICON_PATHS = {
  globe: '/icons/icon_globe.svg',
  search: '/icons/icon_search.svg',
  hamburger: '/icons/icon_hamburger.svg',
  theme: '/icons/icon_theme.svg',
  caretDown: '/icons/icon_caret_down.svg',
  caretLeft: '/icons/icon_caret_left.svg',
  hacking: '/icons/icon_hacking.svg',
  insider: '/icons/icon_user_one.svg',
  negligence: '/icons/icon_negligence.svg',
  technical: '/icons/icon_technical.svg',
  unknown: '/icons/icon_caution.svg',
  lockKey: '/icons/icon_lock_key.svg',
  userGroup: '/icons/icon_user_group.svg',
  megaphone: '/icons/icon_megaphone.svg',
  networkShare: '/icons/icon_network_share.svg',
  step: '/icons/Step.svg',
  userOne: '/icons/icon_user_one.svg',
  company: '/icons/icon_company.svg',
  link: '/icons/icon_link.svg',
} as const

export type IconName = keyof typeof ICON_PATHS
