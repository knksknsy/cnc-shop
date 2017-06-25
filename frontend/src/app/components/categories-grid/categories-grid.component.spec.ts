/**
*  Copyright (C) 2017
*
*  Eli K.
*
*  MIT License
*/



import { CategoriesGridComponent } from './categories-grid.component';
describe ('CategoriesGrid Component:', ()=> {

  // Test if the component ' Categories-grid ' created ***********
  it('should be created', () => {
    let categoriwGrid = new CategoriesGridComponent();
    expect (categoriwGrid).toBeTruthy ();
  })
})