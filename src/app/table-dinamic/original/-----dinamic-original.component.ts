// import { CommonModule } from '@angular/common';
// import { Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// export enum ColumnType {
//   TEXT = 'text',
//   NUMBER = 'number',
//   CUSTOM_SUM = 'custom_sum'
// }

// export enum RowType {
//   NORMAL = 'normal',
//   SUBTOTAL = 'subtotal',
//   TOTAL = 'total',
//   SECTION_TITLE = 'section_title',
//   CUSTOM_TOTAL = 'custom_total'
// }

// export type CellValue = number | string;

// export interface Column {
//   type: ColumnType;
//   title: string;
//   columnsToSum?: number[];  // columnas a sumar en caso de CUSTOM_SUM
// }

// export interface Row {
//   data: CellValue[];
//   type: RowType;
//   tableIndexesToSum?: number[]; // para filas CUSTOM_TOTAL (suma de otras tablas)
// }

// export interface Table {
//   sections: Row[][];
//   showHeader: boolean;
//   globalTotalRow: Row;
//   showGlobalTotal: boolean;
//   name: string;
// }

// @Component({
//   selector: 'app-table-dinamic',
//   standalone: true,
//   imports: [CommonModule, FormsModule, NgbDropdownModule],
//   templateUrl: './table-dinamic.component.html',
//   styleUrls: ['./table-dinamic.component.scss'],
// })
// export class TableDinamicComponent {
//   private readonly sanitizer = inject(DomSanitizer);

//   columns: Column[] = [
//     { type: ColumnType.TEXT, title: '' },
//   ];

//   tables: Table[] = [];


//   // ------------------------------------------
//   //           Datos iniciales
//   // ------------------------------------------
//   // columns: Column[] = [
//   //   { type: ColumnType.TEXT,  title: 'Activos' },
//   //   { type: ColumnType.TEXT,  title: 'Notas' },
//   //   { type: ColumnType.NUMBER, title: '31/01/2021' },
//   //   { type: ColumnType.NUMBER, title: '31/01/2020' },
//   // ];

