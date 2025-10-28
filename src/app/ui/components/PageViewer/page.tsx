"use client";

import { EditorContent, useEditor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import Image from "@tiptap/extension-image";
import {
  Details,
  DetailsSummary,
  DetailsContent,
} from "@tiptap/extension-details";
import { TextStyle, BackgroundColor } from "@tiptap/extension-text-style";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

export default function PageViewer({ content }: { content: JSONContent }) {
  const parsedContent =
    typeof content === "string"
      ? (JSON.parse(content) as JSONContent)
      : content;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Details,
      DetailsSummary,
      DetailsContent,
      TextStyle,
      BackgroundColor,
      Subscript,
      Superscript,
      Highlight,
      TaskItem,
      TaskList,
      TextAlign.configure({
        alignments: ["left", "center", "right", "justify"],
        types: ["paragraph", "heading"],
      }),
    ],
    immediatelyRender: false,
    content: parsedContent,
    editable: false,
  });

  return <EditorContent editor={editor} />;
}
