/**
 * Author: Frank Kwizera
 */

export interface LoginParams {
    user_email: string,
    user_password: string
}

export interface User {
    user_email: string,
    user_id: number,
    user_names: string,
    user_uuid: string
}

export interface Item {
    item_description: string,
    item_id: number,
    item_name: string,
    item_owner_uuid: string,
    item_uuid: string,
    item_base_price_in_usd: number,
    bid_expiration_timestamp: string,
    item_bids: ItemBid[]
}

export interface ItemBid {
    bid_id: number,
    bid_uuid: string,
    bid_price_in_usd: number,
    bid_item_uuid: string,
    bidder_uuid: string
}

export interface Bid {
    bid_id: number,
    bid_uuid: string,
    bid_price_in_usd: number,
    bid_item_uuid: string,
    bidder_uuid: string
}

export interface BidParams {
    bid_price_in_usd: number,
    bid_item_uuid: string,
    bidder_uuid: string
}