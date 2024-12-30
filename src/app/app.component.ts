import { Component, computed, inject, signal, TemplateRef, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormArrayComponent } from "./form-array/form-array.component";
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './app.service';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from "./layout/header/header.component";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { FormsComponent } from "./forms/forms.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormArrayComponent, FormsModule, ReactiveFormsModule, HeaderComponent, FormsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal(''); 

  private readonly appService = inject(AppService)
  posts$ = this.appService.post;
  loading$ = this.appService.loading;

  private readonly fb = inject(FormBuilder);
  
  formPost!: FormGroup;
  
  title = 'test-angular';
  posts = [{
    id: 1,
    title: 'Post 1',
  }, {
    id: 2,
    title: 'Post 2',
  }, {
    id: 3,
    title: 'Post 3',
  }, {
    id: 4,
    title: 'Post 4',
  }, {
    id: 5,
    title: 'Post 5',
  }, {
    id: 6,
    title: 'Post 6',
  }]

  constructor() {
    // this.initFormPosts();
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.appService.getPost();
    this.initFormPosts();

    const driverObj = driver({
      showProgress: true,
      steps: [
        { element: '#navbar', popover: { title: 'Animated Tour Example', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "left", align: 'start' }},
        { element: '#home', popover: { title: 'Import the Library', description: 'It works the same in vanilla JavaScript as well as frameworks.', side: "bottom", align: 'start' }},
        { element: '#pokemon', popover: { title: 'Importing CSS', description: 'Import the CSS which gives you the default styling for popover and overlay.', side: "bottom", align: 'start' }},
        { element: '#add_post', popover: { title: 'Importing CSS', description: 'Import the CSS which gives you the default styling for popover and overlay.', side: "bottom", align: 'start' }},
        // { element: 'code .line:nth-child(4) span:nth-child(7)', popover: { title: 'Create Driver', description: 'Simply call the driver function to create a driver.js instance', side: "left", align: 'start' }},
        // { element: 'code .line:nth-child(18)', popover: { title: 'Start Tour', description: 'Call the drive method to start the tour and your tour will be started.', side: "top", align: 'start' }},
        // { element: 'a[href="/docs/configuration"]', popover: { title: 'More Configuration', description: 'Look at this page for all the configuration options you can pass.', side: "right", align: 'start' }},
        { popover: { title: 'Happy Coding', description: 'And that is all, go ahead and start adding tours to your applications.' }}
      ]
    });
    
    driverObj.drive();
  }

  initFormPosts() {
    this.formPost = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
    });
  }



  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult.set(`Closed with: ${result}`);
			},
			(reason) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  submit() {
    console.log(this.formPost.value);
  }
}
