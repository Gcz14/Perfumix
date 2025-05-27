import {
  Directive,
  HostListener,
  ElementRef,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Directive({
  selector: '[appCurrencyMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyMaskDirective),
      multi: true
    }
  ]
})
export class CurrencyMaskDirective implements ControlValueAccessor {
  private onChange: any;
  private onTouched: any;

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    let value = this.el.nativeElement.value;
    value = value.replace(/\D/g, '');

    const floatValue = parseFloat(value) / 100;

    this.el.nativeElement.value = floatValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    if (this.onChange) this.onChange(floatValue);
  }

  @HostListener('blur')
  onBlur() {
    if (this.onTouched) this.onTouched();
  }

  writeValue(value: any): void {
    if (value != null) {
      this.el.nativeElement.value = Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    } else {
      this.el.nativeElement.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }
}
