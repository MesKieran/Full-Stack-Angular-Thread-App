import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { Comment } from '../interfaces/comment.interface';
import { text } from 'body-parser';

type CreateCommentDto = {
  parentId?: string;
  text: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  http = inject(HttpClient);
  getComments(parentId: string = '') {
    let url = `${environment.apiBaseUrl}/comments`;
    if(parentId) {
     url += `?parentId=${parentId}`;
    }
    return this.http.get<Comment[]>(url);
  }

  createComment(comment: CreateCommentDto) {
    return this.http.post<Comment>(`${environment.apiBaseUrl}/comments`, comment);
  }
}
