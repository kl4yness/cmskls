"use client";

import { useState } from "react";
import { addToast, Button, Input, Textarea } from "@heroui/react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { updatePage } from "@/app/actions/updatePage";
import { redirect } from "next/navigation";

export default function EditPageClient({ page }: { page: any }) {
  const [form, setForm] = useState({
    title: page.title,
    slug: page.slug,
    description: page.description,
    content: page.content,
  });

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const contentToSave = JSON.parse(JSON.stringify(form.content));

    const result = await updatePage({
      ...form,
      id: page.id,
      content: contentToSave,
    });

    if (result.success) {
      addToast({
        title: "Успех",
        description: "Страница сохранена",
        color: "success",
      });
      redirect(`/${form.slug}`);
    } else {
      addToast({
        title: "Ошибка",
        description: result.message ?? "Не удалось сохранить",
        color: "danger",
      });
    }
  };

  return (
    <div>
      <h1 className="text-center my-4 text-3xl">Edit page</h1>
      <form action={handleSubmit}>
        <div className="max-w-xl m-auto grid gap-2 grid-cols-2 grid-rows-1">
          <Input
            label="Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <Input
            label="Slug"
            value={form.slug.trim()}
            onChange={(e) => handleChange("slug", e.target.value)}
          />
          <Textarea
            label="Meta Description"
            value={form.description}
            className="col-span-2 my-2"
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
        <SimpleEditor
          onChange={(content) => handleChange("content", content)}
          initialContent={page.content ?? null} // сразу объект JSONContent
        />

        <div className="ml-auto w-fit p-4">
          <Button type="submit" color="primary">
            Create page
          </Button>
        </div>
      </form>
    </div>
  );
}
