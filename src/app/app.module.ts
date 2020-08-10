import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// custom components
import { AppComponent } from './app.component';
import { ContainerComponent } from './container-component/container-component';
import { ContainerPopupComponent } from './container-component/container-popup/container-popup-component';
import { ConditionBuilderComponent } from './condition-builder/condition-builder.component';
import { ConditionBuilderFormComponent } from './condition-builder/condition-builder-form/condition-builder-form.component';
import { DropdownComponent } from './condition-builder/dropdown-component/dropdown-component';

// prime ng related modules
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SpinnerModule } from 'primeng/spinner';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';

// providers
import { SharedService } from './shared.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    ButtonModule,
    SelectButtonModule,
    DropdownModule,
    AutoCompleteModule,
    SpinnerModule,
    AccordionModule,
    InputTextModule,
    InputTextareaModule,
    DialogModule,
    MessagesModule,
    MessageModule,
    TooltipModule,
    InputNumberModule
  ],
  declarations: [
    AppComponent,
    ContainerComponent,
    ContainerPopupComponent,
    ConditionBuilderComponent,
    ConditionBuilderFormComponent,
    DropdownComponent
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
