/**
 * Author: Frank Kwizera
 */

 
const UserManagementServerRoutes = {
    CREATE_USER: '/create/user',
    USER_LOGIN: '/user/login',
    USER_LOGOUT: '/user/logout'

}


const ItemManagementServerRoutes = {
    CREATE_ITEM: '/create/item',
    RETRIEVE_ALL_ITEMS: '/retrieve/all/items',
    RETRIEVE_ITEM_DETAILS: '/retrieve/item/details/'

}


const BidManagementServerRoutes = {
    CREATE_BID: '/create/bid',
    REGISTER_USER_AUTO_CONFI_BID: '/register/auto/bid/config',
    REGISTER_AUTO_BID: '/register/auto/bid'
}

export default {
    BidManagementServerRoutes, 
    ItemManagementServerRoutes, 
    UserManagementServerRoutes
}