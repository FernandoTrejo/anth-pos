export interface Producto {
    id?: number;
    codigo: string;
    nombre: string,
    imagen: string;
    precio: number;
    status: string;
    existencias: number;
    id_categoria: number;
}

export interface Categoria {
    id?: number;
    codigo: string;
    nombre: string;
    productos?: Array<Producto>
}

export const listaCategorias = () => {
    return [
        {
            codigo: 'categoria_1',
            nombre: 'Categoria 1',
            productos: [
                {
                    codigo: 'prod1',
                    nombre: 'Producto 1 de Cat 1',
                    imagen: 'https://cdn0.recetasgratis.net/es/posts/2/4/9/pastel_de_fresa_23942_600.webp',
                    precio: 10.50,
                    status: 'activo',
                    id_categoria: 0
                },
                {
                    codigo: 'prod2',
                    nombre: 'Producto 2 de Cat 1',
                    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Pound_layer_cake.jpg/330px-Pound_layer_cake.jpg',
                    precio: 10.50,
                    status: 'activo',
                    id_categoria: 0
                }
            ]
        },
        {
            codigo: 'categoria_2',
            nombre: 'Categoria 2',
            productos: [
                {
                    codigo: 'prod3',
                    nombre: 'Producto 1 de Cat 2',
                    imagen: 'https://cdn0.recetasgratis.net/es/posts/2/4/9/pastel_de_fresa_23942_600.webp',
                    precio: 10.50,
                    status: 'activo',
                    id_categoria: 0
                },
                {
                    codigo: 'prod4',
                    nombre: 'Producto 2 de Cat 2',
                    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Pound_layer_cake.jpg/330px-Pound_layer_cake.jpg',
                    precio: 10.50,
                    status: 'activo',
                    id_categoria: 0
                }
            ]
        },
        {
            codigo: 'categoria_3',
            nombre: 'Categoria 3',
            productos: [
                {
                    codigo: 'prod5',
                    nombre: 'Producto 1 de Cat 3',
                    imagen: 'https://cdn0.recetasgratis.net/es/posts/2/4/9/pastel_de_fresa_23942_600.webp',
                    precio: 5.25,
                    status: 'activo',
                    id_categoria: 0
                },
                {
                    codigo: 'prod6',
                    nombre: 'Producto 2 de Cat 3',
                    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Pound_layer_cake.jpg/330px-Pound_layer_cake.jpg',
                    precio: 3.75,
                    status: 'activo',
                    id_categoria: 0
                }
            ]
        },
        {
            codigo: 'categoria_4',
            nombre: 'Categoria 4',
            productos: [
                {
                    codigo: 'prod7',
                    nombre: 'Producto 1 de Cat 4',
                    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Pound_layer_cake.jpg/330px-Pound_layer_cake.jpg',
                    precio: 10.50,
                    status: 'activo',
                    id_categoria: 0
                },
                {
                    codigo: 'prod8',
                    nombre: 'Producto 2 de Cat 4',
                    imagen: 'https://cdn0.recetasgratis.net/es/posts/2/4/9/pastel_de_fresa_23942_600.webp',
                    precio: 20.60,
                    status: 'activo',
                    id_categoria: 0
                }
            ]
        }
    ]
}
