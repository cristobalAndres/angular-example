import { Component } from '@angular/core';
import { getFintoc } from '@fintoc/fintoc-js';

@Component({
    selector: 'app-fintoc',
    imports: [],
    templateUrl: './fintoc.component.html',
    styleUrl: './fintoc.component.scss'
})
export class FintocComponent {
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const options = {
      holderType: 'individual',
      product: 'movements',
      publicKey: 'pk_live_zeTc4uHUSo4yHdxEKkFsY4Jw1CE5KZZn3S4gC9zTxvY',
      webhookUrl: 'https://next-conta-api-dev-b9b6c8ajhjdrcnch.eastus-01.azurewebsites.net/fintoc/webhook',
      country: 'cl',
      // institutionId,
      link_token: '',
      onSuccess: this.onSuccess,
      onExit: this.onExit,
      onEvent: this.onEvent,
    };

    const main = async () => {
      const Fintoc = await getFintoc();
      if (Fintoc) {
        const widget = Fintoc.create(options);
        widget.open();
      }
    }

    main();
  }

  onSuccess(response: any) {
    console.log('Success', response);

    // RESPONSE

  //   {
  //     "id": "link_a61GeEi3Q91PGOmv",
  //     "username": "168412258",
  //     "holder_id": "168412258",
  //     "holder_type": "individual",
  //     "created_at": "2024-12-25T15:28:33.460Z",
  //     "institution": {
  //         "id": "cl_banco_de_chile",
  //         "name": "Banco de Chile",
  //         "country": "cl"
  //     },
  //     "mode": "live",
  //     "active": true,
  //     "link_token": null,
  //     "accounts": null
  // }
  }

  onExit() {
    console.log('Exit');
  }

  onEvent(event: any) {
    console.log('Event', event);
  }
}
