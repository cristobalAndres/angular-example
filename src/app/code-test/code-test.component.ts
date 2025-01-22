import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-code-test',
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    templateUrl: './code-test.component.html',
    styleUrl: './code-test.component.scss'
})
export class CodeTestComponent {
  private readonly fb = inject(FormBuilder);
  formPurchase!: FormGroup;

  dataInit = [
    {
      id: 1,
      name: 'item 1',
      price: 100,
      bills: [{
        count: 2,
        total: 200,
      }]
    },
    {
      id: 2,
      name: 'item 2',
      price: 200,
      bills: [{
        count: 3,
        total: 600,
      }, {
        count: 3,
        total: 600,
      }]
    },
  ];


  ngOnInit(): void {
    this.initFormPurchases();

    // Agregar datos iniciales al formulario
  this.dataInit.forEach((item) => {
    const control = this.formPurchase.get('purchases') as FormArray;

    if (item.bills.length === 1) {
      control.push(this.fb.group({
        id: [item.id],
        name: [item.name],
        price: [item.price],
        hola: [false],
        bills: this.fb.group({
          count: [item.bills[0].count],
          total: [item.bills[0].total],
        }),
      }));  
    }

    if (item.bills.length > 1) {
      control.push(this.fb.group({
        id: [item.id],
        name: [item.name],
        price: [item.price],
        hola: [true],
        bills: this.fb.group({
          count: [null],
          total: [null],
        }),
      }));  
    }
    
  });
  }

  initFormPurchases() {
    this.formPurchase = this.fb.group({
      purchases: this.fb.array([]),
    });

    if (this.dataInit.length === 0) {
      this.addPurchase
      
    }
  }

  initFormPurchase(item?: any) {
    return this.fb.group({
      id: [null],
      name: [ ''],
      price: [''],
      hola: [false],
      bills: this.fb.group({
        count: [''],
        total: [''],
      }),
    });
  }

  addPurchase() {
    const control = this.formPurchase.get('purchases') as FormArray;
    control.push(this.initFormPurchase());
  }

  removePurchase(i: number) {
    const control = this.formPurchase.get('purchases') as FormArray;
    control.removeAt(i);
  }

  total(i: number) {
    const control = this.formPurchase.get('purchases') as FormArray;   
    const price = control.value[i].price;
    const count = control.value[i].bills.count;

    // Actualiza el campo 'total' dentro de 'bills'
    const billsControl = control.at(i).get('bills') as FormGroup;
    billsControl.get('total')?.setValue(price * count);
  }
  
  submit() {
    console.log(this.formPurchase.value);
    
    const news = this.formPurchase.value.purchases.filter((item: any) => !item.id);
    const updates = this.formPurchase.value.purchases.filter((item: any) => item.id);

    console.log('news', news);
    console.log('updates', updates);
  }

  get getFormControls() {
    const control = this.formPurchase.get('purchases') as FormArray;
    return control;
  }
}
