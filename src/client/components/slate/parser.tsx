import { blogElement, blogPart } from '../../../shared/types/blog-post';
import React from 'react';

export const flowParser = (
  element: blogElement | blogPart,
  key?: string,
): JSX.Element => {
  if (element.italic) {
    return <i key={key}>{element.text}</i>;
  }

  if (element.code) {
    return <code key={key}>{element.text}</code>;
  }

  if (element.bold) {
    return <strong key={key}>{element.text}</strong>;
  }

  if (element.underline) {
    return <u key={key}>{element.text}</u>;
  }

  if ('type' in element) {
    const inside = element.children?.map((el, index) =>
      flowParser(el, `${element.type}${key}${index}`),
    );

    if (element.type === 'numbered-list') {
      return <dl key={key}>{inside}</dl>;
    }

    if (element.type === 'bulleted-list') {
      return <ol key={key}>{inside}</ol>;
    }

    if (element.type === 'list-item') {
      return <li key={key}>{inside}</li>;
    }

    if (element.type === 'paragraph') {
      switch (element.align) {
        case 'justify':
          return (
            <p
              key={key}
              style={{
                textAlign: 'justify',
              }}
            >
              {inside}
            </p>
          );
        case 'right':
          return (
            <p
              key={key}
              style={{
                display: 'flex',
                justifyContent: 'right',
              }}
            >
              {inside}
            </p>
          );
        case 'center':
          return (
            <p
              key={key}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {inside}
            </p>
          );
        default:
          return <p key={key}>{inside}</p>;
      }
    }

    if (element.type === 'heading-two') {
      return <h2 key={key}>{inside}</h2>;
    }

    if (element.type === 'heading-one') {
      return <h2 key={key}>{inside}</h2>;
    }

    if (element.type === 'block-quote') {
      return <blockquote key={key}>„{inside}”</blockquote>;
    }
  }

  return <span key={key}>{element.text}</span>;
};
