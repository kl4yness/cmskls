import getPageBySlug from "@/app/actions/getPageBySlug";
import PageViewer from "@/app/ui/components/PageViewer/page";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
import { JSONContent } from "@tiptap/react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = await getPageBySlug((await params).slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
    },
    twitter: {
      title: page.title,
      description: page.description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return <h1 className="text-center mt-20 text-2xl">Страница не найдена</h1>;
  }

  return (
    <div className="max-w-3xl m-auto p-4">
      <PageViewer content={page.content as JSONContent} />
    </div>
  );
}
