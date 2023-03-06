import { Component } from '@angular/core';
import { db } from 'src/app/storage/db';
import { Categoria, Producto } from 'src/app/storage/schema/productos/productos_categorias';


@Component({
  selector: 'app-importar-productos',
  templateUrl: './importar-productos.component.html',
  styleUrls: ['./importar-productos.component.css']
})
export class ImportarProductosComponent {
  delimitador = '';
  csvData = '';
  reemplazarInventario = false;

  categoriesWithProducts: Categoria[] = [];


  async importar() {
    if (this.reemplazarInventario) {

      await db.productos.clear();
      await db.categorias.clear();
    }

    let filas = this.csvData.split('\n');
    for (let fila of filas) {
      let campos = fila.split(this.delimitador);
      let codigoCategoria = campos[0];
      let nombreCategoria = campos[1];
      let codigoProd = campos[2];
      let nombreProd = campos[3];
      let precioProd = campos[4];
      let existencias = campos[5];

      this.addCategoryProduct(
        codigoCategoria,
        nombreCategoria,
        codigoProd,
        nombreProd,
        precioProd,
        existencias
      );
    }

    console.log(this.categoriesWithProducts);
    await this.guardarProductos();
  }

  addCategoryProduct(
    codigoCategoria: string,
    nombreCategoria: string,
    codigoProd: string,
    nombreProd: string,
    precioProd: string,
    existencias: string
  ) {
    const categoriaEncontrada = this.categoriesWithProducts.find(categoria => {
      return codigoCategoria == categoria.codigo;
    });

    if (categoriaEncontrada != undefined) {
      categoriaEncontrada.productos?.push({
        codigo: codigoProd,
        nombre: nombreProd,
        imagen: '',
        precio: Number(precioProd),
        status: 'activo',
        existencias: Number(existencias),
        id_categoria: 0,
        stock_inicial: Number(existencias),
      });
    } else {
      const categoriaAgregar: Categoria = {
        codigo: codigoCategoria,
        nombre: nombreCategoria,
        productos: [
          {
            codigo: codigoProd,
            nombre: nombreProd,
            imagen: '',
            precio: Number(precioProd),
            status: 'activo',
            existencias: Number(existencias),
            id_categoria: 0,
            stock_inicial: Number(existencias),
          }
        ]
      };

      this.categoriesWithProducts.push(categoriaAgregar);
    }
  }

  async guardarProductos(){
    //insertar categorias y productos
    for (let categoria of this.categoriesWithProducts) {
      const idCategoria = await db.categorias.add({
        codigo: categoria.codigo,
        nombre: categoria.nombre
      });

      categoria.productos?.forEach((producto) => {
        producto.id_categoria = idCategoria;
      })
      await db.productos.bulkAdd(categoria.productos as Array<Producto>);

    }

    alert('Importacion Finalizada');
  }
}
