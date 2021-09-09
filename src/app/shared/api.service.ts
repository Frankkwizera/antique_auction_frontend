/**
 * Author: Frank Kwizera
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item, LoginParams, User } from 'src/app/shared/types';
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
}
