
interface ISubCategory {
    _id: string;
    name: string;
    status: number;
}
export interface ICategory extends ISubCategory {
    children: Array<ISubCategory>;
}