//   // tables: Table[] = [
//   //   {
//   //     name: 'Activos',
//   //     sections: [
//   //       [
//   //         { data: ['Activos Corrientes'], type: RowType.SECTION_TITLE },
//   //         { data: ['Efectivo y equivalentes al efectivo.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Otros activos financieros.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Otros activos no financieros.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Deudores comerciales y otras cuentas por cobrar,neto', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Cuentas por cobrar a entidades relacionadas. ', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Inventarios,neto.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Activos por impuestos.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Total activos Corrientes', '', 70, 140], type: RowType.TOTAL }
//   //       ],
//   //       [
//   //         { data: ['Activos No Corrientes'], type: RowType.SECTION_TITLE },
//   //         { data: ['Otros activos financieros', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Otros activos no financieros', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Cuentas por cobrar.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Inversiones contabilizadas utilizando el método de la participación', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Activos intangibles distintos de la plusvalía, neto.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Plusvalía', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Propiedades, planta y equipo,neto', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Activos por impuestos diferidos', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Total Activos no corrientes', '', 80, 160], type: RowType.TOTAL }
//   //       ],
//   //       []
//   //     ],
//   //     showHeader: true,
//   //     globalTotalRow: {
//   //       data: ['Total Activos ', '', 150, 300],
//   //       type: RowType.TOTAL
//   //     },
//   //     showGlobalTotal: true
//   //   },
//   //   {
//   //     name: 'Pasivos',
//   //     sections: [
//   //       [
//   //         { data: ['Patrimonio y Pasivos'], type: RowType.SECTION_TITLE },
//   //         { data: ['Pasivos Corrientes'],   type: RowType.SECTION_TITLE },
//   //         { data: ['Otros pasivos financieros.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Cuentas por pagar comerciales y otras cuentas por pagar.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Cuentas por pagar a entidades relacionadas.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Otras provisiones.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Pasivos por impuestos', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Provisiones por beneficios a los empleados.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Otros pasivos no financieros.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Total Pasivos Corrientes', '', 70, 140], type: RowType.TOTAL },
//   //       ],
//   //       [
//   //         { data: ['Pasivos No Corrientes'], type: RowType.SECTION_TITLE },
//   //         { data: ['Otros pasivos financieros.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Cuentas por pagar.', '', '10', '20'],         type: RowType.NORMAL },
//   //         { data: ['Otras provisiones.', '', '10', '20'],         type: RowType.NORMAL },
//   //         { data: ['Pasivo por impuestos diferidos.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Provisiones por beneficios a los empleados.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Otros pasivos no financieros', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Total Pasivos No Corrientes', '', 60, 120],     type: RowType.TOTAL }
//   //       ],
//   //       []
//   //     ],
//   //     showHeader: false,
//   //     globalTotalRow: {
//   //       data: ['Total Pasivos', '', 130, 260],
//   //       type: RowType.TOTAL
//   //     },
//   //     showGlobalTotal: true
//   //   },
//   //   {
//   //     name: 'Patrimonio',
//   //     sections: [
//   //       [
//   //         { data: ['Patrimonio'],  type: RowType.SECTION_TITLE },
//   //         { data: ['Capital emitido', '', '10', '20'],               type: RowType.NORMAL },
//   //         { data: ['Ganancias acumuladas.', '', '10', '20'],         type: RowType.NORMAL },
//   //         { data: ['Otras reservas', '', '10', '20'],                type: RowType.NORMAL },
//   //         { data: ['Patrimonio atribuible a los propietarios de la controladora.', '', 30, 60], type: RowType.SUBTOTAL },
//   //         { data: ['Participaciones no controladoras.', '', '10', '20'], type: RowType.NORMAL },
//   //         { data: ['Total patrimonio', '', 40, 80], type: RowType.TOTAL }
//   //       ],
//   //       []
//   //     ],
//   //     showHeader: false,
//   //     globalTotalRow: { data: ['', '', 0, 0], type: RowType.TOTAL },
//   //     showGlobalTotal: false
//   //   },
//   //   {
//   //     name: 'Tabla 4',
//   //     sections: [
//   //       [
//   //         {
//   //           data: ['TOTAL PATRIMONIO Y PASIVOS', '', 170, 340],
//   //           type: RowType.CUSTOM_TOTAL,
//   //           tableIndexesToSum: [1, 2]
//   //         }
//   //       ]
//   //     ],
//   //     showHeader: false,
//   //     globalTotalRow: { data: ['', '', 0, 0], type: RowType.TOTAL },
//   //     showGlobalTotal: false
//   //   }
//   // ];

//   // Para la plantilla
//   readonly ColumnType = ColumnType;
//   readonly RowType = RowType;
//   readonly BUTTON_TEXTS = {
//     SHOW_TOTAL: 'Mostrar Total Global',
//     HIDE_TOTAL: 'Ocultar Total Global'
//   };

//   constructor() {
//     // Si quisieras crear siempre una tabla nueva en blanco, la llamas:
//     this.tables.push(this.createNewTable(true));
//   }

//   // -----------------------------------------
//   //     CREAR TABLA O FILA EN BLANCO
//   // -----------------------------------------
//   private createNewTable(showHeader: boolean): Table {
//     return {
//       name: `Tabla ${this.tables.length + 1}`,
//       sections: [[this.createNewRow(RowType.NORMAL)]],
//       showHeader,
//       globalTotalRow: this.createNewRow(RowType.TOTAL),
//       showGlobalTotal: false,
//     };
//   }

//   private createNewRow(type: RowType): Row {
//     return {
//       data: (type === RowType.SECTION_TITLE)
//         ? ['']
//         : this.columns.map(col => (col.type === ColumnType.NUMBER) ? 0 : ''),
//       type
//     };
//   }

//   // -----------------------------------------
//   //           MÉTODOS DE COLUMNAS
//   // -----------------------------------------
//   addColumn(position: number, type: ColumnType): void {
//     const newCol: Column = { type, title: '' };
//     if (type === ColumnType.CUSTOM_SUM) {
//       newCol.columnsToSum = [];
//     }

//     // 1) Insertar columna en el array de columnas
//     this.columns.splice(position, 0, newCol);

