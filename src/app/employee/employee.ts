import { Company } from "../company/company";
import { Position } from "../login-page/user";
import { Office } from "../office/office";

export interface Employee {
    id: number;
    name: string;
    address: string;
    contact: string;
    position: Position;
    company: Company;
    office: Office;
    userId: number;
}

