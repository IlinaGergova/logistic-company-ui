import { Company } from "../company/company";

export interface Client {
    id: number;
    name: string;
    address: string;
    contact: string;
    company: Company;
    userId: number;
}