//     // 2) Ajustar cada tabla (secciones, filas) para meter la celda nueva
//     this.updateAllTablesColumns(table => {
//       table.sections.forEach(section => {
//         section.forEach(row => {
//           if (row.type !== RowType.SECTION_TITLE) {
//             row.data.splice(
//               position,
//               0,
//               (type === ColumnType.NUMBER || type === ColumnType.CUSTOM_SUM) ? 0 : ''
//             );
//           }
//         });
//       });
//     });

//     // 3) Recalcular todo
//     this.recalcAllTables();
//   }

//   removeColumn(index: number): void {
//     if (this.columns.length <= 1) return;

//     // 1) Quitar la columna del array
//     this.columns.splice(index, 1);

//     // 2) Eliminar la celda en cada fila
//     this.updateAllTablesColumns(table => {
//       table.sections.forEach(section => {
//         section.forEach(row => {
//           if (row.type !== RowType.SECTION_TITLE) {
//             row.data.splice(index, 1);
//           }
//         });
//       });
//     });

//     // 3) Podrías recalcular todo también si deseas
//     this.recalcAllTables();
//   }

//   /** Actualiza todas las tablas llamando a un callback, luego resetea su globalTotalRow. */
//   private updateAllTablesColumns(callback: (table: Table) => void): void {
//     this.tables.forEach(table => {
//       callback(table);
//       // Resetear su globalTotalRow para la nueva estructura
//       table.globalTotalRow.data = this.columns.map(col =>
//         (col.type === ColumnType.NUMBER || col.type === ColumnType.CUSTOM_SUM) ? 0 : ''
//       );
//     });
//   }

//   // -----------------------------------------
//   //            MÉTODOS DE TABLA
//   // -----------------------------------------
//   addTable(): void {
//     this.tables.push(this.createNewTable(false));
//   }

//   removeTable(tableIndex: number): void {
//     if (this.tables.length === 1) return;  // si no quieres permitir menos de 1

//     this.tables.splice(tableIndex, 1);
//   }

//   toggleGlobalTotal(tableIndex: number): void {
//     const table = this.tables[tableIndex];
//     table.showGlobalTotal = !table.showGlobalTotal;
//     if (table.showGlobalTotal) {
//       this.updateGlobalTotal(tableIndex);
//     }
//   }

//   // -----------------------------------------
//   //         MÉTODOS DE FILAS
//   // -----------------------------------------
//   addRow(tableIndex: number, sectionIndex: number, position: number, type: RowType): void {
//     const newRow = this.createNewRow(type);
//     if (type === RowType.CUSTOM_TOTAL) {
//       newRow.tableIndexesToSum = [];
//     }

//     const sections = this.tables[tableIndex].sections;
//     sections[sectionIndex].splice(position, 0, newRow);

//     // Regla: cuando agregas un TOTAL, creas nueva sección debajo
//     if (type === RowType.TOTAL) {
//       sections.push([]);
//     }

//     this.updateTotals(tableIndex, sectionIndex);
//   }

//   removeRow(tableIndex: number, sectionIndex: number, rowIndex: number): void {
//     const section = this.tables[tableIndex].sections[sectionIndex];
//     if (section.length === 1 && sectionIndex === 0 && tableIndex === 0) return;

//     section.splice(rowIndex, 1);
//     this.updateTotals(tableIndex, sectionIndex);
//   }

//   // -----------------------------------------
//   //         RECÁLCULOS GLOBALES
//   // -----------------------------------------
//   /** Recalcula TODAS las tablas y TODAS las secciones. */
//   recalcAllTables(): void {
//     this.tables.forEach((table, tIndex) => {
//       table.sections.forEach((_, sIndex) => {
//         this.updateTotals(tIndex, sIndex);
//       });
//     });
//   }

//   /** Recalcula totales, subtotales, custom, etc. para la tabla dada. 
//    *  Si sectionIndex está definido, recalcula esa sección.
//    */
//   updateTotals(tableIndex: number, sectionIndex?: number): void {
//     // 1) Actualizar columnas CUSTOM_SUM en todas las tablas (por si alguna depende de otra)
//     this.updateCustomSumColumnsInAllTables();

