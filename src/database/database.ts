export type TCategory = 'studies' | 'job' | 'house' | 'family' | 'health' | 'meetings' | 'other';

export const CATEGORY_LABELS: Record<TCategory, string> = {
    studies: 'учёба',
    job: 'работа',
    house: 'дом',
    family: 'семья',
    health: 'здоровье',
    meetings: 'встречи',
    other: 'другое',
};

export interface ITaskItem {
    id: number;
    title: string;
    description?: string;
    category: TCategory;
    priority: boolean;
    status: boolean;
}

export const DATABASE: ITaskItem[] = [
    {   
        id: 1,
        title: 'Прогулка и бег с собакой',
        description: '8:00 утра',
        category: 'house',
        priority: false,
        status: false,
    },
    {
        id: 2,
        title: 'Учёба в МИСИС',
        description: 'пройти 2 темы',
        category: 'studies',
        priority: true,
        status: false,
    },
    {
        id: 3,
        title: 'Уборка',
        description: 'постираться, поставить посудомойку',
        category: 'house',
        priority: false,
        status: false,
    },
];