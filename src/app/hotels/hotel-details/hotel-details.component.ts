import { Component, OnInit, Input } from '@angular/core';
import { Hotel } from '../hotel';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css'],
  providers: [HotelService]
})
export class HotelDetailsComponent implements OnInit {

  @Input()
  hotel: Hotel;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private hotelService: HotelService) {}

  createHotel(hotel: Hotel) {
    this.hotelService.createhotel(hotel).then((newHotel: Hotel) => {
      this.createHandler(newHotel);
    });
  }

  updateHotel(hotel: Hotel): void {
    this.hotelService.updatehotel(hotel).then((updatedHotel: Hotel) => {
      this.updateHandler(updatedHotel);
    });
  }

  deleteHotel(hotel: String): void {
    this.hotelService.deletehotel(hotel).then((deletedHotelId: String) => {
      this.deleteHandler(deletedHotelId);
    });
  }

  ngOnInit() {
  }

}
