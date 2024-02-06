'use server';

import { z } from 'zod';
import {sql} from '@'
const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
})

const CreatePost = PostSchema.omit({id:true, date:true})

export async function createPost(formData: FormData) {
  const { title, description } = CreatePost.parse({
    title: formData.get("title"),
    description: formData.get("description"),
  })
}