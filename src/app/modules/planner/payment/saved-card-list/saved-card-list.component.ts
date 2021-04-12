import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trackByObjectId } from '@app/core/utils/common.util';

@Component({
  selector: 'app-saved-card-list',
  templateUrl: './saved-card-list.component.html',
  styleUrls: ['./saved-card-list.component.scss'],
})
export class SavedCardListComponent implements OnInit {
  @Input() cardList;
  trackByFn = trackByObjectId;
  cvv;
  @Input() amountToPay;
  @Output() makePayment = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  changeDefaultCard(cardId, index) {
    this.cardList.find(card => card.isDefault).isDefault = false;
    this.cardList[index].isDefault = true;
    this.cvv = '';
  }

  pay(amount, source) {
    this.makePayment.emit({ amount, cvv: this.cvv, source });
  }
}
