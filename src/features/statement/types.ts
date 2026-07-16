export interface Statement {
    id: string;
    topic: string;
    content: string;
    bibleReferences: string | null;
    displayOrder: number;
    createdAt: Date;
    updatedAt: Date;
    subStatements: Statement[];
}
