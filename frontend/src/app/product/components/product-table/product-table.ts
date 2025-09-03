import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Product } from '../../../shared/models/product';
import { ProductApi } from '../../../shared/services/product-api';

@Component({
  selector: 'app-product-table',
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './product-table.html',
  styleUrl: './product-table.css',
})
export class ProductTable implements OnInit {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$!: Observable<Product[]>;
  editingProduct = signal<Product | null>(null);
  showAddForm = signal(false);
  newProduct = signal<Product>({
    name: '',
    image: '',
    sku: '',
    price: 0,
    quantity: 0,
  });

  constructor(private productService: ProductApi) {}

  ngOnInit() {
    this.products$ = this.productService.getAll();
  }

  toggleAddForm() {
    this.showAddForm.update((value) => !value);
  }

  add() {
    this.productService.add(this.newProduct()).subscribe({
      next: (product) => {
        this.resetNewProduct();
        this.productsSubject.next([...this.productsSubject.value, product]);
      },
      error: (error) => alert('Error adding product'),
    });
  }

  edit(product: Product) {
    this.editingProduct.set({ ...product });
  }

  saveEdit() {
    if (this.editingProduct()) {
      this.productService.update(this.editingProduct()!).subscribe({
        next: (product) => {
          console.log('Product updated:', product);
          this.editingProduct.set(null);
        },
        error: (err) => console.error('Error updating product', err),
      });
    }
  }

  delete(id: number) {
    this.productService.delete(id).subscribe({
      next: () => {},
      error: (error) => alert('Error deleting product'),
    });
  }

  cancelEdit() {
    this.editingProduct.set(null);
  }

  resetNewProduct() {
    this.newProduct.set({
      name: '',
      image: '',
      sku: '',
      price: 0,
      quantity: 0,
    });
  }
}
