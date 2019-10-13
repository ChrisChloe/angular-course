import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { TradeComponent } from './trade.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    TradeComponent,
  ],
  providers: [],
})
export class TradeModule {}
