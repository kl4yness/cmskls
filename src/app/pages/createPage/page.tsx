"use client";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { addToast, Button, Input, Textarea } from "@heroui/react";
import { useState } from "react";
import { JSONContent } from "@tiptap/react";
import { sendPageToDB } from "@/app/actions/createPage";
import { redirect } from "next/navigation";

export default function CreatePage() {
  const [page, setPage] = useState<{
    title: string;
    slug: string;
    description: string;
    content: JSONContent | null;
  }>({
    title: "",
    slug: "",
    description: "",
    content: null,
  });

  const handleChange = (key: keyof typeof page, value: any) => {
    setPage((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await sendPageToDB({
      title: page.title,
      slug: page.slug,
      description: page.description,
      content: page.content ? JSON.stringify(page.content) : null,
    });

    if (result.success) {
      addToast({ title: "Page created", color: "success" });
      setTimeout(() => {
        redirect(`/${page.slug}`);
      }, 300);
    }

    if (!result.success) {
      addToast({
        title: "Page cant be created",
        description: result.message,
        color: "danger",
      });
    }
  };

  return (
    <div>
      <h1 className="text-center my-4 text-3xl">Create page</h1>
      <h2 className="text-center my-4 text-2xl">SEO tags</h2>
      <form onSubmit={handleCreate}>
        <div className="max-w-xl m-auto grid gap-2 grid-cols-2 grid-rows-1">
          <Input
            value={page.title}
            onChange={(e) => handleChange("title", e.target.value)}
            label="Title"
            type="text"
          />
          <Input
            value={page.slug.trim()}
            onChange={(e) => handleChange("slug", e.target.value)}
            label="Slug"
            type="text"
          />
          <Textarea
            value={page.description}
            onChange={(e) => handleChange("description", e.target.value)}
            label="Meta Description"
            className="col-span-2 my-2"
          />
        </div>

        <hr />
        <SimpleEditor
          onChange={(content) => handleChange("content", content)}
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
