import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  imports: [],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss'
})
export class CommentFormComponent {
  @Input() placeholder = "Write a comment...";
  @Input() buttonText = "Create";
  @Output() formSubmitted = new EventEmitter<{
    text: string;
  }>();

  formSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form  = event.target as HTMLFormElement;
    const textAreaElement =  form.elements.namedItem('commentText') as HTMLTextAreaElement;
    const commentText = textAreaElement.value;
    form.reset();
    this.formSubmitted.emit({text: commentText});
  }
}
