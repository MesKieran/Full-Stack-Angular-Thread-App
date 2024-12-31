import { CommonModule } from '@angular/common';
import { Component, effect, inject, Input, signal } from '@angular/core';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { Comment } from '../../interfaces/comment.interface';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-comment',
  imports: [CommonModule, CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
creatComment($event: { text: string; }) {
throw new Error('Method not implemented.');
}
  @Input() comment!: Comment;
  isExpanded = signal(false);
  isReplying = signal(false);
  commentService = inject(CommentService);
  nestedComments = signal<Comment[]>([]);
  userService = inject(UserService);

  nestedCommentsEffect = effect(() => {
    if (this.isExpanded()) {
      this.commentService.getComments(this.comment._id)
      .subscribe((comments) => {
        this.nestedComments.set(comments);
      });
      }});
  toggleExpanded() {
    this.isExpanded.set(!this.isExpanded());
    
  }
  toggleReplying() {
  this.isReplying.set(!this.isReplying());
  if (this.isReplying()) {
      this.isExpanded.set(true);
  }
  }

  createComment(formValue: {text: string}) {
    const {text} = formValue;
    const user = this.userService.getUserFromLocalStorage();
    console.log(user);
    if (!user) {
      return;
    }
    this.commentService.createComment({
      text,
      userId: user._id,
      parentId: this.comment._id,
    }).subscribe((createdComment) => {
      this.nestedComments.set([createdComment, ...this.nestedComments()]);
    });
  }
}
