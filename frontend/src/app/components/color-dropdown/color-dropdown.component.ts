import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-dropdown',
  templateUrl: './color-dropdown.component.html',
  styleUrls: ['./color-dropdown.component.scss']
})
export class ColorDropdownComponent {
  private _colors: Array<any> = [];
  private _limit: number;

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  public isCollapsed: boolean = false;
  public selectedColors: Array<{ name: string, hexcode: string }> = [];
  public colorCounter: number = 0;

  get colors(): Array<any> {
    return this._colors;
  }

  @Input()
  set colors(colors: Array<any>) {
    this._colors = colors;
  }

  get limit(): any {
    return this._limit;
  }

  @Input()
  set limit(limit: any) {
    this._limit = limit;
  }

  constructor() { }

  selectColor(ev: any, color: any) {
    // populate and handle selectedColors array
    let indexSC = this.selectedColors.findIndex((c) => {
      return c.name === color.name && c.hexcode === color.hexcode;
    });
    let indexC = this.colors.findIndex((c) => {
      return c.name === color.name && c.hexcode === color.hexcode;
    });
    if (this.selectedColors.length < this.limit) {
      if (ev.target.checked) {
        this.selectedColors.push({ name: color.name, hexcode: color.hexcode });
        this.colors[indexC].selected = true;
        this.colorCounter++;
      } else if (!ev.target.checked && indexSC !== -1) {
        this.selectedColors.splice(indexSC, 1);
        this.colors[indexC].selected = false;
        this.colorCounter--;
      }
    } else if (this.selectedColors.length === this.limit) {
      if (indexSC !== -1) {
        this.selectedColors.splice(indexSC, 1);
        this.colors[indexC].selected = false;
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

}
