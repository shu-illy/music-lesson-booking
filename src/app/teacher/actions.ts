"use server";

import { RedirectType, redirect } from "next/navigation";

export const createLessonAction = async (formData: FormData) => {
	const title = formData.get("title");
	// redirect("/teacher", RedirectType.replace)
};
