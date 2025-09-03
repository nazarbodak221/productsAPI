import { Component, OnInit } from '@angular/core';
import { ProductCard } from '../product/components/product-card/product-card';
import { Product } from '../shared/models/product';
import { Observable } from 'rxjs';
import { ProductApi } from '../shared/services/product-api';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [ProductCard, AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  products$!: Observable<Product[]>;
  constructor(private productService: ProductApi) {}

  ngOnInit() {
    this.products$ = this.productService.getLatest3();
  }
}
