import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Counter
import { CountUpModule } from 'ngx-countup';


import { ScrollspyDirective } from './scrollspy.directive';


import { LandingScrollspyDirective } from './landingscrollspy.directive';

@NgModule({
  declarations: [
    
    ScrollspyDirective,
    LandingScrollspyDirective,
   
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbDropdownModule,
    SlickCarouselModule ,
    CountUpModule
  ],
  exports: [
    ScrollspyDirective,
    LandingScrollspyDirective,
    ]
})
export class SharedModule { }
