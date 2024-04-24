import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss']
})

/**
 * Horizontal Component
 */
export class HorizontalComponent implements OnInit {

  opened = false;
  constructor(private layoutService: LayoutService) { }

  isCondensed = false;

  ngOnInit(): void {
  }

  /**
   * on settings button clicked from topbar
   */
  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
    const rightBar = document.getElementById('theme-settings-offcanvas');
    if (rightBar != null) {
      rightBar.classList.toggle('show');
      rightBar.setAttribute('style', "visibility: visible;");
    }
  }

  /**
   * On mobile toggle button clicked
   */
  onToggleMobileMenu() {
    if (document.documentElement.clientWidth <= 1024) {
      this.layoutService.sharedData$.subscribe(data => {
        this.opened = data;
        this.opened = !this.opened;
      });
      
      this.layoutService.setSharedData(this.opened);
      document.body.classList.toggle('menu');
      
    }
    
  }

  

  
}
