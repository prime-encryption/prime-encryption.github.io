export type navboxLevel = 1 | 2 | 3 | 4 | 5 | 6;
export interface NavboxItem {
    level: navboxLevel;
    text: string;
    id: string;
}