/**
 * Author: Frank Kwizera
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bid, BidParams, Item, ItemAutoBid, ItemAutoBidParams, LoginParams, User, UserAutoBid, UserAutoBidConfig } from 'src/app/shared/types';
import ServerRoutes from 'src/app/shared/routes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BACKEND_URL: string = 'http://localhost:5050';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'}),
    body: null
  };

  constructor(private httpClient: HttpClient) { }

  /**
   * Appends endpoint to the backend url link.
   * @param endpoint - Endpoint to append.
   * @returns - Full endpoint.
   */
  generateEndpoint(endpoint: string) {
    return this.BACKEND_URL + endpoint;
  };

  /**
   * Authenticates the user.
   * @param userParams - User login parameters.
   * @returns - User object observable.
   */
  userLogin(userParams: LoginParams): Observable<User> {
    return this.httpClient.post<User>(
      this.generateEndpoint(ServerRoutes.UserManagementServerRoutes.USER_LOGIN), userParams)
  }

  /**
   * Retrieves all items.
   * @returns - List of items.
   */
  retrieveAllItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(
      this.generateEndpoint(ServerRoutes.ItemManagementServerRoutes.RETRIEVE_ALL_ITEMS))
  }

  /**
   * Retrieve item details.
   * @param itemUUID - UUID representing the target item.
   * @returns - Item details object.
   */
  retrieveItemDetails(itemUUID: string): Observable<Item> {
    return this.httpClient.get<Item>(
      this.generateEndpoint(ServerRoutes.ItemManagementServerRoutes.RETRIEVE_ITEM_DETAILS + `/${itemUUID}`));
  }

  /**
   * Submits a bid
   * @param bidParams - Bid parameters.
   * @returns - Bid details object. 
   */
  bidNow(bidParams: BidParams): Observable<Bid> {
    return this.httpClient.post<Bid>(
      this.generateEndpoint(ServerRoutes.BidManagementServerRoutes.CREATE_BID), bidParams)
  }

  /**
   * Registers user auto bid configuration
   * @param userAutoBidConfig - User auto bid configuration.
   * @returns User auto bid configuration.
   */
  registerUserAutoBidConfig(userAutoBidConfig: UserAutoBidConfig): Observable<UserAutoBid> {
    return this.httpClient.post<UserAutoBid>(
      this.generateEndpoint(ServerRoutes.BidManagementServerRoutes.REGISTER_USER_AUTO_CONFI_BID), userAutoBidConfig)
  };

  /**
   * Registers item auto bid configuration
   * @param itemAutoBidParams - Item auto bid parameters.
   * @returns Item auto bid object.
   */
  registerItemAutoBid(itemAutoBidParams: ItemAutoBidParams): Observable<ItemAutoBid> {
    return this.httpClient.post<ItemAutoBid>(
      this.generateEndpoint(ServerRoutes.BidManagementServerRoutes.REGISTER_AUTO_BID), itemAutoBidParams)
  };
}
