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

export type Items = {
  'readResults': Array<Item>
};

export type ItemWrite = {
  'id': string,
  'v': any
};

export type ItemWriteResponse = {
  'id': string,
  's': boolean,
  'v': any
};

export type ResponseWriteCommand = {
  'writeResults': Array<ItemWriteResponse>
}
