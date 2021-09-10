import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { BidParams, Item, ItemAutoBidParams, User, UserAutoBidConfig } from 'src/app/shared/types';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {
  item!: Item;
  bid_amount_in_usd!: number;
  countDownText: string = 'Initializing count down timer...';
  user!: User;
  userAutoBidConfigForm: FormGroup;
  constructor(
      private _activatedRoute: ActivatedRoute, private _apiService: ApiService,
      private _formBuilder: FormBuilder) {
    this.userAutoBidConfigForm = this.createUserAutoBidConfigForm();
    this._activatedRoute.params.subscribe(params => {
      this.retrieveItemDetails(params.item_uuid)
    });

    const jsonfiedUser: string | null = localStorage.getItem("user");
    if (jsonfiedUser != null) {
      this.user = JSON.parse(jsonfiedUser);
    }
   }


  createUserAutoBidConfigForm(): any {
    return this._formBuilder.group({
      max_bid_amount_in_usd: [, [Validators.required]]
    });
  }

  ngOnInit(): void {}

  /**
   * Retrieves single item details.
   * @param itemUUID - UUID representing target item.
   */
  retrieveItemDetails(itemUUID: string): void {
    this._apiService.retrieveItemDetails(itemUUID).subscribe(response => {
      this.item = response;
      this.initializeCountDownTimer(this.item.bid_expiration_timestamp);
    }, err => {
      alert(err.error.message);
    })
  };

  /**
   * Initializes item bid expiration timer.
   * @param bid_expiration_timestamp - Item bid expiration time.
   */
  initializeCountDownTimer(bid_expiration_timestamp: string): void {
    // Set the date we're counting down to
    const countDownDate: number = new Date(bid_expiration_timestamp).getTime();
    
    const thisInterval = this;
    // Update the count down every 1 second
    const countDownInterval = setInterval(function () {

      // Get today's date and time
      const now: number = new Date().getTime();

      // Find the distance between now and the count down date
      const distance: number = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days: number = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours: number = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes: number = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds: number = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      thisInterval.countDownText = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(countDownInterval);
        thisInterval.countDownText  = "EXPIRED";
      }
    }, 1000);
  }

  /**
   * Submits the user item bid.
   */
  bidNow(): void {
    if (this.bid_amount_in_usd == undefined) {
      alert('There is no valid bid amount.')
      return;
    };
    
    const bidParams: BidParams = {
      bid_price_in_usd: this.bid_amount_in_usd,
      bid_item_uuid: this.item.item_uuid,
      bidder_uuid: this.user.user_uuid
    };

    this._apiService.bidNow(bidParams).subscribe(response => {
      this.retrieveItemDetails(this.item.item_uuid);
    }, err => {
      alert(err.error.message)
    });
  };

  /**
   * Registers user auto bid configuration.
   */
  registerUserAutoBidConfig(): void {
    if (this.userAutoBidConfigForm.valid) {
      const userAutoBidConfig: UserAutoBidConfig = {
        max_bid_amount_in_usd: this.userAutoBidConfigForm.value.max_bid_amount_in_usd,
        bidder_uuid: this.user.user_uuid
      }

      this._apiService.registerUserAutoBidConfig(userAutoBidConfig).subscribe(response => {
      }, err => {
        alert(err.error.message)
      })
      return
    }

    alert('Fill in maximum auto bid amount.')
  };

  /**
   * Registers item auto bid.
   */
  registerItemAutoBid(): void {
    const itemAutoBidParams: ItemAutoBidParams = {
      bidder_uuid: this.user.user_uuid,
      bid_item_uuid: this.item.item_uuid
    };

    this._apiService.registerItemAutoBid(itemAutoBidParams).subscribe(response => {
      this.retrieveItemDetails(response.bid_item_uuid);
      alert('Auto bid registered successfully.')
    }, err => {
      alert(err.error.message)
    })
  }
}
