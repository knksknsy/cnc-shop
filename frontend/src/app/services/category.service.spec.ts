/**
*  Copyright (C) 2017
*
*  Eli K.
*
*  MIT License
*/



//Import the async and TestBed test-Utility
import { TestBed, async, inject } from '@angular/core/testing';

//Import the service to be tested
import { CategoryService } from './category.service';

//Import the HttpModule
import {HttpModule} from '@angular/http';

//Import a created Moch data
import { MockCategories } from "app/services/categoties.data.mock";

describe('Category Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService],
      imports: [HttpModule]
    });
  });

 //1. Test if the service ' Category.service' is correctly created
  it('should be created', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));


//2. Test the Response of the API - call
it('schould return CATEGORIES after the API Call', inject ([CategoryService], (service: CategoryService) => {
  return service.getCategories().subscribe ( data => {
    expect (data).toEqual (MockCategories);
  })
}))
});
