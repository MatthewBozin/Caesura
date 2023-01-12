export interface Poem {
    title: string,
    lines: Array<string>,
    authors: Array<string>,
    userName: string,
    _id: string,
    comments: Array<Comment>,
    date: any,
    snaps: Array<any>
}

export interface Comment {
    userName: string,
    lines: Array<string>,
    authors: Array<string>,
    _id: any,
    date: any,
    snaps: Array<any>
}

export interface State {
    page: string;
    poem: any;
    id: string;
    comments: Array<Comment>;
}