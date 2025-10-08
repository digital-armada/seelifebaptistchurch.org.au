export interface FAQ {
    id: string;
    question: string;
    answer: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateFAQInput {
    question: string;
    answer: string;
}

export interface UpdateFAQInput {
    question?: string;
    answer?: string;
}
