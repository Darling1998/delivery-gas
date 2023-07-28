export interface Producto{
    id_producto:number;
    nombre:string;
    descripcion:string;
    foto:string;
    precio:number;
    stock?:number;
}