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


// {
//     "bid_expiration_timestamp": "Thu, 09 Sep 2021 18:36:39 GMT",
//     "item_auto_bidders": [],
//     "item_base_price_in_usd": 200,
//     "item_bids": [
//         {
//             "bid_id": 1,
//             "bid_item_uuid": "af4ec1ce-a6ed-4e08-a7ea-a586ee18959d",
//             "bid_price_in_usd": 250,
//             "bid_uuid": "05459d93-e4de-46da-ba91-73abc1c729bf",
//             "bidder_uuid": "debb9081-b03b-4942-b37e-89ea3d181379"
//         }
//     ],
// }