//     // 2) Recalcular filas SUBTOTAL, TOTAL y CUSTOM_TOTAL en la sección afectada
//     if (sectionIndex !== undefined) {
//       this.recalcSubtotalsAndTotals(tableIndex, sectionIndex);
//     }

//     // 3) Recalcular TODAS las filas CUSTOM_TOTAL (de otras tablas que dependan de la actual)
//     this.updateAllCustomTotals();

//     // 4) Recalcular total global si la tabla lo muestra
//     this.recalcGlobalTotalIfEnabled(tableIndex);
//   }

//   /** Encapsula la recalculación de SUBTOTAL/TOTAL en una sección. */
//   private recalcSubtotalsAndTotals(tableIndex: number, sectionIndex: number): void {
//     const table = this.tables[tableIndex];
//     const section = table.sections[sectionIndex];

//     section.forEach((row, rowIndex) => {
//       if ([RowType.SUBTOTAL, RowType.TOTAL, RowType.CUSTOM_TOTAL].includes(row.type)) {
//         // Recorremos columnas
//         this.columns.forEach((col, colIndex) => {
//           if (col.type === ColumnType.NUMBER || col.type === ColumnType.CUSTOM_SUM) {
//             row.data[colIndex] = (row.type === RowType.CUSTOM_TOTAL)
//               ? this.calculateCustomTotal(row.tableIndexesToSum!, colIndex)
//               : this.calculateColumnSum(tableIndex, sectionIndex, colIndex, rowIndex);
//           }
//         });
//       }
//     });
//   }

//   /** Recalcula la fila globalTotalRow si showGlobalTotal es true. */
//   private recalcGlobalTotalIfEnabled(tableIndex: number): void {
//     const table = this.tables[tableIndex];
//     if (table.showGlobalTotal) {
//       this.updateGlobalTotal(tableIndex);
//     }
//   }

//   // -----------------------------------------
//   //     CÁLCULOS ESPECÍFICOS (sumas)
//   // -----------------------------------------
//   /** Recalcula todas las columnas CUSTOM_SUM en todas las tablas. */
//   private updateCustomSumColumnsInAllTables(): void {
//     this.tables.forEach((table, tIndex) => {
//       table.sections.forEach(section => {
//         section.forEach(row => {
//           this.columns.forEach((col, colIndex) => {
//             if (col.type === ColumnType.CUSTOM_SUM && col.columnsToSum) {
//               let sum = 0;
//               col.columnsToSum.forEach(idx => {
//                 sum += this.parseCellValue(row.data[idx]);
//               });
//               row.data[colIndex] = sum;
//             }
//           });
//         });
//       });
//     });
//   }

//   /** Recalcula TODAS las filas CUSTOM_TOTAL de TODAS las tablas. */
//   private updateAllCustomTotals(): void {
//     this.tables.forEach((table, tableIndex) => {
//       table.sections.forEach((section, sectionIndex) => {
//         section.forEach(row => {
//           if (row.type === RowType.CUSTOM_TOTAL) {
//             // Recorremos columnas
//             this.columns.forEach((col, colIndex) => {
//               if (col.type === ColumnType.NUMBER || col.type === ColumnType.CUSTOM_SUM) {
//                 row.data[colIndex] = this.calculateCustomTotal(row.tableIndexesToSum!, colIndex);
//               }
//             });
//           }
//         });
//       });
//     });
//   }

//   private calculateCustomTotal(tableIndexes: number[], colIndex: number): number {
//     // Suma los TOTAl de cada tabla referenciada
//     return tableIndexes.reduce((sum, tableIdx) => {
//       const table = this.tables[tableIdx];
//       return sum + table.sections.reduce((subtotal, section) => {
//         const totalRow = section.find(r => r.type === RowType.TOTAL);
//         return subtotal + this.parseCellValue(totalRow?.data[colIndex] || 0);
//       }, 0);
//     }, 0);
//   }

//   private calculateColumnSum(
//     tableIndex: number,
//     sectionIndex: number,
//     colIndex: number,
//     totalRowIndex: number
//   ): number {
//     // Suma de filas "NORMAL" por encima de la fila "TOTAL" o "SUBTOTAL"
//     return this.tables[tableIndex].sections[sectionIndex]
//       .slice(0, totalRowIndex)
//       .filter(r => r.type === RowType.NORMAL)
//       .reduce((sum, r) => sum + this.parseCellValue(r.data[colIndex]), 0);
//   }

