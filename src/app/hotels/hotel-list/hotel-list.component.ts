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
  Arr = Array;

  hotelName: string = '';
  options = [
    { name: '5 estrellas', value: '5', checked: false },
    { name: '4 estrellas', value: '4', checked: false },
    { name: '3 estrellas', value: '3', checked: false },
    { name: '2 estrellas', value: '2', checked: false },
    { name: '1 estrellas', value: '1', checked: false }
  ];

  constructor(private hotelService: HotelService) { }

  ngOnInit() {
    this.searchHotels();
  }



  private getIndexOfHotel = (hotelId: String) => {
    return this.hotels.findIndex((hotel) => {
      return hotel._id === hotelId;
    });
  }

  selectHotel(hotel: Hotel) {
    this.selectedHotel = hotel
  }

  searchHotels() {
    let query = '';
    if(this.hotelName){
      query = "name="+this.hotelName;
    }

    for(let i = 0; i < this.options.length; i++){
      if(this.options[i].checked){
        if(query){
          query += '&';
        }
        query += 'stars='+this.options[i].value;
      }
    }

    this.hotelService
    .gethotels(query)
    .then((hotels: Hotel[]) => {
      this.hotels = hotels.map((hotel) => {
        return hotel;
      });
    });
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
