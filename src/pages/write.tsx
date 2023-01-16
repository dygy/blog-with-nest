/* eslint-disable @typescript-eslint/ban-ts-comment */

import React, { useCallback, useMemo, useRef } from 'react';
import isHotkey, { KeyboardEventLike } from 'is-hotkey';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
  BaseEditor,
} from 'slate';
import { withHistory } from 'slate-history';

import { Button, Icon, Toolbar } from '../client/components/state/components';
import { Property } from 'csstype';
import TextAlign = Property.TextAlign;
import Background from '../client/components/Background/Background';
import AwesomeButton from '../client/components/AwesomeButton/AwesomeButton';

enum HOTKEYS {
  'mod+b' = 'bold',
  'mod+i' = 'italic',
  'mod+u' = 'underline',
  'mod+`' = 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const write = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const ref = useRef();
  return (
    <Background>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <h1>Write new post down there</h1>
      <p>
        <input
          ref={ref as unknown as React.LegacyRef<HTMLInputElement>}
          placeholder={'name of post'}
        />
      </p>
      <Slate editor={editor} value={initialValue as Descendant[]}>
        <Toolbar>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <MarkButton format="code" icon="code" />
          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
          <BlockButton format="left" icon="format_align_left" />
          <BlockButton format="center" icon="format_align_center" />
          <BlockButton format="right" icon="format_align_right" />
          <BlockButton format="justify" icon="format_align_justify" />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as KeyboardEventLike)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey as keyof unknown];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
      <div>
        <AwesomeButton
          label={'Save'}
          onClick={() => {
            fetch('/blogs/write', {
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json',
              },
              redirect: 'follow',
              referrerPolicy: 'no-referrer',
              body: JSON.stringify({
                // @ts-ignore
                name: ref.current?.value || '',
                text: editor.children,
              }),
            })
              .then(() => {
                alert('saved');
                location.href = '/';
              })
              .catch(() => alert('error'));
          }}
        />
      </div>
    </Background>
  );
};

const toggleBlock = (editor: BaseEditor, format: string) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) && // @ts-ignore
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      // @ts-ignore
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      // @ts-ignore
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: BaseEditor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: BaseEditor, format: any, blockType = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType as keyof unknown] === format,
    }),
  );

  return !!match;
};

const isMarkActive = (editor: BaseEditor, format: string | number) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format as keyof unknown] === true : false;
};

declare type elementProps = {
  attributes: React.HTMLAttributes<any>;
  children: React.ReactElement;
  element: {
    type: string;
    align: TextAlign | undefined;
  };
};

const Element = ({ attributes, children, element }: elementProps) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

declare type leafProps = {
  attributes: React.HTMLAttributes<any>;
  children: React.ReactElement;
  leaf: {
    bold: string;
    code: string;
    underline: string;
    italic: string;
  };
};

const Leaf = ({ attributes, children, leaf }: leafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }: buttonProps) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
      )}
      onMouseDown={(event: Event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

declare type buttonProps = {
  format: string;
  icon: string;
};

const MarkButton = ({ format, icon }: buttonProps) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: Event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const initialValue: unknown[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
];

export default write;