import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';
import {dataStudent} from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let codigoEstudiante: HTMLElement = document.getElementById('codigo')!;
let cedulaEstudiante: HTMLElement = document.getElementById('cedula')!;
let edadEstudiante: HTMLElement = document.getElementById('edad')!;
let direccionEstudiante: HTMLElement = document.getElementById('direccion')!;
let telefonoEstudiante: HTMLElement = document.getElementById('telefono')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCreditos: HTMLElement = document.getElementById("button-filterByCreditos")!;
const btnfilterByCreditosMaxMin: HTMLElement = document.getElementById("button-filterByCreditosMaxMin")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputMinSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("searchMin-box")!;
const inputMaxSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("searchMax-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCreditos.onclick =()=> applyFilterByCreditos();
btnfilterByCreditosMaxMin.onclick = ()=>applyFilterMaxMinByCreditos();

renderCoursesInTable(dataCourses);

ponerInformacion(dataStudent);

ponerCedula(dataStudent);

ponerEdad(dataStudent);

ponerDireccion(dataStudent);

ponerTelefono(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function ponerInformacion(student: Student[]): void
{
    student.forEach((estudiante) => {
        let tdCodigo = document.createElement("tr");
        tdCodigo.innerHTML = `<td>Código</td>
                              
                              <td>${estudiante.codigo}</td>`
                              
     codigoEstudiante.appendChild(tdCodigo);
    });
    
}

function ponerCedula(student: Student[]): void
{
    student.forEach((estudiante) => {
        let tdCodigo = document.createElement("tr");
        tdCodigo.innerHTML = ` <td>Cédula</td>
                              <td>${estudiante.cedula}</td>
                              `;
        cedulaEstudiante.appendChild(tdCodigo);
    });
    
}
function ponerEdad(student: Student[]): void
{
    student.forEach((estudiante) => {
        let tdCodigo = document.createElement("tr");
        tdCodigo.innerHTML = ` <td>Edad</td>
                              <td>${estudiante.edad}</td>
                              `;
         edadEstudiante.appendChild(tdCodigo);
    });
    
}
function ponerDireccion(student: Student[]): void
{
    student.forEach((estudiante) => {
        let tdCodigo = document.createElement("tr");
        tdCodigo.innerHTML = ` <td>Dirección</td>
                              <td>${estudiante.direccion}</td>
                              `;
         direccionEstudiante.appendChild(tdCodigo);
    });
    
}

function ponerTelefono(student: Student[]): void
{
    student.forEach((estudiante) => {
        let tdCodigo = document.createElement("tr");
        tdCodigo.innerHTML = ` <td>Télefono</td>
                              <td>${estudiante.telefono}</td>
                              `;
         telefonoEstudiante.appendChild(tdCodigo);
    });
    
}


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function applyFilterByCreditos()
{
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let numero = parseInt(text)
  let coursesFiltered: Course[] = searchCourseByCreditos(numero, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterMaxMinByCreditos()
{
  let min = inputMinSearchBox.value;
  let max = inputMaxSearchBox.value;
  min = (min == null) ? '' : min;
  max = (max == null) ? '' : max;
  clearCoursesInTable();
  let minimo = parseInt(min)
  let maximo = parseInt(max)
  let coursesFiltered: Course[] = searchCourseByCreditosMaxMin(minimo, maximo, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByCreditosMaxMin(minimo:number, maximo:number, courses: Course[])
{
    return minimo === 0 ? dataCourses : courses.filter( c => 
        c.credits >= minimo && c.credits <= maximo);
}

function searchCourseByCreditos(text:number, courses: Course[])
{
    return text === 0 ? dataCourses : courses.filter( c => 
        c.credits === text);
}
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}