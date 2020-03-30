import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var codigoEstudiante = document.getElementById('codigo');
var cedulaEstudiante = document.getElementById('cedula');
var edadEstudiante = document.getElementById('edad');
var direccionEstudiante = document.getElementById('direccion');
var telefonoEstudiante = document.getElementById('telefono');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCreditos = document.getElementById("button-filterByCreditos");
var btnfilterByCreditosMaxMin = document.getElementById("button-filterByCreditosMaxMin");
var inputSearchBox = document.getElementById("search-box");
var inputMinSearchBox = document.getElementById("searchMin-box");
var inputMaxSearchBox = document.getElementById("searchMax-box");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCreditos.onclick = function () { return applyFilterByCreditos(); };
btnfilterByCreditosMaxMin.onclick = function () { return applyFilterMaxMinByCreditos(); };
renderCoursesInTable(dataCourses);
ponerInformacion(dataStudent);
ponerCedula(dataStudent);
ponerEdad(dataStudent);
ponerDireccion(dataStudent);
ponerTelefono(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function ponerInformacion(student) {
    student.forEach(function (estudiante) {
        var tdCodigo = document.createElement("tr");
        tdCodigo.innerHTML = "<td>C\u00F3digo</td>\n                              \n                              <td>" + estudiante.codigo + "</td>";
        codigoEstudiante.appendChild(tdCodigo);
    });
}
function ponerCedula(student) {
    student.forEach(function (estudiante) {
        var tdCodigo = document.createElement("tr");
        tdCodigo.innerHTML = " <td>C\u00E9dula</td>\n                              <td>" + estudiante.cedula + "</td>\n                              ";
        cedulaEstudiante.appendChild(tdCodigo);
    });
}
function ponerEdad(student) {
    student.forEach(function (estudiante) {
        var tdCodigo = document.createElement("tr");
        tdCodigo.innerHTML = " <td>Edad</td>\n                              <td>" + estudiante.edad + "</td>\n                              ";
        edadEstudiante.appendChild(tdCodigo);
    });
}
function ponerDireccion(student) {
    student.forEach(function (estudiante) {
        var tdCodigo = document.createElement("tr");
        tdCodigo.innerHTML = " <td>Direcci\u00F3n</td>\n                              <td>" + estudiante.direccion + "</td>\n                              ";
        direccionEstudiante.appendChild(tdCodigo);
    });
}
function ponerTelefono(student) {
    student.forEach(function (estudiante) {
        var tdCodigo = document.createElement("tr");
        tdCodigo.innerHTML = " <td>T\u00E9lefono</td>\n                              <td>" + estudiante.telefono + "</td>\n                              ";
        telefonoEstudiante.appendChild(tdCodigo);
    });
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByCreditos() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var numero = parseInt(text);
    var coursesFiltered = searchCourseByCreditos(numero, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterMaxMinByCreditos() {
    var min = inputMinSearchBox.value;
    var max = inputMaxSearchBox.value;
    min = (min == null) ? '' : min;
    max = (max == null) ? '' : max;
    clearCoursesInTable();
    var minimo = parseInt(min);
    var maximo = parseInt(max);
    var coursesFiltered = searchCourseByCreditosMaxMin(minimo, maximo, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCreditosMaxMin(minimo, maximo, courses) {
    return minimo === 0 ? dataCourses : courses.filter(function (c) {
        return c.credits >= minimo && c.credits <= maximo;
    });
}
function searchCourseByCreditos(text, courses) {
    return text === 0 ? dataCourses : courses.filter(function (c) {
        return c.credits === text;
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
