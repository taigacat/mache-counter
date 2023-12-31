/**
 * Represents a gift.
 * @interface
 */
export interface Gift {
  name: string;
  count: number;
  sender: string;
  icon?: string;
}

/**
 * Represents an indexed gift.
 */
export interface IndexedGift extends Gift {
  index: number;
}
