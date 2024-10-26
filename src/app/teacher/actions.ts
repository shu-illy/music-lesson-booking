'use server';

import { redirect, RedirectType } from "next/navigation";

export const createLessonAction = async (formData: FormData) => {
  const title = formData.get("title")
  // redirect("/teacher", RedirectType.replace)
  
}