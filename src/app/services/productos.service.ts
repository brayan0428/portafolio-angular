import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  cargando = true;
  productos:Producto[] = [];
  productoFiltrado:Producto[] = [];

  constructor(private http:HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){
    return new Promise((resolve,reject) => {
      this.http.get('https://angular-portafolio-a3579.firebaseio.com/productos_idx.json').subscribe(
        (res:Producto[]) => {
          this.productos = res;
          this.cargando = false;
          resolve();
        });
    })
  }

  cargarProductoxId(id:string){
    return this.http.get(`https://angular-portafolio-a3579.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino:string){
    if(this.productos.length === 0){
      this.cargarProductos().then(() => {
        this.filtrarProducto(termino);
      })
    }else{
      this.filtrarProducto(termino);
    }
  }

  private filtrarProducto(termino:string){
    this.productoFiltrado = [];
    this.productos.forEach(prod => {
      if(prod.categoria.indexOf(termino) >= 0 || prod.titulo.toLowerCase().indexOf(termino) >= 0){
        this.productoFiltrado.push(prod);
      }
    })
  }
}
