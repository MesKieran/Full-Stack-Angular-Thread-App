import { Component, inject, OnInit, signal } from '@angular/core';
import { CommentComponent } from "../components/comment/comment.component";
import { CommentService } from '../services/comment.service';
import { Comment } from '../interfaces/comment.interface';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from '../components/comment-form/comment-form.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CommentComponent, CommentFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  commentService = inject(CommentService);
  comments = signal<Comment[]>([])
  userService = inject(UserService);
  ngOnInit(): void {
      this.getComments();
  }
  getComments() {
    this.commentService.getComments()
    .subscribe((comments) => {
      this.comments.set(comments);
    });
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
    }).subscribe(createdComment => {
      this.comments.set([createdComment, ...this.comments()]);
    });
  }
}
