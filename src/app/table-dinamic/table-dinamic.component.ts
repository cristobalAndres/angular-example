import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

export enum ColumnType {
  TEXT = 'text',
  NUMBER = 'number',
  CUSTOM_SUM = 'custom_sum',
}

export enum RowType {
  NORMAL = 'normal',
  SUBTOTAL = 'subtotal',
  TOTAL = 'total',
  SECTION_TITLE = 'section_title',
  CUSTOM_TOTAL = 'custom_total',
}

export type CellValue = number | string;

export interface Column {
  type: ColumnType;
  title: string;
  columnsToSum?: number[];
}

export interface Row {
  data: CellValue[];
  type: RowType;
  tableIndexesToSum?: number[];
}

export interface Table {
  sections: Row[][];
  showHeader: boolean;
  globalTotalRow: Row;
  showGlobalTotal: boolean;
  name: string;
}

@Component({
  selector: 'app-table-dinamic',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './table-dinamic.component.html',
  styleUrls: ['./table-dinamic.component.scss'],
})
export class TableDinamicComponent {
  private readonly sanitizer = inject(DomSanitizer);

  // // Signals reactivos
  // columns = signal<Column[]>([
  //   { type: ColumnType.TEXT, title: '' },
  // ]);
  // tables = signal<Table[]>([]);

  
    // Signals reactivos
  columns = signal<Column[]>([
    { type: ColumnType.TEXT,  title: 'Activos' },
    { type: ColumnType.TEXT,  title: 'Notas' },
    { type: ColumnType.NUMBER, title: '31/01/2021' },
    { type: ColumnType.NUMBER, title: '31/01/2020' },
  ]);
  tables = signal<Table[]>([
      {
      name: 'Activos',
      sections: [
        [
          { data: ['Activos Corrientes'], type: RowType.SECTION_TITLE },
          { data: ['Efectivo y equivalentes al efectivo.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Otros activos financieros.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Otros activos no financieros.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Deudores comerciales y otras cuentas por cobrar,neto', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Cuentas por cobrar a entidades relacionadas. ', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Inventarios,neto.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Activos por impuestos.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Total activos Corrientes', '', 70, 140], type: RowType.TOTAL }
        ],
        [
          { data: ['Activos No Corrientes'], type: RowType.SECTION_TITLE },
          { data: ['Otros activos financieros', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Otros activos no financieros', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Cuentas por cobrar.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Inversiones contabilizadas utilizando el método de la participación', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Activos intangibles distintos de la plusvalía, neto.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Plusvalía', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Propiedades, planta y equipo,neto', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Activos por impuestos diferidos', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Total Activos no corrientes', '', 80, 160], type: RowType.TOTAL }
        ],
        []
      ],
      showHeader: true,
      globalTotalRow: {
        data: ['Total Activos ', '', 150, 300],
        type: RowType.TOTAL
      },
      showGlobalTotal: true
    },
    {
      name: 'Pasivos',
      sections: [
        [
          { data: ['Patrimonio y Pasivos'], type: RowType.SECTION_TITLE },
          { data: ['Pasivos Corrientes'],   type: RowType.SECTION_TITLE },
          { data: ['Otros pasivos financieros.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Cuentas por pagar comerciales y otras cuentas por pagar.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Cuentas por pagar a entidades relacionadas.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Otras provisiones.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Pasivos por impuestos', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Provisiones por beneficios a los empleados.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Otros pasivos no financieros.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Total Pasivos Corrientes', '', 70, 140], type: RowType.TOTAL },
        ],
        [
          { data: ['Pasivos No Corrientes'], type: RowType.SECTION_TITLE },
          { data: ['Otros pasivos financieros.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Cuentas por pagar.', '', '10', '20'],         type: RowType.NORMAL },
          { data: ['Otras provisiones.', '', '10', '20'],         type: RowType.NORMAL },
          { data: ['Pasivo por impuestos diferidos.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Provisiones por beneficios a los empleados.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Otros pasivos no financieros', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Total Pasivos No Corrientes', '', 60, 120],     type: RowType.TOTAL }
        ],
        []
      ],
      showHeader: false,
      globalTotalRow: {
        data: ['Total Pasivos', '', 130, 260],
        type: RowType.TOTAL
      },
      showGlobalTotal: true
    },
    {
      name: 'Patrimonio',
      sections: [
        [
          { data: ['Patrimonio'],  type: RowType.SECTION_TITLE },
          { data: ['Capital emitido', '', '10', '20'],               type: RowType.NORMAL },
          { data: ['Ganancias acumuladas.', '', '10', '20'],         type: RowType.NORMAL },
          { data: ['Otras reservas', '', '10', '20'],                type: RowType.NORMAL },
          { data: ['Patrimonio atribuible a los propietarios de la controladora.', '', 30, 60], type: RowType.SUBTOTAL },
          { data: ['Participaciones no controladoras.', '', '10', '20'], type: RowType.NORMAL },
          { data: ['Total patrimonio', '', 40, 80], type: RowType.TOTAL }
        ],
        []
      ],
      showHeader: false,
      globalTotalRow: { data: ['', '', 0, 0], type: RowType.TOTAL },
      showGlobalTotal: false
    },
    {
      name: 'Tabla 4',
      sections: [
        [
          {
            data: ['TOTAL PATRIMONIO Y PASIVOS', '', 170, 340],
            type: RowType.CUSTOM_TOTAL,
            tableIndexesToSum: [1, 2]
          }
        ]
      ],
      showHeader: false,
      globalTotalRow: { data: ['', '', 0, 0], type: RowType.TOTAL },
      showGlobalTotal: false
    }
  ]);

  // Valores computados
  readonly ColumnType = ColumnType;
  readonly RowType = RowType;
  readonly BUTTON_TEXTS = {
    SHOW_TOTAL: 'Mostrar Total Global',
    HIDE_TOTAL: 'Ocultar Total Global',
  };

  constructor() {
    effect(() => {
      if (this.tables().length === 0) {
        this.tables.update(() => [this.createNewTable(true)]);
      }
    });
  }

  // Método de creación con inicialización segura
  private createNewTable(showHeader: boolean): Table {
    return {
      name: `Tabla ${this.tables().length + 1}`,
      sections: [[this.createNewRow(RowType.NORMAL)]],
      showHeader,
      globalTotalRow: this.createNewRow(RowType.TOTAL),
      showGlobalTotal: false,
    };
  }

  private createNewRow(type: RowType): Row {
    return {
      data: this.columns().map((col) =>
        type === RowType.SECTION_TITLE
          ? ''
          : [ColumnType.NUMBER, ColumnType.CUSTOM_SUM].includes(col.type)
          ? 0
          : ''
      ),
      type,
    };
  }

  // Operaciones de columnas
  addColumn(position: number, type: ColumnType): void {
    this.columns.update((cols) => {
      const newCol: Column = { type, title: '' };
      if (type === ColumnType.CUSTOM_SUM) newCol.columnsToSum = [];
      const newCols = [...cols];
      newCols.splice(position, 0, newCol);
      return newCols;
    });

    this.updateAllTablesColumns();
    this.recalcAllTables();
  }

  removeColumn(index: number): void {
    if (this.columns().length <= 1) return;

    this.columns.update((cols) => {
      const newCols = [...cols];
      newCols.splice(index, 1);
      return newCols;
    });

    this.updateAllTablesColumns();
    this.recalcAllTables();
  }

  private updateAllTablesColumns(): void {
    this.tables.update((tables) =>
      tables.map((table) => ({
        ...table,
        sections: table.sections.map((section) =>
          section.map((row) => ({
            ...row,
            data: this.columns().map((col, i) =>
              i < row.data.length
                ? row.data[i]
                : [ColumnType.NUMBER, ColumnType.CUSTOM_SUM].includes(col.type)
                ? 0
                : ''
            ),
          }))
        ),
        globalTotalRow: {
          ...table.globalTotalRow,
          data: this.columns().map((col) =>
            [ColumnType.NUMBER, ColumnType.CUSTOM_SUM].includes(col.type)
              ? 0
              : ''
          ),
        },
      }))
    );
  }

  // Operaciones de tablas
  addTable(): void {
    this.tables.update((tables) => [...tables, this.createNewTable(false)]);
  }

  removeTable(tableIndex: number): void {
    if (this.tables().length <= 1) return;
    this.tables.update((tables) =>
      tables.filter((_, index) => index !== tableIndex)
    );
  }

  toggleGlobalTotal(tableIndex: number): void {
    this.tables.update((tables) =>
      tables.map((table, index) =>
        index === tableIndex
          ? { ...table, showGlobalTotal: !table.showGlobalTotal }
          : table
      )
    );
    this.updateGlobalTotal(tableIndex);
  }

  // Operaciones de filas
  addRow(
    tableIndex: number,
    sectionIndex: number,
    position: number,
    type: RowType
  ): void {
    this.tables.update((tables) =>
      tables.map((table, tIdx) => {
        if (tIdx !== tableIndex) return table;
  
        const newRow = this.createNewRow(type);
        if (type === RowType.CUSTOM_TOTAL) newRow.tableIndexesToSum = [];
  
        // Crear copia actualizada de las secciones
        let newSections = [...table.sections];
        
        // Actualizar la sección actual
        newSections = newSections.map((section, sIdx) => {
          if (sIdx !== sectionIndex) return section;
          const newSection = [...section];
          newSection.splice(position, 0, newRow);
          return newSection;
        });
  
        // Añadir nueva sección vacía solo si es TOTAL
        if (type === RowType.TOTAL) {
          newSections = [...newSections, []];
        }
  
        return {
          ...table,
          sections: newSections
        };
      })
    );
    this.updateTotals(tableIndex, sectionIndex);
  }

  removeRow(tableIndex: number, sectionIndex: number, rowIndex: number): void {
    this.tables.update((tables) =>
      tables.map((table, tIdx) => {
        if (tIdx !== tableIndex) return table;

        return {
          ...table,
          sections: table.sections.map((section, sIdx) => {
            if (sIdx !== sectionIndex) return section;

            return section.filter((_, rIdx) => rIdx !== rowIndex);
          }),
        };
      })
    );
    this.updateTotals(tableIndex, sectionIndex);
  }

  // Cálculos
  recalcAllTables(): void {
    this.tables().forEach((_, tIndex) => {
      this.updateTotals(tIndex);
    });
  }

  updateTotals(tableIndex: number, sectionIndex?: number): void {
    this.tables.update((tables) =>
      tables.map((table, tIdx) => {
        if (tIdx !== tableIndex) return table;

        // Actualizar CUSTOM_SUM
        const updatedSections = table.sections.map((section) =>
          section.map((row) => {
            const newData = [...row.data];
            this.columns().forEach((col, colIndex) => {
              if (col.type === ColumnType.CUSTOM_SUM && col.columnsToSum) {
                newData[colIndex] = col.columnsToSum.reduce(
                  (sum, idx) => sum + this.parseCellValue(row.data[idx]),
                  0
                );
              }
            });
            return { ...row, data: newData };
          })
        );

        // Actualizar subtotales/totales
        if (sectionIndex !== undefined) {
          updatedSections[sectionIndex] = updatedSections[sectionIndex].map(
            (row, rowIndex) => {
              if (
                ![
                  RowType.SUBTOTAL,
                  RowType.TOTAL,
                  RowType.CUSTOM_TOTAL,
                ].includes(row.type)
              ) {
                return row;
              }

              const newData = [...row.data];
              this.columns().forEach((col, colIndex) => {
                if (
                  [ColumnType.NUMBER, ColumnType.CUSTOM_SUM].includes(col.type)
                ) {
                  newData[colIndex] =
                    row.type === RowType.CUSTOM_TOTAL
                      ? this.calculateCustomTotal(
                          row.tableIndexesToSum || [],
                          colIndex
                        )
                      : this.calculateColumnSum(
                          tableIndex,
                          sectionIndex,
                          colIndex,
                          rowIndex
                        );
                }
              });
              return { ...row, data: newData };
            }
          );
        }

        // Actualizar total global
        const globalTotalRow = table.showGlobalTotal
          ? this.calculateGlobalTotal(table)
          : table.globalTotalRow;

        return {
          ...table,
          sections: updatedSections,
          globalTotalRow,
        };
      })
    );
  }

  private calculateGlobalTotal(table: Table): Row {
    const newData = this.columns().map((col, colIndex) => {
      if (![ColumnType.NUMBER, ColumnType.CUSTOM_SUM].includes(col.type))
        return '';

      return table.sections.reduce((sum, section) => {
        const totalRow = section.find((r) => r.type === RowType.TOTAL);
        return sum + this.parseCellValue(totalRow?.data[colIndex] || 0);
      }, 0);
    });

    return { ...table.globalTotalRow, data: newData };
  }

  private calculateCustomTotal(
    tableIndexes: number[],
    colIndex: number
  ): number {
    return tableIndexes.reduce((sum, tableIdx) => {
      const table = this.tables()[tableIdx];
      return (
        sum +
        table.sections.reduce((subtotal, section) => {
          const totalRow = section.find((r) => r.type === RowType.TOTAL);
          return subtotal + this.parseCellValue(totalRow?.data[colIndex] || 0);
        }, 0)
      );
    }, 0);
  }

  private calculateColumnSum(
    tableIndex: number,
    sectionIndex: number,
    colIndex: number,
    rowIndex: number
  ): number {
    return this.tables()
      [tableIndex].sections[sectionIndex].slice(0, rowIndex)
      .filter((r) => r.type === RowType.NORMAL)
      .reduce((sum, r) => sum + this.parseCellValue(r.data[colIndex]), 0);
  }

  private parseCellValue(value: CellValue): number {
    return typeof value === 'number' ? value : parseFloat(value) || 0;
  }

  private updateGlobalTotal(tableIndex: number): void {
    this.tables.update((tables) =>
      tables.map((table, index) =>
        index === tableIndex
          ? { ...table, globalTotalRow: this.calculateGlobalTotal(table) }
          : table
      )
    );
  }

  // Generación de HTML
  generateUnifiedTable(): SafeHtml {
    let html = `
      <table class="table table-bordered">
        <thead>
          <tr>
            ${this.columns()
              .map((col) => `<th>${col.title}</th>`)
              .join('')}
          </tr>
        </thead>
        <tbody>`;

    this.tables().forEach((table) => {
      table.sections.forEach((section) => {
        section.forEach((row) => {
          if (row.type === RowType.SECTION_TITLE) {
            html += `
              <tr>
                <td colspan="${this.columns().length}" 
                    style="background-color: #dee2e6; font-weight: bold; text-align: start;">
                  ${row.data[0]}
                </td>
              </tr>`;
          } else {
            html += '<tr>';
            row.data.forEach((cell, colIndex) => {
              const colType = this.columns()[colIndex]?.type;
              const align = [ColumnType.NUMBER, ColumnType.CUSTOM_SUM].includes(
                colType
              )
                ? 'right'
                : 'left';
              const style = `text-align: ${align}; ${this.getRowStyle(
                row.type
              )}`;
              html += `<td style="${style}">${cell}</td>`;
            });
            html += '</tr>';
          }
        });
      });

      if (table.showGlobalTotal) {
        html += '<tr>';
        table.globalTotalRow.data.forEach((cell, colIndex) => {
          const colType = this.columns()[colIndex]?.type;
          const align = [ColumnType.NUMBER, ColumnType.CUSTOM_SUM].includes(
            colType
          )
            ? 'right'
            : 'left';
          html += `<td style="text-align: ${align}; background-color: #343a40; color: white;">
            ${cell}
          </td>`;
        });
        html += '</tr>';
      }
    });

    html += '</tbody></table>';
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private getRowStyle(type: RowType): string {
    switch (type) {
      case RowType.SUBTOTAL:
        return 'background-color: #cce5ff;';
      case RowType.TOTAL:
        return 'background-color: #ffeeba;';
      default:
        return '';
    }
  }

  // Utilidades
  submit(): void {
    console.log('Tables:', JSON.stringify(this.tables(), null, 2));
    console.log('Columns:', JSON.stringify(this.columns(), null, 2));
  }
}
