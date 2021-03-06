import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() loading = false;

  constructor() {}

  ngOnInit(): void {}
}
