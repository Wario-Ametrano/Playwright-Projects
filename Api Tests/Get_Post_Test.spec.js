import { test, expect } from '@playwright/test';
import { createComment } from '../api/comments.Api';

test('POST + GET comment API', async ({ request }) => {

  const comment = {
    body: 'I am in love with someone.',
    postId: 1,
    userId: 5,
  };

  // 1️⃣ Creo commento
  const newComment = await createComment(request, comment);

  expect(newComment.body).toBe(comment.body);

  // 2️⃣ Recupero commento
  const getComment = await request.get(
    'https://dummyjson.com/comments/' + newComment.id
  );

  const body = await getComment.json();

  expect(body.id).toBe(newComment.id);

});