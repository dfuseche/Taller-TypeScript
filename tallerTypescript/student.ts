export class Student {
    name: string;
    edad: number;
    codigo: string;
    cedula: string;
    direccion: string;
    telefono: string;
  
    constructor(name: string, edad:number, cedula: string, codigo: string, direccion: string, telefono: string) {
      this.name = name;
      this.codigo = codigo;
      this.cedula = cedula;
      this.edad = edad;
      this.direccion =direccion;
      this.telefono =  telefono;
    }
  }