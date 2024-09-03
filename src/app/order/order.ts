import { Client } from "../client/client";
import { Employee } from "../employee/employee";
import { Office } from "../office/office";

export interface Order {
    id: number;
    companyId: number;
    sender: Client;
    recipient: Client;
    address: string;
    office: Office;
    weight: number;
    price: number;
    sentDate: Date;
    receivedDate: Date;
    officeWorker: Employee;
    courier: Employee;
}
