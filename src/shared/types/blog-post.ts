export interface Blog {
  name: string;

  date: Date;

  text: string;
  _id?: number;
}

export type blogAlign = 'left' | 'center' | 'right' | 'justify' | undefined;
export interface blogPart extends blogElement {
  type?: string | undefined;
  align?: blogAlign;
  children?: blogElement[];
}

export interface blogElement {
  italic?: boolean;
  text?: string;
  code?: boolean;
  bold?: boolean;
  underline?: boolean;
  children?: blogElement[];
}
