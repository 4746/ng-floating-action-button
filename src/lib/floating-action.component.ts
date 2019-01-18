import {
  AfterViewInit,
  Component, ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ActionButtonDirective} from './action-button.directive';
import {Helper} from './helper';
import {IconDirective} from './icon.directive';

@Component({
  selector: 'fab-floating-action',
  templateUrl: './floating-action.component.html',
  styleUrls: ['./floating-action.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FloatingActionComponent implements AfterViewInit, OnDestroy {

  @ContentChildren(ActionButtonDirective, {descendants: false}) buttons: QueryList<ActionButtonDirective>;
  @ContentChild(IconDirective) icon: QueryList<IconDirective>;
  @Input('options') options: IFabPptions = {};

  @ViewChild('fab') $fab: ElementRef;
  @ViewChild('anchor') $anchor: ElementRef;
  @ViewChild('menu') $menu: ElementRef;

  private _options: any = {
    direction: 'top',
    hoverEnabled: true,
    toolbarEnabled: false
  };
  private isOpen = false;
  private offsetY = 0;
  private offsetX = 0;

  private btnBottom = 0;
  private btnLeft = 0;
  private btnWidth;
  private $floatingBtns = [];
  private $floatingBtnsReverse = [];

  ngAfterViewInit(): void {
    if (this.options) {
      this._options = Object.assign(this._options, this.options);
    }

    this.isOpen = false;
    // const $floatingBtns = this.$fab.nativeElement.querySelectorAll('ul .btn-floating');
    const $floatingBtns = this.$fab.nativeElement.querySelectorAll('ul .btn-fab');
    this.$floatingBtns = [].slice.call($floatingBtns, 0);
    this.$floatingBtnsReverse = [].slice.call($floatingBtns, 0).reverse();
    this.offsetY = 0;
    this.offsetX = 0;

    this.$fab.nativeElement.classList.add(`direction-${this._options.direction}`);
    if (this._options.direction === 'top') {
      this.offsetY = 40;
    } else if (this._options.direction === 'right') {
      this.offsetX = -40;
    } else if (this._options.direction === 'bottom') {
      this.offsetY = -40;
    } else {
      this.offsetX = 40;
    }

    if (this._options.toolbarEnabled) {
      this.$fab.nativeElement.classList.add(`toolbar`);
    } else {
      this.$fab.nativeElement.classList.add(`horizontal`);
    }

    this.setupEventHandlers();
  }

  ngOnDestroy(): void {
    /**
     * Remove Event Handlers
     */
    if (this._options.hoverEnabled && !this._options.toolbarEnabled) {
      this.$fab.nativeElement.removeEventListener('mouseenter', this.open);
      this.$fab.nativeElement.removeEventListener('mouseleave', this.close);
    } else {
      this.$fab.nativeElement.removeEventListener('click', this._handleFABClick);
    }
  }

  /**
   * Настройка обработчиков событий
   */
  private setupEventHandlers() {
    if (this._options.hoverEnabled && !this._options.toolbarEnabled) {
      this.$fab.nativeElement.addEventListener('mouseenter', this.open);
      this.$fab.nativeElement.addEventListener('mouseleave', this.close);
    } else {
      this.$fab.nativeElement.addEventListener('click', this._handleFABClick);
    }
  }
  /**
   * Open FAB
   */
  private open = () => {
    if (this.isOpen) {
      return;
    }

    if (this._options.toolbarEnabled) {
      this._animateInToolbar();
    } else {
      this._animateInFAB();
    }
    this.isOpen = true;
  }
  /**
   * Close FAB
   */
  close = () => {
    if (!this.isOpen) {
      return;
    }

    if (this._options.toolbarEnabled) {
      window.removeEventListener('scroll', this.close, true);
      document.body.removeEventListener('click', this._handleDocumentClick, true);
      this._animateOutToolbar();
    } else {
      this._animateOutFAB();
    }
    this.isOpen = false;
  }

  /**
   * Handle Document Click
   * @param {Event} e
   */
  private _handleDocumentClick = (e) => {
    // if (!$(e.target).closest(this.$menu).length) {
    // if (!e.target.closest(this.$menu.nativeElement).length) {
    // if (!e.target.closest(this.$menu.nativeElement)) {
    this.close();
    // }
  }
  /**
   * Handle FAB Click
   */
  private _handleFABClick = () => {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Classic FAB Menu open
   */
  private _animateInFAB() {

    this.$fab.nativeElement.classList.add('active');
    let time = 0;
    let anim;
    this.$floatingBtnsReverse.forEach((el: HTMLElement) => {
      anim = el.animate({
        translateY: [this.offsetY, 0],
        translateX: [this.offsetX, 0],
        scale: [0.4, 1],
        opacity: [0, 1],
        easing: 'ease-in',
        duration: 275,
      }, time);
      time += 40;
      anim.onfinish  = () => {
        el.style.opacity = '1';
        el.style.transform = 'scale(1) translateY(0px) translateX(0px)';
      };
    });
  }
  /**
   * Classic FAB Menu close
   */
  private _animateOutFAB() {
    let animation;
    this.$floatingBtnsReverse.forEach((el: HTMLElement) => {
      animation = el.animate({
        opacity: [1, 0],
        scale: 0.4,
        translateY: this.offsetY,
        translateX: this.offsetX,
        duration: 175,
        easing: 'ease-out',
      });
      animation.onfinish  = (e: AnimationPlaybackEvent) => {
        el.style.opacity = '0';
        this.$fab.nativeElement.classList.remove('active');
        el.style.transform = 'scale(0.4) translateY(40px) translateX(0px)';
      };
    });
  }
  /**
   * Toolbar transition Menu open
   */
  private _animateInToolbar() {

    let scaleFactor;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnRect = this.$fab.nativeElement.getBoundingClientRect();
    const backdrop = Helper.dom('<div class="fab-backdrop"></div>', document);
    const fabColor = this.$anchor.nativeElement.style.backgroundColor;
    this.$anchor.nativeElement.appendChild(backdrop);

    this.offsetX = btnRect.left - windowWidth / 2 + btnRect.width / 2;
    this.offsetY = windowHeight - btnRect.bottom;
    // scaleFactor = windowWidth / backdrop[0].clientWidth;
    scaleFactor = windowWidth / backdrop.clientWidth;
    this.btnBottom = btnRect.bottom;
    this.btnLeft = btnRect.left;
    this.btnWidth = btnRect.width;

    // Set initial state
    this.$fab.nativeElement.classList.add('active');

    this.$fab.nativeElement.style.textAlign = 'center';
    this.$fab.nativeElement.style.bottom = 0;
    this.$fab.nativeElement.style.left = 0;
    this.$fab.nativeElement.style.transform = 'translateX(' + this.offsetX + 'px)';
    this.$fab.nativeElement.style.transition = 'none';

    this.$anchor.nativeElement.style.transform = 'translateY(' + -this.offsetY + 'px)';
    this.$anchor.nativeElement.style.transform = 'none';

    backdrop.style.backgroundColor = fabColor;

    setTimeout(() => {
      this.$fab.nativeElement.style.transform = '';
      this.$fab.nativeElement.style.transition = 'transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s';

      this.$anchor.nativeElement.style.overflow = 'visible';
      this.$anchor.nativeElement.style.transform = '';
      this.$anchor.nativeElement.style.transition = 'transform .2s';

      setTimeout(() => {

        this.$fab.nativeElement.style.overflow = 'hidden';
        this.$fab.nativeElement.style.backgroundColor = fabColor;

        backdrop.style.transform = 'scale(' + scaleFactor + ')';
        backdrop.style.transition = 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)';

        const res = this.$menu.nativeElement.getElementsByTagName('a');

        if (res) {
          let i;
          for (i = 0; i < res.length; i++) {
            res[i].style.opacity = 1;
          }
        }

        // Scroll to close.
        window.addEventListener('scroll', this.close, true);
        document.body.addEventListener('click', this._handleDocumentClick, true);
      }, 100);
    }, 0);
  }
  /**
   * Toolbar transition Menu close
   */
  private _animateOutToolbar() {

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    // const backdrop = this.$el.find('.fab-backdrop');
    const backdrop = this.$fab.nativeElement.querySelectorAll('.fab-backdrop');

    const fabColor = this.$anchor.nativeElement.style.backgroundColor;

    this.offsetX = this.btnLeft - windowWidth / 2 + this.btnWidth / 2;
    this.offsetY = windowHeight - this.btnBottom;
    // Hide backdrop
    this.$fab.nativeElement.classList.remove('active');
    this.$fab.nativeElement.style.backgroundColor = 'transparent';
    this.$fab.nativeElement.style.transition = 'none';

    this.$anchor.nativeElement.style.transition = 'none';

    if (backdrop) {
      backdrop.forEach((el) => {
        el.style.transform = 'scale(0)';
        el.style.backgroundColor = fabColor;
      });
    }

    const listA = this.$menu.nativeElement.getElementsByTagName('a');

    if (listA) {
      let i;
      for (i = 0; i < listA.length; i++) {
        listA[i].style.opacity = '0';
      }
    }

    setTimeout(() => {
      // backdrop.remove();
      if (backdrop) {
        backdrop.forEach((el) => {
          el.remove();
        });
      }

      // Set initial state.
      this.$fab.nativeElement.style.textAlign = '';
      // this.$fab.nativeElement.style.width = '';
      this.$fab.nativeElement.style.bottom = '';
      this.$fab.nativeElement.style.left = '';
      // this.$fab.nativeElement.style.overflow = '';
      this.$fab.nativeElement.style.backgroundColor = '';
      this.$fab.nativeElement.style.transform = 'translate3d(' + -this.offsetX + 'px,0,0)';


      this.$anchor.nativeElement.style.overflow = '';
      this.$anchor.nativeElement.style.transform = 'translate3d(0,' + this.offsetY + 'px,0)';

      setTimeout(() => {
        this.$fab.nativeElement.style.transform = 'translate3d(0,0,0)';
        this.$fab.nativeElement.style.transition = 'transform .2s';

        this.$anchor.nativeElement.style.transform = 'translate3d(0,0,0)';
        this.$anchor.nativeElement.style.transition = 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)';
      }, 20);
    }, 200);
  }
}

export interface IFabPptions {
  direction?: 'top' | 'right' | 'buttom' | 'left';
  hoverEnabled?: boolean;
  toolbarEnabled?: boolean;
}