//   private parseCellValue(value: CellValue): number {
//     return (typeof value === 'number')
//       ? value
//       : parseFloat(value) || 0;
//   }

//   private updateGlobalTotal(tableIndex: number): void {
//     const table = this.tables[tableIndex];
//     table.globalTotalRow.data = this.columns.map((col, colIndex) => {
//       if (col.type === ColumnType.NUMBER || col.type === ColumnType.CUSTOM_SUM) {
//         // Suma de TOTAl de cada sección
//         return table.sections.reduce((sum, section) => {
//           const totalRow = section.find(r => r.type === RowType.TOTAL);
//           return sum + this.parseCellValue(totalRow?.data[colIndex] || 0);
//         }, 0);
//       }
//       return '';
//     });
//   }

//   // -----------------------------------------
//   //      Generar tabla unificada (HTML)
//   // -----------------------------------------
//   generateUnifiedTable(): SafeHtml {
//     let html = `
//       <table class="table table-bordered">
//         <thead>
//           <tr>
//             ${this.columns.map(col => `<th>${col.title}</th>`).join('')}
//           </tr>
//         </thead>
//         <tbody>
//     `;

//     this.tables.forEach((tabla) => {
//       tabla.sections.forEach((section) => {
//         section.forEach((row) => {
//           if (row.type === RowType.SECTION_TITLE) {
//             html += `
//               <tr>
//                 <td colspan="${this.columns.length}"
//                     style="background-color: #dee2e6; font-weight: bold; text-align: start;">
//                   ${row.data[0]}
//                 </td>
//               </tr>
//             `;
//           } else {
//             // Fila normal, subtotal, total
//             const rowStyle = this.getRowStyle(row.type);
//             html += `<tr>`;
//             html += row.data.map((cell, colIndex) => {
//               const columnType = this.columns[colIndex]?.type || ColumnType.TEXT;
//               const alignStyle = (columnType === ColumnType.NUMBER || columnType === ColumnType.CUSTOM_SUM)
//                 ? 'text-align: right;'
//                 : 'text-align: left;';
//               return `<td style="${alignStyle} ${rowStyle}">${cell}</td>`;
//             }).join('');
//             html += `</tr>`;
//           }
//         });
//       });

//       // Agregar la fila de total global si está activada
//       if (tabla.showGlobalTotal) {
//         html += `
//           <tr>
//             ${tabla.globalTotalRow.data.map((cell, colIndex) => {
//               const columnType = this.columns[colIndex]?.type || ColumnType.TEXT;
//               const alignStyle = (columnType === ColumnType.NUMBER || columnType === ColumnType.CUSTOM_SUM)
//                 ? 'text-align: right;'
//                 : 'text-align: left;';
//               return `<td style="${alignStyle} background-color: #343a40; color: white;">${cell}</td>`;
//             }).join('')}
//           </tr>
//         `;
//       }
//     });

//     html += `</tbody></table>`;
//     return this.sanitizer.bypassSecurityTrustHtml(html);
//   }

//   getRowStyle(type: RowType): string {
//     switch (type) {
//       case RowType.SUBTOTAL: return 'background-color: #cce5ff;';
//       case RowType.TOTAL:    return 'background-color: #ffeeba;';
//       case RowType.NORMAL:   return 'background-color: #f8f9fa;';
//       default:               return '';
//     }
//   }

//   // -----------------------------------------
//   //        trackBy / Misc
//   // -----------------------------------------
//   trackByColumn(index: number, col: Column): number {
//     return index;
//   }

//   trackByTable(index: number, table: Table): string {
//     // Ojo: Si quisieras usar "table.name" como ID, puedes hacerlo
//     return `${index}-${table.sections.length}`;
//   }

//   // -----------------------------------------
//   //        Botón "submit"
//   // -----------------------------------------
//   submit(): void {
//     console.log('Tables:', JSON.stringify(this.tables, null, 2));
//     console.log('Columns:', JSON.stringify(this.columns, null, 2));
//   }
// }
