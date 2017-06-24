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
    let categoriwsGrid = new CategoriesGridComponent();
    expect (categoriwsGrid).toBeTruthy ();
  })
})