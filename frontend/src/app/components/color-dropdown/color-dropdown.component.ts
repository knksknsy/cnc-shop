/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IColor } from '../../interfaces/color';

@Component({
  selector: 'app-color-dropdown',
  templateUrl: './color-dropdown.component.html',
  styleUrls: ['./color-dropdown.component.scss']
})
export class ColorDropdownComponent implements OnChanges {
  private _colors: Array<IColor> = [];
  private _limit: number;
  private _reset: boolean;

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  public isCollapsed: boolean = false;
  public selectedColors: Array<IColor> = [];
  public colorCounter: number = 0;

  get colors(): Array<IColor> {
    return this._colors;
  }

  @Input()
  set colors(colors: Array<IColor>) {
    this._colors = colors;
  }

  get limit(): any {
    return this._limit;
  }

  @Input()
  set limit(limit: any) {
    this._limit = limit;
  }

  get reset(): any {
    return this._reset;
  }

  @Input()
  set reset(reset: any) {
    this._reset = reset;
  }

  constructor() { }

  ngOnChanges() {
    this.resetColors();
  }

  selectColor(ev: any, color: any) {
    // populate and handle selectedColors array
    let indexSC = this.selectedColors.findIndex((c) => {
      return c.name === color.name && c.hexcode === color.hexcode;
    });
    if (this.selectedColors.length < this.limit) {
      if (color.selected) {
        this.selectedColors.push({ name: color.name, hexcode: color.hexcode });
        this.colorCounter++;
      } else if (!color.selected && indexSC !== -1) {
        this.selectedColors.splice(indexSC, 1);
        this.colorCounter--;
      }
    } else if (this.selectedColors.length === this.limit) {
      if (indexSC !== -1) {
        this.selectedColors.splice(indexSC, 1);
        this.colorCounter--;
      }
    }
    if (this.selectedColors.length === this.limit) {
      this.onSelect.emit({ selectedColors: this.selectedColors });
    } else {
      this.onSelect.emit(false);
    }
  }

  expanded(ev: any) {

  }

  collapsed(ev: any) {

  }

  resetColors() {
    if (this.reset) {
      this.selectedColors = [];
      this.colorCounter = 0;
      this.colors.forEach((color) => {
        color.selected = false;
      });
    }
  }

}
