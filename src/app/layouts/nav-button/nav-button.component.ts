import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.css']
})
export class NavButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() navigate!: () => void;

  constructor() { }

  ngOnInit(): void {
  }

}
