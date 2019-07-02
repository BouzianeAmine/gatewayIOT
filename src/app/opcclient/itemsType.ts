export interface IdsItems {
    'browseResults': Array<Item>;
}

export interface Item {

        'id': string;
        's': boolean;
        'r': string;
        'v': string;
        't': string;
}

// tslint:disable-next-line:interface-over-type-literal
export type Items = {
  'readResults': Array<Item>
};

// tslint:disable-next-line:interface-over-type-literal
export type ItemWrite = {
  'id': string,
  'v': any
};

// tslint:disable-next-line:interface-over-type-literal
export type ItemWriteResponse = {
  'id': string,
  's': boolean,
  'v': any
};

// tslint:disable-next-line:interface-over-type-literal
export type ResponseWriteCommand = {
  'writeResults': Array<ItemWriteResponse>
}
