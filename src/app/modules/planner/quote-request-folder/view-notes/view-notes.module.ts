import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewNoteComponent } from './view-note/view-note.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ViewNoteComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [ViewNoteComponent],
  entryComponents: [ViewNoteComponent]
})
export class ViewNotesModule { }
