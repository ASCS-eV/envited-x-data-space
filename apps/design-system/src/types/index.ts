export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum AlertType {
  error = 'error',
  info = 'info',
  succes = 'succes',
  warning = 'warning',
}

export enum TooltipType {
  info = 'info',
  warning = 'warning',
}

export enum LogoType {
  icon = 'icon',
  full = 'full',
}

export enum Colour {
  main = 'main',
  white = 'white',
  black = 'black',
  blue = 'blue',
}

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
}

export enum ButtonStyle {
  solid = 'solid',
  ghost = 'ghost',
}

export enum InputType {
  text = 'text',
  email = 'email',
}

export enum Currency {
  XTZ = 'ꜩ',
  USD = '$',
  EUR = '€',
}

export enum Holdings {
  xtz = 'xtz',
  nfts = 'nfts',
  pools = 'pools',
  vaults = 'vaults',
  assets = 'assets',
}

export enum Language {
  en = 'en',
  nl = 'nl',
}

export interface TranslationsMap {
  [Language.en]: { [key: string]: { [key: string]: string } }
  [Language.nl]: { [key: string]: { [key: string]: string } }
}

export enum Columns {
  two = 'two',
  three = 'three',
  four = 'four',
  five = 'five',
}

export enum ColorScheme {
  light = 'light',
  dark = 'dark',
}

export enum RiskLevel {
  none = 'none',
  minimal = 'minimal',
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export enum OperationStatus {
  applied = 'applied',
  backtracked = 'backtracked',
  failed = 'failed',
  skipped = 'skipped',
}

export enum OperationInstruction {
  incoming = 'incoming',
  outgoing = 'outgoing',
  transfer = 'transfer',
}

export enum HistoryEvent {
  mint = 'mint',
  reveal = 'reveal',
  transfer = 'transfer',
  createListing = 'create_listing',
  collectListing = 'collect_listing',
  cancelListing = 'cancel_listing',
  createOffer = 'create_offer',
  cancelOffer = 'cancel_offer',
  acceptOffer = 'accept_offer',
  createFloorOffer = 'create_floor_offer',
  cancelFloorOffer = 'cancel_floor_offer',
  acceptFloorOffer = 'accept_floor_offer',
  bidEnglish = 'bid_english',
  createEnglishAuction = 'create_english_auction',
  cancelEnglishAuction = 'cancel_english_auction',
  concludeEnglishAuction = 'conclude_english_auction',
  createDutchAuction = 'create_dutch_auction',
  cancelDutchAuction = 'cancel_dutch_auction',
  concludeDutchAuction = 'conclude_dutch_auction',
  acceptDutch = 'accept_dutch',
  burn = 'burn',
}

export enum HistoryEventName {
  bidPlaced = 'Bid Placed',
  burn = 'Burn',
  buy = 'Buy',
  dutchAuctionCancelled = 'Dutch Auction Cancelled',
  dutchAuctionCreated = 'Dutch Auction Created',
  englishAuctionCancelled = 'English Auction Cancelled',
  englishAuctionCreated = 'English Auction Created',
  list = 'List',
  listingCancelled = 'Listing Cancelled',
  mint = 'Mint',
  noSale = 'No Sale',
  offer = 'Offer',
  offerCancelled = 'Offer Cancelled',
  revealed = 'Revealed',
  sale = 'Sale',
  sell = 'Sell',
  transferred = 'Transferred',
}

export enum PoolEvent {
  add = 'addLiquidity',
  remove = 'removeLiquidity',
}

export enum IconType {
  github = 'github',
  twitter = 'twitter',
  discord = 'discord',
  info = 'info',
  warning = 'warning',
  externalLink = 'externalLink',
  transfer = 'transfer',
  incoming = 'incoming',
  outgoing = 'outgoing',
  plus = 'plus',
  swap = 'swap',
  arrow = 'arrow',
  arrowRight = 'arrowRight',
  arrowDown = 'arrowDown',
  arrowsLeftRight = 'arrowsLeftRight',
  chevronUpDown = 'chevronUpDown',
  eye = 'eye',
  xMark = 'xMark',
  barsArrowUp = 'barsArrowUp',
  barsArrowDown = 'barsArrowDown',
  shoppingBag = 'shoppingBag',
  handRaised = 'handRaised',
  handThumbUp = 'handThumbUp',
  tag = 'tag',
  lockClosed = 'lockClosed',
  fire = 'fire',
}
