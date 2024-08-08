export type CommentCreate = {
  productId: string;
  userId: string;
  content: string;
  parentId: string | null;
};

export type CommentGet = {
  productId: string;
  parentId?: string;
  limit?: number;
  offset?: number;
};

export type CommentDelete = {
  productId: string;
  commentId: string;
};
