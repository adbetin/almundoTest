import { Component, OnInit } from '@angular/core';
import { Hotel } from '../hotel';
import { HotelService } from '../hotel.service';
import { HotelDetailsComponent } from '../hotel-details/hotel-details.component';

@Component({
  selector: 'hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
  providers: [HotelService]
})
export class HotelListComponent implements OnInit {

  hotels: Hotel[];
  selectedHotel: Hotel;

  constructor(private hotelService: HotelService) { }

  ngOnInit() {
     this.hotelService
      .gethotels()
      .then((hotels: Hotel[]) => {
        this.hotels = hotels.map((hotel) => {
          return hotel;
        });
      });
  }

  private getIndexOfHotel = (hotelId: String) => {
    return this.hotels.findIndex((hotel) => {
      return hotel._id === hotelId;
    });
  }

  selectHotel(hotel: Hotel) {
    this.selectedHotel = hotel
  }

  createNewHotel() {
    var hotel: Hotel = {
      name: '',
      price: 0,
      image: '',
      stars: 0,
      amenities: []
    };

    // By default, a newly-created hotel will have the selected state.
    this.selectHotel(hotel);
  }

  updateHotel = (hotel: Hotel) => {
    var idx = this.getIndexOfHotel(hotel._id);
    if (idx !== -1) {
      this.hotels[idx] = hotel;
      this.selectHotel(hotel);
    }
    return this.hotels;
  }

}
