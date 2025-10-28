"use client";

import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  Input,
} from "@heroui/react";
import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";

export const ImageUploadNode: React.FC<NodeViewProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleInsert = () => {
    if (!url) return;

    const pos = props.getPos();
    if (typeof pos === "number") {
      props.editor
        .chain()
        .focus()
        .deleteRange({ from: pos, to: pos + props.node.nodeSize })
        .insertContentAt(pos, {
          type: "image",
          attrs: {
            src: url,
            alt: "image",
            title: "image",
          },
        })
        .run();
    }
    setIsOpen(false);
    setUrl("");
  };

  return (
    <NodeViewWrapper className="tiptap-image-insert m-auto">
      <div
        className="p-4 border rounded text-center cursor-pointer max-w-3xs m-auto"
        onClick={() => setIsOpen(true)}
      >
        Enter URL for image
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <ModalHeader>Insert Image</ModalHeader>
          <ModalBody>
            <Input
              label="URL"
              placeholder="https://example.com/image.jpg"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleInsert}>
              Enter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </NodeViewWrapper>
  );
};
