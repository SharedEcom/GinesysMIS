import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PromoSignageResponse } from 'src/app/models/screens/promo-signage-print/promo-signage-print-response';
import { PromoSignagePrintService } from '../../../services/screen/promo-signage-print/promo-signage-print.service';

@Component({
  selector: 'app-promo-signage-print',
  templateUrl: './promo-signage-print.component.html',
  styleUrls: ['./promo-signage-print.component.css']
})
export class PromoSignagePrintComponent implements OnInit {

  promoSignagePrintResponse: PromoSignageResponse;

  constructor(private router: Router, private promoSignagePrintService: PromoSignagePrintService, private spinner: NgxSpinnerService) {
    document.title = 'Barcodes'
    this.promoSignagePrintResponse = new PromoSignageResponse()
  }

  ngOnInit(): void {
    let response = this.promoSignagePrintService.printBarcode()
    // this.spinner.show()
    response.subscribe(data => {
      this.promoSignagePrintResponse = data
      console.log(this.promoSignagePrintResponse)
      setTimeout(() => {
        const thisWindow = window?.print()
        if (thisWindow !== null) {
          window.close()
          this.router.navigateByUrl('/promo-signage')
        }
      }, 1);
    })
    // this.spinner.hide()
  }
}
